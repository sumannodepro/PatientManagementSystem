import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

const SpeakToText: React.FC = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech Recognition is not supported in this browser.');
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let newTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) { 
                    newTranscript += event.results[i][0].transcript + ' ';
                }
            }
            setText(prevText => prevText + newTranscript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        (window as any).webkitSpeechRecognition && (window as any).webkitSpeechRecognition.stop();
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();
        doc.text(text, 10, 10);
        doc.save("speech_text.pdf");
    };

    const saveAsWord = () => {
        const blob = new Blob([text], { type: "application/msword" });
        saveAs(blob, "speech_text.doc");
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Speak to Text</h1>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                rows={15} 
                style={{ width: '100%', maxWidth: '900px', height: '400px' }}
            />
            <div>
                {!isListening ? (
                    <button onClick={startListening}>Start Listening</button>
                ) : (
                    <button onClick={stopListening}>Stop Listening</button>
                )}
                <button onClick={saveAsPDF}>Save as PDF</button>
                <button onClick={saveAsWord}>Save as Word</button>
            </div>
        </div>
    );
};

export default SpeakToText;
