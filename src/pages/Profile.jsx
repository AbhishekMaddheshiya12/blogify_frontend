import { Edit, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import { Link } from "../components/Styled";
import { userExists, userNotExists } from "../redux/reducers/auth";

function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://blogify-backend-1-porw.onrender.com/user/me`, {
        withCredentials: true,
      })
      .then((res) => dispatch(userExists(res.data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogify-backend-1-porw.onrender.com/user/getblogsbyUser`,
          { withCredentials: true }
        );
        setBlogs(response?.data?.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);
  const profileDetails = {
    avatar: "https://via.placeholder.com/150",
    name: user?.username,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    bio: user?.bio,
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
    posts: blogs || [1, 2, 3, 4],
  };

  return (
    <Box>
      <Container>
        <Header />
        <Card sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Avatar
              src={profileDetails.avatar}
              sx={{ width: 130, height: 130, border: "3px solid #0073e6" }}
            />
            <Box sx={{ ml: 3, flex: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {profileDetails.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888", marginTop: 1 }}>
                {profileDetails.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                {profileDetails.phone}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                {profileDetails.address}
              </Typography>
            </Box>

            <IconButton
              sx={{ color: "black" }}
              onClick={() => navigate("/update")}
            >
              <Edit />
            </IconButton>
          </Box>

          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
            >
              {user?.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
              {profileDetails.bio}
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
              <Link
                href={profileDetails.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ "&:hover": { color: "#0073e6" } }}
              >
                <LinkedIn sx={{ fontSize: 35 }} />
              </Link>
              <Link
                href={profileDetails.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ "&:hover": { color: "#333" } }}
              >
                <GitHub sx={{ fontSize: 35 }} />
              </Link>
              <Link
                href={profileDetails.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ "&:hover": { color: "#1da1f2" } }}
              >
                <Twitter sx={{ fontSize: 35 }} />
              </Link>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
            >
              Posts
            </Typography>
            <Grid2 container spacing={2}>
              {blogs.map((blog) => (
                <Grid2 size={3} key={blog._id}>
                  <Link
                    to={`/blogs/${blog._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        height: 300,
                        backgroundColor: "white",
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                        },
                        gap: 4,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={blog.selectedImage.url}
                          alt="Recent Post"
                          sx={{ borderRadius: 1 }}
                        />
                        <Typography sx={{ mt: 1, padding: 2 }}>
                          {blog.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid2>
              ))}
            </Grid2>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Profile;
