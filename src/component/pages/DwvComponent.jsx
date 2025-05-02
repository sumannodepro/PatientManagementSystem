// DwvComponent with full 3-view CBCT viewer and S3 ZIP upload/download

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StraightenIcon from '@mui/icons-material/Straighten';

import './DwvComponent.css';
import { App, getDwvVersion, decoderScripts } from 'dwv';
import JSZip from 'jszip';
import { Storage } from 'aws-amplify';
import dayjs from 'dayjs';

decoderScripts.jpeg2000 = `${import.meta.env.BASE_URL}assets/dwv/decoders/pdfjs/decode-jpeg2000.js`;
decoderScripts["jpeg-lossless"] = `${import.meta.env.BASE_URL}assets/dwv/decoders/rii-mango/decode-jpegloss.js`;
decoderScripts["jpeg-baseline"] = `${import.meta.env.BASE_URL}assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`;
decoderScripts.rle = `${import.meta.env.BASE_URL}assets/dwv/decoders/dwv/decode-rle.js`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({ position: 'relative' }));
const TransitionUp = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

class DwvComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: { options: ['Ruler'] },
      },
      selectedTool: 'Select Tool',
      loadProgress: 0,
      dataLoaded: false,
      dwvApp: null,
      showDicomTags: false,
      uploadedCBCTFiles: [],
      uploading: false,
    };
  }

  componentDidMount() {
    const app = new App();
    app.init({
      dataViewConfigs: {
        '*': [
          { divId: 'layerGroup0', orientation: 'axial' },
          { divId: 'layerGroup1', orientation: 'coronal' },
          { divId: 'layerGroup2', orientation: 'sagittal' }
        ]
      },
      tools: this.state.tools
    });

    app.addEventListener("loadprogress", (e) => this.setState({ loadProgress: e.loaded }));
    app.addEventListener("load", () => {
  this.setState({ dataLoaded: true });

  // Delay slightly to ensure canvases are initialized
  setTimeout(() => {
    ['layerGroup0', 'layerGroup1', 'layerGroup2'].forEach((id) => {
      const view = app.getViewController().getLayerGroupById(id);
      if (view && view.display) {
        const bestScale = view.display.getBestFitScale();
        view.display.setScale(bestScale, true); // true = preserve position
        view.draw();
      }
    });
  }, 100);
});


    window.addEventListener('resize', app.onResize);

    this.setState({ dwvApp: app });
    this.setupDropbox(app);
  }

  handleCBCTUploadToS3 = async () => {
    const { uploadedCBCTFiles } = this.state;
    const { selectedPatient } = this.props;
    if (!uploadedCBCTFiles.length || !selectedPatient) return alert('Missing files or patient');

    this.setState({ uploading: true });
    const zip = new JSZip();
    uploadedCBCTFiles.forEach((file) => zip.file(file.name, file));

    try {
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const { patientID, age } = selectedPatient;
      const uploadDate = dayjs().format('YYYY-MM-DD');
      const key = `${patientID}/CBCT/${uploadDate}-${patientID}-${age}.zip`;

      await Storage.put(key, zipBlob, {
        contentType: 'application/zip',
        level: 'public'
      });

      alert('CBCT ZIP uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      this.setState({ uploading: false });
    }
  };

  handleOpenDownloadModal = async () => {
    const { selectedPatient } = this.props;
    if (!selectedPatient) return;

    try {
      const result = await Storage.list(`${selectedPatient.patientID}/CBCT/`, { level: 'public' });
      const links = await Promise.all(result.results.map(file => Storage.get(file.key, { level: 'public' })));

      const win = window.open('', '_blank');
      if (win) {
        win.document.write('<h3>Download CBCT ZIPs</h3>');
        links.forEach((url, i) => {
          const name = result.results[i].key.split('/').pop();
          win.document.write(`<p><a href="${url}" target="_blank">${name}</a></p>`);
        });
      }
    } catch (err) {
      console.error('Failed to list files:', err);
      alert('Download failed');
    }
  };

  setupDropbox = (app) => {
    const box = document.getElementById('dropBox');
    if (!box) return;
    box.innerHTML = '';
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.id = 'input-file';
    input.style.display = 'none';
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      this.setState({ uploadedCBCTFiles: files });
      this.state.dwvApp.loadFiles(files);
    };
    const label = document.createElement('label');
    label.htmlFor = 'input-file';
    label.style.cursor = 'pointer';
    label.textContent = 'Click here to upload CBCT files';
    box.appendChild(input);
    box.appendChild(label);
  };

  getToolIcon = (tool) => {
    if (tool === 'Scroll') return <MenuIcon />;
    if (tool === 'ZoomAndPan') return <SearchIcon />;
    if (tool === 'WindowLevel') return <ContrastIcon />;
    if (tool === 'Draw') return <StraightenIcon />;
  };

  onChangeTool = (tool) => {
    if (this.state.dwvApp) {
      this.setState({ selectedTool: tool });
      this.state.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.state.dwvApp.setToolFeatures({ shapeName: this.state.tools.Draw.options[0] });
      }
    }
  };

  render() {
    const { tools, dataLoaded, selectedTool, loadProgress, showDicomTags, uploading } = this.state;
    const toolsButtons = Object.keys(tools).map((tool) => (
      <ToggleButton key={tool} value={tool} disabled={!dataLoaded}>{this.getToolIcon(tool)}</ToggleButton>
    ));

    return (
      <div id="dwv">
        <LinearProgress variant="determinate" value={loadProgress} />
        <Stack direction="row" spacing={1} padding={1} justifyContent="center" flexWrap="wrap">
          <ToggleButtonGroup size="small" color="primary" value={selectedTool} exclusive onChange={(e, tool) => tool && this.onChangeTool(tool)}>
            {toolsButtons}
          </ToggleButtonGroup>
          <ToggleButton size="small" disabled={!dataLoaded} onClick={() => this.state.dwvApp.resetDisplay()}><RefreshIcon /></ToggleButton>
          <ToggleButton size="small" disabled={!dataLoaded} onClick={() => this.setState({ showDicomTags: true })}><LibraryBooksIcon /></ToggleButton>
        </Stack>

        <Button variant="contained" color="primary" disabled={!this.state.uploadedCBCTFiles.length || uploading} onClick={this.handleCBCTUploadToS3}>
          {uploading ? 'Uploading CBCT...' : 'Save CBCT to S3'}
        </Button>
        <Button variant="outlined" color="primary" onClick={this.handleOpenDownloadModal}>Download CBCT File</Button>

        <Dialog open={showDicomTags} onClose={() => this.setState({ showDicomTags: false })} TransitionComponent={TransitionUp}>
          <StyledAppBar position="sticky">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => this.setState({ showDicomTags: false })} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">DICOM Tags</Typography>
            </Toolbar>
          </StyledAppBar>
        </Dialog>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <div id="layerGroup0" className="layerGroup" style={{ flex: 1, height: '70vh', border: '1px solid #ccc' }}></div>
          <div id="layerGroup1" className="layerGroup" style={{ flex: 1, height: '70vh', border: '1px solid #ccc' }}></div>
          <div id="layerGroup2" className="layerGroup" style={{ flex: 1, height: '70vh', border: '1px solid #ccc' }}></div>
        </div>

        <div id="dropBox" style={{ textAlign: 'center', marginTop: 16 }}></div>
      </div>
    );
  }
}

DwvComponent.propTypes = {
  selectedPatient: PropTypes.shape({
    patientID: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default DwvComponent;
