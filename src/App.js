import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Container, Box, IconButton, 
  Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme,
  useMediaQuery, CssBaseline, ThemeProvider, createTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';

// Import pages
import Home from './pages/Home';
import VoiceInput from './pages/VoiceInput';
import ImageDiagnosis from './pages/ImageDiagnosis';
import PrescriptionOCR from './pages/PrescriptionOCR';
import Chatbot from './pages/Chatbot';
import About from './pages/About';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Voice Input', icon: <MicIcon />, path: '/voice' },
    { text: 'Image Diagnosis', icon: <ImageIcon />, path: '/image' },
    { text: 'Prescription OCR', icon: <DescriptionIcon />, path: '/prescription' },
    { text: 'Chatbot', icon: <ChatIcon />, path: '/chat' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                🏥 MediScan AI
              </Typography>
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.text}
                      to={item.path}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      {item.text}
                    </Link>
                  ))}
                </Box>
              )}
            </Toolbar>
          </AppBar>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }} onClick={toggleDrawer}>
              <List>
                {menuItems.map((item) => (
                  <ListItem button key={item.text} component={Link} to={item.path}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/voice" element={<VoiceInput />} />
              <Route path="/image" element={<ImageDiagnosis />} />
              <Route path="/prescription" element={<PrescriptionOCR />} />
              <Route path="/chat" element={<Chatbot />} /> 
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>

          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: (theme) => theme.palette.grey[200],
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body2" color="text.secondary" align="center">
                © 2025 MediScan AI - Educational Project
              </Typography>
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                ⚠️ Not for actual medical diagnosis. Consult healthcare professionals.
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
