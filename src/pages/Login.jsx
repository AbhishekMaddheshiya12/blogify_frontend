import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, PersonOutline } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { useNavigate } from "react-router";

const Login = ({ currentLocation = "/" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        `https://blogify-backend-1-porw.onrender.com/user/login`,
        { username, password },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
      navigate(currentLocation);
    } catch (error) {
      toast.error(error.response?.data?.message || "Some error occurred");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "24px",
            border: "1px solid #f0f0f0",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "translateY(-5px)" },
          }}
        >
          {/* Brand/Logo Area */}
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: "black",
              borderRadius: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" color="white" fontWeight={900}>
              B
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-1px",
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Enter your details to continue your story.
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  py: 1.8,
                  borderRadius: "12px",
                  bgcolor: "black",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { 
                    bgcolor: "#222", 
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)" 
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate("/signup")}
              sx={{
                color: "black",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
              }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;