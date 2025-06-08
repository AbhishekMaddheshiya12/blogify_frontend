import {
  Button,
  Container,
  Paper,
  TextField,
  TextareaAutosize,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useNavigate, useParams } from "react-router";

const BlogEdit = () => {

  const navigate = useNavigate();
  const blogId = useParams()._id;
  const [content, setContent] = useState("");
  const [title,setTitle] = useState("");
  const [subtitle,setSubtitle] = useState("");
  // const API_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const config = {
        withCredentials:true,
        headers:{'Content-Type':'application/json'}
      }
      const response = await axios.put(`https://blogify-backend-1-porw.onrender.com/user/editblog/${blogId}`,{title,subtitle,content},config);
      toast.success(response?.data?.message, {
      });
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <Container>
      
        <Typography align="center" fontFamily={"cursive"} variant="h3" my={5}>
          Edit Your blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <Paper elevation={6}>
            <Typography
              sx={{ paddingX: 3, paddingTop: 2 }}
              fontFamily={"cursive"}
              varient="h6"
            >
              New Title
            </Typography>
            <TextField
              sx={{ paddingX: 3 }}
              variant="standard"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>

            <Typography
              sx={{ paddingX: 3, paddingTop: 2 }}
              fontFamily={"cursive"}
              varient="h6"
            >
              New SubTitle
            </Typography>
            <TextField
              sx={{ paddingX: 3 }}
              variant="standard"
              fullWidth
              onChange={(e) => setSubtitle(e.target.value)}
            ></TextField>

            <Typography
              sx={{ paddingX: 3, paddingTop: 2 }}
              fontFamily={"cursive"}
              varient="h6"
            >
              New Content
            </Typography>
            <TextareaAutosize
              variant="standard"
              onChange={(e) => setContent(e.target.value)}
              style={{
                padding: "0 24px",
                height: "300px",
                resize: "none",
                width: "96%",
                marginLeft: 20,
                marginTop: 20, 
              }}
            />
             <Button variant="contained" sx={{backgroundColor:"black", marginLeft:2,marginY:4}}  type="submit">Update Form</Button>
          </Paper>
        </form>

    </Container>
  );
};

export default BlogEdit;
