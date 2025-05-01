import React, { useState } from "react";
import {
  Box, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, Paper
} from "@mui/material";

const initialMedications = [
  "Aceclo Plus", "Dolo", "Flagyl 400", "Moxikind CV 375", "Pan-40", "Cipla", "Mouthwash", "Paracetamol", "Saridon"
];

export default function PrescriptionPage() {
  const [medicationsList, setMedicationsList] = useState(initialMedications);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [newMed, setNewMed] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleMedicationSelection = (med) => {
    const exists = selectedMedications.find((item) => item.name === med);
    if (exists) {
      setSelectedMedications(selectedMedications.filter((item) => item.name !== med));
    } else {
      setSelectedMedications([...selectedMedications, {
        name: med, days: "", beforeAfter: "", morning: false, noon: false, night: false, tablets: ""
      }]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...selectedMedications];
    updated[index][field] = value;
    setSelectedMedications(updated);
  };

  const handleAddMedication = () => {
    if (newMed && !medicationsList.includes(newMed)) {
      setMedicationsList([...medicationsList, newMed]);
    }
    setNewMed("");
    setAddDialogOpen(false);
    // You can also call a GraphQL mutation here to persist to DB
  };

  return (
    <Box display="flex" gap={2} p={2}>
      {/* Sidebar */}
      <Paper sx={{ width: "25%", p: 2 }}>
        <Typography variant="h6" textAlign="center" color="white" sx={{ backgroundColor: "#6a0dad", p: 1 }}>
          Medications
        </Typography>

        <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#6a0dad" }}
          onClick={() => setAddDialogOpen(true)}
        >
          + Add New Medication
        </Button>

        <TextField size="small" fullWidth placeholder="Search Medications" sx={{ mt: 2 }} />

        <Box mt={2} sx={{ maxHeight: 300, overflowY: "auto" }}>
          {medicationsList.map((med) => (
            <Box key={med} display="flex" alignItems="center">
              <Checkbox
                checked={selectedMedications.some((item) => item.name === med)}
                onChange={() => handleMedicationSelection(med)}
              />
              <Typography>{med}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Main Content */}
      <Box flex={1}>
        <Typography variant="h6" gutterBottom>Prescription</Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#6a0dad" }}>
                {["Medication", "Days", "Before/After", "Morning", "Noon", "Night", "Tablets"].map((head) => (
                  <TableCell key={head} sx={{ color: "white" }}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedMedications.map((med, index) => (
                <TableRow key={med.name}>
                  <TableCell>{med.name}</TableCell>
                  <TableCell><TextField size="small" value={med.days} onChange={(e) => handleInputChange(index, "days", e.target.value)} /></TableCell>
                  <TableCell>
                    <Select size="small" value={med.beforeAfter} onChange={(e) => handleInputChange(index, "beforeAfter", e.target.value)}>
                      <MenuItem value="Before">Before</MenuItem>
                      <MenuItem value="After">After</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell><Checkbox checked={med.morning} onChange={(e) => handleInputChange(index, "morning", e.target.checked)} /></TableCell>
                  <TableCell><Checkbox checked={med.noon} onChange={(e) => handleInputChange(index, "noon", e.target.checked)} /></TableCell>
                  <TableCell><Checkbox checked={med.night} onChange={(e) => handleInputChange(index, "night", e.target.checked)} /></TableCell>
                  <TableCell><TextField size="small" type="number" value={med.tablets} onChange={(e) => handleInputChange(index, "tablets", e.target.value)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Save Button */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" sx={{ backgroundColor: "#6a0dad" }}
            onClick={() => {
              console.log("Saving prescription to DB");
              // Call GraphQL mutation here to save prescription
            }}
          >
            Save Prescription
          </Button>
        </Box>
      </Box>

      {/* Add Medication Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Medication</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Medication Name"
            fullWidth
            value={newMed}
            onChange={(e) => setNewMed(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddMedication} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
