import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Input,
  Button,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Include Quill styles
import placeholderImage from "../assets/anime-style-portrait-young-student-attending-school_23-2151125072.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router";
import { FormControl } from "@mui/material";
import { InputLabel, Select, MenuItem } from "@mui/material";

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const API_URL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [category, setCategory] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("subtitle", formData.subtitle);
    formdata.append("content", formData.content);
    formdata.append("userId", user._id);
    formdata.append("category", category);
    if (!selectedImage) {
      formdata.append("selectedImage", placeholderImage);
    } else {
      formdata.append("selectedImage", selectedImage);
    }

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const { data } = await axios.post(
        `https://blogify-backend-1-porw.onrender.com/user/uploadblog`,
        formdata,
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Container>
      <Header></Header>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            component="img"
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : placeholderImage
            }
            alt="Blog Banner"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              color="black"
              onClick={handleFileClick}
              sx={{ marginBottom: "20px" }}
            >
              Add Images<span style={{fontWeight:"bold",color:"red"}}>(mandatory)</span>
            </Button>
            <Input
              type="file"
              sx={{ display: "none" }}
              onChange={handleFileChange}
              inputRef={fileInputRef}
            />
            <FormControl sx={{ width: "30%" }} variant="standard">
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category_select"
                value={category}
                onChange={(e) => {
                  console.log(category);
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value={"Science"}>Science</MenuItem>
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Computer Science And Technology"}>
                  Computer Science And Technology
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h5" gutterBottom>
            Title
          </Typography>
          <TextField
            id="title"
            variant="standard"
            fullWidth
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleInputChange("title")}
          />

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Subtitle
          </Typography>
          <TextField
            id="subtitle"
            variant="standard"
            fullWidth
            placeholder="Enter blog subtitle"
            value={formData.subtitle}
            onChange={handleInputChange("subtitle")}
          />

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Content
          </Typography>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            theme="snow"
            placeholder="Enter blog content..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                [{ font: [] }],
                [{ color: [] }, { background: [] }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />

          <Button
            variant="contained"
            sx={{ backgroundColor: "black", marginTop: "20px" }}
            type={"submit"}
          >
            Create Blog
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateBlog;
