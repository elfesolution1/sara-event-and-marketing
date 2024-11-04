import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { ChevronDown, User } from 'lucide-react'

export default function PropertyHero() {
  return (
    <div className="min-h-screen bg-green-700">
      <header className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Betoch.com
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-green-300">
              HOME
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-green-300">
                {/* PROPERTIES <ChevronDown className="inline-block w-4 h-4" /> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>For Rent</DropdownMenuItem>
                <DropdownMenuItem>For Sale</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Add more dropdown menus for SUB-CITY, PROPERTY TYPE, REALTORS, SERVICES */}
            <Link href="/inquiry" className="hover:text-green-300">
              INQUIRY
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-green-700"
            >
              {/* <User className="mr-2 h-4 w-4" /> Login */}
            </Button>
            <Button className="bg-green-600 hover:bg-green-500">
              CREATE A LISTING
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome To Betoch.com
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            Looking to rent or buy in the capital of Africa?
          </p>
          <p className="text-lg md:text-xl">
            Find the property you are looking for in Addis Ababa, Ethiopia.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex space-x-4 mb-4">
            <Button variant="outline" className="flex-1">
              For Rent
            </Button>
            <Button variant="outline" className="flex-1">
              For Sale
            </Button>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LOOKING FOR
              </label>
              <select
                id="propertyType"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option>Property Type</option>
                {/* Add more options */}
              </select>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LOCATION
              </label>
              <select
                id="location"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option>All areas</option>
                {/* Add more options */}
              </select>
            </div>
            <div>
              <label
                htmlFor="propertySize"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PROPERTY SIZE
              </label>
              <select
                id="propertySize"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option>Bedrooms</option>
                {/* Add more options */}
              </select>
            </div>
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                YOUR BUDGET
              </label>
              <select
                id="budget"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option>Max. Price</option>
                {/* Add more options */}
              </select>
            </div>
            <div>
              <label className="invisible block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <Button className="w-full bg-green-600 hover:bg-green-500">
                Search
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Listings
          </h2>
          {/* Add featured listings content here */}
        </div>
      </main>
    </div>
  );
}
