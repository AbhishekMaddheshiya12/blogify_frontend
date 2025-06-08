import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router";

function UpdateForm() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const data = {
      username,
      bio,
      email,
      address,
      phoneNumber,
      linkedin,
      github,
    };

    try {
      const response = await axios.put(
        `https://blogify-backend-1-porw.onrender.com/user/editprofile`,
        data,
        config
      );
      console.log(response);
      toast.success("Profile updated successfully!");

      setUsername("");
      setBio("");
      setEmail("");
      setAddress("");
      setPhoneNumber("");
      setLinkedin("");
      setGithub("");
      navigate("/profile");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the profile."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{}}>
      <Header></Header>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          background: "linear-gradient(to right, #f7f8fc, #ffffff)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#333", fontWeight: "bold", marginBottom: 3 }}
        >
          Update Profile
        </Typography>

        <form onSubmit={submitHandler}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" justifyContent="space-between" gap={2}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Bio"
                variant="outlined"
                value={bio}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setBio(e.target.value)}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                value={email}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                variant="outlined"
                value={phoneNumber}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Address"
                variant="outlined"
                value={address}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                variant="outlined"
                value={linkedin}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="GitHub Profile"
                variant="outlined"
                value={github}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                onChange={(e) => setGithub(e.target.value)}
              />
            </Box>

            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button
                onClick={submitHandler}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "black",
                  color: "#fff",
                  paddingX: 4,
                  paddingY: 1.5,
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default UpdateForm;
