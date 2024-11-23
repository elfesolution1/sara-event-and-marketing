"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { AlignRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { getStrapiData } from "@/libs/api";

const PropertyHeader = () => {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        {
          propertyHome{
            data{
              attributes{
                blocks{
                  ... on ComponentLayoutHeader{
                    headerLogo{
                      data{
                        attributes{
                          url
                          alternativeText
                        }
                      }
                    }
                    menuLink{
                      title
                      url
                    }
                    headerContact{
                      title
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `;
      try {
        const response = await getStrapiData(query);
        const blocks = response?.propertyHome?.blocks;

        if (blocks && blocks.length > 0) {
          // Access the first block which contains header info
          const navData = blocks[0];
          setHeaderData(navData);
        } else {
          console.error("No blocks found in the fetched data.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isActive = (path) =>
    pathname === path
      ? "text-[#969963] font-bold border-b-2 border-b-[#969963]"
      : "";
  const isActiveButton = (path) =>
    pathname === path ? "text-white font-medium  bg-[#969963]" : "";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return <header></header>;
  }

  if (!headerData) {
    return <div>Data not available</div>; // Handle case where no data is available
  }
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-translate">
  <main className="flex justify-between items-center py-5 px-4 md:px-10">
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/property">
        <img
          src={`${baseImageUrl}${headerData?.headerLogo?.url || ''}`}
          alt={headerData?.headerLogo?.alternativeText || "Company Logo"}
          width={135.12}
          height={20}
        />
      </Link>
    </motion.div>

    <motion.div
      className="flex gap-24 items-center justify-between"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="hidden md:flex gap-8 items-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {headerData?.menuLink?.map((item, index) => (
          <Link
            key={index}
            href={`${item?.url}`}
            className={`text-[16px] text-white hover:scale-110 hover:font-medium hover:border-b-2 hover:border-b-[#969963] hover:transition-all hover:duration-300 py-1 ${isActive(item?.url || '')}`}
          >
            {item?.title || 'Menu Item'}
          </Link>
        ))}
      </motion.div>

      <div className="flex items-center justify-around gap-5">
        <div className="hidden md:block">
          <Link
            href={`${headerData?.headerContact?.url}`}
            className={`text-[16px] text-white bg-[#969963] border border-[#969963] py-2 px-6 hover:bg-[#969963] hover:text-white rounded-3xl hover:transition-all duration-300 hover:shadow-lg ${isActiveButton('/property/contact')}`}
          >
            {headerData?.headerContact?.title || 'Contact Us'}
          </Link>
        </div>

        <ModeToggle />
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <AlignRight className="w-6 h-6" />
          )}
        </button>
      </div>
    </motion.div>

    {isMenuOpen && (
      <motion.div
        className="absolute top-24 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50 md:hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="flex flex-col items-center gap-4 py-4">
          {headerData?.menuLink?.map((item, index) => (
            <Link
              key={index}
              href={`${item?.url}`}
              className={`text-[14px] link-hover py-1 ${isActive(item?.url || '')}`}
              onClick={toggleMenu}
            >
              {item?.title || 'Menu Item'}
            </Link>
          ))}
        </nav>
      </motion.div>
    )}
  </main>
</header>

    </>
  );
};

export default PropertyHeader;
