import {
  AppBar,
  Box,
  Grid2,
  Paper,
  Typography,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img2 from "../assets/black-panther-marvel-superhero-nr.jpg";
import img1 from "../assets/dark-iron-man-7b.jpg";
import departments from "../assets/fake";
import img3 from "../assets/spiderman_2099_superhero_dark_background_4k_hd_superheroes.jpg";
const RecipeReviewCard = lazy(() => import("../components/Blog"));
import Header from "../components/Header.jsx";
import { useTheme } from "@mui/material/styles";
import Loading from "../components/Loading.jsx";

function NewHome() {
  const [blogs, setBlogs] = useState([]);
  const [department, setDepartment] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const API_URL = process.env.REACT_APP_API_URL;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDepartmentSelect = (dname) => {
    if (dname === "General") {
      setDepartment("");
    } else {
      setDepartment(dname);
    }
    handleMenuClose();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogify-backend-1-porw.onrender.com/user/getblogs/${
            department || ""
          }`,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [department]);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: 1 }}>
        <Header />
      </AppBar>

      <Box sx={{ height: isMobile ? "30vh" : "60vh", overflow: "hidden" }}>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={3000}
        >
          <div>
            <img src={img1} alt="Slide 1" />
          </div>
          <div>
            <img src={img2} alt="Slide 2" />
          </div>
          <div>
            <img src={img3} alt="Slide 3" />
          </div>
        </Carousel>
      </Box>

      <Box
        mt={4}
        ml={isMobile ? 2 : 12}
        display="flex"
        alignItems="center"
        justifyContent={isMobile ? "flex-start" : "center"}
      >
        {isMobile && (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
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
          </>
        )}

        <Typography
          variant="h4"
          sx={{
            fontFamily: "cursive",
            fontWeight: 600,
            color: "black",
          }}
        >
          Recent Posts
        </Typography>
      </Box>

      <Grid2 container spacing={2}>
        <Grid2 size={3} sx={{ display: isMobile ? "none" : "block" }}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              fontFamily: "cursive",
              fontWeight: 600,
              color: "black",
            }}
          >
            Departments
          </Typography>
          {departments.map((department) => (
            <Paper key={department._id} sx={{ mt: 8 }}>
              <Typography
                variant="h6"
                textAlign="center"
                onClick={() => handleDepartmentSelect(department.dname)}
                sx={{
                  fontFamily: "cursive",
                  fontWeight: 600,
                  color: "black",
                  cursor: "pointer",
                }}
              >
                {department.dname}
              </Typography>
            </Paper>
          ))}
        </Grid2>

        <Grid2
          size={isMobile ? 12 : 9}
          container
          spacing={6}
          sx={{
            maxHeight: 950,
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Loading></Loading>
              </div>
            }
          >
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
          </Suspense>
        </Grid2>
      </Grid2>

      <Box
        component="footer"
        sx={{
          backgroundColor: "black",
          color: "white",
          py: 2,
          textAlign: "center",
        }}
        mt={8}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "cursive",
            fontWeight: 600,
            color: "white",
          }}
        >
          © 2024 Blogify | All Rights Reserved
        </Typography>
      </Box>
    </>
  );
}

export default NewHome;
