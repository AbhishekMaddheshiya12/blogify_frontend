import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeReviewCard from "./Blog.jsx";

export default function SmallCards({blogId}) {
  const [blogs, setBlogs] = useState([]);
  // const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogify-backend-1-porw.onrender.com/user/getblogs`,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          setBlogs(getRandomElements(response.data.blogs, 3));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [blogId]);

  function getRandomElements(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {blogs.map((blog) => (
        <RecipeReviewCard
          key={blog._id}
          _id={blog._id}
          title={blog.title}
          subtitle={blog.subtitle}
          content={blog.content}
          updateTime={blog.updatedAt}
          image={blog.selectedImage?.url}
          blogs={blogs}
        />
      ))}
    </Box>
  );
}
