import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Footer = ({ data }) => {
  const baseLinkUrl = "http://localhost:3000";
  const baseImageUrl = "http://localhost:1337";
  // console.log("da is ", data.contactInfo[0].image);
  // const footerLinks = data.footerLink;

  return (
    <footer className="text-white pb-10 relative ">
      {/* CTA Section */}
      <div className="bg-[#1E995E] w-[80%] mx-auto shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between items-center px-6 py-8 md:py-12 -mb-16 relative z-10">
        <div className="space-y-4 w-full md:w-[65%]">
          <h1 className="text-3xl font-medium">{data.ctaTitle}</h1>
          <p>{data.ctaDescription}</p>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0 text-center md:text-right">
          <Link
            href={data.ctaButton.url}
            className="py-3 px-10 rounded-2xl text-2xl hover:shadow-lg hover:scale-110 hover:transition-all hover:duration-300 bg-white text-[#1e995e]"
          >
            {data.ctaButton.title}
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <main className="border-t border-t-gray-200 bg-[#D9D9D921] pt-20 ">
        <div className="w-full py-10 text-black flex flex-col md:flex-row items-start justify-around">
          {/* First Column */}
          <div className="w-full md:w-[30%] space-y-5">
            <Link href="/">
              <Image
                src={`${baseImageUrl}${data.footerLogo.url}`}
                alt={`${data.footerLogo.alternativeText}`}
                width={210}
                height={10}
              />
            </Link>
            <p className="dark:text-white">{data.description}</p>
            <div className="flex items-center justify-around gap-2  w-[60%]">
              {data.footerSocialMedia.map((item, index) => {
                const imageUrl = item.image?.data?.[0]?.url; // Safely access the image URL
                const altText =
                  item.image?.alternativeText || "Social Media Icon"; // Provide a default alt text

                return (
                  <Link href={item.url} key={index}>
                    {imageUrl ? (
                      <Image
                        src={`${baseImageUrl}${imageUrl}`} // Only render if imageUrl is defined
                        alt={altText}
                        width={30}
                        height={30}
                        className="hover:text-[#d3ebdf] hover:scale-125 transition-all duration-300 shadow-lg"
                      />
                    ) : (
                      <span>Icon missing</span> // Display fallback content if image is missing
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Second Column */}
          <main className="w-full md:w-[60%] flex flex-col md:flex-row justify-around items-start gap-2">
            {/* Useful Links */}
            <div className="space-y-3">
              <h2 className="text-xl text-[#1E995E]">Event Link</h2>
              <div className="flex flex-col items-start gap-2 dark:text-white">
                {data.eventLink.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl text-[#1E995E]">Property Link</h2>
              <div className="flex flex-col items-start gap-2 dark:text-white">
                {data.propertyLink.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className="hover:text-[#1E995E] hover:scale-105 hover:border-b hover:border-b-[#1E995E] pb-[2px]"
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h1 className="text-xl text-[#1E995E] mb-5">Contact Info</h1>
              <div className="flex flex-col gap-4 items-start justify-around">
                {data.contactInfo.map((item, index) => {
                  const imageUrl = item.image?.data?.[0]?.url; // Safely access the image URL
                  const altText = item.image?.alternativeText || "contact Icon"; // Provide a default alt text

                  return (
                    <div key={index}>
                      {imageUrl ? (
                        <div className="flex items-center  justify-around gap-3">
                          <Image
                            src={`${baseImageUrl}${imageUrl}`} // Only render if imageUrl is defined
                            alt={altText}
                            width={25}
                            height={25}
                            className="hover:text-[#1E995E] hover:scale-125 transition-all duration-300 shadow-lg"
                          />

                          <p className="dark:text-white">{item.title}</p>
                        </div>
                      ) : (
                        <span>Icon missing</span> // Display fallback content if image is missing
                      )}
                    </div>
                  );
                })}
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
