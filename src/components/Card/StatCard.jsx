import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, update, date }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2" color="textSecondary">
          {update}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Updated: {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
