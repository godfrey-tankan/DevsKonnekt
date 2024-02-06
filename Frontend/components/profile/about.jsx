import Link from "next/link";
import React from "react";
import {
  BiGlobe,
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const About = ({ profile }) => {
  return (
    <div className="w-full lg:w-[45%] flex flex-col gap-4 mt-4 lg:mt-16 px-4">
      {/* Title and availability for hire and collaboration */}
      <div className="flex flex-col justify-between items-start w-full">
        <h1 className="text-2xl text-primary font-bold">
          {profile.jobTitle || "Job Title"}
        </h1>
        <h2 className="text-xl mt-4 text-primary font-semibold">
          Availability
        </h2>
        <div className="flex items-start mt-2 gap-4">
          <p className=" flex gap-2 items-center font-medium">
            <span className="w-2 h-2 bg-red-600 rounded-full" /> Hire
          </p>
          <p className=" flex gap-2 items-center font-medium">
            <span className="w-2 h-2 bg-green-600 rounded-full" /> Collaboration
          </p>
        </div>
      </div>
      {/* Bio */}
      <div className="flex flex-col justify-between items-start w-full -mt-2">
        <h2 className="text-xl mt-4 text-primary font-semibold">Bio</h2>
        <p className="text-primary/80">{profile.bio}</p>
      </div>
      {/* Location */}
      <div className="flex items-center gap-2 w-full font-semibold text-md">
        <FaMapMarkerAlt className="text-primary/70" />
        <p className="text-primary/80">
          {profile.city}, {profile.state && profile.state}, {profile.country}
        </p>
      </div>
      {/* Socials */}
      <div className="flex w-full justify-between items-center gap-2">
        <Link
          href={`${profile.twitter ? profile.twitter : "#"}`}
          target="_blank"
        >
          <BiLogoTwitter className="text-primary/70 cursor-pointer text-2xl" />
        </Link>
        <Link
          href={`${profile.linkedIn ? profile.linkedIn : "#"}`}
          target="_blank"
        >
          <BiLogoLinkedin className="text-primary/70 cursor-pointer text-2xl" />
        </Link>
        <Link href={`${profile.github ? profile.github : "#"}`} target="_blank">
          <BiLogoGithub className="text-primary/70 cursor-pointer text-2xl" />
        </Link>
        <Link
          href={`${profile.portfolio ? profile.portfolio : "#"}`}
          target="_blank"
        >
          <BiGlobe className="text-primary/70 cursor-pointer text-2xl" />
        </Link>
      </div>
      {/* Skills */}
      <div className="flex flex-col justify-between items-start w-full">
        <h2 className="text-xl mt-4 text-primary font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.length > 0 &&
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 rounded-md text-primary/80 font-medium"
              >
                {skill.name}
              </span>
            ))}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="primary-btn mt-2 !w-full !font-semibold">
              Add New Skill
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add A Skill</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  name="skill"
                  placeholder="Skill"
                  className="w-full"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <button className="primary-btn !w-full !font-semibold">
                  Add
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default About;
