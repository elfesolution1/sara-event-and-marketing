"use client";
import React, { useState } from "react";
import Image from "next/image";

import { delay, motion } from "framer-motion";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";

// Replace with your own Google Maps embed link
const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.257490345634!2d-122.41941648468084!3d37.77492967975915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f0f4a583%3A0xf43c9f33c5eb49!2sGoogle!5e0!3m2!1sen!2sus!4v1636557587604!5m2!1sen!2sus";

function Contact() {
  function validate(values) {
    const errors = {};
    if (!values.FullName) {
      errors.FullName = toast.error("FullName required...");
    }

    if (!values.Email) {
      errors.Email = toast.error("Email required...");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)) {
      errors.Email = toast.error("Invalid email address");
    }

    if (!values.Message) {
      errors.Message = toast.error("Message required...");
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      FullName: "",
      Email: "",
      Message: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await toast.promise(sendForm({ ...values }), {
          loading: "Sending...",
          success: <b>Sent Successfully...!</b>,
          error: <b>An error occurred, please try again!</b>,
        });

        resetForm();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
  });

  const sendForm = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:1337/api/contact-forms`,
        {
          data: {
            FullName: values.FullName,
            Email: values.Email,
            Message: values.Message,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      throw error;
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } },
    exit: { opacity: 0, x: -100 },
  };
  return (
    <>
      <section className="hero-section relative w-full h-[50vh]">
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>

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
                Contact Us
              </h1>
            </div>
          </div>
        </div>
      </section>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-26 mt-10 text-center">
        Send Us a Message
      </h2>
      <p className="text-center w-[60%] mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo natus
        aliquam laborum! Officia, laudantium illum? fficia, laudantium illum?{" "}
      </p>
      <motion.div className="container  mx-auto py-16 px-6 lg:px-8">
        <section className="mb-12 flex items-start justify-around w-[80%]  mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideFromLeft}
            className="flex flex-col gap-0 mb-12 w-[35%]"
          >
            <h1 className="text-center font-semibold text-5xl mb-5">
              Get in touch
            </h1>
            <hr className="bg-[linear-gradient(339deg,rgba(9,9,121,0.57)_16%,rgba(30,153,94,0.85)_35%)] font-bold text-2xl h-[2px] " />
            <div className="bg-white dark:bg-gray-800 px-6  mt-8  flex justify-around items-start gap-3 ">
              <Image
                src="https://via.assets.so/img.jpg?w=20&h=20&tc=white&bg=gray"
                height={20}
                width={20}
                alt="phone number"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Address
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-6  mt-8 flex justify-around items-start gap-3 ">
              <Image
                src="https://via.assets.so/img.jpg?w=20&h=20&tc=white&bg=gray"
                height={20}
                width={20}
                alt="phone number"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  <a
                    href="mailto:contact@saraeventsandmarketing.com"
                    className="text-blue-600 hover:underline"
                  >
                    sales@saraeventsandmarketing.com
                  </a>
                  <br />
                  <a
                    href="mailto:mikhirtrading@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    saraeventsandmarketing@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 mt-8 flex justify-around items-start gap-3 ">
              <Image
                src="https://via.assets.so/img.jpg?w=20&h=20&tc=white&bg=gray"
                height={20}
                width={20}
                alt="phone number"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  Telephone:{" "}
                  <a
                    href="tel:+251116504896"
                    className="text-blue-600 hover:underline"
                  >
                    +251 1234567890
                  </a>
                  <br />
                  Mobile:{" "}
                  <a
                    href="tel:+251930644444"
                    className="text-blue-600 hover:underline"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp; +251 91234567890
                  </a>
                  <br />
                  Whatsapp:{" "}
                  <a
                    href="tel:+251911248275"
                    className="text-blue-600 hover:underline"
                  >
                    +251 91234567890
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
          <div className="w-[80%]">
            <form
              className=" w-[80%] float-right bg-[linear-gradient(169deg,rgba(30,169,121,0.8)_16%,rgba(30,153,94,0.85)_30%)] dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-900 dark:text-white font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="FullName"
                  value={formik.values.FullName}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-300 outline-none focus:border-2 focus:border-white  rounded-lg bg-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-900 dark:text-white font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-300 outline-none focus:border-white  focus:border-2 bg-transparent rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-900 dark:text-white font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  name="Message"
                  value={formik.values.Message}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-300 outline-none focus:border-2 focus:border-white bg-transparent rounded-lg dark:bg-gray-700 dark:text-white"
                  rows="5"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-white text-[#1e995e] font-bold rounded-lg hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Google Maps */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Location
          </h2>
          <div className="relative h-96 w-full mb-12">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-lg"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default Contact;
