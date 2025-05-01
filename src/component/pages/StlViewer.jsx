import React, { useRef, useState,useEffect } from 'react';
import * as THREE from 'three'; // For general THREE.js imports
import { STLLoader } from 'three-stdlib'; // Correct import for STLLoader
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box,Button,Typography } from '@mui/material';

let scene, camera, renderer, controls;

const StlViewer = ({ selectedPatient }) => {
  const stlContainerRef = useRef(null);
  const [stlModel, setStlModel] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  useEffect(() => {
    if (selectedPatient) {
      console.log("Received selectedPatient:", selectedPatient);
      // You can do more things here, like load a model automatically
    }
  }, [selectedPatient]);
  

  const handleInteractionStart = () => {
    setShowPlaceholder(false); // Hide the placeholder when interaction starts
  };

  const loadSTLModel = (file) => {
    setShowPlaceholder(false);
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-5, -5, -5);

        scene.add(ambientLight, directionalLight, directionalLight2);
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

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown || !stlModel) return;

    const deltaX = event.clientX - (lastMousePosition?.x || 0);
    const deltaY = event.clientY - (lastMousePosition?.y || 0);

    stlModel.rotation.y += deltaX * 0.01;
    stlModel.rotation.x += deltaY * 0.01;

    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <Box 
  sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: 1, 
    padding: 1, 
    backgroundColor: '#f1f3f5', 
    borderRadius: 2, 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
  }}
>
  {/* File Upload Button */}
  <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: '#343a40',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#5a6268',
      },
      textTransform: 'none',
    }}
  >
    Upload STL File
    <input
      type="file"
      accept=".stl"
      hidden
      onChange={(e) => e.target.files && loadSTLModel(e.target.files[0])}
    />
  </Button>
  {selectedPatient && (
  <Box
    sx={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 2,
      padding: 2,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
  >
    <Typography variant="h6" sx={{ color: '#343a40' }}>
      Patient Details
    </Typography>
    <Typography variant="body2"><strong>ID:</strong> {selectedPatient.patientID}</Typography>
    <Typography variant="body2"><strong>Name:</strong> {selectedPatient.title} {selectedPatient.selectedPatient}</Typography>
    <Typography variant="body2"><strong>Phone:</strong> {selectedPatient.mobileNumber}</Typography>
    <Typography variant="body2"><strong>Age:</strong> {selectedPatient.age}</Typography>
    <Typography variant="body2"><strong>Gender:</strong> {selectedPatient.gender}</Typography>
    {/* Add more fields as needed */}
  </Box>
)}
  {/* STL Container */}
  <Box
    ref={stlContainerRef}
    sx={{
      width: '100%',
      height: '90vh',
      border: '2px dashed #6c757d',
      backgroundColor: '#e0e0e0',
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
    }}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    
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
</Box>

  );
};

export default StlViewer;
