"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { CustomCard } from "@/components/CustomCard";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { getStrapiData } from "@/libs/api";
import { useState, useEffect } from "react";

import { delay, motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  const getImageSize = () => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      return screenWidth >= 1024
        ? { width: "200px", height: "200px" }
        : screenWidth >= 640
        ? { width: "150px", height: "150px" }
        : { width: "120px", height: "120px" };
    }
    return { width: "120px", height: "120px" };
  };

  const [imageSize, setImageSize] = useState(getImageSize());

  useEffect(() => {
    // Handle window resize
    const handleResize = () => setImageSize(getImageSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch galleries
    const fetchGalleries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio-images?populate=*`
        );
        const data = await response.json();

        setGalleries(data.data);
        setFilteredGalleries(data.data);
        setIsLoading(false); // Updated to set loading to false after data fetch

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.data.map((gallery) => gallery.attributes.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      }
    };

    fetchGalleries();
  }, []);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredGalleries(galleries);
    } else {
      const filtered = galleries.filter((gallery) =>
        gallery.attributes.category
          ?.toLowerCase()
          .includes(activeTab.toLowerCase())
      );
      setFilteredGalleries(filtered);
    }
  }, [activeTab, galleries]);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const showNextImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 >= filteredGalleries.length ? 0 : prevIndex + 1
    );
  const showPrevImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex - 1 < 0 ? filteredGalleries.length - 1 : prevIndex - 1
    );

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const imageSlideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
    exit: { opacity: 0, x: 100 },
  };
  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const descriptionSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  };
  const buttonSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
  };

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

  const logoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.5,
        duration: 0.7,
      },
    }),
  };

  const [counterOn, setCounterOn] = useState(false);
  const [homePageData, setHomePageData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
                ... on ComponentLayoutHero {
                  heroImage {
                    image {
                      data {
                        attributes {
                          url,
                          alternativeText
                        }
                      }
                    }
                    description,
                    button,
                    title,
                    url
                  }
                }
                ... on ComponentLayoutAboutSection {
                  title,
                  description, 
                  aboutButton {
                    title,
                    url
                  }
                  aboutImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                   ... on ComponentLayoutServiceSection{
          title,
          description,
          serviceCard{
            description,
            button,
            href,
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
        }
          ... on ComponentLayoutOurAcheivement{
          title,
          description,
          acheivementCard{
            title,
            button
          }
        }
            ... on ComponentLayoutPartners{
                  partnerDescription,
                  partnerTitle{
                    title,secondTitle
                  }
                  partnerImage{
                    url,
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
                  ... on ComponentLayoutTestimonial{
                  testimonailTitle{
                    title,
                    secondTitle
                  }
                  testimoanilDescription,
                  testimonialCard{
                    description,
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
                }
              }
            }
          }
        }
      }
      `;
      const articles = await getStrapiData(query);
      console.log('data is ',articles)
      setHomePageData(articles.homepage);
      setIsLoading(true);
    };

    fetchData();
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://sara-events-and-marketing-4fe9cca6bffd.herokuapp.com/uploads/Spin_1x_1_5s_200px_200px_1_db9e13b8d9.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }
  // if (!homePageData) return <div>Loading...</div>;

  const { blocks } = homePageData;
  const heroData = blocks.find(
    (block) => block.__typename === "ComponentLayoutHero"
  );
  const aboutSection = blocks.find(
    (block) => block.__typename === "ComponentLayoutAboutSection"
  );
  const serviceSection = blocks.find(
    (block) => block.__typename === "ComponentLayoutServiceSection"
  );
  const acheivementSection = blocks.find(
    (block) => block.__typename === "ComponentLayoutOurAcheivement"
  );
  const partnerSection = blocks.find(
    (block) => block.__typename === "ComponentLayoutPartners"
  );
  const testimonaiSection = blocks.find(
    (block) => block.__typename === "ComponentLayoutTestimonial"
  );

  return (
    <>
      <head>
        <title>Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>
      {/* <Header /> */}
      {/* Hero Section with Swiper */}
      <div className="hero-section relative w-full h-[80vh] mb-0">
        {" "}
        {/* Removed bottom margin */}
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          speed={800}
          slidesPerView={1}
          grabCursor={true}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="h-[100%]"
        >
          {heroData?.heroImage?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={`${baseImageUrl}${item?.image?.data[0]?.url}`}
                  alt={item?.image?.data[0]?.alternativeText}
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
                  <div className="text-white text-left max-w-lg ml-12">
                    <motion.h1
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={titleSlide}
                      className="text-5xl font-bold mb-4 leading-tight shadow-lg"
                    >
                      {item.title}
                    </motion.h1>
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={descriptionSlide}
                      className="text-xl mb-6 leading-relaxed shadow-lg"
                    >
                      {item.description}
                    </motion.p>
                    <motion.a
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={buttonSlide}
                      href={item.url}
                      className="bg-[#1e995e] text-white hover:bg-white hover:text-[#1e995e] hover:border hover:border-[#1e995e] py-3 px-6 rounded hover:shadow-2xl hover:scale-110 transition-all duration-300 shadow-md"
                    >
                      {item.button}
                    </motion.a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Section */}
      <main className="mt-0">
        {" "}
        {/* Removed margin-top */}
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
              {/* {aboutSection.title} */}
              About <span className="font-bold text-[#1e995e]">Us</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={descriptionSlide}
              className="text-lg text-gray-600 leading-relaxed dark:text-white mb-10  "
            >
              {aboutSection?.description}
            </motion.p>
            <br />
            <br />
            <motion.a
              href="/about"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={buttonSlide}
              className="bg-[#1e995e] mt-5 hover:bg-white hover:text-[#1e995e] hover:border hover:border-[#1e995e]  text-white py-3 px-6 rounded hover:shadow-2xl hover:scale-110 transition-all duration-300 shadow-md"
            >
              {aboutSection?.aboutButton.title}
            </motion.a>
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
              src={`${baseImageUrl}${aboutSection?.aboutImage?.url}`}
              alt={aboutSection?.aboutImage?.alternativeText}
              className="rounded-lg shadow-lg w-full h-[80%] object-cover"
              width={500}
              height={100}
            />
          </motion.div>
        </section>
        <section className="pb-12 pt-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
              {/* {serviceSection.title} */}
              Our <span className="text-[#1e995e] font-bold">Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {serviceSection?.description}
            </p>
          </div>

          <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {serviceSection?.serviceCard?.map((item, index) => {
              return (
                <motion.Card
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants[index % 3]}
                  className="shadow-md hover:shadow-[rgba(0,0,0,0.6)] hover:shadow-md  dark:border dark:border-white dark:hover:shadow-[rgba(255,255,255,0.2)] dark:hover:shadow-lg"
                  key={index}
                >
                  <CardHeader className="p-0">
                    <img
                      src={`${baseImageUrl}${item?.image?.url}`}
                      alt={item?.image?.alternativeText}
                      width={400}
                      height={250}
                      className="w-full h-52 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold text-gray-800 mb-2 dark:text-[#1F995E]">
                      {item?.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-4 dark:text-white">
                      {item?.description}
                    </CardDescription>
                    <a
                      href={item?.href}
                      className="bg-[#1e995e] text-white dark:hover:bg-white dark:hover:text-[#1e995e] dark:hover:border dark:hover:border-[#1e995e] py-2 px-4 rounded hover:scale-110 hover:shadow-lg transition-all duration-300"
                    >
                      {item?.button}
                    </a>
                  </CardContent>
                </motion.Card>
              );
            })}
          </div>
        </section>
        <section className="pb-12 pt-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
              {/* {acheivementSection.title} */}
              Our <span className="text-[#1e995e] font-bold">acheivement</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {acheivementSection?.description}
            </p>
          </div>
          <ScrollTrigger
            onEnter={() => setCounterOn(true)}
            onExit={() => setCounterOn(false)}
          >
            <div className="bg-[#1F995E] w-[80%] mx-auto  rounded-2xl ">
              <div className="grid grid-cols-1 md:grid-cols-3  gap-8 w-[80%] mx-auto">
                {/* Years of Experience */}
                {acheivementSection?.acheivementCard?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`bg-transparent pb-8 ${
                        index === 0 || index === 1
                          ? " border-r  border-r-white"
                          : ""
                      } text-white flex flex-row lg:flex-col lg:items-center items-start h-[80%] my-auto    dark:border-b-white `}
                    >
                      <h2 className="text-2xl font-semibold ">{item?.title}</h2>
                      {counterOn && (
                        <CountUp
                          start={0}
                          end={item?.button}
                          duration={3}
                          className="text-6xl font-bold "
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollTrigger>
        </section>
        <section className="py-12 text-center mb-10 bg-[url('/bg2.jpg')] dark:bg-none bg-cover bg-center min-h-screen w-full ">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
              Our <span className="text-[#1e995e] font-bold">Portfolio</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white dark:font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </div>
          <div className=" dark:bg-none min-h-screen flex flex-col items-center py-10">
            <h1 className="text-5xl font-medium mb-8">Property Gallery</h1>

            {/* Responsive tabs */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 rounded-xl text-sm sm:text-base md:text-[16px] font-medium transition-all ${
                    activeTab === tab
                      ? "bg-[#1e995e] text-white shadow-lg"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Gallery Images */}
            <div className="w-11/12 flex flex-wrap justify-center gap-6">
              {filteredGalleries.map((gallery, index) => {
                const image = gallery.attributes.image;
                const imageUrl = image
                  ? `${process.env.NEXT_PUBLIC_API_URL}${
                      image.data.attributes.formats.small.url || image.url
                    }`
                  : null;

                return (
                  <div
                    key={gallery.id}
                    className="relative p-2 transition-all cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={image.alternativeText || gallery.attributes.Title}
                        className={`w-[${imageSize.width}] h-[${imageSize.height}] object-cover rounded-lg shadow-lg transition-transform duration-300`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Lightbox */}
            {selectedImageIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <button
                  className="absolute top-6 right-6 hover:cursor-pointer bg-white text-black font-bold text-3xl px-3 rounded-full"
                  onClick={closeLightbox}
                >
                  &times;
                </button>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
                  onClick={showPrevImage}
                >
                  &#10094;
                </button>
                <button
                  onClick={showNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
                >
                  &#10095;
                </button>
                <div className="relative  w-[85%] h-[85%] mx-auto">
                  <div className="relative w-full h-full">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${
                        filteredGalleries[selectedImageIndex].attributes.image
                          .data.attributes.formats.large.url ||
                        filteredGalleries[selectedImageIndex].attributes.image
                          .data.attributes.url
                      }`}
                      alt="Selected"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="py-12  text-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
              {partnerSection?.partnerTitle?.title}{" "}
              <span className="text-[#1e995e] font-bold ">
                {partnerSection?.partnerTitle?.secondTitle}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {partnerSection?.partnerDescription}
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
            {partnerSection?.partnerImage?.map((partner, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={logoVariants}
                >
                  {partner?.image?.data?.[0]?.url ? (
                    <img
                      src={`${baseImageUrl}${partner?.image?.data[0]?.url}`}
                      alt={partner?.image?.data[0]?.alternativeText}
                      className="mx-auto h-20 object-contain hover:cursor-pointer dark:border dark:border-white "
                    />
                  ) : (
                    ""
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="py-12 ">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
              {testimonaiSection?.testimonailTitle?.title}{" "}
              <span className="text-[#1e995e] font-bold ">
                {testimonaiSection?.testimonailTitle?.secondTitle}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {testimonaiSection?.testimonialDescription}
            </p>
          </div>

          <div className="w-[90%]  flex lg:flex-row flex-col items-center justify-between  mx-auto px-4  gap-4">
            {testimonaiSection?.testimonialCard?.map((testimonial, index) => (
              <motion.Card
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants[index % 3]}
                key={index}
                className="lg:flex lg:flex-row flex flex-row md:flex  md:flex-row  items-start shadow-md dark:border dark:border-white dark:rounded-xl pt-4"
              >
                <CardHeader className=" w-[30%]">
                  <img
                    src={`${baseImageUrl}${testimonial?.image?.url}`}
                    alt={testimonial?.image?.alternativeText}
                    className="w-full h-auto shadow-lg bg-transparent"
                  />
                </CardHeader>
                <CardContent className="w-[70%]">
                  <CardDescription className="text-gray-600 dark:text-white">
                    {testimonial?.description}
                  </CardDescription>
                  <CardTitle className="text-xl font-semibold dark:text-[#1F995E]">
                    {testimonial?.title}
                  </CardTitle>
                </CardContent>
              </motion.Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
