import React, { useEffect, useState } from "react";
import {
  Box, Container, Paper, TextField, Typography, Button, 
  Grid, InputAdornment, Divider, Stack
} from "@mui/material";
import { 
  Person, Badge, Email, Phone, Home, LinkedIn, GitHub 
} from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function UpdateForm() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    email: "",
    address: "",
    phoneNumber: "",
    linkedin: "",
    github: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Pre-fill form with existing user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        bio: user.bio || "",
        email: user.email || "",
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      await axios.put(
        `https://blogify-backend-1-porw.onrender.com/user/editprofile`,
        formData,
        config
      );
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#fbfbfb", minHeight: "100vh", pb: 6 }}>
      <Header />
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 4,
            borderRadius: "24px",
            border: "1px solid #f0f0f0",
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 800, 
              mb: 1, 
              textAlign: "center",
              fontFamily: "serif" 
            }}
          >
            Settings
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Update your public profile and contact information
          </Typography>

          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              
              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "primary.main" }}>
                  Basic Information
                </Typography>
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="username"
                      label="Username"
                      value={formData.username}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Person fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="bio"
                      label="Bio / Tagline"
                      value={formData.bio}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Badge fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "primary.main" }}>
                  Contact Details
                </Typography>
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Email fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Phone fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      name="address"
                      label="Address"
                      value={formData.address}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}><Home fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "primary.main" }}>
                  Professional Links
                </Typography>
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="linkedin"
                      label="LinkedIn URL"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><LinkedIn fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="github"
                      label="GitHub URL"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><GitHub fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box display="flex" justifyContent="center" pt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    px: 6,
                    py: 1.5,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#222",
                      transform: "scale(1.02)",
                    },
                    transition: "0.2s all ease-in-out",
                  }}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default UpdateForm;