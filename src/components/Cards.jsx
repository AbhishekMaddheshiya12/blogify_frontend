import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import DisplayComments from "../pages/DisplayComments.jsx";
import Header from "./Header.jsx";
import SmallCards from "./SmallCards.jsx";
import { useSelector } from "react-redux";
import { Delete, Edit, EditAttributes } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function Cards() {
  const [likes, setLikes] = useState([]);
  const [blog, setBlogs] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  // const API_URL = process.env.REACT_APP_API_URL;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://blogify-backend-1-porw.onrender.com/user/getblog/${param._id}`,
          { withCredentials: true }
        );
        if (response.data) {
          setBlogs(response.data.blog);
        }
      } catch (error) {
        console.error("Error fetching blogs:");
      }
    };

    if (param._id) getData(); 
  }, [param._id]);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `https://blogify-backend-1-porw.onrender.com/user/getcomment/${param._id}`,
        { withCredentials: true }
      );
      if (response.data) {
        setComments(response.data?.comments);
      }
    } catch (error) {
      console.log(error);
      toast.error("There is some error");
    }
  };

  const getLikes = async () => {
    try {
      const response = await axios.get(
        `https://blogify-backend-1-porw.onrender.com/user/getlikes/${param._id}`,
        { withCredentials: true }
      );
      setLikes(response.data?.likes?.length);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };


  const date = new Date(blog?.createdAt);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const handleLikes = async () => {
    try {
      const response = await axios.post(
        `https://blogify-backend-1-porw.onrender.com/user/addlikes/${param._id}`,
        {},
        { withCredentials: true }
      );
      console.log(response?.data?.message);
      toast.success("You Like this Blog");
      getLikes();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleComments = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `https://blogify-backend-1-porw.onrender.com/user/addComment/${param._id}`,
        { comment },
        { withCredentials: true }
      );
      console.log(response?.data?.message);
      toast.success("You Commented on this Blog");
      setComment("");
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
    getComments();
  }, []);

  const deleteHandler = async() => {
    try{
      const res = await axios.delete(`https://blogify-backend-1-porw.onrender.com/user/deleteblog/${param._id}`,{withCredentials:true});
      console.log(res);
      if(res?.data?.success){
        toast.success(res?.data?.message);
        navigate("/");
      }
    }catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }

  const {user} = useSelector((state) => state.auth);

  return (
    <Container>
      <Header></Header>
      <Paper elevation={6} sx={{ padding: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box variant="body2" color="text.secondary">
            <Typography sx={{ fontWeight: 600 ,fontFamily:'cursive'}} >Created At</Typography>
            {day}/{month}/{year}
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar src={blog?.creator?.avatar} />
            <Typography variant="body1" sx={{ fontWeight: 600 ,fontFamily:'cursive'}}>{blog?.creator?.username}</Typography>

            {
              (blog?.creator?._id === user._id)?<>
                <IconButton sx={{color:"black",display:isMobile?"none":"block"}} onClick={deleteHandler}>
                  <Delete></Delete>
                </IconButton>
                  <Button
                  sx={{color:"black",display:isMobile?"none":"block"}}
                    title="Edit"
                    startIcon={<Edit sx={{color:"black"}} />}
                    onClick={() => navigate(`/editblog/${param._id}`)}
                  />
              </>:<></>
            }
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 ,fontFamily:'cursive'}}>
          {blog.title}
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 ,fontFamily:'cursive'}}>
          {blog.subtitle}
        </Typography>

        <Box
          component="img"
          src={blog.selectedImage?.url}
          alt="Blog Banner"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "500px",
            objectFit: "cover",
            mb: 3,
          }}
        />

        <Box variant="body2" color="text.secondary">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Box>

        <Divider sx={{ mt: 3, mb: 2, bgcolor: "black", height: 2 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={handleLikes}>
            <Badge
              badgeContent={likes > 0 ? likes : 0}
              color="error"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <FavoriteIcon color="error" />
            </Badge>
          </IconButton>

          <Typography>SuperHero Jonra</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Comment"
            variant="standard"
            color="black"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button color="black" onClick={handleComments}>
            Comment
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <DisplayComments comments={comments}></DisplayComments>
        </Box>

        <Divider sx={{ mt: 2, bgcolor: "black", height: 2 }} />

        <Typography textAlign={"center"} variant="h4" my={2} sx={{fontFamily:"cursive", fontWeight:600}}>Top Blogs</Typography>
        <SmallCards blogId = {param._id}></SmallCards>

        
      </Paper>
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
        <Typography variant="h6"
          textAlign={"center"}
            sx={{
              fontFamily: "cursive",
              fontWeight: 600,
              color: "white",
              textUnderlineOffset: false,
            }}>
          © 2024 Blogify | All Rights Reserved
        </Typography>
      </Box>
    </Container>
  );
}

export default Cards;
