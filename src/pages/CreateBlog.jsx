import React, { useRef, useState } from "react";
import {
  Container, Paper, TextField, Typography, Box, Input, Button,
  FormControl, InputLabel, Select, MenuItem, Stack
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "", content: "" });
  const [category, setCategory] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !category) {
      return toast.error("Please fill in all required fields.");
    }

    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("subtitle", formData.subtitle);
    formdata.append("content", formData.content);
    formdata.append("userId", user._id);
    formdata.append("category", category);
    formdata.append("selectedImage", selectedImage);

    try {
      const { data } = await axios.post(
        `https://blogify-backend-1-porw.onrender.com/user/uploadblog`,
        formdata,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(userExists(true));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to create blog.");
    }
  };

  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh", pb: 10 }}>
      <Header />
      <Container maxWidth="md">
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, md: 5 }, 
            mt: 4, 
            borderRadius: "24px", 
            border: "1px solid #f0f0f0",
            bgcolor: "#fff"
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" sx={{ fontWeight: 900, textAlign: "center", mb: 4, fontFamily: "serif" }}>
              Craft a New Story
            </Typography>
            <Box sx={{ position: "relative", mb: 4, borderRadius: "20px", overflow: "hidden" }}>
              <Box
                component="img"
                src={selectedImage ? URL.createObjectURL(selectedImage) : "https://via.placeholder.com/1200x500?text=Upload+Hero+Image"}
                sx={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  display: "block",
                  filter: !selectedImage ? "grayscale(1)" : "none",
                  transition: "0.3s"
                }}
              />
              <Box sx={{
                position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current.click()}
                  sx={{ 
                    bgcolor: "rgba(255,255,255,0.9)", 
                    color: "#000", 
                    fontWeight: 700,
                    borderRadius: "12px",
                    px: 3,
                    "&:hover": { bgcolor: "#fff" }
                  }}
                >
                  {selectedImage ? "Change Image" : "Upload Banner"}
                </Button>
                <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
              </Box>
            </Box>

            <Stack spacing={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Choose Category</InputLabel>
                <Select
                  value={category}
                  label="Choose Category"
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ borderRadius: "12px" }}
                >
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Music">Music</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Computer Science">Computer Science & IT</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "text.secondary" }}>Blog Title</Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Type your headline here..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  InputProps={{ sx: { fontSize: "2rem", fontWeight: 800, fontFamily: "serif" } }}
                />
              </Box>

              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "text.secondary" }}>Subtitle / Summary</Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Give a quick hook for your readers..."
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  InputProps={{ sx: { fontSize: "1.2rem", color: "text.secondary" } }}
                />
              </Box>

              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "text.secondary", mb: 1, display: "block" }}>
                  The Content
                </Typography>
                <Box sx={{ 
                  "& .ql-container": { minHeight: "350px", borderRadius: "0 0 12px 12px", fontSize: "1.1rem" },
                  "& .ql-toolbar": { borderRadius: "12px 12px 0 0", bgcolor: "#f8f9fa" }
                }}>
                  <ReactQuill
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val})}
                    theme="snow"
                    placeholder="Tell your story..."
                  />
                </Box>
              </Box>

              <Button
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                sx={{
                  py: 2,
                  bgcolor: "#000",
                  borderRadius: "15px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#333", transform: "scale(1.01)" },
                  transition: "0.2s"
                }}
              >
                Publish Story
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateBlog;