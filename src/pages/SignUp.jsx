import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined, 
  PersonOutline, 
  BadgeOutlined 
} from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !username || !password) return toast.error("Please fill all fields");

    setLoading(true);
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        `https://blogify-backend-1-porw.onrender.com/user/signup`,
        { name, username, password },
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
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
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Identity Icon */}
          <Box
            sx={{
              width: 50,
              height: 50,
              bgcolor: "black",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" color="white" fontWeight={900}>B</Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-1px",
              textAlign: "center",
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4} textAlign="center">
            Start your journey with Blogify today.
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                disabled={loading}
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
                disabled={loading}
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
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" disabled={loading}>
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
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.8,
                  borderRadius: "12px",
                  bgcolor: "black",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#222" },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Join Community"}
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              disabled={loading}
              sx={{
                color: "black",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
              }}
            >
              Log in here
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;