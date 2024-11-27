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

import { Calendar, MapPin } from "lucide-react";
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

        if (data?.data) {
          setGalleries(data.data);
          setFilteredGalleries(data.data);
        } else {
          console.error("No gallery data received");
        }
        
        setIsLoading(false); // Updated to set loading to false after data fetch

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(
            (data?.data || []).map((gallery) => gallery.attributes?.category || "")
          ),
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
  const [homePageData, setHomePageData] = useState({});

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
      console.log('data is ',articles?.homepage)
      setHomePageData(articles?.homepage);
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
  // if (!homePageData) return <div>Loading...</div>;

  const { blocks } = homePageData;
  console.log('blocks ',blocks)
  const heroData = blocks?.find(
    (block) => block.__typename === "ComponentLayoutHero"
  );
  const aboutSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutAboutSection"
  );
  const serviceSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutServiceSection"
  );
  const acheivementSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutOurAcheivement"
  );
  const partnerSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutPartners"
  );
  const testimonaiSection = blocks?.find(
    (block) => block.__typename === "ComponentLayoutTestimonial"
  );

  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-12-15", // Use ISO format for easier comparison
      location: "Addis Ababa, Ethiopia",
      description: "Join us for a day of insightful talks and networking.",
    },
    {
      id: 2,
      title: "Annual Business Expo",
      date: "2023-04-20",
      location: "Nairobi, Kenya",
      description: "Explore innovative business solutions and meet leaders.",
    },
  ];
  const isUpcoming = (eventDate) => {
    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj >= currentDate;
  };
  
  
  const upcomingEvents = events.filter((event) => isUpcoming(event.date));


  return (
    <>
      <head>
        <title>Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>
      <Header />
      {/* Hero Section with Swiper */}
      <div className="hero-section relative w-full h-[80vh] mb-0">
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
    {heroData?.heroImage?.length > 0 && heroData.heroImage.map((item, index) => {
      const { image = {}, title, description, url, button } = item || {};
      const { data = [] } = image;
      const imageUrl = data[0]?.url || '';
      const altText = data[0]?.alternativeText || '';

      return (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img
              src={`${imageUrl}`}
              alt={altText}
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
                  {title}
                </motion.h1>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={descriptionSlide}
                  className="text-xl mb-6 leading-relaxed shadow-lg"
                >
                  {description}
                </motion.p>
                <motion.a
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={buttonSlide}
                  href={url}
                  className="bg-[#137a70] text-white hover:bg-white hover:text-[#137a70] hover:border hover:border-[#137a70] py-3 px-6 rounded hover:shadow-2xl hover:scale-110 transition-all duration-300 shadow-md"
                >
                  {button}
                </motion.a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    })}
  </Swiper>
</div>
<section className="pb-16 pt-10 bg-[url('/bg2.jpg')]">
  <div className="max-w-7xl mx-auto px-6 sm:px-8">
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="text-4xl font-bold text-gray-800 text-center mb-5 leading-tight dark:text-white"
    >
      Upcoming <span className="font-bold text-[#137a70]">Events</span>
    </motion.h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-[90%] mx-auto">
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 w-5 h-5" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mb-4">
              <MapPin className="mr-2 w-5 h-5" />
              <span>{event.location}</span>
            </div>
            <p className="mb-6">{event.description}</p>
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-white/20"></div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No upcoming events.
        </p>
      )}
    </div>
  </div>
</section>;

      {/* Main Section */}
      <main className="mt-0">
  {" "}
  {/* Removed margin-top */}
  <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-12">
    <div className="space-y-5">
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={titleSlide}
        className="text-4xl font-bold text-gray-800 leading-tight dark:text-white"
      >
        About <span className="font-bold text-[#137a70]">Us</span>
      </motion.h1>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={descriptionSlide}
        className="text-lg text-gray-600 leading-relaxed dark:text-white mb-10"
      >
        {aboutSection?.description || "Default description if not available"}
      </motion.p>
      <br />
      <br />
      <motion.a
        href="/about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={buttonSlide}
        className="bg-[#137a70] mt-5 hover:bg-white hover:text-[#137a70] hover:border hover:border-[#137a70] text-white py-3 px-6 rounded hover:shadow-2xl hover:scale-110 transition-all duration-300 shadow-md"
      >
        {aboutSection?.aboutButton?.title || "Learn More"}
      </motion.a>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={imageSlideRight}
      className="w-full h-full"
    >
      <img
        src={`${aboutSection?.aboutImage?.url || '/default-image.jpg'}`}
        alt={aboutSection?.aboutImage?.alternativeText || 'Default alt text'}
        className="rounded-lg shadow-lg w-full h-[80%] object-cover"
        width={500}
        height={100}
      />
    </motion.div>
  </section>

  {/* Service Section */}
  <section className="pb-12 pt-4">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
        Our <span className="text-[#137a70] font-bold">Service</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
        {serviceSection?.description || "Default service description"}
      </p>
    </div>

    <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {serviceSection?.serviceCard?.map((item, index) => (
        <motion.Card
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants[index % 3]}
          className="shadow-md hover:shadow-[rgba(0,0,0,0.6)] hover:shadow-md dark:border dark:border-white dark:hover:shadow-[rgba(255,255,255,0.2)] dark:hover:shadow-lg"
          key={index}
        >
          <CardHeader className="p-0">
            <img
              src={`${item?.image?.url || '/default-image.jpg'}`}
              alt={item?.image?.alternativeText || 'Default image'}
              width={400}
              height={250}
              className="w-full h-52 object-cover"
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-xl font-semibold text-gray-800 mb-2 dark:text-[#1F995E]">
              {item?.title || "Default Title"}
            </CardTitle>
            <CardDescription className="text-gray-600 mb-4 dark:text-white">
              {item?.description || "Default Description"}
            </CardDescription>
            <a
              href={item?.href || "#"}
              className="bg-[#137a70] text-white dark:hover:bg-white dark:hover:text-[#137a70] dark:hover:border dark:hover:border-[#137a70] py-2 px-4 rounded hover:scale-110 hover:shadow-lg transition-all duration-300"
            >
              {item?.button || "Default Button"}
            </a>
          </CardContent>
        </motion.Card>
      ))}
    </div>
  </section>

  {/* Achievement Section */}
  <section className="pb-12 pt-4">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
        Our <span className="text-[#137a70] font-bold">Achievement</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
        {acheivementSection?.description || "Default achievement description"}
      </p>
    </div>
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div className="bg-[#1F995E] w-[80%] mx-auto rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[80%] mx-auto">
          {acheivementSection?.acheivementCard?.map((item, index) => (
            <div
              key={index}
              className={`bg-transparent pb-8 ${index === 0 || index === 1 ? "border-r border-r-white" : ""} text-white flex flex-row lg:flex-col lg:items-center items-start h-[80%] my-auto dark:border-b-white`}
            >
              <h2 className="text-2xl font-semibold">{item?.title || "Default Title"}</h2>
              {counterOn && (
                <CountUp
                  start={0}
                  end={item?.button || 0}
                  duration={3}
                  className="text-6xl font-bold"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollTrigger>
  </section>

  {/* Portfolio Section */}
  <section className="py-12 text-center mb-10 bg-[url('/bg2.jpg')] dark:bg-none bg-cover bg-center min-h-screen w-full">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
        Our <span className="text-[#137a70] font-bold">Portfolio</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white dark:font-normal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      </p>
    </div>
    <div className="dark:bg-none min-h-screen flex flex-col items-center py-10">

      {/* Responsive tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {categories?.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-xl text-sm sm:text-base md:text-[16px] font-medium transition-all ${
              activeTab === tab
                ? "bg-[#137a70] text-white shadow-lg"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Gallery Images */}
      <div className="w-11/12 flex flex-wrap justify-center gap-6">
        {filteredGalleries?.map((gallery, index) => {
          const image = gallery?.attributes?.image;
          const imageUrl = image
            ? `${image?.data?.attributes?.formats?.small?.url || image?.url}`
            : null;

          return (
            <div
              key={gallery?.id}
              className="relative p-2 transition-all cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={image?.alternativeText || gallery?.attributes?.Title || 'Default image'}
                  className="w-[300px] h-[200px] object-cover rounded-lg shadow-lg transition-transform duration-300"
                />
              )}
            </div>
          );
        })}
      </div>

{selectedImageIndex !== null && filteredGalleries[selectedImageIndex] && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <button onClick={closeLightbox} className="absolute top-4 right-4 text-white text-xl">
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
    <img
      src={filteredGalleries[selectedImageIndex]?.attributes?.image?.data?.attributes?.url}
      alt={filteredGalleries[selectedImageIndex]?.attributes?.Title || "Image"}
      className="max-w-full max-h-full object-contain"
    />
  </div>
)}

    </div>
  </section>
</main>

      <Footer />
    </>
  );
}
