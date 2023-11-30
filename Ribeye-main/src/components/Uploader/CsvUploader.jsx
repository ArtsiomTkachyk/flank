import React from 'react';
import Papa from 'papaparse';

const CsvUploader = React.forwardRef(({ onConvert }, ref) => {
    const handleCsvUpload = async (event) => {
        const file = event.target.files[0];
        const text = await file.text();

        Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                onConvert(result.data);
            },
        });
    };

    return (
        <input className='=upload' ref={ref} type="file" accept=".csv" onChange={handleCsvUpload} />
    );
});

export default CsvUploader;
