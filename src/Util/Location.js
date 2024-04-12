export async function getAddressFromCoords(coords) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.lat}&lon=${coords.lon}&format=json&apiKey=9095f4efd2fd40bd9a72f32ecacd8785`
    );
    if (!response.ok) {
      throw new Error("error fetchint data. geoapify sucks");
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
      `https://api.geoapify.com/v1/geocode/search?text=${urlAddress}&format=json&apiKey=9095f4efd2fd40bd9a72f32ecacd8785`,
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
