"use client";
import React from "react";
import Image from "next/image";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import CloseButton from "@/app/assets/CloseButton.jpg";
import { useState } from "react";
function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (src) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };
  const portfolioItems = {
    all: [
      {
        id: 1,
        src: "http://localhost:1337/uploads/6_2d90d1d1e3.webp",
        alt: "Wedding Event 1",
      },
      {
        id: 2,
        src: "http://localhost:1337/uploads/8_d9b366b4d9.webp",
        alt: "Birthday Event 1",
      },
      {
        id: 3,
        src: "http://localhost:1337/uploads/2_Y1_A8816_1fcff462d3.webp",
        alt: "Wedding Event 2",
      },
      {
        id: 4,
        src: "http://localhost:1337/uploads/7_d05aa8a5cb.webp",
        alt: "Birthday Event 2",
      },
    ],
    wedding: [
      {
        id: 1,
        src: "http://localhost:1337/uploads/7_d05aa8a5cb.webp",
        alt: "Wedding Event 1",
      },
      {
        id: 3,
        src: "http://localhost:1337/uploads/2_Y1_A8816_1fcff462d3.webp",
        alt: "Wedding Event 2",
      },
    ],
    birthday: [
      {
        id: 2,
        src: "http://localhost:1337/uploads/8_d9b366b4d9.webp",
        alt: "Birthday Event 1",
      },
      {
        id: 3,
        src: "http://localhost:1337/uploads/3_W7_A9031_57b587d76e.webp",
        alt: "Birthday Event 1",
      },
      {
        id: 4,
        src: "http://localhost:1337/uploads/6_2d90d1d1e3.webp",
        alt: "Birthday Event 2",
      },
    ],
  };

  const partners = [
    {
      id: 1,
      src: "http://localhost:1337/uploads/SARA_EVENTS_and_MARKTING_Footer_1_dd09bcd7a4.webp",
      alt: "Partner 1",
    },
    {
      id: 2,
      src: "http://localhost:1337/uploads/SARA_EVENTS_and_MARKTING_Footer_1_dd09bcd7a4.webp",
      alt: "Partner 2",
    },
    {
      id: 3,
      src: "http://localhost:1337/uploads/SARA_EVENTS_and_MARKTING_Footer_1_dd09bcd7a4.webp",
      alt: "Partner 3",
    },
    {
      id: 4,
      src: "http://localhost:1337/uploads/SARA_EVENTS_and_MARKTING_Footer_1_dd09bcd7a4.webp",
      alt: "Partner 4",
    },
    {
      id: 5,
      src: "http://localhost:1337/uploads/SARA_EVENTS_and_MARKTING_Footer_1_dd09bcd7a4.webp",
      alt: "Partner 4",
    },
    {
      id: 6,
      src: "http://localhost:1337/uploads/SARA_EVENTS_and_MARKTING_Footer_1_dd09bcd7a4.webp",
      alt: "Partner 4",
    },
  ];

  return (
    <>
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <Image
            src="http://localhost:1337/uploads/10_5fc42d273d.webp"
            alt="alt"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              {/* <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                Portfolio
              </h1> */}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-12 pt-4 dark:bg-none bg-[url('/bg2.jpg')] bg-cover bg-center min-h-screen w-full ">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
            {/* {serviceSection.title} */}
            Our <span className="text-[#1e995e] font-bold">Portfolio</span>
          </h1>
          <div className="w-[80%] mx-auto">
            <Tabs defaultValue="All">
              {/* Tab Navigation */}
              <TabsList className="flex justify-center space-x-4 bg-stone-50">
                {["All", "Corporate Event", "Conferences and Seminars"].map(
                  (tab) => (
                    <TabsTrigger key={tab} value={tab}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

              {/* Tab Content for All Portfolio */}
              <TabsContent value="All" className="mt-8 text-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {portfolioItems.all.map((item) => (
                    <div
                      key={item.id}
                      className="relative group"
                      onClick={() => openLightbox(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={300}
                        height={300}
                        className="rounded-lg shadow-md dark:border dark:border-white w-full h-full object-cover group-hover:opacity-75 "
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-lg hover:cursor-pointer ">
                          View Full Image
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab Content for Wedding Portfolio */}
              <TabsContent value="Corporate Event" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {portfolioItems.wedding.map((item) => (
                    <div
                      key={item.id}
                      className="relative group"
                      onClick={() => openLightbox(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md  dark:border dark:border-white w-full h-full object-cover group-hover:opacity-75 "
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-lg hover:cursor-pointer ">
                          View Full Image
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab Content for Birthday Portfolio */}
              <TabsContent value="Conferences and Seminars" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {portfolioItems.birthday.map((item) => (
                    <div
                      key={item.id}
                      className="relative group"
                      onClick={() => openLightbox(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md  dark:border dark:border-white  w-full h-full object-cover group-hover:opacity-75 "
                      />
                      <div className="absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-lg hover:cursor-pointer ">
                          View Full Image
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                  <div className="relative">
                    <Image
                      src={selectedImage}
                      alt="Selected Image"
                      width={900}
                      height={800}
                      className="rounded-lg"
                    />
                    <Image
                      src={CloseButton}
                      alt="Close Button"
                      width={40}
                      height={40}
                      onClick={closeLightbox}
                      className="absolute top-4 right-4 hover:cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </section>
      <section className="py-12  text-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
            Our <span className="text-[#1e995e] font-bold ">Partners</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
        <Swiper
          slidesPerView={5} // Show 5 images at a time
          spaceBetween={30} // Space between slides
          autoplay={{ delay: 3000 }}
          loop={true}
          modules={[Autoplay]}
          className="mySwiper w-[80%] mx-auto"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <img
                src={partner.src}
                alt={partner.alt}
                className="mx-auto h-20 object-contain dark:border dark:border-white "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default Portfolio;
