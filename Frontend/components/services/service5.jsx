"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Services5() {
  return (
    <section className="bg-secondary  min-h-[370px] sm:h-[370px] flex flex-col gap-4 justify-between items-center mx-4 p-4 md:pt-0 md:px-12 md:flex-row mt-8 rounded-lg shadow-md shadow-background">
      <div className="mb-14 lg:mb-0 md:w-1/2 flex-1 w-full">
        <h1 className="text-2xl leading-none text-background font-bold lg:text-3xl sm:text-xl text-start lg:leading-tight mb-4 sm:mb-6">
          Find Mentors and <br className="hidden sm:block" />
          Guide Others <br className="hidden sm:block" />
        </h1>
        <p className="text-white font-normal">
          Meet seasoned professionals, learn from them, and become a mentor for
          less experienced developers to give back to the community.
        </p>
        <Link
          href="/services/mentorship"
          className="primary-btn mt-4 sm:w-[256px] font-semibold"
        >
          Learn More
        </Link>
      </div>

      <div className="flex-1 w-full">
        <Image
          src="/people.png"
          alt="Happy developers sitting on a table"
          width={800}
          height={700}
          className="rounded-[15px] object-cover w-full max-h-[308px] max-w-[490px]"
        />
      </div>
    </section>
  );
}

export default Services5;
