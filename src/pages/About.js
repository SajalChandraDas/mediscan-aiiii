import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

function About() {
  const technologies = [
    { name: 'React', category: 'Frontend', color: '#61dafb' },
    { name: 'Material-UI', category: 'UI Framework', color: '#007FFF' },
    { name: 'FastAPI', category: 'Backend', color: '#009688' },
    { name: 'Python', category: 'Backend', color: '#3776ab' },
    { name: 'Whisper AI', category: 'Voice Recognition', color: '#10a37f' },
    { name: 'BERT', category: 'NLP', color: '#4285f4' },
    { name: 'YOLOv8', category: 'Image Detection', color: '#00ffff' },
    { name: 'TrOCR', category: 'OCR', color: '#ff6b6b' },
    { name: 'DialoGPT', category: 'Chatbot', color: '#74c0fc' },
    { name: 'Docker', category: 'Deployment', color: '#2496ed' },
  ];

  const features = [
    {
      title: 'Multi-Modal AI',
      description: '5 different AI models working together for comprehensive healthcare assistance',
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Multilingual Support',
      description: 'Supports both English and Bangla for better accessibility',
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Secure & Private',
      description: 'Built with security and data privacy in mind',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Real-time Processing',
      description: 'Fast AI inference for instant results',
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        ℹ️ About MediScan AI
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Project Overview
        </Typography>
        <Typography variant="body1" paragraph>
          MediScan AI is a comprehensive healthcare assistance platform that leverages cutting-edge 
          artificial intelligence to make medical information and preliminary diagnosis more accessible. 
          This project was developed as a final year Computer Science & Engineering project to demonstrate 
          the practical application of multiple AI technologies in healthcare.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
          Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to bridge the healthcare accessibility gap by providing AI-powered medical 
          assistance that can help people understand their symptoms, extract medical information, 
          and get guidance on when to seek professional help - all in their native language.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
          Target Users
        </Typography>
        <Typography variant="body1">
          • Patients seeking preliminary health information<br />
          • Healthcare workers needing quick reference<br />
          • Researchers studying AI in healthcare<br />
          • Students learning about medical AI applications
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Key Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: 'primary.main', mr: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Technology Stack
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          MediScan AI is built using modern, industry-standard technologies:
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {technologies.map((tech, index) => (
            <Chip
              key={index}
              label={`${tech.name} - ${tech.category}`}
              sx={{
                bgcolor: `${tech.color}20`,
                color: tech.color,
                fontWeight: 'bold',
                border: `2px solid ${tech.color}`,
              }}
            />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          AI Models
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>🎤 Whisper:</strong> Advanced speech recognition</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>🧠 BERT:</strong> Medical text understanding</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>📸 YOLOv8:</strong> Real-time object detection</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>📄 TrOCR:</strong> Handwriting recognition</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>💬 DialoGPT:</strong> Conversational AI</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fff3e0' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          ⚠️ Important Disclaimer
        </Typography>
        <Typography variant="body1" paragraph>
          MediScan AI is an educational project and demonstration platform. It is NOT a substitute 
          for professional medical advice, diagnosis, or treatment.
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>Always seek the advice of qualified healthcare professionals</li>
          <li>Never disregard professional medical advice based on AI recommendations</li>
          <li>In case of emergency, call emergency services immediately</li>
          <li>This system is for educational and informational purposes only</li>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, bgcolor: '#e3f2fd' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Future Enhancements
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">• Real AI model integration</Typography>
            <Typography variant="body2">• User authentication system</Typography>
            <Typography variant="body2">• Database for history storage</Typography>
            <Typography variant="body2">• Mobile application</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">• Telemedicine integration</Typography>
            <Typography variant="body2">• Hospital locator</Typography>
            <Typography variant="body2">• Appointment booking</Typography>
            <Typography variant="body2">• Advanced analytics dashboard</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mt: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Project Information
        </Typography>
        <Typography variant="body2">
          <strong>Project Type:</strong> CSE Final Year Project<br />
          <strong>Version:</strong> 1.0.0<br />
          <strong>Last Updated:</strong> October 2025<br />
          <strong>Status:</strong> Educational Demo
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;
