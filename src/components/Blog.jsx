import { Box, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import { Link } from "./Styled";

export default function RecipeReviewCard(props) {
  const { _id, title, subtitle, content, updateTime, image} = props;
  const description = content.substr(0,200);
  // const API_URL = process.env.REACT_APP_API_URL;
  return (
    <Link to={`/blogs/${_id}`}>
      <Card sx={{ maxWidth: 280,maxHeight:350}}>
       <Typography variant="h6" color="text.primary" sx={{
              fontFamily: "cursive",
              fontWeight: 400,
              color: "black",
              textUnderlineOffset: false,
              paddingTop:2,
              paddingX:2,
            }}>{title}</Typography> 
            <Typography variant="body2" mb={2} mx={2}>{updateTime}</Typography>
        <CardMedia component="img" height="194" image={image} />
        <CardHeader subheader={subtitle}/> 
          <CardContent>
          <Box variant="body2" color="text.secondary">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Box>
          </CardContent>
      </Card>
    </Link>
  );
}
