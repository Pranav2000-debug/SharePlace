// USE YOUR OWN GEOAPIFY API KEYS. YOU CAN GENERATE YOUR API KEYS FROM GEOAPIFY.COM . 

export async function getAddressFromCoords(coords) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.lat}&lon=${coords.lon}&format=json&apiKey="USE_YOUR_GEOAPIFY_API_KEY"`
    );
    if (!response.ok) {
      throw new Error("error fetchint data.");
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error("no results found");
    }
    const formattedAddress = data.results[0].formatted;
    return formattedAddress;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getCoordsFromAddress(address) {
  let requestOpt = {
    method: "GET",
  };
  const urlAddress = encodeURI(address);
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${urlAddress}&format=json&apiKey="USE_YOUR_GEOAPIFY_API_KEY"`,
      requestOpt
    );
    if (!response.ok) {
      throw new Error("error fetchint data. geoapify sucks");
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error("no results found");
    }
    const { lat, lon } = data.results[0];
    const coordinates = {
      lat: lat,
      lon: lon,
    };
    return coordinates;
  } catch (err) {
    console.log(err);
  }
}
