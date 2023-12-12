import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function WeatherTable({ forecastData }) {
  const weatherDescriptions = {
    "clear sky": "01d",
    "few clouds": "02d",
    "scattered clouds": "03d",
    "broken clouds": "04d",
    "shower rain": "09d",
    "rain": "10d",
    "thunderstorm": "11d",
    "snow": "13d",
    "mist": "50d",
  };
  const calculateAverageTemperature = (date) => {
    const temperatures = forecastData[date].map((data) => {
      const numericTemperature = parseFloat(data.temperature.replace("°C", ""));
      return numericTemperature;
    });

    const averageTemperature =
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

    // Format the average temperature to 2 significant digits
    return averageTemperature.toFixed(2);
  };

  const getMostCommonWeatherDescription = (date) => {
    const weatherDescriptions = forecastData[date].map((data) => data.weather);
    const weatherDescriptionCount = weatherDescriptions.reduce((acc, desc) => {
      acc[desc] = (acc[desc] || 0) + 1;
      return acc;
    }, {});

    const mostCommonWeatherDescription = Object.keys(
      weatherDescriptionCount
    ).reduce((a, b) =>
      weatherDescriptionCount[a] > weatherDescriptionCount[b] ? a : b
    );

    return mostCommonWeatherDescription;
  };

  const getWeatherCodeForDescription = (description) => {
    return weatherDescriptions[description] || "unknown";
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };
  const rows = Object.keys(forecastData).map((date) => ({
    date,
    averageTemperature: calculateAverageTemperature(date),
    commonWeatherDescription: getMostCommonWeatherDescription(date),
    weatherCode: getWeatherCodeForDescription(
      getMostCommonWeatherDescription(date)
    ),
  }));


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Temperature (°C)</TableCell>
            <TableCell align="right">Weather</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.averageTemperature}</TableCell>
              <TableCell align="right" sx={{alignItems:'center', display:'flex', textTransform:'capitalize'}}>
                  {row.commonWeatherDescription}
                <img
                  src={getWeatherIcon(row.weatherCode)}
                  alt="Weather Icon"
                  style={{ width: "50px", height: "50px" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
