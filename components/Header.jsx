"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { AlignRight, X } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ data }) => {
  const baseImageUrl = "http://localhost:1337";
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    pathname === path
      ? "text-[#1e995e] font-medium border-b-2 border-b-[#1e995e] "
      : "";
  const isActiveButton = (path) =>
    pathname === path ? "text-white font-medium  bg-[#1e995e] " : "";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <main className="bg-[#D9D9D921]  flex justify-between items-center  px-4 md:px-10">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Image
              src={`${baseImageUrl}${data.headerLogo.url}`}
              alt="Company Logo"
              width={135.12}
              height={20}
            />
          </Link>
        </motion.div>

        <motion.div
          className="flex gap-24 items-center justify-between "
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="hidden md:flex gap-8 items-center "
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {data.menuLink.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`text-[16px] hover:scale-110 hover:text-[#1e995e] hover:font-medium hover:border-b-2 hover:border-b-[#1e995e] hover:transition-all hover:duration-300 py-1 ${isActive(
                    `${item.url}`
                  )}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </motion.div>
          <div className="flex items-center justify-around gap-5">
            <div className="hidden md:block">
              <Link
                href={data.headerContact.url}
                className={`text-[16px]  border border-[#1E995E] py-2 px-6 hover:bg-[#1e995e] hover:text-white rounded-3xl hover:transition-all duration-300 hover:shadow-lg ${isActiveButton(
                  "/contact"
                )}`}
              >
                {data.headerContact.title}
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
            className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50 md:hidden"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex flex-col items-center gap-4 py-4">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  href="/"
                  className={`text-[14px] link-hover py-1 ${isActive("/")}`}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link
                  href="/about"
                  className={`text-[14px] link-hover py-1 ${isActive(
                    "/about"
                  )}`}
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link
                  href="/service"
                  className={`text-[14px] link-hover py-1 ${isActive(
                    "/service"
                  )}`}
                  onClick={toggleMenu}
                >
                  Service
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <Link
                  href="/portfolio"
                  className={`text-[14px] link-hover py-1 ${isActive(
                    "/portfolio"
                  )}`}
                  onClick={toggleMenu}
                >
                  Portfolio
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1 }}
              >
                <Link
                  href="/contact"
                  className={`text-[14px] link-hover py-1 ${isActive(
                    "/contact"
                  )}`}
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </main>
    </header>
  );
};

export default Header;
