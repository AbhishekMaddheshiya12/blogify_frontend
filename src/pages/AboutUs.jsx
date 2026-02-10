import React from 'react';
import { Box, Typography, Container, Paper, Grid2, Divider, Stack } from '@mui/material';
import Header from '../components/Header.jsx';
import image from '../assets/istockphoto-1411773944-612x612.jpg';

const AboutUs = () => {
  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh", pb: 10 }}>
      <Header />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 8 },
            borderRadius: "24px",
            border: "1px solid #f0f0f0",
            bgcolor: "#fff",
            overflow: "hidden"
          }}
        >
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src={image}
                alt="Blogify Vision"
                sx={{
                  width: '100%',
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  display: "block",
                  transition: "transform 0.5s ease",
                  "&:hover": { transform: "scale(1.02)" }
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Typography
                  variant="overline"
                  sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 2 }}
                >
                  Our Story
                </Typography>
                
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif", // Modern Serif
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.1,
                  }}
                >
                  Empowering Every Voice Through Technology.
                </Typography>

                <Divider sx={{ width: "60px", height: "4px", bgcolor: "primary.main", borderRadius: 1 }} />

                <Typography
                  variant="body1"
                  sx={{
                    color: "#475569",
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                    textAlign: 'justify',
                  }}
                >
                  Blogify is more than just a blogging platform—it's a space for innovation, creativity, and connection. 
                  Designed and developed by a passionate B.Tech student, Blogify aims to empower voices from all walks of 
                  life by providing a free, user-friendly space to share ideas, stories, and expertise.
                </Typography>
              </Stack>
            </Grid2>
          </Grid2>

          <Box sx={{ mt: 8 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                 <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, mb: 2, color: "#0f172a" }}
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#64748b", lineHeight: 1.7 }}
                >
                  To create a platform where knowledge meets inspiration. Whether you're a budding 
                  writer, a seasoned storyteller, or someone looking to explore diverse perspectives, 
                  Blogify is here for you.
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                 <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, mb: 2, color: "#0f172a" }}
                >
                  The Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#64748b", lineHeight: 1.7 }}
                >
                  Built with cutting-edge technology, Blogify represents the dedication of a developer 
                  committed to blending technology and art. Together, let's redefine the way we share stories!
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Paper>
      </Container>

      <Box component="footer" sx={{ py: 6, textAlign: "center", mt: 10 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          © 2026 Blogify | Built with ❤️ for Creators
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;