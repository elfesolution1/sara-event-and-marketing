"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

const FIND_Contact_Data = gql`
  query GetContactData {
    propertyContactPage {
      data {
        attributes {
          blocks {
            __typename
            ... on ComponentLayoutContactInfo {
              contactTitle {
                title
                secondTitle
              }
              contactDescription
              getInTouch
              contactCard {
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
          }
        }
      }
    }
  }
`;
function ContactPage() {
  function validate(values) {
    const errors = {};
    if (!values.Name) {
      errors.Name = toast.error("Name required...");
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
      Name: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/property-contact-forms`,
        {
          data: {
            Name: values.Name,
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
  const [contactInfo, setContactInfo] = useState([]);
  const {
    data: contactData,
    loading: contactLoading,
    error: contactError,
  } = useQuery(FIND_Contact_Data);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contactData && contactData.propertyContactPage) {
      const filteredContactSections =
        contactData?.propertyContactPage?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutContactInfo"
        );
      setContactInfo(filteredContactSections);
      console.log("Filtered Contact Info:", filteredContactSections[0]);
    }
    setIsLoading(true);
  }, [contactData]);

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
  return (
    <>
      <head>
        <title>Contact | SAM Property Listing and Management</title>
        <meta
          name="description"
          content="SAM Property Listing and Management is the best Property listing in UAE and Ethiopia."
        />
      </head>

      <PropertyHeader />
      <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <Toaster position="top-right" reverseOrder={false} />
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
                  Contact Us
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto py-16 px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                {contactInfo[0]?.contactTitle?.title}{" "}
                <span className="text-[#969963] underline">
                  {contactInfo[0]?.contactTitle?.secondTitle}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {contactInfo[0]?.contactDescription}
              </p>
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <Input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-500 rounded-lg shadow-md transition-colors"
                />
                <Input
                  type="text"
                  name="Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  placeholder="Your Email"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-500 rounded-lg shadow-md transition-colors"
                />
                <Textarea
                  name="Message"
                  value={formik.values.Message}
                  onChange={formik.handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-500 rounded-lg shadow-md transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#9e8f72] dark:bg-[#9e8f72] text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-transform transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                {contactInfo[0]?.getInTouch}
              </h2>
              {contactInfo[0]?.contactCard?.map((card, index) => {
                const imageUrl = card?.image?.data?.attributes?.url;
                const altText =
                  card?.image?.data?.attributes?.alternativeText ||
                  "contact Icon";

                return (
                  <div className="flex items-start space-x-4" key={index}>
                    <img
                      src={`${imageUrl}`}
                      alt={altText}
                      width={25}
                      height={25}
                      className="hover:text-[#969963] hover:scale-125 transition-all duration-300 shadow-lg"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {card?.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {card?.button}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {card?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="w-[85%] h-80 rounded-md">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.6617375108665!2d-123.11622608465384!3d37.77492927975945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb17f676b15447998!2z44CSMTE4NyA0M1ot!5e0!3m2!1sen!2sus!4v1635819021223!5m2!1sen!2sus"
            className="w-full h-full"
            allowFullScreen={true}
            loading="lazy"
          />
        </section>
      </div>
      <PropertyFooter />
    </>
  );
}

export default ContactPage;
