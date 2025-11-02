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
import TextFieldsIcon from '@mui/icons-material/TextFields';

// ✅ Use environment variable or default to Hugging Face backend
const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  'https://guruijij-medi-scan-backend.hf.space';

function PrescriptionOCR() {
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

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const extractPrescription = async () => {
    if (!selectedImage) {
      setError('Please select a prescription image first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(`${API_BASE}/api/extract-prescription`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server returned an error');
      const data = await response.json();

      if (data.success) setResult(data.data);
      else setError('Failed to extract prescription text.');
    } catch (err) {
      console.error(err);
      setError(
        'Error connecting to server. Please make sure the backend is online.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        📄 Prescription OCR
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload a handwritten or printed prescription to extract text and medicine information.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="prescription-upload"
            type="file"
            onChange={handleImageSelect}
          />
          <label htmlFor="prescription-upload">
            <Button
              variant="contained"
              component="span"
              size="large"
              startIcon={<CloudUploadIcon />}
            >
              Upload Prescription
            </Button>
          </label>

          {imagePreview && (
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <img
                src={imagePreview}
                alt="Prescription Preview"
                style={{
                  width: '100%',
                  maxHeight: 500,
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
              startIcon={loading ? <CircularProgress size={20} /> : <TextFieldsIcon />}
              onClick={extractPrescription}
              disabled={loading}
            >
              Extract Text
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
          {/* --- Patient Info --- */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    👤 Patient Information
                  </Typography>
                  <Typography variant="body1">
                    <strong>Name:</strong> {result.patient_info.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Age:</strong> {result.patient_info.age}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* --- Doctor Info --- */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    👨‍⚕️ Doctor Information
                  </Typography>
                  <Typography variant="body1">
                    <strong>Name:</strong> {result.doctor_info.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Qualification:</strong> {result.doctor_info.qualification}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Registration:</strong> {result.doctor_info.registration}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* --- Medicines --- */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  💊 Prescribed Medicines
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={`${(result.confidence * 100).toFixed(0)}% Confidence`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={`Image Quality: ${result.image_quality}`}
                    color="info"
                    size="small"
                  />
                </Box>
              </Box>

              {result.medicines.map((medicine, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {index + 1}. {medicine.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Dosage:</strong> {medicine.dosage}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Duration:</strong> {medicine.duration}
                    </Typography>
                    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                      <Typography variant="body2">
                        <strong>Instructions:</strong> {medicine.instructions}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* --- Extracted Text --- */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                📝 Full Extracted Text
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: '#fafafa',
                  maxHeight: 300,
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                }}
              >
                {result.extracted_text}
              </Paper>
            </CardContent>
          </Card>

          {/* --- Warnings --- */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                ⚠️ Warnings & Notes
              </Typography>
              {result.warnings.map((warning, index) => (
                <Alert key={index} severity={warning.includes('⚠️') ? 'warning' : 'info'} sx={{ mb: 1 }}>
                  {warning}
                </Alert>
              ))}
            </CardContent>
          </Card>

          <Alert severity="warning" sx={{ mt: 3 }}>
            {result.disclaimer}
          </Alert>
        </Box>
      )}

      {/* --- OCR Tips --- */}
      <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: '#fff9c4' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          📌 Tips for Better OCR Results
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography variant="body2">Take a clear, well-lit photo of the prescription</Typography></li>
          <li><Typography variant="body2">Ensure the entire prescription is visible in the frame</Typography></li>
          <li><Typography variant="body2">Avoid shadows, glare, or reflections</Typography></li>
          <li><Typography variant="body2">Keep the prescription flat and straight</Typography></li>
          <li><Typography variant="body2">Use high-resolution images for better accuracy</Typography></li>
        </Box>
      </Paper>
    </Box>
  );
}

export default PrescriptionOCR;

