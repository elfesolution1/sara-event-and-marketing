"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
import { motion } from "framer-motion";
import { getStrapiData } from "@/libs/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// Gallery Data

function About() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const imageSlideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
    exit: { opacity: 0, x: 100 },
  };

  const openLightbox = (url) => {
    setSelectedImage(url);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const [aboutPageData, setAboutPageData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = `
      {
       aboutPage{
  data{
    attributes{
      blocks{
        __typename
        ... on ComponentComponentsImage{
          image{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
        }
          ... on ComponentLayoutAboutSection{
          aboutImage{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
          aboutTitle{
            title,
            secondTitle
          }
          aboutDetail
        }
           ... on ComponentLayoutMissionVision{
          missionTitle{
            title,
            secondTitle
          }
          missionDescription,
          missionCard{
            title,
            description,
            button,
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
           ... on ComponentLayoutServiceCard {
              ServiceCard {
                title
                description
                href
                button
                image {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
              }
            }
           ... on ComponentLayoutWhyChooseUs{
          whyUsTitle{
            title,
            secondTitle
          }
          whyUsDescription
          whyUsImage{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
          whyUsCard{
            title,
            button,
            description,
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
           ... on ComponentLayoutGallery{
          galleryTitle{
            title,
            secondTitle
          }
          galleryImage{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
             prevNextImage{
            data{
              attributes{
                alternativeText,
                url
              }
            }
          }
          closeButton{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
        }
            ... on ComponentLayoutPartners{
          partnerDescription,
          partnerTitle{
            title,
            secondTitle
          }
          partnerImage{
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
          ... on ComponentLayoutFaq{
          FAQTitle{
            title,
            secondTitle
          }
          QA{
            title,
            secondTitle
          }
        }
      }
    }
  }
}
      }
      `;
      const articles = await getStrapiData(query);
      setAboutPageData(articles?.aboutPage);
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
  // if (!aboutPageData) return <div>Loading...</div>;
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
  const { blocks } = aboutPageData;
  const heroData = blocks?.find(
    (block) => block.__typename === "ComponentComponentsImage"
  );
  const aboutSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutAboutSection"
  );
  const missionSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutMissionVision"
  );
  const whyUsSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutWhyChooseUs"
  );
  const gallerySection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutGallery"
  );
  const partnerSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutPartners"
  );
  const faqSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutFaq"
  );
  const teamSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutServiceCard"
  );
  const galleryImagess = gallerySection?.galleryImage?.data;
  const prevImage = gallerySection?.prevNextImage?.data[0]?.url;
  const nextImage = gallerySection?.prevNextImage?.data[1]?.url;
  const goToNextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImagess.length;
    setSelectedImage(galleryImagess[nextIndex].url); // Use galleryImagess
    setCurrentIndex(nextIndex);
  };

  const goToPrevImage = () => {
    const prevIndex =
      (currentIndex - 1 + galleryImagess.length) % galleryImagess.length;
    setSelectedImage(galleryImagess[prevIndex].url); // Use galleryImagess
    setCurrentIndex(prevIndex);
  };
  const baseImageUrl = "https://res.cloudinary.com/dkqlrnz6r";
  return (
    <>
      <head>
        <title>About | Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <Header />
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <img
            src={`${heroData.image?.data[0]?.url}`}
            alt={heroData.image?.data[0].alternativeText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-50  flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              {/* <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                About Us
              </h1> */}
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto  px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-12">
        {/* Text Column */}
        <div className="space-y-5">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleSlide}
            className="text-4xl font-bold text-gray-800 leading-tight dark:text-white"
          >
            {aboutSection.aboutTitle.title}{" "}
            <span className="text-[#137a70] font-bold">
              {" "}
              {aboutSection?.aboutTitle?.secondTitle}
            </span>
          </motion.h1>
          {aboutSection?.aboutDetail?.map((item, index) => {
            return (
              <p
                key={index}
                className="text-lg text-gray-600 leading-relaxed dark:text-white text-justify"
              >
                {item?.children[0]?.text}
              </p>
            );
          })}
        </div>

        {/* Image Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageSlideRight}
          className="w-full h-full"
        >
          <img
            src={`${aboutSection?.aboutImage?.url}`}
            alt={aboutSection?.aboutImage?.alternativeText}
            className="rounded-lg shadow-lg w-full h-[80%] object-cover"
            width={500}
            height={100}
          />
        </motion.div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {/* Title and Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white ">
              {missionSection?.missionTitle?.title}{" "}
              <span className="text-[#137a70] font-bold">
                {" "}
                {missionSection?.missionTitle?.secondTitle}
              </span>
            </h2>
            <p className="text-gray-600 mt-4 dark:text-white ">
              {missionSection?.missionDescription}
            </p>
          </div>

          {/* Flexbox for Mission, Vision, Core Values */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {missionSection?.missionCard?.map((item, index) => {
              return (
                <div
                  className="bg-white dark:bg-gray-800 dark:border dark:border-white  shadow-lg rounded-lg p-6 text-center hover:scale-110 transition-all duration-300"
                  key={index}
                >
                  <div className="w-[40px] mx-auto">
                    <img
                      src={`${item?.image?.url}`}
                      alt={item?.image?.alternativeText}
                      className="mx-auto mb-4 "
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2  dark:text-white ">
                    {item?.title}{" "}
                    <span className="text-[#137a70] font-bold]">
                      {item?.button}
                    </span>
                  </h3>
                  <p className="text-gray-600  dark:text-white ">
                    {item?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16  dark:bg-gray-900  ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1 - Image */}
          <div className="flex items-center justify-center">
            <img
              src={`${whyUsSection?.whyUsImage?.url}`}
              alt={whyUsSection?.whyUsImage?.alternativeText}
              width={600}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Column 2 - Cards */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white  text-center lg:text-center">
              {whyUsSection?.whyUsTitle?.title}{" "}
              <span className="text-[#137a70] font-bold]">
                {" "}
                {whyUsSection?.whyUsTitle?.secondTitle}
              </span>
            </h2>
            <p className="text-center mb-12 mt-4">
              {whyUsSection?.whyUsDescription}
            </p>
            <div className="flex flex-col items-center gap-4">
              {/* Card 1 */}
              {whyUsSection?.whyUsCard?.map((item, index) => {
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start justify-around gap-2">
                    <img
                      src={`${item?.image?.url}`}
                      height={40}
                      width={40}
                      alt={item?.image?.alternativeText}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {item?.title}{" "}
                        <span className="text-[#137a70] font-bold]">
                          {item?.button}
                        </span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 dark:bg-gray-900 bg-[url('https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732695348/background_2_673f9666d7.jpg ')]  bg-cover bg-center ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12">
          {gallerySection?.galleryTitle?.title ?? 'Default Title'}{" "}
          <span className="text-[#137a70] font-bold">
            {gallerySection?.galleryTitle?.secondTitle ?? 'Default Second Title'}
          </span>
        </h2>
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
              1024: { slidesPerView: 3, spaceBetween: 50 },
            }}
            className="w-[100%] mx-auto"
          >
            {(galleryImagess ?? []).map((image,index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => openLightbox(image?.url ?? '')}
                >
                  <img
                    src={`${image?.url ?? ''}`}
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
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <img
        src={`${gallerySection?.closeButton?.url ?? ''}`}
        alt={gallerySection?.closeButton?.alternativeText ?? 'Close Button'}
        onClick={closeLightbox}
        width={40}
        height={40}
        className="absolute top-6 right-6 hover:cursor-pointer bg-white py-3 px-3 rounded-full"
      />
      {/* Prev Button */}
      <img
        src={`${prevImage ?? ''}`}
        onClick={goToPrevImage}
        width={40}
        height={40}
        alt="previous button"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
      />

      <img
        src={`${nextImage ?? ''}`}
        alt="next button"
        onClick={goToNextImage}
        height={40}
        width={40}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
      />
    </div>
  )}
</section>

<section className="py-12 text-center">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
      {partnerSection?.partnerTitle?.title || ""}{" "}
      <span className="text-[#137a70] font-bold ">
        {partnerSection?.partnerTitle?.secondTitle || ""}
      </span>
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
      {partnerSection?.partnerDescription || ""}
    </p>
  </div>

  <Swiper
    slidesPerView={5} // Show 5 images at a time
    spaceBetween={30} // Space between slides
    autoplay={{ delay: 3000 }}
    loop={true}
    breakpoints={{
      320: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    }}
    modules={[Autoplay]}
    className="mySwiper w-[80%] mx-auto"
  >
    {partnerSection?.partnerImage?.map((partner,index) => (
      <SwiperSlide key={index}>
        <div>
          {partner?.image?.data?.[0]?.url ? (
            <img
              src={`${partner.image.data[0].url}`}
              alt={partner.image.data[0].alternativeText || "Partner image"}
              className="mx-auto h-20 object-contain dark:border dark:border-white"
            />
          ) : (
            ""
          )}
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

<section className="pb-10 bg-gradient-to-r dark:bg-[#1f2937]">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-4xl font-bold text-center">Our <span className="text-[#137a70] text-bold"> Team</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white text-center my-5">
              {teamSection?.ServiceCard[0]?.href|| ""}
            </p>
            <div className="flex justify-center items-center ">
  <Card className="shadow-lg w-96 bg-white rounded-lg transition-all dark:bg-[#111827]">
    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
      <img
        src={`${teamSection?.ServiceCard[0]?.image?.url}`}
        alt={`${teamSection?.ServiceCard[0]?.image?.alternativeText} image`}
        objectFit="cover"
        className="rounded-y-lg w-full h-full object-cover"
      />
    </div>
    <CardContent className="px-3 pt-2 pb-5">
      <h3 className="text-2xl font-semibold">
        {teamSection?.ServiceCard[0]?.button}
      </h3>
      <h4 className="text-[15px]">{teamSection?.ServiceCard[0]?.title}</h4>
      <p className="text-lg mt-1">{teamSection?.ServiceCard[0]?.description}</p>
    </CardContent>
  </Card>
</div>

          </div>
        </section>

      {/* FAQ Section */}
      <section className=" bg-[url('/bg2.jpg')] dark:bg-none bg-cover bg-center py-5 w-full">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
      {faqSection?.FAQTitle?.title}{" "}
      <span className="text-[#137a70] font-bold">
        {faqSection?.FAQTitle?.secondTitle}
      </span>
    </h2>
    <Accordion
      type="single"
      collapsible
      className="w-[90%] lg:w-[65%] mx-auto"
    >
      {faqSection?.QA?.map((item, index) => {
        return (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger>{item?.title}</AccordionTrigger>
            <AccordionContent>{item?.secondTitle}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  </div>
</section>

      <Footer />
    </>
  );
}

export default About;
