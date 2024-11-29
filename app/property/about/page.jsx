"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import Head from "next/head";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const FIND_About_Data = gql`
  query GetAboutData {
    propertyAboutUs {
      data {
        attributes {
          blocks {
            __typename
            ... on ComponentLayoutPropertyAboutUs {
              Title {
                title
                secondTitle
              }
              description
              aboutCard {
                title
                secondTitle
              }
            }
            ... on ComponentComponentsLink {
              title
              eventTitle
              url
            }

            ... on ComponentLayoutServiceCard {
              ServiceCard {
                title
                description
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
            ... on ComponentLayoutTestimonial {
              testimonailTitle {
                title
                secondTitle
              }
              testimonialCard {
                title
                description
                button
              }
            }
            ... on ComponentLayoutPartners {
              partnerDescription
              partnerTitle {
                title
                secondTitle
              }
              partnerImage {
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
            ... on ComponentLayoutOurAcheivement {
              title
              description
              acheivementCard {
                description
                title
                button
              }
            }
          }
        }
      }
    }
  }
`;

function PropertyAbout() {
  const [aboutUsSections, setAboutUsSections] = useState([]);
  const [partnerSections, setPartnerSections] = useState([]);
  const [mileStoneSections, setMileStoneSections] = useState([]);
  const [missionSection, setMissionSection] = useState([]);
  const [teamSection, setTeamSection] = useState([]);
  const [testimonialSection, setTestimonialSection] = useState([]);
  const [counterOn, setCounterOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: aboutData,
    loading: homeLoading,
    error: homeError,
  } = useQuery(FIND_About_Data);

  useEffect(() => {
    setIsLoading(true);
    if (aboutData) {
      const filteredAboutSections =
        aboutData?.propertyAboutUs?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutPropertyAboutUs"
        );
      setAboutUsSections(filteredAboutSections);
      // console.log("about ", filteredAboutSections[0]);
    }

    if (aboutData) {
      const filteredMissionSections =
        aboutData?.propertyAboutUs?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentComponentsLink"
        );
      setMissionSection(filteredMissionSections);
      // console.log("mission ", filteredMissionSections[0]);
    }

    if (aboutData) {
      const filteredTeamSections =
        aboutData?.propertyAboutUs?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutServiceCard"
        );
      setTeamSection(filteredTeamSections);
      // console.log("team ", filteredTeamSections[0]);
    }

    if (aboutData) {
      const filteredTestimonialSections =
        aboutData?.propertyAboutUs?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutTestimonial"
        );
      setTestimonialSection(filteredTestimonialSections);
      console.log("testimonial", filteredTestimonialSections[0]);
    }

    if (aboutData) {
      const filteredMileStoneSections =
        aboutData?.propertyAboutUs?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutOurAcheivement"
        );
      setMileStoneSections(filteredMileStoneSections);
      console.log("milestone", filteredMileStoneSections[0].acheivementCard);
    }
    if (aboutData) {
      const filteredPartnerSections =
        aboutData?.propertyAboutUs?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutPartners"
        );
      setPartnerSections(filteredPartnerSections);
      console.log("partner", filteredPartnerSections[0].partnerImage);
    }
  }, [aboutData]);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648286/Spin_1x_1_5s_200px_200px_1_04797cef0e.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }

  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;
  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

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
        <title>About | SAM Property Listing and Management</title>
        <meta
          name="description"
          content="SAM Property Listing and Management is the best Property listing in UAE and Ethiopia."
        />
      </head>

      <div className="bg-gray-100">
        {/* Hero Section */}
        <PropertyHeader />
        <section className="hero-section relative w-full h-[70vh]">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732695347/background_ac0513044d.jpg"
              alt="alt"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
              <div className="w-[60%] mx-auto">
                <h1 className="text-center text-white font-medium text-4xl">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="pb-20 pt-10 bg-white dark:bg-[#1f2937]">
  <div className="container mx-auto px-6 md:px-12 lg:px-16">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={titleSlide}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold tracking-tight dark:text-white">
        {aboutUsSections?.[0]?.Title?.title}{" "}
        <span className="text-[#969963] underline">
          {aboutUsSections?.[0]?.Title?.secondTitle}
        </span>
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-white max-w-3xl mx-auto">
        {aboutUsSections?.[0]?.description}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {aboutUsSections?.[0]?.aboutCard?.map((card, index) => (
        <motion.Card
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants[index % 3]}
          key={index}
          className="bg-gray-100 dark:bg-transparent dark:border dark:border-gray-100 shadow-lg hover:shadow-2xl transition-all"
        >
          <CardHeader>
            <CardTitle className="text-2xl">{card?.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-lg">
            {card?.secondTitle}
          </CardContent>
        </motion.Card>
      ))}
    </div>
  </div>
</section>


        {/* Our Mission Section */}
        <section className="py-20 bg-[#9e8f72] text-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
            <h2 className="text-4xl font-bold">{missionSection[0]?.title}</h2>
            <p className="mt-6 text-lg max-w-2xl mx-auto">
              {missionSection[0]?.eventTitle}
            </p>
            <br />
            <Link
              href="/property/findproperty"
              className="mt-8 px-8 py-2 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-200"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="h-10 bg-white dark:bg-[#1f2937]"></section>
        <section className="py-12  text-center dark:bg-[#1f2937]">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
              {partnerSections[0]?.partnerTitle?.title}{" "}
              <span className="text-[#969963] underline font-bold">
                {partnerSections[0]?.partnerTitle?.secondTitle}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
              {partnerSections[0]?.partnerDescription}
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
            {partnerSections[0]?.partnerImage?.map((partner, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={logoVariants}
                >
                  {partner?.image?.data?.[0]?.attributes?.url ? (
                    <img
                      src={`${partner?.image?.data[0]?.attributes?.url}`}
                      alt={partner?.image?.data[0]?.attributes?.alternativeText}
                      className="mx-auto h-20 object-contain dark:border dark:border-white"
                    />
                  ) : (
                    ""
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Milestones Section */}
        <section className="py-20 bg-white dark:bg-[#111827]">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-1">
              {mileStoneSections[0]?.title}
            </h2>
            <p className="text-[16px] mb-8  text-center">
              {mileStoneSections[0]?.description}
            </p>
            <ScrollTrigger
              onEnter={() => setCounterOn(true)}
              onExit={() => setCounterOn(false)}
            >
              <div className="flex flex-wrap justify-center gap-8 text-center">
                {mileStoneSections[0]?.acheivementCard?.map((card, index) => (
                  <motion.Card
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants[index % 3]}
                    className="bg-gray-100 dark:bg-[#1f2937] shadow-lg hover:shadow-2xl transition-all w-60"
                    key={index}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {counterOn && (
                          <CountUp start={0} end={card?.button} duration={3} />
                        )}
                        {card?.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg">
                      {card?.description}
                    </CardContent>
                  </motion.Card>
                ))}
              </div>
            </ScrollTrigger>
          </div>
        </section>

        {/* Our Team Section */}
        {/* <section className="py-20 bg-gradient-to-r dark:bg-[#1f2937]">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {teamSection[0]?.ServiceCard?.map((member, idx) => (
                <motion.Card
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants[idx % 3]}
                  key={idx}
                  className=" shadow-lg bg-white rounded-lg transition-all px-6 py-3 dark:bg-[#111827]"
                >
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={`${member?.image?.data?.attributes?.url}`}
                      alt={`${member?.image?.data?.attributes?.alternativeText} image`}
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <CardContent>
                    <h3 className="text-2xl font-semibold">{member?.title}</h3>
                    <p className="text-lg mt-4">{member?.description}</p>
                  </CardContent>
                </motion.Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-[#111827]">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-4xl mb-8 text-center font-bold tracking-tight dark:text-white">
              {testimonialSection[0]?.testimonailTitle?.title}{" "}
              <span className="text-[#969963] underline">
                {testimonialSection[0]?.testimonailTitle?.secondTitle}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialSection[0]?.testimonialCard?.map(
                (testimonial, idx) => (
                  <motion.Card
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants[idx % 3]}
                    key={idx}
                    className="bg-gray-100 dark:bg-[#1f2937] shadow-lg p-6"
                  >
                    <CardContent className="italic text-lg">
                      {testimonial?.description}
                    </CardContent>
                    <div className="mt-4 text-right">
                      <CardContent>
                        <div className="mt-4 text-right">
                          <p className="font-semibold">{testimonial?.title}</p>
                          <Badge className="text-sm mt-2 bg-blue-600 text-white">
                            {testimonial?.button}
                          </Badge>
                        </div>
                      </CardContent>
                    </div>
                  </motion.Card>
                )
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
      </div>
      <PropertyFooter />
    </>
  );
}

export default PropertyAbout;
