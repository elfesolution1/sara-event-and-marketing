import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Footer = ({ data }) => {
  // const baseUrl = "http://localhost:3000";
  // const baseImageUrl = "http://localhost:1337";
  // const footerLinks = data.footerLink;

  return (
    <footer className="text-white pb-10 relative">
      {/* CTA Section */}
      <div className="bg-[#1E995E] w-[80%] mx-auto shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between items-center px-6 py-8 md:py-12 -mb-16 relative z-10">
        <div className="space-y-4 w-full md:w-[65%]">
          <h1 className="text-3xl font-medium">
            Experience the difference with Us!
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur
            libero.
          </p>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0 text-center md:text-right">
          <button className="py-3 px-10 rounded-2xl text-2xl hover:shadow-lg hover:scale-110 hover:transition-all hover:duration-300 bg-white text-[#1e995e]">
            Get in touch
          </button>
        </div>
      </div>

      {/* Main Section */}
      <main className="border-t border-t-gray-200 pt-20 ">
        <div className="w-full py-10 text-black flex flex-col md:flex-row items-start justify-around">
          {/* First Column */}
          <div className="w-full md:w-[30%] space-y-6">
            <Image
              src="https://via.assets.so/img.jpg?w=250&h=60&tc=white&bg=gray"
              alt="Service 1"
              width={250}
              height={50}
            />
            <p className="dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores debitis at aperiam nesciunt aliquam laboriosam odio,
              ipsa nisi odit sint.
            </p>
            <div className="flex items-center justify-around gap-2  w-[60%]">
              <Image
                src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                alt="Service 1"
                width={40}
                height={40}
                className="hover:text-[#1E995E] hover:scale-105"
              />
              <Image
                src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                alt="Service 1"
                width={40}
                height={40}
                className="hover:text-[#1E995E] hover:scale-105"
              />
              <Image
                src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                alt="Service 1"
                width={40}
                height={40}
                className="hover:text-[#1E995E] hover:scale-105"
              />
              <Image
                src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                alt="Service 1"
                width={40}
                height={40}
                className="hover:text-[#1E995E] hover:scale-105"
              />
              <Image
                src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                alt="Service 1"
                width={40}
                height={40}
                className="hover:text-[#1E995E] hover:scale-105"
              />
            </div>
          </div>

          {/* Second Column */}
          <main className="w-full md:w-[60%] flex flex-col md:flex-row justify-around items-start gap-2">
            {/* Useful Links */}
            <div className="space-y-3">
              <h2 className="text-xl text-[#1E995E]">Event Link</h2>
              <div className="flex flex-col items-start gap-2 dark:text-white">
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/about"
                >
                  About Us
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/service"
                >
                  Service
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/portfolio"
                >
                  Portfolio
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl text-[#1E995E]">Property Link</h2>
              <div className="flex flex-col items-start gap-2 dark:text-white">
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/"
                >
                  About Us
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/"
                >
                  Service
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/"
                >
                  Portfolio
                </Link>
                <Link
                  className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                  href="/"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h1 className="text-xl text-[#1E995E] mb-5">Contact Info</h1>
              <div className="flex flex-col gap-4 items-center justify-around">
                <div className="flex items-start justify-around gap-1">
                  <Image
                    src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                    alt="Service 1"
                    width={40}
                    height={40}
                    className="hover:text-[#1E995E] hover:scale-105"
                  />
                  <p className="dark:text-white">
                    consectetur adipisicing elit.
                  </p>
                </div>
                <div className="flex items-start justify-around gap-1">
                  <Image
                    src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                    alt="Service 1"
                    width={40}
                    height={40}
                    className="hover:text-[#1E995E] hover:scale-105"
                  />
                  <p className="dark:text-white">
                    consectetur adipisicing elit.
                  </p>
                </div>
                <div className="flex items-start justify-around gap-1">
                  <Image
                    src="https://via.assets.so/img.jpg?w=50&h=50&tc=white&bg=gray"
                    alt="Service 1"
                    width={40}
                    height={40}
                    className="hover:text-[#1E995E] hover:scale-105"
                  />
                  <p className="dark:text-white">
                    consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
          </main>
        </div>

        {/* Footer Bottom */}
        <div>
          <hr className="w-[80%] h-[2px] bg-[#1e995e] mx-auto" />
          <p className="text-center py-5 text-black dark:text-white">
            Developed by{" "}
            <Link
              target="_blank"
              href="https://elfedigital.com/"
              className="text-[#f94c30]"
            >
              Elfe Digital
            </Link>
          </p>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
