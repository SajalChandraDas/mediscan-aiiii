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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SendIcon from '@mui/icons-material/Send';

const API_BASE = 'http://localhost:8000';

function VoiceInput() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    setRecording(true);
    setError(null);
    setResult(null);
    
    // In a real implementation, you would use MediaRecorder API
    // For demo purposes, we'll simulate recording
    setTimeout(() => {
      // Simulate audio blob
      const blob = new Blob(['audio data'], { type: 'audio/wav' });
      setAudioBlob(blob);
    }, 100);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const analyzeVoice = async () => {
    if (!audioBlob) {
      setError('Please record audio first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const response = await fetch(`${API_BASE}/api/voice-recognize`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Now analyze the transcribed symptoms
        const symptomResponse = await fetch(`${API_BASE}/api/analyze-symptoms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            symptoms: data.data.transcription,
            language: language,
          }),
        });

        const symptomData = await symptomResponse.json();

        setResult({
          transcription: data.data.transcription,
          analysis: symptomData.data,
        });
      } else {
        setError('Failed to process audio');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      mild: 'success',
      moderate: 'warning',
      serious: 'error',
    };
    return colors[severity] || 'default';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        🎤 Voice Input
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Speak your symptoms in Bangla or English. Our AI will transcribe and analyze them.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="bn">বাংলা (Bangla)</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {!recording ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<MicIcon />}
                onClick={startRecording}
                sx={{ minWidth: 200 }}
              >
                Start Recording
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<StopIcon />}
                onClick={stopRecording}
                sx={{ minWidth: 200 }}
              >
                Stop Recording
              </Button>
            )}

            {audioBlob && !recording && (
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                onClick={analyzeVoice}
                disabled={loading}
              >
                Analyze
              </Button>
            )}
          </Box>

          {recording && (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Recording... Speak your symptoms
              </Typography>
            </Box>
          )}

          {audioBlob && !recording && !result && (
            <Alert severity="info">
              Recording complete! Click "Analyze" to process your symptoms.
            </Alert>
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
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                📝 Transcription
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                "{result.transcription}"
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                🔍 Analysis Results
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Extracted Symptoms:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {result.analysis.extracted_symptoms.map((symptom, index) => (
                    <Chip key={index} label={symptom} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Possible Conditions:
              </Typography>

              {result.analysis.possible_conditions.map((condition, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {condition.condition}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={`${(condition.confidence * 100).toFixed(0)}% match`} 
                          color="primary" 
                          size="small"
                        />
                        <Chip 
                          label={condition.severity} 
                          color={getSeverityColor(condition.severity)}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Matched Symptoms:</strong> {condition.matched_symptoms.join(', ')}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Recommendations:
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {condition.recommendations.map((rec, idx) => (
                        <li key={idx}>
                          <Typography variant="body2">{rec}</Typography>
                        </li>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}

              <Alert severity="warning" sx={{ mt: 2 }}>
                {result.analysis.disclaimer}
              </Alert>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default VoiceInput;
