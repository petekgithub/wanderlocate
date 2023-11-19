import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        url: URL,
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error("An error occurred while fetching data");
  }
};

// export const getWeatherData = async (lat, lng) => {
//   try {
//     if (lat && lng) {
//       const { data } = await axios.get(
//         "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
//         {
//           params: { lat: lat, lon: lng },
//           headers: {
//             "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPIWEATHERMAP_API_KEY,
//             "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
//           },
//         }
//       );

//       return data;
//     }
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//   }
// };
export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/find",
        {
          params: {
            lat: lat,
            lon: lng,
          },
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_WEATHERMAP_API_KEY,
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
