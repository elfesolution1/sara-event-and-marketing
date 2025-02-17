"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { getStrapiData } from "@/libs/api";

const Footer = () => {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [footerData, setFooterData] = useState({});
  // console.log("da is ", data.contactInfo[0].image);
  // const footerLinks = data.footerLink;

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        {
         homepage {
            data {
              id
              attributes {
                blocks {
                  __typename
                 ... on ComponentLayoutFooter{
            footerLogo{
              data{
                attributes{
                  url,
                  alternativeText
                }
              }
            }
            description
            footerSocialMedia{
              url,
              title,
            image{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
            }
            eventLink{
            url,
              title
            }
            propertyLink{
              url,
              title
            }
            contactInfo{
              image{
                data{
                  attributes{
                    url,
                    alternativeText
                  }
                }
              }
              title
            }
           ctaTitle,
            ctaDescription,
            ctaButton{
              title,
              url
            }
          }
                }
              }
            }
          }
        }
      `;
      try {
        const response = await getStrapiData(query);
        const blocks = response?.homepage?.blocks;
        if (blocks) {
          const footerContent = blocks?.find(
            (block) => block.__typename === "ComponentLayoutFooter"
          );
          setFooterData(footerContent); // Set the found navData directly
        } else {
          console.error("No blocks found in the fetched data.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <footer className="h-24">{/* Skeleton content here */}</footer>;
  }

  if (!footerData) {
    return <div>Data not available</div>; // Handle case where no data is available
  }
  return (
    <footer className="text-white  relative">
  {/* CTA Section */}
  <div className="bg-[#137a70] w-[96%] lg:w-[96%] mx-auto shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between items-center px-6 py-8 md:py-12 -mb-16 relative z-10">
    <div className="space-y-4 w-full md:w-[65%]">
      <h1 className="text-3xl font-medium">{footerData?.ctaTitle}</h1>
      <p>{footerData?.ctaDescription}</p>
    </div>
    <div className="w-full md:w-auto mt-4 md:mt-0 text-center md:text-right">
      <Link
        href={`${footerData?.ctaButton?.url}`}
        className="py-3 px-10 rounded-2xl text-2xl hover:shadow-lg hover:scale-110 hover:transition-all hover:duration-300 bg-white text-[#137a70]"
      >
        {footerData?.ctaButton?.title}
      </Link>
    </div>
  </div>

  <main className="border-t border-t-gray-200 bg-[#D9D9D921] pt-20 text-center">
    <div className="w-full py-10 text-black flex flex-col md:flex-row items-start justify-around text-center">
      <div className="w-full md:w-[30%] space-y-5">
        <Link href="/">
          <img
            src={`${footerData?.footerLogo?.url}`}
            alt={footerData?.footerLogo?.alternativeText || 'Footer Logo'}
            width={210}
            height={10}
          />
        </Link>
        <p className="dark:text-white">{footerData?.description}</p>
        <div className="flex items-center justify-around gap-2 w-[60%] ml-6">
          {footerData?.footerSocialMedia?.map((item, index) => {
            const imageUrl = item?.image?.data?.[0]?.url;
            const altText = item?.image?.alternativeText || "Social Media Icon";

            return (
              <Link href={`${item?.url}`} key={index}>
                {imageUrl ? (
                  <img
                    src={`${imageUrl}`}
                    alt={altText}
                    width={30}
                    height={30}
                    className="hover:text-[#d3ebdf] hover:scale-125 transition-all duration-300 shadow-lg"
                  />
                ) : (
                  <span>Icon missing</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="w-full md:w-[60%] flex flex-col md:flex-row justify-around items-start gap-2 ml-6">
        <div className="space-y-3">
          <h2 className="text-xl text-[#137a70]">Event Link</h2>
          <div className="flex flex-col items-start gap-2 dark:text-white">
            {footerData?.eventLink?.map((item, index) => (
              <Link
                key={index}
                className="hover:text-[#137a70] hover:scale-105 hover:border-b hover:border-b-[#137a70] pb-[2px]"
                href={`${item?.url}`}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl text-[#137a70]">Property Link</h2>
          <div className="flex flex-col items-start gap-2 dark:text-white">
            {footerData?.propertyLink?.map((item, index) => (
              <Link
                key={index}
                className="hover:text-[#137a70] hover:scale-105 hover:border-b hover:border-b-[#137a70] pb-[2px]"
                href={`${item?.url}`}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl text-[#137a70] mb-5">Contact Info</h1>
          <div className="flex flex-col gap-4 items-start justify-around ">
            {footerData?.contactInfo?.map((item, index) => {
              const imageUrl = item?.image?.data?.[0]?.url;
              const altText = item?.image?.alternativeText || "Contact Icon";

              return (
                <div key={index}>
                  {imageUrl ? (
                    <div className="flex items-center justify-around gap-3">
                      <img
                        src={`${imageUrl}`}
                        alt={altText}
                        width={25}
                        height={25}
                        className="hover:text-[#137a70] hover:scale-125 transition-all duration-300 shadow-lg"
                      />
                      <p className="dark:text-white">{item?.title}</p>
                    </div>
                  ) : (
                    <span>Icon missing</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>

    <div>
      <hr className="w-[80%] h-[2px] bg-[#137a70] mx-auto" />
      <p className="text-center py-3 text-black dark:text-white">
       © 2025 Developed by{" "}
        <Link
          target="_blank"
          href="https://elfedigital.com/"
          className="text-[#f94c30]"
        >
          Elfe Digital
        </Link>
         . ALL RIGHTS RESERVED
      </p>
    </div>
  </main>
</footer>

  );
};

export default Footer;
