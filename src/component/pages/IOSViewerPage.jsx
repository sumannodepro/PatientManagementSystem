import React, { useState } from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { Fullscreen, Close } from '@mui/icons-material';
import STLViewer from './StlViewer'; // Import the STLViewer component
import DWV from './DwvComponent.jsx';

export default function IOSViewerPage({ selectedPatient }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activePane, setActivePane] = useState(null); // 'dicom' or 'stl'

  const toggleFullScreen = (pane) => {
    setActivePane(pane);
    setIsFullScreen(!isFullScreen);
  };
  const styles = { root: 'some-css-class' };

  return (
    <>
      {selectedPatient ? (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: isFullScreen ? 'column' : 'row',
            height: isFullScreen ? '100vh' : 'auto',
          }}
        >
          {/* Dicom Viewer Pane */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#f1f3f5',
              borderRadius: 1,
              position: 'relative',
              height: isFullScreen && activePane === 'dicom' ? '100vh' : 'auto',
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: 1,
                '&:hover': { backgroundColor: '#ddd' },
              }}
              onClick={() => toggleFullScreen('dicom')}
            >
              {isFullScreen && activePane === 'dicom' ? <Close /> : <Fullscreen />}
            </IconButton>
            <DWV classes={styles} selectedPatient={selectedPatient} />
          </Box>

          {/* STL Viewer Pane */}
          {!isFullScreen && (
            <Box
              sx={{
                flex: 1,
                backgroundColor: '#f1f3f5',
                borderRadius: 1,
                position: 'relative',
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  padding: 1,
                  '&:hover': { backgroundColor: '#ddd' },
                }}
                onClick={() => toggleFullScreen('stl')}
              >
                {isFullScreen && activePane === 'stl' ? <Close /> : <Fullscreen />}
              </IconButton>
              <STLViewer selectedPatient={selectedPatient}/>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ padding: 1 }}>
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            Please select a patient to view CBCT files.
          </Typography>
        </Box>
      )}
    </>
  );
}
