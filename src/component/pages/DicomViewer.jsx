import React, { useEffect, useState } from "react";
import * as cornerstone3D from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";
import * as cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import { Enums, RenderingEngine } from "@cornerstonejs/core";
import { ZoomTool, PanTool, StackScrollTool, ToolGroupManager } from "@cornerstonejs/tools";
import wasmModule from '@icr/polyseg-wasm/dist/ICRPolySeg.wasm?url';
// Initialize Cornerstone3D
async function initializeCornerstone(viewportIds) {
  try {
    console.log("🔄 Initializing Cornerstone...");

    if (!cornerstone3D.getRenderingEngines().length) {
      await cornerstone3D.init();
      console.log("Cornerstone3D initialized.");
    }

    const renderingEngineId = "multiViewRenderingEngine";
    let renderingEngine = cornerstone3D.getRenderingEngine(renderingEngineId);

    if (!renderingEngine) {
      renderingEngine = new RenderingEngine(renderingEngineId);
    }

    // Enable Viewports
    viewportIds.forEach(({ id, elementId }) => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`❌ DICOM Viewer element ${elementId} not found.`);
        return;
      }
      renderingEngine.enableElement({ viewportId: id, type: Enums.ViewportType.ORTHOGRAPHIC, element });
    });

    console.log("✅ Multi-Viewport DICOM Viewer initialized.");

    // Tool Group Setup
    const toolGroupId = "multiToolGroup";
    let toolGroup = ToolGroupManager.getToolGroup(toolGroupId);

    if (!toolGroup) {
      toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
    }

    // Add tools (Zoom, Pan, Scroll)
    const tools = [ZoomTool, PanTool, StackScrollTool];
    tools.forEach((Tool) => {
      if (!toolGroup.hasTool(Tool.toolName)) {
        toolGroup.addTool(Tool.toolName);
      }
    });

    // Activate tools
    toolGroup.setToolActive(ZoomTool.toolName, { bindings: [{ mouseButton: 1 }] });
    toolGroup.setToolActive(PanTool.toolName, { bindings: [{ mouseButton: 2 }] });
    toolGroup.setToolActive(StackScrollTool.toolName);

    // Link tool group to viewports
    viewportIds.forEach(({ id }) => {
      if (!toolGroup.getViewportIds().includes(id)) {
        toolGroup.addViewport(id, renderingEngineId);
      }
    });

    console.log("✅ Tools added & linked to viewports.");
  } catch (error) {
    console.error("❌ Error initializing Cornerstone:", error);
  }
}

// Load DICOM Images into Viewports
const loadDicomImages = async (files, viewportIds) => {
  try {
    console.log("📂 Loading DICOM Images...");

    const imageIds = [];

    for (const file of files) {
      const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
      imageIds.push(imageId);
    }

    console.log("✅ DICOM Image IDs:", imageIds);

    // Display images in the three viewports
    const renderingEngine = cornerstone3D.getRenderingEngine("multiViewRenderingEngine");
    if (!renderingEngine) {
      console.error("❌ Rendering engine not found.");
      return;
    }

    for (const [index, viewportData] of viewportIds.entries()) {
      const viewport = renderingEngine.getViewport(viewportData.id);
      if (!viewport) {
        console.error(`❌ Viewport ${viewportData.id} not found.`);
        continue;
      }

      // Load and display image
      const imageId = imageIds[index % imageIds.length]; // Cycle through images if needed
      const image = await cornerstone3D.imageLoader.loadAndCacheImage(imageId);
      viewport.setImage(image);
      viewport.render();
    }

    console.log("✅ Images loaded into viewports.");
  } catch (error) {
    console.error("❌ Error loading images:", error);
  }
};

// DICOM Viewer Component
const DicomViewer = () => {
  const viewportIds = [
    { id: "viewportAxial", elementId: "dicom-axial" },
    { id: "viewportSagittal", elementId: "dicom-sagittal" },
    { id: "viewportCoronal", elementId: "dicom-coronal" },
  ];

  useEffect(() => {
    initializeCornerstone(viewportIds);
  }, []);

  // Handle File Upload
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    console.log("📂 DICOM files selected:", files);
    await loadDicomImages(files, viewportIds);
  };

  return (
    <div>
      <h2>DICOM Viewer - Multi View</h2>

      {/* File Upload */}
      <input type="file" multiple onChange={handleFileUpload} accept=".dcm" />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <div id="dicom-axial" style={{ width: "33%", height: "500px", backgroundColor: "black" }}></div>
        <div id="dicom-sagittal" style={{ width: "33%", height: "500px", backgroundColor: "black" }}></div>
        <div id="dicom-coronal" style={{ width: "33%", height: "500px", backgroundColor: "black" }}></div>
      </div>
    </div>
  );
};

export default DicomViewer;
