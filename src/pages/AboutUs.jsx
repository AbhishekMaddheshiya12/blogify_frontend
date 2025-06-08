import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import Header from '../components/Header.jsx';
import image from '../assets/istockphoto-1411773944-612x612.jpg'

const AboutUs = () => {
  return (
    <Container maxWidth="md" >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
          borderRadius: 3,
        }}
      >
        <Header></Header>
        <Box
        mt={3}
          component="img"
          src={image}
          alt="Blogify Banner"
          sx={{
            width: '100%',
            borderRadius: 2,
            mb: 3,
            boxShadow: 2,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 600,
            mb: 2,
            color: 'black',
          }}
        >
          Welcome to Blogify
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 600,
            color: 'gray',
            textAlign: 'justify',
            mb: 2,
          }}
        >
          Blogify is more than just a blogging platform—it's a space for innovation, creativity, and connection. 
          Designed and developed by a passionate B.Tech student, Blogify aims to empower voices from all walks of 
          life by providing a free, user-friendly space to share ideas, stories, and expertise.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 600,
            color: 'gray',
            textAlign: 'justify',
            mb: 2,
          }}
        >
          Our mission is simple: to create a platform where knowledge meets inspiration. Whether you're a budding 
          writer, a seasoned storyteller, or someone looking to explore diverse perspectives, Blogify is here for 
          you. With its sleek design and modern features, Blogify ensures that every post you create is a masterpiece.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 600,
            color: 'gray',
            textAlign: 'justify',
          }}
        >
          Built with cutting-edge technology, Blogify represents the dedication of a developer committed to blending 
          technology and art. So, dive in, start blogging, and join a growing community of thinkers and dreamers. 
          Together, let's redefine blogging!
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
