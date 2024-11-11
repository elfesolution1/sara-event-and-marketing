"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Adjust the path as necessary
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/libs/apolloClient";

// Import Inter font from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
