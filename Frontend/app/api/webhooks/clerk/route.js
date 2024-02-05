import { Webhook } from "svix";
import { headers } from "next/headers";
import axios from "axios";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  const { id, email_addresses, username, first_name, last_name, image_url } =
    evt.data;
  if (eventType === "user.created") {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/users/`, {
        clerkId: id,
        email: email_addresses[0].email_address,
        username,
        firstName: first_name,
        lastName: last_name,
        profilePicture: image_url,
      });
      if (response.data?._id) {
        await clerkClient.updateUserMetadata(id, {
          publicMetadata: {
            userId: response.data._id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    return new NextResponse.json({ message: "Ok", user: response.data });
  } else if (eventType === "user.updated") {
    try {
      const response = await axios.put(
        `${process.env.BACKEND_URL}/users/${evt.data.publicMetadata.userId}/`,
        {
          email: email_addresses[0].email_address,
          username,
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
        }
      );
      return new NextResponse.json({ message: "Ok", user: response.data });
    } catch (error) {
      return new NextResponse.json({ message: "Error", error });
    }
  } else if (eventType === "user.deleted") {
    try {
      const response = await axios.delete(
        `${process.env.BACKEND_URL}/users/${evt.data.publicMetadata.userId}/`
      );
      return new NextResponse.json({ message: "Ok", user: response.data });
    } catch (error) {
      return new NextResponse.json({ message: "Error", error });
    }
  }
  return new Response("", { status: 200 });
}
