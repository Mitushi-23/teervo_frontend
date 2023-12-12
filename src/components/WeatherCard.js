import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function WeatherCard(props) {
  console.log();

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };
  return (
    <Box sx={{ minWidth: 275, margin: "20px" }}>
      <Card variant="outlined">
        <CardContent>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.date}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.data.time}
            </Typography>
          </div>
          <img
            src={getWeatherIcon(props.data.icon)}
            alt="Weather Icon"
            style={{ width: "50px", height: "50px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ textTransform: "capitalize" }}
          >
            {props.data.weather}
          </Typography>
          <Typography>{props.data.temperature}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
