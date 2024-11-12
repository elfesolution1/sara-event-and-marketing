"use client";
import React from "react";
import Image from "next/image";
import CloseButton from "@/app/assets/CloseButton.jpg";
import { useState, useEffect } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ConferenceAndSeminars() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/Spin_1x_1_0s_200px_200px_1_81caf6383d.gif`}
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }
  const openLightbox = (src) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <head>
        <title>Conference and Seminars | Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <Header />
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/3_W7_A9031_57b587d76e.webp`}
            alt="alt"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              {/* <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                Conference And Seminars
              </h1> */}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 mb-20">
        <div className="w-[70%] pb-10 mx-auto shadow-lg dark:border border-[rgba(255,255,255,0.6)] ">
          <div>
            <h1 className="text-center font-medium text-4xl mb-4">
              Conference And
              <span className="text-[#1e995e] font-bold "> Seminars</span>
            </h1>

            <div className="h-[50%]">
              {" "}
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/3_W7_A8840_f9b3e7408f.webp`}
                alt="alt"
                width={600}
                height={200}
                className="w-full "
              />
            </div>
          </div>
          <main className="mt-5 px-4">
            <p
              className="font-normal text-lg text-justify mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>

            <p
              className="font-normal text-lg text-justify mb-1"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>
            {/* <section className="py-16 dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <div>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    modules={[Autoplay]}
                    className=" w-[100%] mx-auto"
                  >
                    {galleryImages.map((image) => (
                      <SwiperSlide key={image.id}>
                        <div
                          className="relative group cursor-pointer"
                          onClick={() => openLightbox(image.src)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg w-full h-full object-cover group-hover:opacity-75"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white font-bold text-lg">
                              View Full Image
                            </span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected Image"
                      width={900}
                      height={800}
                      className="rounded-lg"
                    />
                    <img
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
            </section> */}
            <p
              className="font-normal text-lg text-justify mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>

            <p
              className="font-normal text-lg text-justify mb-1"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ConferenceAndSeminars;
