import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";
import WeatherCard from "./WeatherCard";
import WeatherTable from "./WeatherTable";

const Form = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://weather-backend-mh8s.onrender.com/getWeather",
        {
          cities: [city],
        }
      );
      setWeatherData(response.data.weather);
      console.log(response.data);

      const response_data = await axios.post(
        "https://weather-backend-mh8s.onrender.com/getFiveDayForecast",
        {
          city: city,
        }
      );
      setForecastData(response_data.data.forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "1000px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
            }}
          >
            <TextField
              label="City"
              value={city}
              onChange={handleInputChange}
              sx={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginBottom: "20px" }}
            >
              Get Weather
            </Button>
            <Box sx={{ width: "100%" }}>
              {Object.keys(weatherData).map((city) => (
                <Paper
                  key={city}
                  sx={{
                    padding: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "25px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {city}
                    </Typography>
                    <Typography variant="body1">
                      Temperature: {weatherData[city].temperature}
                    </Typography>
                    <Typography variant="body1">
                      Humity: {weatherData[city].humidity}
                    </Typography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {weatherData[city].weatherDescription}
                    </Typography>
                    <img
                      src={getWeatherIcon(weatherData[city].icon)}
                      alt="Weather Icon"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                </Paper>
              ))}
            </Box>
          </Box>
          {forecastData && 
          <Box>
            <WeatherTable forecastData={forecastData} />
          </Box>
          }
        </Box>
        {forecastData && (
          <Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Weather Forecast
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "1000px",
                overflow: "auto",
                marginTop: "20px",
                justifyContent: "start",
              }}
            >
              {Object.keys(forecastData).map((date) =>
                forecastData[date].map((data, index) => (
                  <React.Fragment key={index}>
                    <WeatherCard date={date} data={data} />
                  </React.Fragment>
                ))
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Form;
