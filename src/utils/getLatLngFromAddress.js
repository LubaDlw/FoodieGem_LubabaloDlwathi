// script to convert distance to text using google api
const getLatLngFromAddress = async (address) => {
  const apiKey  = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error("Geocoding error:", data.status, "for address:", address);
      return null;
    }
  } catch (err) {
    console.error("Geocoding fetch failed for address:", address, err);
    return null;
  }
};

export default getLatLngFromAddress;


//Put it in safe
// "AIzaSyCGzIc7FwUjv-h5m-XijoYstEUO4oBovEY"

// "IzaSyCGzIc7FwUjv-h5m-XijoYstEUO4oBovEY"

// AIzaSyCGzIc7FwUjv-h5m-XijoYstEUO4oBovEY