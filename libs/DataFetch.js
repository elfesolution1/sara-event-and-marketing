export async function getStrapiData(endpoint) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(baseURL + endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error is ", error);
  }
}
