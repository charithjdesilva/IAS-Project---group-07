//jshint esversion:6

// check compatibility
if (!('BarcodeDetector' in window)) {
    console.log('Barcode Detector is not supported by this browser.');
  } 
  else {
    console.log('Barcode Detector supported!');}

// Get the video element
const video = document.querySelector('#camera-feed');
// Check if device has camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Use video without audio
  const constraints = { 
    video: true,
    audio: false
  };
  
  // Start video stream
  navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream);
}


// let formats;
// Save all formats to formats var 
// BarcodeDetector.getSupportedFormats().then(arr => formats = arr);
// Create new barcode detector with all supported formats
// const barcodeDetector = new BarcodeDetector({ formats });

// Create new QR-code detector
const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });

// Detect code function 
const detectCode = () => {
    // Start detecting codes on to the video element
    barcodeDetector.detect(video).then(codes => {
      // If no codes exit function
      if (codes.length === 0) return;
      
      for (const barcode of codes)  {
        // Log the barcode to the console
        console.log(barcode);
      }
    }).catch(err => {
      // Log an error if one happens
      console.error(err);
    });
};

  
// Run detect code function every 100 milliseconds
setInterval(detectCode, 100);