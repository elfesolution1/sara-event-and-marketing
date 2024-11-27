"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropertyFooter from "@/components/PropertyFooter";
import PropertyHeader from "@/components/PropertyHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";

import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const FIND_PROPERTIES = gql`
  query GetProperties {
    propertyLists {
      data {
        id
        attributes {
          Title
          Description
          Icon {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          Image {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          Price
          Bedrooms
          city {
            data {
              attributes {
                Name
                location {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
                subcities {
                  data {
                    attributes {
                      Name
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

const FIND_CITIES = gql`
  query GetCities {
    cities {
      data {
        id
        attributes {
          Name
          location {
            data {
              attributes {
                Name
              }
            }
          }
          subcities {
            data {
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

const FIND_HOME_Data = gql`
  query GetHomeData {
    propertyHome {
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

const PropertyHome = React.memo(function PropertyHome() {
  function validate(values) {
    const errors = {};
    if (!values.Name) errors.Name = toast.error("Name required...");
    if (!values.Email) errors.Email = toast.error("Email required...");
    if (!values.Message) errors.Message = toast.error("Message required...");
    return errors;
  }

  const formik = useFormik({
    initialValues: { Name: "", Email: "", Message: "" },
    validate,
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
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200 || response.status === 201)
        return response.data;
      throw new Error("Failed to send message");
    } catch (error) {
      console.error("Error sending contact form:", error);
      throw error;
    }
  };

  const initialFilters = {
    location: "",
    city: "",
    subCity: "",
    priceRange: "",
    propertyType: "all",
    bedrooms: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]); // Updated state name
  const [cities, setCities] = useState([]);
  const [subCities, setSubCities] = useState([]);
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError,
  } = useQuery(FIND_PROPERTIES);
  const {
    data: cityData,
    loading: cityLoading,
    error: cityError,
  } = useQuery(FIND_CITIES);

  const {
    data: homeData,
    loading: homeLoading,
    error: homeError,
  } = useQuery(FIND_HOME_Data);
  const [aboutUsSections, setAboutUsSections] = useState([]);
  const [partnerSections, setPartnerSections] = useState([]);
  const [mileStoneSections, setMileStoneSections] = useState([]);
  const [counterOn, setCounterOn] = useState(false);

  useEffect(() => {
    if (homeData) {
      const filteredSections =
        homeData?.propertyHome?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutPropertyAboutUs"
        );
      setAboutUsSections(filteredSections);
    }

    if (homeData) {
      const filteredMileStoneSections =
        homeData?.propertyHome?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutOurAcheivement"
        );
      setMileStoneSections(filteredMileStoneSections);
    }
    if (homeData) {
      const filteredPartnerSections =
        homeData?.propertyHome?.data?.attributes?.blocks?.filter(
          (item) => item.__typename === "ComponentLayoutPartners"
        );
      setPartnerSections(filteredPartnerSections);
    }

    if (propertyData) {
      // console.log("data is ", propertyData);
      const mappedProperties = propertyData?.propertyLists?.data?.map((item) => ({
        id: item?.id,
        title: item?.attributes?.Title,
        description: item?.attributes?.Description[0]?.children[0]?.text,
        image: item?.attributes?.Image?.data?.attributes,
        icon: item?.attributes?.Icon?.data?.attributes,
        price: item?.attributes?.Price,
        bedrooms: item?.attributes?.Bedrooms,
        city: item?.attributes?.city?.data?.attributes?.Name,
        location:
          item?.attributes?.city?.data?.attributes?.location?.data?.attributes?.Name,
        subCity:
          item?.attributes?.city?.data?.attributes?.subcities?.data[0]?.attributes?.Name || "",
      }));

      setProperties(mappedProperties);
      // Extract unique locations
      const uniqueLocations = [
        ...new Set(mappedProperties?.map((property) => property?.location)),
      ];
      setLocations(uniqueLocations);
    }
  }, [propertyData, homeData]);

  useEffect(() => {
    if (cityData) {
      const mappedCities = cityData?.cities?.data?.map((city) => ({
        name: city?.attributes?.Name,
        location: city?.attributes?.location?.data?.attributes?.Name, // Ensure we have location mapped here
        subCities: city?.attributes?.subcities?.data?.map(
          (sub) => sub?.attributes?.Name
        ),
      }));
      setCities(mappedCities);
    }
  }, [cityData]);

  const handleFilterChange = (value, name) => {
    setFilters((prev) => ({ ...prev, [name]: value }));

    if (name === "location") {
      const filteredCities = cities?.filter((city) => city?.location === value);
      setCities(filteredCities); // Update only filtered cities
      setSubCities([]); // Clear subCities when location changes
      setFilters((prev) => ({ ...prev, city: "", subCity: "" }));
    } else if (name === "city") {
      const selectedCity = cities?.find((city) => city?.name === value);
      setSubCities(selectedCity ? selectedCity?.subCities : []);
      setFilters((prev) => ({ ...prev, subCity: "" })); // Reset subCity
      setFilters((prev) => ({ ...prev, subCity: "" }));
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setCities([]);
    setSubCities([]);
  };
  useEffect(() => {
    if (filters.location) {
      const filteredCities = cityData?.cities?.data
        .filter(
          (city) =>
            city?.attributes?.location?.data?.attributes?.Name === filters?.location
        )
        .map((city) => ({
          name: city?.attributes?.Name,
          subCities: city?.attributes?.subcities?.data?.map(
            (sub) => sub?.attributes?.Name
          ),
        }));
      setCities(filteredCities);
      setSubCities([]);
    }
  }, [filters.location, cityData]);
  // Fetch sub-cities when the city changes
  useEffect(() => {
    if (filters.city) {
      const selectedCity = cities?.find((city) => city?.name === filters?.city);
      setSubCities(selectedCity ? selectedCity?.subCities : []);
    }
  }, [filters.city, cities]);

  const filteredProperties = properties?.filter((property) => {
    const locationFilter =
      filters?.location === "" || property?.location === filters?.location;
    const cityFilter = filters?.city === "" || property?.city === filters?.city;
    const subCityFilter =
      filters?.subCity === "" || property?.subCity === filters?.subCity;
    const bedroomsFilter =
      filters?.bedrooms === "" ||
      property?.bedrooms === parseInt(filters.bedrooms, 10);

    return locationFilter && cityFilter && subCityFilter && bedroomsFilter;
  });

  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        <title> SAM Property Listing and Management</title>
        <meta
          name="description"
          content="SAM Property Listing and Management is the best Property listing in UAE and Ethiopia."
        />
      </head>

      <PropertyHeader />
      <Toaster position="top-right" reverseOrder={false} />
      <header
        className="relative w-full h-[70vh] flex justify-center items-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url('/propertybg.jpg')` }}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleSlide}
          className="relative z-10 text-center px-4 flex flex-col items-center justify-center text-white"
        >
          <h3 className="text-4xl md:text-6xl font-bold mb-2">
            Discover Luxury Living
          </h3>
          <p className="text-lg md:text-xl">
            Find properties that match your style and redefine your standards of
            living.
          </p>
        </motion.div>
      </header>
      <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={titleSlide}
  className="bg-white dark:bg-[#1f2937] w-[83%] mx-auto shadow-lg rounded-lg flex flex-col md:flex-row justify-center items-center px-8 py-6 -mt-20 z-10 relative"
>
  <section>
    <h2 className="text-3xl font-bold text-center mb-6">
      Find Your Dream Property
    </h2>
    <div className="flex justify-between items-center mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Location Filter */}
        <Select
          value={filters?.location || ""}
          onValueChange={(value) => handleFilterChange(value, "location")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem value={location} key={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City Filter */}
        <Select
          value={filters?.city || ""}
          onValueChange={(value) => handleFilterChange(value, "city")}
          disabled={!filters?.location} // Disable if location is not selected
          className={!filters?.location ? "disabled-cursor" : ""} // Add the class conditionally
        >
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {cities?.map((city) => (
              <SelectItem key={city?.name} value={city?.name}>
                {city?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sub-City Filter */}
        <Select
          value={filters?.subCity || ""}
          onValueChange={(value) => handleFilterChange(value, "subCity")}
          disabled={!filters?.city} // Disable if city is not selected
          className={!filters?.city ? "disabled-cursor" : ""} // Add the class conditionally
        >
          <SelectTrigger>
            <SelectValue placeholder="Sub City" />
          </SelectTrigger>
          <SelectContent>
            {subCities?.map((subCity) => (
              <SelectItem key={subCity} value={subCity}>
                {subCity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Bedrooms Filter */}
        <Input
          type="number"
          placeholder="Bedrooms"
          name="bedrooms"
          value={filters?.bedrooms || ""}
          onChange={(e) => handleFilterChange(e.target.value, "bedrooms")}
        />
      </div>
      <button
        onClick={resetFilters}
        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        style={{ marginLeft: "20px" }}
      >
        Reset
      </button>
    </div>
  </section>
</motion.div>

<div className="w-[86%] mx-auto px-6 py-12">
  {/* Properties Listing Section */}
  {propertyLoading ? (
    <div className="text-center mt-10">Loading properties...</div>
  ) : propertyError ? (
    <div className="text-center mt-10">Error loading properties.</div>
  ) : filteredProperties?.length > 0 ? (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties?.map((property, index) => (
        <motion.Card
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants[index % 3]}
          key={property?.id}
        >
          <div className="relative dark:bg-[#1f2937]">
            {/* Icon overlay in the top-left corner */}
            <div className="absolute top-2 left-2 z-10 bg-white dark:bg-[#1f2937] p-1 rounded-full shadow-lg">
              <img
                src={`${property?.icon?.url}`}
                alt={property?.icon?.alternativeText}
                className="w-6 h-6 object-cover"
              />
            </div>

            {/* Property image */}
            <img
              src={`${property?.image?.url}`}
              alt={property?.image?.alternativeText}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </div>

          <CardHeader>
            <CardTitle>{property?.title}</CardTitle>
            <CardDescription>{property?.city}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{property?.description}</p>
            <p className="mt-2">
              <strong>Price:</strong> ${property?.price?.toLocaleString()}
            </p>
            <p className="mt-2">
              <strong>Bedrooms:</strong> {property?.bedrooms}
            </p>
          </CardContent>
        </motion.Card>
      ))}
    </section>
  ) : (
    <div className="text-center mt-10">No properties found.</div>
  )}
</div>

      {aboutUsSections?.map((section, index) => {
        return (
          <section
            className={`dark:bg-gray-800 py-10 dark:text-gray-900 mt-8 ${
              index === 1 ? "bg-gray-100" : ""
            }`}
            key={index}
          >
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight dark:text-white">
                  {section?.Title?.title}{" "}
                  <span className="text-[#969963] underline">
                    {section?.Title?.secondTitle}
                  </span>
                </h2>
                <p className="text-lg mt-4 max-w-xl mx-auto dark:text-white">
                  {section?.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                {section?.aboutCard?.map((item, idx) => (
                  <motion.Card
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants[idx % 3]}
                    key={idx}
                    className=" dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all rounded-lg"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold">
                        {item?.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg">
                      {item?.secondTitle}
                    </CardContent>
                  </motion.Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

<section className="py-20 bg-white dark:bg-[#111827] ">
  <div className="container mx-auto px-6 md:px-12 lg:px-16">
    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-1">
      {mileStoneSections?.[0]?.title}
    </h2>
    <p className="text-[16px] mb-8 text-center">
      {mileStoneSections?.[0]?.description}
    </p>
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div className="flex flex-wrap justify-center gap-8 text-center">
        {mileStoneSections?.[0]?.acheivementCard?.map((card, index) => (
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


<section className="py-12 text-center">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
      {partnerSections?.[0]?.partnerTitle?.title}{" "}
      <span className="text-[#969963] underline font-bold">
        {partnerSections?.[0]?.partnerTitle?.secondTitle}
      </span>
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
      {partnerSections?.[0]?.partnerDescription}
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
    {partnerSections?.[0]?.partnerImage?.map((partner, index) => (
      <SwiperSlide key={index}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={logoVariants}
        >
          {partner?.image?.data?.[0]?.attributes?.url ? (
            <img
              src={`${partner?.image?.data?.[0]?.attributes?.url}`}
              alt={partner?.image?.data?.[0]?.attributes?.alternativeText}
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

      {/* Contact Section */}
      <section className="py-20 lg:w-[50%] lg:mx-auto lg:mb-4 bg-gradient-to-r   ">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center w-full">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 gap-6 max-w-xl mx-auto w-full"
          >
            <Input
              type="text"
              name="Name"
              placeholder="Your Name"
              value={formik.values.Name}
              onChange={formik.handleChange}
              className="    border border-[rgba(0,0,0.2)]   dark:bg-gray-200 dark:text-gray-900 text-gray-900 placeholder-gray-600 dark:placeholder-gray-500 rounded-lg shadow-md"
            />
            <Input
              type="text"
              name="Email"
              value={formik.values.Email}
              onChange={formik.handleChange}
              placeholder="Your Email"
              className="    border border-[rgba(0,0,0.2)]    dark:bg-gray-200 dark:text-gray-900 placeholder-gray-600 dark:placeholder-gray-500 rounded-lg shadow-md"
            />
            <Textarea
              className="  border border-[rgba(0,0,0.2)]  dark:bg-gray-200 dark:text-gray-900 placeholder-gray-600 dark:placeholder-gray-500 rounded-lg shadow-md"
              name="Message"
              value={formik.values.Message}
              onChange={formik.handleChange}
              placeholder="Your Message"
              rows="5"
            />
            <button
              type="submit"
              className="px-8 py-3   ring text-blue-700 dark:bg-gray-100 dark:text-blue-700 font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-300 transition-all transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <PropertyFooter />
    </>
  );
});

export default PropertyHome;
