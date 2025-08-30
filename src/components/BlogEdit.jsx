import {
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const BlogEdit = () => {
  const navigate = useNavigate();
  const blogId = useParams()._id;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.put(
        `https://blogify-backend-1-porw.onrender.com/user/editblog/${blogId}`,
        { title, subtitle, content },
        config
      );
      toast.success(response?.data?.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Typography align="center" fontFamily={"cursive"} variant="h3" gutterBottom>
        Edit Your Blog
      </Typography>

      <Paper elevation={6} sx={{ p: isSmallScreen ? 2 : 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3} direction="column">
            <Grid2 xs={12}>
              <Typography fontFamily={"cursive"} variant="h6" mb={1}>
                New Title
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </Grid2>

            <Grid2 xs={12}>
              <Typography fontFamily={"cursive"} variant="h6" mb={1}>
                New Subtitle
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Enter new subtitle"
              />
            </Grid2>

            <Grid2 xs={12}>
              <Typography fontFamily={"cursive"} variant="h6" mb={1}>
                New Content
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                multiline
                minRows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter new content"
              />
            </Grid2>

            <Grid2 xs={12}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "dimgray" },
                  width: isSmallScreen ? "100%" : "auto",
                }}
              >
                Update Blog
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogEdit;
