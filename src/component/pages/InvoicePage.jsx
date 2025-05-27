// InvoiceWrapper.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import SingleDateInvoice from './SingleDateInvoice';
import MultiDateInvoice from './MultiDateInvoice';

const InvoiceWrapper = (props) => {
  const [isMultipleDate, setIsMultipleDate] = useState(false);

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '10px' }}>Select Invoice Mode</Typography>
      <FormControlLabel
        control={<Switch checked={isMultipleDate} onChange={(e) => setIsMultipleDate(e.target.checked)} />}
        label={isMultipleDate ? "Multiple Dates" : "Single Date"}
      />
      {isMultipleDate ? (
        <MultiDateInvoice {...props} />
      ) : (
        <SingleDateInvoice {...props} />
      )}
    </div>
  );
};

export default InvoiceWrapper;
