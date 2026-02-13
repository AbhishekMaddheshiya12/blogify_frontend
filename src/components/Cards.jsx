import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Avatar, Badge, Box, Button, Container, Divider, IconButton,
  Paper, TextField, Typography, useMediaQuery, Chip, Stack, Grid2
} from "@mui/material";
import { Favorite as FavoriteIcon, Delete, Edit, AccessTime } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import Header from "./Header.jsx";
import SmallCards from "./SmallCards.jsx";
import DisplayComments from "../pages/DisplayComments.jsx";
import WritingLoader from "./Loading.jsx";

function Cards() {
  const [likes, setLikes] = useState(0);
  const [blog, setBlogs] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loader,setLoader] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
  const { user } = useSelector((state) => state.auth);

  const formattedDate = blog?.createdAt 
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : "";

  const fetchAllData = async () => {
    try {
      setLoader(true);
      const [blogRes, likesRes, commentsRes] = await Promise.all([
        axios.get(`https://blogify-backend-1-porw.onrender.com/user/getblog/${param._id}`, { withCredentials: true }),
        axios.get(`https://blogify-backend-1-porw.onrender.com/user/getlikes/${param._id}`, { withCredentials: true }),
        axios.get(`https://blogify-backend-1-porw.onrender.com/user/getcomment/${param._id}`, { withCredentials: true })
      ]);
      setBlogs(blogRes.data.blog);
      setLikes(likesRes.data?.likes?.length || 0);
      setComments(commentsRes.data?.comments || []);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (param._id) fetchAllData();
  }, [param._id]);

  const handleLikes = async () => {
    try {
      await axios.post(`https://blogify-backend-1-porw.onrender.com/user/addlikes/${param._id}`, {}, { withCredentials: true });
      toast.success("Liked!");
      const response = await axios.get(`https://blogify-backend-1-porw.onrender.com/user/getlikes/${param._id}`, { withCredentials: true });
      setLikes(response.data?.likes?.length || 0);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error liking post");
    }
  };

  const handleComments = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(`https://blogify-backend-1-porw.onrender.com/user/addComment/${param._id}`, { comment }, { withCredentials: true });
      toast.success("Commented");
      setComment("");
      const response = await axios.get(`https://blogify-backend-1-porw.onrender.com/user/getcomment/${param._id}`, { withCredentials: true });
      setComments(response.data?.comments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      setLoader(true);
      const res = await axios.delete(`https://blogify-backend-1-porw.onrender.com/user/deleteblog/${param._id}`, { withCredentials: true });
      if (res?.data?.success) {
        toast.success("Post deleted");
        navigate("/");
      }
      setLoader(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <Box sx={{ minHeight: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <WritingLoader />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid2 container spacing={5}>
          
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ p: isMobile ? 2 : 5, borderRadius: "20px", border: "1px solid #f0f0f0", bgcolor: "#fff" }}>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={blog?.creator?.avatar} sx={{ width: 52, height: 52, border: "2px solid #e2e8f0" }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#1e293b" }}>{blog?.creator?.username}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" color="#64748b">
                      <AccessTime sx={{ fontSize: 14 }} />
                      <Typography variant="caption" fontWeight={500}>{formattedDate}</Typography>
                    </Stack>
                  </Box>
                </Stack>

                {blog?.creator?._id === user?._id && (
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => navigate(`/editblog/${param._id}`)} sx={{ bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}>
                      <Edit fontSize="small" sx={{ color: "#475569" }} />
                    </IconButton>
                    <IconButton onClick={deleteHandler} sx={{ bgcolor: "#fff1f1", color: "#ef4444", "&:hover": { bgcolor: "#fee2e2" } }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>

              <Typography variant={isMobile ? "h4" : "h2"} sx={{ fontWeight: 900, fontFamily: "'Inter', sans-serif", mb: 2, color: "#0f172a", lineHeight: 1.2 }}>
                {blog.title}
              </Typography>
              
              <Typography variant="h6" sx={{ color: "#475569", mb: 4, fontWeight: 500, lineHeight: 1.5 }}>
                {blog.subtitle}
              </Typography>

              <Box 
                component="img" 
                src={blog.selectedImage?.url} 
                sx={{ 
                  width: "100%", 
                  borderRadius: "16px", 
                  mb: 5, 
                  boxShadow: "0 20px 50px rgba(0,0,0,0.08)", 
                  maxHeight: "550px", 
                  objectFit: "cover" 
                }} 
              />

              <Box sx={{ fontSize: "1.15rem", lineHeight: 2, color: "#334155", "& p": { mb: 3 } }}>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </Box>

              <Divider sx={{ my: 6, opacity: 0.5 }} />

              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: "#0f172a" }}>Discussion ({comments.length})</Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 5 }}>
                <TextField 
                  fullWidth 
                  placeholder="Share your thoughts..." 
                  variant="outlined" 
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)} 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} 
                />
                <Button 
                  variant="contained" 
                  onClick={handleComments} 
                  sx={{ px: 4, borderRadius: "12px", bgcolor: "#0f172a", textTransform: "none", fontWeight: 700, "&:hover": { bgcolor: "#1e293b" } }}
                >
                  Post
                </Button>
              </Box>
              <DisplayComments comments={comments} />
            </Paper>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: "100px" }}>

              <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #f1f5f9", mb: 4, bgcolor: "#fff" }}>
                <Typography variant="overline" sx={{ color: "#64748b", fontWeight: 700, mb: 2, display: "block" }}>Engagement</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconButton 
                      onClick={handleLikes} 
                      sx={{ 
                        border: "1.5px solid #f1f5f9", 
                        transition: "all 0.2s", 
                        "&:hover": { bgcolor: "#fff1f1", borderColor: "#fecaca" } 
                      }}
                    >
                      <Badge badgeContent={likes} color="error" sx={{ "& .MuiBadge-badge": { fontWeight: 700 } }}>
                        <FavoriteIcon color={likes > 0 ? "error" : "disabled"} />
                      </Badge>
                    </IconButton>
                    <Typography variant="body2" fontWeight={800} color="#334155">Likes</Typography>
                  </Stack>
                  <Chip label="Genre: Tech" size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontWeight: 700, borderRadius: "8px" }} />
                </Stack>
              </Paper>

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, px: 1, color: "#0f172a" }}>Up Next</Typography>
              <Box sx={{ "& > *": { mb: 2 } }}>
                <SmallCards blogId={param._id} />
              </Box>
            </Box>
          </Grid2>

        </Grid2>
      </Container>

      <Box component="footer" sx={{ py: 8, bgcolor: "#0f172a", color: "white", textAlign: "center", mt: 10 }}>
        <Typography variant="h6" fontWeight={800} sx={{ opacity: 0.9 }}>Blogify</Typography>
        <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
          © 2026 Blogify | Built for the next generation of creators.
        </Typography>
      </Box>
    </Box>
  );
}

export default Cards;