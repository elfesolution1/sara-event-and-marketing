export async function getStrapiData(endpoint) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error is ", error);
  }
}
