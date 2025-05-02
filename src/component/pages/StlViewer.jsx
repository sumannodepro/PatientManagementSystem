import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box, Button, Typography, Modal, List, ListItem, ListItemButton } from '@mui/material';
import { Storage } from 'aws-amplify';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
let scene, camera, renderer, controls;

const StlViewer = ({ selectedPatient }) => {
  const stlContainerRef = useRef(null);
  const [stlModel, setStlModel] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [stlFiles, setStlFiles] = useState([]);

  const loadSTLModel = (file) => {
    
    setShowPlaceholder(false);
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result;
      if (buffer.byteLength === 0) {
        console.error('Empty STL file');
        return;
      }

      const loader = new STLLoader();
      const geometry = loader.parse(buffer);
      geometry.computeVertexNormals();
      geometry.computeBoundingSphere();

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        metalness: 0.3,
        roughness: 0.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 2;
      mesh.scale.set(0.2, 0.2, 0.2);

      if (!scene) {
        scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        scene.add(new THREE.DirectionalLight(0xffffff, 1));
      }

      scene.add(mesh);

      if (!camera) {
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2;
      }

      if (!renderer) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(stlContainerRef.current?.clientWidth || 0, stlContainerRef.current?.clientHeight || 0);
        renderer.outputEncoding = THREE.LinearSRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        stlContainerRef.current?.appendChild(renderer.domElement);
      }

      if (!controls) {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
      }

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      setStlModel(mesh);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSaveToS3 = async () => {
    if (!uploadedFile || !selectedPatient) {
      alert('No file or patient selected.');
      return;
    }
    setUploading(true); // Start loader
    const { patientID, age } = selectedPatient;
    const date = dayjs().format('YYYY-MM-DD');
    const fileName = `${date}-${patientID}-${age}bdsd.stl`;
    const path = `${patientID}/STL/${fileName}`;

    try {
      await Storage.put(path, uploadedFile, {
        contentType: 'model/stl',
        level: 'public',
      });
      alert(`File uploaded successfully to ${path}`);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload file.');
    }
    finally {
      setUploading(false); // End loader
    }
  };

  const handleOpenDownloadModal = async () => {
    if (!selectedPatient) return;

    try {
      const result = await Storage.list(`${selectedPatient.patientID}/STL/`, { level: 'public' });
      setStlFiles(result.results || []);
      setDownloadModalOpen(true);
    } catch (err) {
      console.error('Failed to list files:', err);
    }
  };

  const downloadFile = async (key) => {
    try {
      const url = await Storage.get(key, { level: 'public' });
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to get file:', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
      <Button variant="contained" component="label">
        Upload STL File
        <input type="file" accept=".stl" hidden onChange={(e) => loadSTLModel(e.target.files?.[0])} />
      </Button>

      <Button
  variant="outlined"
  color="success"
  onClick={handleSaveToS3}
  disabled={!uploadedFile || uploading}
>
{uploading ? <><CircularProgress size={18} sx={{ mr: 1 }} /> Uploading...</> : 'Save to S3'}
</Button>

      <Button variant="outlined" color="primary" onClick={handleOpenDownloadModal}>
        Download STL File
      </Button>

      <Box
        ref={stlContainerRef}
        sx={{
          width: '100%',
          height: '80vh',
          border: '2px dashed #6c757d',
          backgroundColor: '#e0e0e0',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
        onMouseDown={(e) => setIsMouseDown(true)}
        onMouseMove={(e) => {
          if (!isMouseDown || !stlModel) return;
          const deltaX = e.clientX - (lastMousePosition?.x || 0);
          const deltaY = e.clientY - (lastMousePosition?.y || 0);
          stlModel.rotation.y += deltaX * 0.01;
          stlModel.rotation.x += deltaY * 0.01;
          setLastMousePosition({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={() => setIsMouseDown(false)}
      >
        {showPlaceholder && (
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#6c757d',
              textAlign: 'center',
            }}
          >
            Drag and interact with the STL model here
          </Typography>
        )}
      </Box>

      <Modal open={downloadModalOpen} onClose={() => setDownloadModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            STL Files for Patient {selectedPatient?.patientID}
          </Typography>
          <List>
            {stlFiles.length === 0 ? (
              <Typography variant="body2">No STL files found.</Typography>
            ) : (
              stlFiles.map((file) => (
                <ListItem key={file.key} disablePadding>
                  <ListItemButton onClick={() => downloadFile(file.key)}>
                    {file.key.split('/').pop()}
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default StlViewer;
