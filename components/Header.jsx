"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { AlignRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { getStrapiData } from "@/libs/api";

const Header = () => {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [headerData, setHeaderData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        {
          homepage {
            data {
              id
              attributes {
                blocks {
                  __typename
                  ... on ComponentLayoutHeader {
                    headerLogo {
                      data {
                        attributes {
                          url,
                          alternativeText
                        }
                      }
                    }
                    menuLink {
                      url,
                      title
                    }
                    headerContact {
                      url,
                      title
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
        const blocks = response?.homepage?.blocks;
        if (blocks) {
          const navData = blocks?.find(
            (block) => block.__typename === "ComponentLayoutHeader"
          );
          setHeaderData(navData); // Set the found navData directly
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
      ? "text-[#1e995e] font-medium border-b-2 border-b-[#1e995e]"
      : "";
  const isActiveButton = (path) =>
    pathname === path ? "text-white font-medium  bg-[#1e995e]" : "";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return <header className="h-24">{/* Skeleton content here */}</header>;
  }

  if (!headerData) {
    return <div>Data not available</div>; // Handle case where no data is available
  }

  return (
    <header>
  <main className="bg-[#D9D9D921] flex justify-between items-center px-4 md:px-10">
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/">
        <img
          src={`${headerData?.headerLogo?.url}`}
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
            href={item?.url || '#'}
            className={`text-[16px] hover:scale-110 hover:text-[#1e995e] hover:font-medium hover:border-b-2 hover:border-b-[#1e995e] hover:transition-all hover:duration-300 py-1 ${isActive(`${item?.url}`)}`}
          >
            {item?.title || "Menu Item"}
          </Link>
        ))}
      </motion.div>

      <div className="flex items-center justify-around gap-5">
        <div className="hidden md:block">
          <Link
            href={headerData?.headerContact?.url || '#'}
            className={`text-[16px] border border-[#1E995E] py-2 px-6 hover:bg-[#1e995e] hover:text-white rounded-3xl hover:transition-all duration-300 hover:shadow-lg ${isActiveButton("/contact")}`}
          >
            {headerData?.headerContact?.title || "Contact"}
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
              href={item?.url || '#'}
              className={`text-[14px] link-hover py-1 ${isActive(`${item?.url}`)}`}
              onClick={toggleMenu}
            >
              {item?.title || "Menu Item"}
            </Link>
          ))}
        </nav>
      </motion.div>
    )}
  </main>
</header>

  );
};

export default Header;
