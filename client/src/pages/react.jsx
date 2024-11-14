import React, { useEffect, useState } from 'react';


const BarcodeScanner = () => {
    const startScanner =async () => {
        const targetElement = document.querySelector('#interactive');
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: targetElement, // Target element
                constraints: {
                    facingMode: "environment" // Use the back camera
                }
            },
            decoder: {
                readers: ["code_128_reader"] // Add other readers as needed
            }
        }, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        // Register the onDetected event
        Quagga.onDetected(function(result) {
            const code = result.codeResult.code;
            console.log(`Code detected: ${code}`);
            document.getElementById('result').innerText = `Scanned Code: ${code}`;

            Quagga.stop();

        });

    }

    useEffect(() => {
        startScanner()
    })

    return(
    <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <h1>Barcode Scanner</h1>
            <div id="interactive" style={{ width: '600px', height: '400px', border: '1px solid #ccc', marginBottom: '20px' }}></div>
            <div id="result" style={{ marginTop: '20px', fontSize: '1.2em' }}></div>
        </div>
    </>)
}

export default BarcodeScanner;
