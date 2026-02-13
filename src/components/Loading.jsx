import React from 'react';
import { Box, Typography } from '@mui/material';

const WritingLoader = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 12, 
        width: '100%',
        perspective: '1000px' 
      }}
    >
      <Box sx={{
        width: '100px', 
        height: '70px', 
        border: '4px solid #0f172a',
        borderRadius: '8px',
        position: 'relative',
        bgcolor: '#fff',
        animation: 'tilt 3s infinite ease-in-out',
        boxShadow: '0 10px 0 #e2e8f0', 
        
        '&::before': { 
          content: '""',
          position: 'absolute',
          width: '6px', 
          height: '25px',
          bgcolor: '#3b82f6',
          top: '-15px',
          left: '15px',
          borderRadius: '3px',
          transformOrigin: 'bottom center',
          animation: 'scribble 1.5s infinite ease-in-out'
        },
        
        '&::after': { 
          content: '""',
          position: 'absolute',
          width: '0%',
          height: '3px',
          bgcolor: '#94a3b8',
          top: '15px',
          left: '15px',
          borderRadius: '2px',
          boxShadow: '0 15px 0 #cbd5e1, 0 30px 0 #cbd5e1',
          animation: 'fillLines 1.5s infinite ease-in-out'
        },

        '@keyframes scribble': {
          '0%': { transform: 'rotate(20deg) translateX(0)', left: '15px' },
          '25%': { transform: 'rotate(35deg) translateX(5px)', top: '-18px' },
          '50%': { transform: 'rotate(20deg) translateX(0)', left: '70px', top: '-12px' },
          '75%': { transform: 'rotate(35deg) translateX(-5px)', top: '-18px' },
          '100%': { transform: 'rotate(20deg) translateX(0)', left: '15px' }
        },
        
        '@keyframes fillLines': {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '0%' }
        },

        '@keyframes tilt': {
          '0%, 100%': { transform: 'rotateY(-10deg) rotateX(5deg)' },
          '50%': { transform: 'rotateY(10deg) rotateX(-5deg)' }
        }
      }} />

      <Box sx={{
        width: '80px',
        height: '10px',
        bgcolor: 'rgba(0,0,0,0.05)',
        borderRadius: '50%',
        mt: 3,
        animation: 'shadowPulse 3s infinite ease-in-out',
        '@keyframes shadowPulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
          '50%': { transform: 'scale(1.3)', opacity: 0.2 }
        }
      }} />

      <Typography 
        variant="h6" 
        sx={{ 
          mt: 3, 
          fontWeight: 900, 
          color: '#0f172a', 
          letterSpacing: 2,
          fontFamily: 'serif',
          animation: 'textFade 1.5s infinite alternate',
          '@keyframes textFade': {
            from: { opacity: 0.5 },
            to: { opacity: 1 }
          }
        }}
      >
        DRAFTING YOUR MASTERPIECE...
      </Typography>
    </Box>
  );
};

export default WritingLoader;