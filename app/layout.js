import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getStrapiData } from "@/libs/api";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import Contact from "./contact/page";

// Import Inter font from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Sara Events and Marketing",
  description:
    "Sara Events and Marketing is the best event organizer in ethiopia.",
};

export default async function RootLayout({ children }) {
  const query = `
    {
    homepage {

     data{
      id
      attributes{
        blocks{
          __typename
          ... on ComponentLayoutHeader{
           headerLogo{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
            menuLink{
              url,
              title
            }
           headerContact{
            url,
            title
          }
          }
					... on ComponentLayoutFooter{
            footerLogo{
              data{
                attributes{
                  url,
                  alternativeText
                }
              }
            }
            description
            footerSocialMedia{
              url,
              title,
          image{
            data{
              attributes{
                url,
                alternativeText
              }
            }
          }
            }
            eventLink{
            url,
              title
            }
            propertyLink{
              url,
              title
            }
            contactInfo{
              image{
                data{
                  attributes{
                    url,
                    alternativeText
                  }
                }
              }
              title
            }
           ctaTitle,
            ctaDescription,
            ctaButton{
              title,
              url
            }
          }
        }
      }
    }
    }
  }

  `;

  // Fetch data from Strapi using GraphQL
  const articles = await getStrapiData(query);
  const homePageData = articles.homepage;
  const { blocks } = homePageData;
  const navData = blocks.find(
    (block) => block.__typename === "ComponentLayoutHeader"
  );
  const footerData = blocks.find(
    (block) => block.__typename === "ComponentLayoutFooter"
  );
  // console.log("data is ", footerData);
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Contact /> */}
          {/* hi */}
          <Header data={navData} />
          {children}
          <Footer data={footerData} />
        </ThemeProvider>
      </body>
    </html>
  );
}
