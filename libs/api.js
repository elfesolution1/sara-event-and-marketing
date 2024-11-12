// libs/api.js
import { flattenAttributes } from "@/libs/utils";

const baseURL = process.env.NEXT_PUBLIC_API_URL; // Update this with your Strapi URL

export async function getStrapiData(query) {
  try {
    const response = await fetch(`${baseURL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
      cache: "no-store", // Disable caching to always fetch fresh data
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const { data } = await response.json();

    // Flatten attributes if needed
    return flattenAttributes(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
