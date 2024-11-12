"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";

function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // Fetch image size based on window size
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
    const handleResize = () => setImageSize(getImageSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch galleries from API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/property-galleries?populate=*`
        );
        const data = await response.json();
        setGalleries(data.data);
        setFilteredGalleries(data.data);
        setIsLoading(true);

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

  // Filter galleries based on active tab
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

  return (
    <>
      <head>
        <title>Gallery | SAM Property Listing and Management</title>
        <meta
          name="description"
          content="SAM Property Listing and Management is the best Property listing in UAE and Ethiopia."
        />
      </head>

      <PropertyHeader />
      <section className="hero-section relative w-full h-[70vh]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/10_5fc42d273d.webp`}
            alt="Gallery"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="w-[60%] mx-auto">
              <h1 className="text-center text-white font-medium text-5xl">
                Gallery
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 dark:bg-[#1e212a] min-h-screen flex flex-col items-center py-10">
        <h1 className="text-5xl font-medium mb-8">Property Gallery</h1>

        {/* Responsive tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-xl text-sm sm:text-base md:text-[16px] font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg"
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
              className="absolute top-6 right-6 hover:cursor-pointer bg-white text-black  py-1 px-2 pt-0 font-bold text-3xl rounded-full"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50  bg-white  text-black p-2 font-bold  rounded-lg hover:cursor-pointer"
              onClick={showPrevImage}
            >
              &#10094;
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white text-black p-2 font-bold  rounded-lg hover:cursor-pointer"
            >
              &#10095;
            </button>
            <div className="relative  w-[85%] h-[85%] mx-auto">
              <div className="relative w-full h-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${
                    filteredGalleries[selectedImageIndex].attributes.image.data
                      .attributes.formats.large.url ||
                    filteredGalleries[selectedImageIndex].attributes.image.data
                      .attributes.url
                  }`}
                  alt="Selected"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <PropertyFooter />
    </>
  );
}

export default Gallery;
