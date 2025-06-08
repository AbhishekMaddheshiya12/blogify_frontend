import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { useNavigate } from "react-router";

const Login = (currentLocation) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const API_URL = process.env.REACT_APP_API_URL;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      dispatch(userExists(true));
      toast.success(data.message);
      navigate(currentLocation);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Some error occurred");
      }
    }

    setUsername("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "80%", md: "25%" },
          height: { xs: "auto", md: "60%" },
          padding: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "cursive",
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Login
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "1rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            fullWidth
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontFamily: "cursive",
              fontWeight: 600,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Login
          </Button>
        </form>

        <Typography
          mt={2}
          sx={{
            fontFamily: "cursive",
            fontWeight: 600,
            textAlign: "center",
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          Don't have an account?
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate("/signup")}
          sx={{ color: "black", fontFamily: "cursive", fontWeight: 600 }}
        >
          Signup
        </Button>
      </Paper>
    </Box>
  );
};

export { Login };
