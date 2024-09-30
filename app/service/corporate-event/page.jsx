"use client";
import React, { useState, useEffect } from "react";
import { getStrapiData } from "@/libs/api";
import Image from "next/image";
import CloseButton from "@/app/assets/CloseButton.jpg";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
function CorporateEvent() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (src) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const [corporateEventPageData, setCorporateEventPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
      {
    corporateEvent{
  data{
    attributes{
      blocks{
        __typename
        ... on ComponentComponentsImage{
          image{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
          }
        ... on ComponentLayoutServiceDetail{
          serviceTitle{
            title,
            secondTitle
          }
          serviceImage{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
          serviceContent
          serviceGallery{
            data{
              attributes{
                url
                alternativeText
              }
            }
          }
          serviceDetail2
        }
        }
      }
    }
  }
      }
      `;
      const articles = await getStrapiData(query);
      setCorporateEventPageData(articles.contactPage);
    };

    fetchData();
  }, []);
  if (!corporateEventPageData) return <div>Loading...</div>;

  const { blocks } = corporateEventPageData;
  const heroData = blocks.find(
    (block) => block.__typename === "ComponentComponentsImage"
  );
  console.log("corporate ", corporateEventPageData);
  return (
    <>
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <Image
            src="http://localhost:1337/uploads/16_9632f7582e.webp"
            alt="alt"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              {/* <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                Corporate Event
              </h1> */}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 mb-20">
        <div className="w-[70%] pb-10 mx-auto shadow-lg dark:border border-[rgba(255,255,255,0.6)] ">
          <div>
            <h1 className="text-center font-medium text-4xl mb-4">
              Corporate <span className="text-[#1e995e] font-bold ">Event</span>
            </h1>

            <div className="h-[50%]">
              {" "}
              <Image
                src="http://localhost:1337/uploads/8_d9b366b4d9.webp"
                alt="alt"
                width={600}
                height={200}
                className="w-full "
              />
            </div>
          </div>
          <main className="mt-5 px-4">
            <p
              className="font-normal text-lg text-justify mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>

            <p
              className="font-normal text-lg text-justify mb-1"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>
            <section className="py-16 dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <div>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    modules={[Autoplay]}
                    className=" w-[100%] mx-auto"
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
            <p
              className="font-normal text-lg text-justify mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>

            <p
              className="font-normal text-lg text-justify mb-1"
              style={{ letterSpacing: "1px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odio
              quo atque error. Nulla quisquam, voluptates impedit ea, tenetur
              vitae ab modi reprehenderit animi officiis adipisci enim et
              laboriosam laudantium? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Minima vero obcaecati asperiores optio molestias
              nihil, ut iure, adipisci delectus error doloremque natus
              voluptatibus illo magnam enim cumque, repellendus mollitia
              reiciendis.
            </p>
          </main>
        </div>
      </section>
    </>
  );
}

export default CorporateEvent;
