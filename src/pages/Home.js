import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Paper,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';


function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Voice Input',
      description: 'Speak your symptoms in Bangla or English. Our AI will transcribe and analyze them.',
      icon: <MicIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/voice',
      color: '#e3f2fd',
    },
    {
      title: 'Image Diagnosis',
      description: 'Upload medical images for AI-powered analysis and detection of conditions.',
      icon: <ImageIcon sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/image',
      color: '#e8f5e9',
    },
    {
      title: 'Prescription OCR',
      description: 'Extract text from handwritten prescriptions using advanced OCR technology.',
      icon: <DescriptionIcon sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/prescription',
      color: '#fff3e0',
    },
    {
      title: 'Medical Chatbot',
      description: 'Chat with our AI assistant for medical information and health guidance.',
      icon: <ChatIcon sx={{ fontSize: 60, color: 'secondary.main' }} />,
      path: '/chat',
      color: '#fce4ec',
    },

  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          🏥 MediScan AI
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Your AI-Powered Medical Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 800, mx: 'auto' }}>
          MediScan AI combines cutting-edge artificial intelligence with medical expertise to provide 
          accessible healthcare assistance. Analyze symptoms, diagnose images, extract prescriptions, 
          and get instant medical guidance - all in one platform.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: '#fff9c4' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          ⚠️ Important Disclaimer
        </Typography>
        <Typography variant="body2">
          MediScan AI is an educational demonstration project. It should NOT be used for actual 
          medical diagnosis or treatment. Always consult qualified healthcare professionals for 
          medical advice, diagnosis, and treatment. This system is designed to assist and educate, 
          not replace professional medical care.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Features
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4,
                }
              }}
            >
              <Box
                sx={{
                  bgcolor: feature.color,
                  p: 3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 120,
                }}
              >
                {feature.icon}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  fullWidth 
                  variant="contained"
                  onClick={() => navigate(feature.path)}
                >
                  Try Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Technology Stack
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>🎤 Voice Recognition</Typography>
            <Typography variant="body2">Whisper AI for multilingual speech-to-text</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>🧠 Symptom Analysis</Typography>
            <Typography variant="body2">BERT NLP for medical text understanding</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>📸 Image Diagnosis</Typography>
            <Typography variant="body2">YOLOv8 for medical image detection</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>📄 Prescription OCR</Typography>
            <Typography variant="body2">TrOCR for handwriting recognition</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>💬 Chatbot</Typography>
            <Typography variant="body2">DialoGPT for conversational AI</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>🌐 Full Stack</Typography>
            <Typography variant="body2">React + FastAPI + Docker</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
