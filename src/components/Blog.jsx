import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

export default function RecipeReviewCard(props) {
  const { _id, title, subtitle, updateTime, image } = props;

  return (
    <Link to={`/blogs/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card 
        sx={{ 
          maxWidth: 320, 
          height: 380, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: "24px", 
          backgroundColor: "#fff",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)", 
          willChange: "transform, box-shadow", 
          border: "1px solid #f0f0f0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
          overflow: "hidden",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            backgroundColor: "#ffffff",
          },
          "&:active": {
            transform: "translateY(-4px) scale(0.98)", 
          }
        }}
      >
        <CardMedia 
          component="img" 
          height="180" 
          image={image || "https://via.placeholder.com/320x180?text=No+Image"} 
          sx={{ 
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            ".MuiCard-root:hover &": {
              transform: "scale(1.1)", 
            }
          }}
        />

        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            sx={{
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "#1e293b",
              height: "2.6em", 
              lineHeight: "1.3em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 1
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="body2" 
            sx={{
              color: "#3b82f6", 
              fontWeight: 600,
              fontSize: "0.9rem",
              height: "1.4em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 2
            }}
          >
            {subtitle}
          </Typography>

          <Box sx={{ mt: "auto" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 500 }}>
              {new Date(updateTime).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short'
              })}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}