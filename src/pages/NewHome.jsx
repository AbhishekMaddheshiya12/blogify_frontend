import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Grid2,
  Typography,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img2 from "../assets/img2.png";
import img3 from "../assets/img3.jpg";
import img1 from "../assets/istockphoto-1411773944-612x612.jpg";
import departments from "../assets/fake";
import Header from "../components/Header.jsx";
import Loading from "../components/Loading.jsx";

const RecipeReviewCard = lazy(() => import("../components/Blog"));

function NewHome() {
  const [blogs, setBlogs] = useState([]);
  const [department, setDepartment] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDepartmentSelect = (dname) => {
    setDepartment(dname === "General" ? "" : dname);
    handleMenuClose();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogify-backend-1-porw.onrender.com/user/getblogs/${department || ""}`,
          { withCredentials: true },
        );
        if (response.data) setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [department]);

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          color: "black",
          boxShadow: "0 2px 15px rgba(0,0,0,0.04)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: 1100,
        }}
      >
        <Header />
      </AppBar>

      <Box
        sx={{
          height: isMobile ? "35vh" : "65vh",
          width: "100%",
          overflow: "hidden",
          bgcolor: "#000",
        }}
      >
        {/* CAROUSEL SECTION */}
        <Box
          sx={{
            height: isMobile ? "35vh" : "65vh",
            width: "100%",
            overflow: "hidden",
            bgcolor: "#1a1a1a",
          }}
        >
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            interval={5000}
            transitionTime={800}
            stopOnHover={false}
            // Removing 'fade' for a moment to ensure 'slide' works first
          >
            {[img1, img2, img3].map((img, i) => (
              <Box
                key={i}
                sx={{
                  height: isMobile ? "35vh" : "65vh",
                  width: "100%",
                  position: "relative",
                  // Using backgroundImage is much more "buttery" and stable in Vite
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Text Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "70%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    p: isMobile ? 4 : 10,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant={isMobile ? "h4" : "h2"}
                    color="white"
                    fontWeight={900}
                    sx={{
                      textShadow: "0 4px 15px rgba(0,0,0,0.5)",
                      maxWidth: "800px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Discover Amazing Stories
                  </Typography>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>

      {/* CONTENT SECTION */}
      <Grid2 container spacing={4} sx={{ p: isMobile ? 2 : 6 }}>
        {!isMobile && (
          <Grid2 size={2.5}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, mb: 2, px: 1, color: "#1e293b" }}
            >
              Categories
            </Typography>
            <List>
              {departments.map((dep) => (
                <ListItemButton
                  key={dep._id}
                  onClick={() => handleDepartmentSelect(dep.dname)}
                  selected={
                    department === dep.dname ||
                    (dep.dname === "General" && department === "")
                  }
                  sx={{
                    borderRadius: "14px",
                    mb: 1,
                    "&.Mui-selected": {
                      backgroundColor: "#f3e5f5",
                      color: "#7b1fa2",
                      "&:hover": { backgroundColor: "#ede7f6" },
                    },
                  }}
                >
                  <ListItemText
                    primary={dep.dname}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid2>
        )}

        <Grid2 size={isMobile ? 12 : 9.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
              {department || "Recent Stories"}
            </Typography>
            {isMobile && (
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          <Grid2 container spacing={4}>
            <Suspense fallback={<Loading />}>
              {blogs.map((blog, index) => (
                <Grid2
                  key={blog._id}
                  size={{ xs: 12, sm: 6, md: 4 }}
                  sx={{
                    animation: "fadeInUp 0.6s ease forwards",
                    opacity: 0,
                    animationDelay: `${index * 0.1}s`,
                    "@keyframes fadeInUp": {
                      from: { opacity: 0, transform: "translateY(20px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <RecipeReviewCard
                    _id={blog._id}
                    title={blog.title}
                    subtitle={blog.subtitle}
                    updateTime={blog.updatedAt}
                    image={blog.selectedImage?.url}
                  />
                </Grid2>
              ))}
            </Suspense>
          </Grid2>
        </Grid2>
      </Grid2>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {departments.map((dep) => (
          <MenuItem
            key={dep._id}
            onClick={() => handleDepartmentSelect(dep.dname)}
          >
            {dep.dname}
          </MenuItem>
        ))}
      </Menu>

      <Box
        component="footer"
        sx={{
          py: 6,
          bgcolor: "#0f172a",
          color: "white",
          textAlign: "center",
          mt: 10,
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © 2026 Blogify | Built with Precision
        </Typography>
      </Box>
    </Box>
  );
}

export default NewHome;
