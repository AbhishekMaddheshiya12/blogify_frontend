import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        `https://blogify-backend-1-porw.onrender.com/user/signup`,
        { name, username, password },
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      if (error.response?.status) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Some error occurred");
      }
    }

    setName("");
    setUsername("");
    setPassword("");
  };

  return (
    <Container
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
          width: { xs: "90%", sm: "80%", md: "30%" },
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
          SignUp
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
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            SignUp
          </Button>
        </form>

        <Typography
          mt={2}
          sx={{ fontFamily: "cursive", fontWeight: 600, textAlign: "center" }}
        >
          Already have an account?
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate("/login")}
          sx={{ color: "black", fontFamily: "cursive", fontWeight: 600 }}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
