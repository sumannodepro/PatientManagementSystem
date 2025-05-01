import { useEffect, useState } from 'react';
import * as QRCode from 'qrcode';

const QRCodeComponent = () => {
  const [qrSrc, setQrSrc] = useState('');

  useEffect(() => {
    // Use your CloudFront URL
    QRCode.toDataURL('https://d1gc3x4iesduww.cloudfront.net/add-patient', { width: 500 })
      .then((url) => {
        setQrSrc(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      {qrSrc && <img src={qrSrc} alt="QR Code" style={{ width: '400px', height: '400px' }} />}
    </div>
  );
};

export default QRCodeComponent;
