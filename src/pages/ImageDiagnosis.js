import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AnalyticsIcon from '@mui/icons-material/Analytics';

// Use environment variable or fallback to Hugging Face Space URL
const API_BASE = process.env.REACT_APP_API_URL || 'https://sajaldas99-medi-scan-backend.hf.space';

function ImageDiagnosis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError(null);
      setResult(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      console.log('Sending request to:', `${API_BASE}/api/diagnose-image`);

      const response = await fetch(`${API_BASE}/api/diagnose-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Failed to analyze image');
      }
    } catch (err) {
      console.error('Error details:', err);
      setError(`Error connecting to server: ${err.message}. Please make sure the backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    const colors = {
      normal: 'success',
      low_risk: 'success',
      monitor: 'warning',
      requires_attention: 'error',
    };
    return colors[level] || 'default';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'success',
      moderate: 'warning',
      high: 'error',
    };
    return colors[severity] || 'default';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        📸 Image Diagnosis
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload a medical image for AI-powered analysis and condition detection.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageSelect}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              size="large"
              startIcon={<CloudUploadIcon />}
            >
              Select Image
            </Button>
          </label>

          {imagePreview && (
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 8,
                  border: '2px solid #e0e0e0',
                }}
              />
            </Box>
          )}

          {selectedImage && (
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={loading ? <CircularProgress size={20} /> : <AnalyticsIcon />}
              onClick={analyzeImage}
              disabled={loading}
            >
              Analyze Image
            </Button>
          )}
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Overall Assessment
                  </Typography>
                  <Chip
                    label={result.risk_level.replace('_', ' ').toUpperCase()}
                    color={getRiskColor(result.risk_level)}
                    size="large"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Detections Found
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {result.total_detected}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {result.detections.length > 0 ? (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                🔍 Detected Conditions
              </Typography>

              {result.detections.map((detection, index) => (
                <Card key={index} sx={{ mb: 2 }} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {detection.condition}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={`${(detection.confidence * 100).toFixed(0)}% confidence`}
                          color="primary"
                          size="small"
                        />
                        <Chip
                          label={detection.severity}
                          color={getSeverityColor(detection.severity)}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {detection.description}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Location: [{detection.location.x1}, {detection.location.y1}] to [{detection.location.x2}, {detection.location.y2}]
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Alert severity="success">
              ✅ No significant abnormalities detected in the image.
            </Alert>
          )}

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                📋 Recommendations
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {result.recommendations.map((rec, index) => (
                  <li key={index}>
                    <Typography variant="body2">{rec}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Alert severity="warning" sx={{ mt: 3 }}>
            {result.disclaimer}
          </Alert>
        </Box>
      )}
    </Box>
  );
}

export default ImageDiagnosis;
