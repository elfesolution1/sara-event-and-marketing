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

import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { getStrapiData } from "@/libs/api";
import { useState, useEffect } from "react";

import { delay, motion } from "framer-motion";
import Link from "next/link";
export default function Home() {
  const baseImageUrl = "http://localhost:1337";
  // const [counterOn, setCounterOn] = useState(false);
  // const [homePageData, setHomePageData] = useState(null);

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

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      title: "Satisfied Customer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      image: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Happy Client",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      image: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray", // Replace with actual image URLs
    },
    {
      id: 3,
      name: "John Doe",
      title: "Satisfied Customer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      image: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray", // Replace with actual image URLs
    },
    // Add more testimonials as needed
  ];
  const partners = [
    {
      id: 1,
      src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
      alt: "Partner 1",
    },
    {
      id: 2,
      src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
      alt: "Partner 2",
    },
    {
      id: 3,
      src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
      alt: "Partner 3",
    },
    {
      id: 4,
      src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
      alt: "Partner 4",
    },
    {
      id: 5,
      src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
      alt: "Partner 4",
    },
    {
      id: 6,
      src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
      alt: "Partner 4",
    },
  ];

  const portfolioItems = {
    all: [
      {
        id: 1,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Wedding Event 1",
      },
      {
        id: 2,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Birthday Event 1",
      },
      {
        id: 3,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Wedding Event 2",
      },
      {
        id: 4,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Birthday Event 2",
      },
    ],
    wedding: [
      {
        id: 1,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Wedding Event 1",
      },
      {
        id: 3,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Wedding Event 2",
      },
    ],
    birthday: [
      {
        id: 2,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Birthday Event 1",
      },
      {
        id: 4,
        src: "https://via.assets.so/img.jpg?w=300&h=150&tc=white&bg=gray",
        alt: "Birthday Event 2",
      },
    ],
  };
  const [counterOn, setCounterOn] = useState(false);
  const [homePageData, setHomePageData] = useState(null);

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
          
              }
            }
          }
        }
      }
      `;
      const articles = await getStrapiData(query);
      setHomePageData(articles.homepage);
    };

    fetchData();
  }, []);

  if (!homePageData) return <div>Loading...</div>;

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
  console.log("ge ", acheivementSection);

  return (
    <>
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
          {heroData.heroImage.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={`${baseImageUrl}${item.image.data[0].url}`}
                  alt={item.image.data[0].alternativeText}
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
              className="text-4xl font-bold text-gray-800 leading-tight dark:text-[#1F995E]"
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
              {aboutSection.description}
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
              {aboutSection.aboutButton.title}
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
            <Image
              src={`${baseImageUrl}${aboutSection.aboutImage.url}`}
              alt={aboutSection.aboutImage.alternativeText}
              className="rounded-lg shadow-lg w-full h-[80%] object-cover"
              width={500}
              height={100}
            />
          </motion.div>
        </section>
        <section className="pb-12 pt-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
              {/* {serviceSection.title} */}
              Our <span className="text-[#1e995e] font-bold">Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {serviceSection.description}
            </p>
          </div>

          <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {serviceSection.serviceCard.map((item, index) => {
              return (
                <motion.Card
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants[index % 3]}
                  className="shadow-md"
                  key={index}
                >
                  <CardHeader className="p-0">
                    <Image
                      src={`${baseImageUrl}${item.image.url}`}
                      alt={item.image.alternativeText}
                      width={400}
                      height={250}
                      className="w-full h-52 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl font-semibold text-gray-800 mb-2 dark:text-[#1F995E]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-4 dark:text-white">
                      {item.description}
                    </CardDescription>
                    <Button className="bg-[#1e995e] text-white dark:hover:bg-white dark:hover:text-[#1e995e] dark:hover:border dark:hover:border-[#1e995e] py-2 px-4 rounded hover:scale-110 hover:shadow-lg transition-all duration-300">
                      {item.button}
                    </Button>
                  </CardContent>
                </motion.Card>
              );
            })}
          </div>
        </section>
        <section className="pb-12 pt-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
              {/* {acheivementSection.title} */}
              Our <span className="text-[#1e995e] font-bold">acheivement</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {acheivementSection.description}
            </p>
          </div>
          <ScrollTrigger
            onEnter={() => setCounterOn(true)}
            onExit={() => setCounterOn(false)}
          >
            <div className="bg-[#1F995E] w-[80%] mx-auto  rounded-2xl ">
              <div className="grid grid-cols-1 md:grid-cols-3  gap-8 w-[80%] mx-auto">
                {/* Years of Experience */}
                {acheivementSection.acheivementCard.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`bg-transparent pb-8 ${
                        index === 0 || index === 1
                          ? " border-r  border-r-white"
                          : ""
                      } text-white flex flex-row lg:flex-col lg:items-center items-start h-[80%] my-auto    dark:border-b-white `}
                    >
                      <h2 className="text-2xl font-semibold ">{item.title}</h2>
                      {counterOn && (
                        <CountUp
                          start={0}
                          end={item.button}
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
        <section className="py-12  text-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
              Our <span className="text-[#1e995e] font-bold">Portfolio</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </div>
          <div className="w-[80%] mx-auto">
            <Tabs defaultValue="all">
              {/* Tab Navigation */}
              <TabsList className="flex justify-center space-x-4 bg-stone-50">
                {["all", "wedding", "birthday"].map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content for All Portfolio */}
              <TabsContent value="all" className="mt-8 text-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {portfolioItems.all.map((item) => (
                    <div key={item.id} className="relative group">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={300}
                        height={300}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab Content for Wedding Portfolio */}
              <TabsContent value="wedding" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {portfolioItems.wedding.map((item) => (
                    <div key={item.id} className="relative group">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab Content for Birthday Portfolio */}
              <TabsContent value="birthday" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {portfolioItems.birthday.map((item) => (
                    <div key={item.id} className="relative group">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="py-12  text-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
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
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={logoVariants}
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="mx-auto h-20 object-contain"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="py-12 ">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
              What <span className="font-bold text-[#1e995e]">Our Client</span>{" "}
              says
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </div>
          <div className="w-[80%]  flex lg:flex-row flex-col items-center justify-between  mx-auto px-4  gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.Card
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants[index % 3]}
                key={index}
                className="flex flex-col md:flex-row items-center shadow-md"
              >
                <CardHeader className=" p-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-auto shadow-lg "
                  />
                </CardHeader>
                <CardContent className=" p-4">
                  <CardDescription className="text-gray-600 dark:text-white">
                    {testimonial.text}
                  </CardDescription>
                  <CardTitle className="text-xl font-semibold mb-2 dark:text-[#1F995E]">
                    {testimonial.name}
                  </CardTitle>
                </CardContent>
              </motion.Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
