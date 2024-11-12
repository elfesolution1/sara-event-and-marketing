"use client";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

import { motion } from "framer-motion";

// GraphQL queries
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

const FindProperty = () => {
  const initialFilters = {
    location: "",
    city: "",
    subCity: "",
    priceRange: "",
    bedrooms: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]); // Updated state name
  const [cities, setCities] = useState([]);
  const [subCities, setSubCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    setIsLoading(true);
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
      console.log("prop is", mappedProperties);
      // Extract unique locations
      const uniqueLocations = [
        ...new Set(mappedProperties?.map((property) => property?.location)),
      ];
      setLocations(uniqueLocations);
    }
  }, [propertyData]);

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
      setSubCities(selectedCity ? selectedCity.subCities : []);
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
      setSubCities(selectedCity ? selectedCity.subCities : []);
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

  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  return (
    <>
      <head>
        <title>Find Property | SAM Property Listing and Management</title>
        <meta
          name="description"
          content="SAM Property Listing and Management is the best Property listing in UAE and Ethiopia."
        />
      </head>

      {/* <PropertyHeader /> */}
      <section className="hero-section relative w-full h-[70vh]">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/10_5fc42d273d.webp`}
          alt="alt"
          fill
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
          <div className="w-[60%] mx-auto">
            <h1 className="text-center text-white font-medium text-5xl">
              Find Property
            </h1>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 py-10">
  <section className="mb-10">
    <h2 className="text-3xl font-bold text-center mb-6">
      Find Your Dream Property
    </h2>
    {/* <div className="flex justify-between items-center mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Select
          value={filters?.location}
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

        <Select
          value={filters?.city}
          onValueChange={(value) => handleFilterChange(value, "city")}
          disabled={!filters?.location} 
          className={!filters?.location ? "disabled-cursor" : ""} 
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

        <Select
          value={filters?.subCity}
          onValueChange={(value) => handleFilterChange(value, "subCity")}
          disabled={!filters?.city} 
          className={!filters?.city ? "disabled-cursor" : ""} 
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

        <Input
          type="number"
          placeholder="Bedrooms"
          name="bedrooms"
          value={filters?.bedrooms}
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
    </div> */}
  </section>

  {/* Properties Listing Section */}
  {/* {propertyLoading ? (
    <div className="text-center mt-10">Loading properties...</div>
  ) : propertyError ? (
    <div className="text-center mt-10">Error loading properties.</div>
  ) : filteredProperties?.length > 0 ? (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties?.map((property, idx) => (
        <motion.Card
          key={property?.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants[idx % 3]}
        >
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 bg-white p-1 rounded-full shadow-lg">
              <img
                src={`${baseImageUrl}${property?.icon?.url}`}
                alt={property?.icon?.alternativeText}
                className="w-6 h-6 object-cover"
              />
            </div>

            <img
              src={`${baseImageUrl}${property?.image?.url}`}
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
      ))} */}
    </section>
  ) : (
    <div className="text-center mt-10">No properties found.</div>
  )}
</div>

      // <PropertyFooter />
    </>
  );
};

export default FindProperty;
