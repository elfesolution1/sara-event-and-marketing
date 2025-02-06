"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Portfolio() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio-images?populate=*`
        );
        const data = await response.json();
        setGalleries(data?.data);
        setFilteredGalleries(data?.data);
        setIsLoading(true);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data?.data?.map((gallery) => gallery?.attributes?.category)),
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
      const filtered = galleries?.filter((gallery) =>
        gallery?.attributes?.category
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
          src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648285/Spin_1x_1_0s_200px_200px_1_1_97ae55d443.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Portfolio | Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <Header />
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <img
            src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732695348/background_1_b4c6e3b4c8.jpg"
            alt="portfolio"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-[#1C244B] bg-opacity-50  flex items-center p-8"> */}
            <div className="text-white text-left max-w-lg ml-12">
              {/* <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                About Us
              </h1> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      <div className="bg-gray-50 dark:bg-[#1f2937] min-h-screen flex flex-col items-center py-10">
  <h1 className="text-3xl font-medium mb-8">Our Portfolio</h1>

  {/* Responsive tabs */}
  <div className="flex justify-center gap-2 mb-8 flex-wrap">
    {categories.map((tab) => (
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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%] mx-auto">
  {filteredGalleries.map((gallery, index) => {
    const { image, title, description } = gallery.attributes;
    const imageUrl = image
      ? `${image.data.attributes.formats.small.url || image.url}`
      : null;

    return (
      <div
      key={gallery.id}
      className="relative  bg-white dark:bg-gray-800 pb-10 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 h-[400px] flex flex-col"
      onClick={() => openLightbox(index)}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={image.alternativeText || title}
          className="w-full h-3/4 object-cover rounded-t-lg"
        />
      )}
     <main className="pt-1 pb-5 px-4 ">
     <h1 className="text-xl mt-2 font-medium capitalize font-semibold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p>{description} </p>
     </main>
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

    {/* Calculate selectedImageUrl before rendering */}
    {(() => {
      const selectedImageUrl =
        filteredGalleries[selectedImageIndex]?.attributes?.image?.data?.attributes?.formats?.large?.url ||
        filteredGalleries[selectedImageIndex]?.attributes?.image?.data?.attributes?.url;

      return (
        <div className="relative w-[85%] h-[85%] mx-auto">
          <div className="relative w-full h-full">
            {selectedImageUrl ? (
              <img
                src={selectedImageUrl}
                alt="Selected"
                className="rounded-lg object-cover w-full h-full"
              />
            ) : (
              <p className="text-white">Image not available</p>
            )}
          </div>
        </div>
      );
    })()}
  </div>
)}

</div>

      <Footer />
    </>
  );
}

export default Portfolio;
