import { Edit, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  Chip,
  AppBar,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
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
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogify-backend-1-porw.onrender.com/user/getblogsbyUser`,
          { withCredentials: true }
        );
        setBlogs(response?.data?.blogs || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const profileDetails = {
    avatar: user?.avatar?.url || "https://via.placeholder.com/150",
    name: user?.username,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    bio: user?.bio,
    socialLinks: {
      linkedin: user?.linkedin || "#",
      github: user?.github || "#",
      twitter: user?.twitter || "#",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8f9fa", pb: 10 }}>
     
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: "white", 
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          width: "100%" 
        }}
      >
        <Header />
      </AppBar>
      <Container maxWidth="lg">
        <Card
          sx={{
            mt: 4,
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0px 20px 40px rgba(0,0,0,0.06)",
            border: "1px solid #f0f0f0",
          }}
        >
          <Box
            sx={{
              height: 200,
              background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => navigate("/update")}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                bgcolor: "white",
                color: "black",
                "&:hover": { bgcolor: "#f1f1f1" },
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <CardContent sx={{ px: { xs: 2, md: 5 }, pb: 5 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{
                mt: -7,
                alignItems: { xs: "center", sm: "flex-end" },
                mb: 4,
              }}
            >
              <Avatar
                src={profileDetails.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  border: "6px solid white",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                }}
              />

              <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" }, pb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: "-0.5px" }}>
                  {profileDetails.name || "Storyteller"}
                </Typography>
                <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 500 }}>
                  {profileDetails.email}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 2, justifyContent: { xs: "center", sm: "flex-start" }, flexWrap: "wrap", gap: 1 }}
                >
                  {profileDetails.phone && <Chip label={profileDetails.phone} variant="outlined" sx={{ borderRadius: "8px" }} />}
                  {profileDetails.address && <Chip label={profileDetails.address} variant="outlined" sx={{ borderRadius: "8px" }} />}
                </Stack>
              </Box>

              <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
                {[
                  { icon: <LinkedIn />, link: profileDetails.socialLinks.linkedin, color: "#0077b5" },
                  { icon: <GitHub />, link: profileDetails.socialLinks.github, color: "#171515" },
                  { icon: <Twitter />, link: profileDetails.socialLinks.twitter, color: "#1DA1F2" },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.link}
                    target="_blank"
                    sx={{
                      border: "1px solid #e2e8f0",
                      color: social.color,
                      "&:hover": { bgcolor: "#f8fafc", transform: "translateY(-3px)" },
                      transition: "0.2s",
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#0f172a" }}>
                About Me
              </Typography>
              <Typography sx={{ color: "#475569", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "800px" }}>
                {profileDetails.bio || "This user hasn't written a bio yet. Stay tuned for their story!"}
              </Typography>
            </Box>

            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a" }}>
                  Your Stories
                </Typography>
                <Chip label={`${blogs.length} Posts`} sx={{ bgcolor: "#0f172a", color: "white", fontWeight: 700 }} />
              </Stack>

              {blogs.length === 0 ? (
                <Box sx={{ py: 10, textAlign: "center", bgcolor: "#f1f5f9", borderRadius: 4, border: "2px dashed #cbd5e1" }}>
                  <Typography variant="h6" sx={{ color: "#475569", fontWeight: 700 }}>No stories yet</Typography>
                  <Typography variant="body2" sx={{ color: "#64748b", mt: 1 }}>Your published blogs will appear here.</Typography>
                </Box>
              ) : (
                <Grid2 container spacing={4} sx={{ mb: 5 }}>
                  {blogs.map((blog) => (
                    <Grid2 key={blog._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                      <Link to={`/blogs/${blog._id}`} style={{ textDecoration: "none" }}>
                        <Card
                          sx={{
                            height: "100%",
                            borderRadius: 4,
                            overflow: "hidden",
                            transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            border: "1px solid #f1f5f9",
                            "&:hover": {
                              transform: "translateY(-10px)",
                              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <CardMedia component="img" height="180" image={blog?.selectedImage?.url} alt={blog?.title} />
                            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                          </Box>
                          <CardContent sx={{ p: 2.5 }}>
                            <Typography sx={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem", mb: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.8em" }}>
                              {blog.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                              {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Profile;