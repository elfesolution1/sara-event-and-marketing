"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { delay, motion } from "framer-motion";
import { getStrapiData } from "@/libs/api";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
function Service() {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;
  const [servicePageData, setServicePageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const query = `
      {
       servicePage{
    data{
      attributes{
        blocks{
          ... on ComponentLayoutServiceCard{
            ServiceCard{
              description,
              title,
              button,
              href,
              image{
                data{
                  attributes{
                    url,
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
      }
      `;
      const articles = await getStrapiData(query);
      setServicePageData(articles?.servicePage);
      setIsLoading(true);
    };

    fetchData();
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://sara-events-and-marketing-4fe9cca6bffd.herokuapp.com/uploads/Spin_1x_1_0s_200px_200px_1_1_e2c92a91fb.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }
  const { blocks } = servicePageData;
  const serviceData = blocks[0];
  console.log("service ", serviceData?.ServiceCard);
  const cardVariants = [
    {
      hidden: { opacity: 0, x: -100 }, // Slide from left
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
    {
      hidden: { opacity: 0, y: 100 }, // Slide from bottom
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
    {
      hidden: { opacity: 0, x: 100 }, // Slide from right
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
  ];
  return (
    <>
      <head>
        <title>Service | Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <Header />
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/2_Y1_A8821_3bda0ac779.webp`}
            alt="alt"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              {/* <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                Service
              </h1> */}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-12 pt-4">
  {/* Section Header */}
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
      {/* {serviceSection.title} */}
      Our <span className="text-[#1e995e] font-bold">Service</span>
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Perferendis, repellendus nulla. Praesentium
    </p>
  </div>

  <section className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
    {serviceData.ServiceCard.map((item, index) => {
      const { image, title, description, href, button } = item;
      const imageUrl = image ? `${baseImageUrl}${image.url}` : null;
      const altText = image?.alternativeText || "Service Image";

      return (
        <motion.Card
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants[index % 3]}
          className="shadow-md dark:border dark:border-white dark:hover:shadow-sm dark:hover:shadow-white"
        >
          <CardHeader className="p-0">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={altText}
                width={400}
                height={250}
                className="w-full h-52 object-cover"
              />
            )}
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-2xl font-semibold text-gray-800 mb-2 dark:text-[#1F995E]">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 mb-4 dark:text-white">
              {description}
            </CardDescription>
            {href && button && (
              <Link
                href={href}
                target="_blank"
                className="bg-[#1e995e] hover:bg-white hover:text-[#1e995e] hover:border hover:border-[#1e995e] text-white py-2 px-4 rounded hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                {button}
              </Link>
            )}
          </CardContent>
        </motion.Card>
      );
    })}
  </section>
</section>

      <Footer />
    </>
  );
}

export default Service;
