"use client";
import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CloseButton from "@/app/assets/CloseButton.jpg";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { delay, motion } from "framer-motion";
// Gallery Data
const galleryImages = [
  {
    id: 1,
    src: "https://via.assets.so/img.jpg?w=300&h=200&tc=blue&bg=gray",
    alt: "Event 1",
  },
  {
    id: 2,
    src: "https://via.assets.so/img.jpg?w=300&h=200&tc=blue&bg=gray",
    alt: "Event 2",
  },
  {
    id: 3,
    src: "https://via.assets.so/img.jpg?w=300&h=200&tc=blue&bg=gray",
    alt: "Event 3",
  },
  {
    id: 4,
    src: "https://via.assets.so/img.jpg?w=300&h=200&tc=blue&bg=gray",
    alt: "Event 4",
  },
  {
    id: 5,
    src: "https://via.assets.so/img.jpg?w=300&h=200&tc=blue&bg=gray",
    alt: "Event 5",
  },
  {
    id: 6,
    src: "https://via.assets.so/img.jpg?w=300&h=200&tc=blue&bg=gray",
    alt: "Event 6",
  },
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

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of event planning services, including wedding, birthday, and corporate event planning.",
  },
  {
    question: "How do I book an event?",
    answer:
      "You can easily book an event by contacting us through our website or giving us a call at our customer support number.",
  },
  {
    question: "What makes your service unique?",
    answer:
      "We focus on customization, attention to detail, and customer satisfaction, ensuring every event is tailored to your vision.",
  },
  {
    question: "Can you provide event equipment?",
    answer:
      "Yes, we provide all the necessary event equipment, including sound systems, lighting, and furniture rentals.",
  },
];
function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const imageSlideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
    exit: { opacity: 0, x: 100 },
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
  const openLightbox = (src) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <Image
            src="https://via.assets.so/img.jpg?w=1000&h=200&tc=blue&bg=gray"
            alt="alt"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                About Us
              </h1>
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
            className="text-4xl font-bold text-gray-800 leading-tight dark:text-[#1F995E]"
          >
            About <span className="text-[#1e995e] font-bold">Us</span>
          </motion.h1>
          <p className="text-lg text-gray-600 leading-relaxed dark:text-white text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
            asperiores? Quia harum reiciendis doloremque asperiores maxime illo
            sequi, aspernatur aperiam beatae neque exercitationem, commodi
            voluptates minus placeat? Ratione, veniam illo?
          </p>
          <p className="text-lg text-gray-600 leading-relaxed dark:text-white text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
            asperiores? Quia harum reiciendis doloremque asperiores maxime illo
            sequi, aspernatur aperiam beatae neque exercitationem, commodi
            voluptates minus placeat? Ratione, veniam illo?
          </p>
          <p className="text-lg text-gray-600 leading-relaxed dark:text-white text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
            asperiores? Quia harum reiciendis doloremque asperiores maxime illo
            sequi, aspernatur aperiam beatae neque exercitationem, commodi
            voluptates minus placeat? Ratione, veniam illo?
          </p>
          <p className="text-lg text-gray-600 leading-relaxed dark:text-white text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
            asperiores? Quia harum reiciendis doloremque asperiores maxime illo
            sequi, aspernatur aperiam beatae neque exercitationem, commodi
            voluptates minus placeat? Ratione, veniam illo?
          </p>
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
            src="https://via.assets.so/img.jpg?w=1000&h=200&tc=blue&bg=gray"
            alt="ada"
            className="rounded-lg shadow-lg w-full h-[80%] object-cover"
            width={500}
            height={100}
          />
        </motion.div>
      </section>

      {/* <section className=" py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We have a rich history of excellence in providing top-tier
              services. Our team of dedicated experts brings decades of
              experience to ensure we deliver the best for our clients. Our
              company’s journey started from humble beginnings and has grown
              into a leading player in the industry.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img
                src="https://via.assets.so/img.jpg?w=3000&h=1000&tc=blue&bg=gray"
                alt="Our Team"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Expertise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With a diverse team of highly skilled professionals, we
                specialize in providing solutions tailored to meet the unique
                needs of our clients. From product development to client
                relations, we are committed to excellence every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {/* Title and Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white ">
              Our Mission,{" "}
              <span className="text-[#1e995e] font-bold"> Vision &</span> Core
              Values
            </h2>
            <p className="text-gray-600 mt-4 dark:text-white ">
              Discover the foundation of what drives us and our commitment to
              excellence.
            </p>
          </div>

          {/* Flexbox for Mission, Vision, Core Values */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Mission Card */}
            <div className="bg-white dark:bg-gray-800 dark:border dark:border-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/20"
                alt="Mission"
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2  dark:text-white ">
                Our <span className="text-[#1e995e] font-bold]">Mission</span>
              </h3>
              <p className="text-gray-600 dark:text-white ">
                We strive to provide exceptional services to enhance the lives
                of our customers with innovation and dedication.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white dark:bg-gray-800 dark:border dark:border-white  shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/20"
                alt="Vision"
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2  dark:text-white ">
                Our <span className="text-[#1e995e] font-bold]">Vision</span>
              </h3>
              <p className="text-gray-600  dark:text-white ">
                To be a leader in the industry by delivering unparalleled value
                through excellence and customer satisfaction.
              </p>
            </div>

            {/* Core Values Card */}
            <div className="bg-white dark:bg-gray-800 dark:border dark:border-white  shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/20"
                alt="Core Values"
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2  dark:text-white ">
                Our{" "}
                <span className="text-[#1e995e] font-bold]">Core Values</span>
              </h3>
              <p className="text-gray-600  dark:text-white ">
                Integrity, innovation, and excellence are at the heart of
                everything we do, ensuring we provide the best for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16  dark:bg-gray-900  ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1 - Image */}
          <div className="flex items-center justify-center">
            <Image
              src="https://via.placeholder.com/600x500"
              alt="Why Choose Us Image"
              width={600}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Column 2 - Cards */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white  text-center lg:text-center">
              Why <span className="text-[#1e995e] font-bold]">Choose Us </span>
            </h2>
            <p className="text-center mb-12 mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              sit provident soluta quae? Facere culpa eveniet
            </p>
            <div className="flex flex-col items-center gap-4">
              {/* Card 1 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start justify-around gap-2">
                <Image
                  src="https://via.assets.so/img.jpg?w=20&h=20&tc=white&bg=gray"
                  height={20}
                  width={20}
                  alt="phone number"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Expert{" "}
                    <span className="text-[#1e995e] font-bold]">Team</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team is composed of industry professionals with years of
                    experience, ensuring top-quality services.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start justify-around gap-2">
                <Image
                  src="https://via.assets.so/img.jpg?w=20&h=20&tc=white&bg=gray"
                  height={20}
                  width={20}
                  alt="phone number"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Innovative{" "}
                    <span className="text-[#1e995e] font-bold]">Approach</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use the latest technologies and creative solutions to
                    make every event a memorable success.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start justify-around gap-2">
                <Image
                  src="https://via.assets.so/img.jpg?w=20&h=20&tc=white&bg=gray"
                  height={20}
                  width={20}
                  alt="phone number"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Affordable{" "}
                    <span className="text-[#1e995e] font-bold]">Pricing</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We offer competitive pricing without compromising on
                    quality, providing excellent value for money.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12">
            Event <span className="text-[#1e995e] font-bold]">Gallery</span>
          </h2>
          <div>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{ delay: 3000 }}
              loop={true}
              modules={[Autoplay]}
              className=" w-[80%] mx-auto"
            >
              {galleryImages.map((image) => (
                <SwiperSlide key={image.id}>
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => openLightbox(image.src)}
                  >
                    <Image
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

        {/* Lightbox Modal */}
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
      </section>
      <section className="py-12  text-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
            Our <span className="text-[#1e995e] font-bold]">partners</span>
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
                className="mx-auto h-20 object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* FAQ Section */}
      <section className="py-16  dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
            Frequently Asked Questions{" "}
            <span className="text-[#1e995e] font-bold]">(FAQ)</span>
          </h2>
          <Accordion type="single" collapsible className="w-[50%] mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>Question 1?</AccordionTrigger>
              <AccordionContent>Answer to first Question</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Question 2?</AccordionTrigger>
              <AccordionContent>Answer to first Question</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Question 3?</AccordionTrigger>
              <AccordionContent>Answer to first Question</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

export default About;
