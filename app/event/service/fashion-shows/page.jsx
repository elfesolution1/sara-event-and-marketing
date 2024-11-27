"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CloseButton from "@/app/assets/CloseButton.jpg";
import { useState } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { getStrapiData } from "@/libs/api";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Gallery Data

function FashionShow() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fashioEventPageData, setFashionEventPageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const query = `
      {
      fashionShow{
    data{
      attributes{
        blocks{
          __typename
          ...on ComponentComponentsImage{
            image{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
          }
          ...on ComponentLayoutServiceDetail{
            serviceTitle{
              title
              secondTitle
            }
            serviceImage{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
            serviceContent
            serviceGallery{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
            serviceDetail2
          }
        }
      }
    }
  }
      }
      `;
      const articles = await getStrapiData(query);
      setFashionEventPageData(articles?.fashionShow);
      setIsLoading(true);
    };

    fetchData();
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648285/Spin_1x_1_0s_200px_200px_1_1_97ae55d443.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }
  const { blocks } = fashioEventPageData;
  const heroData = blocks?.find(
    (block) => block.__typename === "ComponentComponentsImage"
  );
  const contactData = blocks?.find(
    (block) => block.__typename === "ComponentLayoutServiceDetail"
  );
  const galleryImages = contactData?.serviceGallery?.data?.map(
    (image) => image?.url
  );

  const goToNextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages?.length;
    setSelectedImage(galleryImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const goToPrevImage = () => {
    const prevIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const serviceContent = contactData?.serviceContent;
  const serviceDetail = contactData?.serviceDetail2;
  console.log("event ", serviceDetail[0]?.children[0]?.text);
  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;

  const openLightbox = (src) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <head>
        <title>Fashion Show| Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <Header />
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <img
            src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732695348/background_2_673f9666d7.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className='flex items-center justify-center  w-full'>
              <h1 className="text-2xl font-bold mb-4 text-white leading-tight w-full text-center uppercase">
                 {contactData?.serviceTitle?.title}
                  <span className=" font-bold ">
                    {contactData?.serviceTitle?.secondTitle}
                  </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
     
      <section className="mt-10 mb-20">
  <div className="w-[96%] lg:w-[70%] pb-10 mx-auto shadow-lg dark:border border-[rgba(255,255,255,0.6)]">
    <div>
      <div className="h-[50%]">
        {/* Safely accessing image properties */}
        {contactData?.serviceImage?.url && (
          <img
            src={`${contactData.serviceImage.url}`}
            alt={contactData.serviceImage.alternativeText || "Service Image"}
            className="w-full h-[400px] object-cover "
          />
        )}
      </div>
    </div>
    <main className="mt-5 lg:px-4 px-2">
      {/* Safely accessing serviceContent */}
      {serviceContent?.[0]?.children?.[0]?.text && (
        <p
          className="font-normal text-lg text-justify mb-2"
          style={{ letterSpacing: "1px" }}
        >
          {serviceContent[0].children[0].text}
        </p>
      )}

      {serviceContent?.[1]?.children?.[0]?.text && (
        <p
          className="font-normal text-lg text-justify mb-1"
          style={{ letterSpacing: "1px" }}
        >
          {serviceContent[1].children[0].text}
        </p>
      )}

<section className="py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            loop={true}
            modules={[Autoplay]}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 40 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="w-[100%] mx-auto"
          >
            {(galleryImages ?? []).map((image,index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => openLightbox(image ?? '')}
                >
                  {
              console.log('galler is is ',image)
                  }
                  <img
                    src={`${image ?? ''}`}
                    alt={image?.alt ?? 'Image'}
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg dark:border dark:border-white w-full h-full object-cover group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-bold text-lg">View Full Image</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>

  {/* Lightbox Modal */}
  {selectedImage && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[85%] h-[85%]">
        <div className="relative w-full h-full">
          <img
            src={`${selectedImage}`}
            alt="Selected Image"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648286/x_solid_1_1_328c7cb152.svg"
        alt='Close Button'
        onClick={closeLightbox}
        width={40}
        height={40}
        className="absolute top-6 right-6 hover:cursor-pointer bg-white py-3 px-3 rounded-full"
      />
      {/* Prev Button */}
      <img
        src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648282/angle_left_solid_1_aff896a75a.webp"
        onClick={goToPrevImage}
        width={40}
        height={40}
        alt="previous button"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
      />

      <img
        src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648282/angle_right_solid_1_6d6e7dbde6.webp"
        alt="next button"
        onClick={goToNextImage}
        height={40}
        width={40}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
      />
    </div>
  )}
</section>

      {/* Safely accessing serviceDetail */}
      {serviceDetail?.[0]?.children?.[0]?.text && (
        <p
          className="font-normal text-lg text-justify mb-2"
          style={{ letterSpacing: "1px" }}
        >
          {serviceDetail[0].children[0].text}
        </p>
      )}

      {serviceDetail?.[1]?.children?.[0]?.text && (
        <p
          className="font-normal text-lg text-justify mb-2"
          style={{ letterSpacing: "1px" }}
        >
          {serviceDetail[1].children[0].text}
        </p>
      )}
    </main>
  </div>
</section>

      <Footer />
    </>
  );
}

export default FashionShow;
