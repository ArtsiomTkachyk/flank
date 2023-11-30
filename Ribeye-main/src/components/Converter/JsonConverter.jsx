import React from 'react';

const JsonConverter = ({ jsonData }) => {
    const handleDownload = () => {
        const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(jsonBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <button onClick={handleDownload}>Download JSON</button>
        </div>
    );
};

export default JsonConverter;
