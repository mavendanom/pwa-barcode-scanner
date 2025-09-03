if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("SW error:", err));
}

const codeReader = new ZXing.BrowserBarcodeReader();
const videoElem = document.getElementById('video');
const resultElem = document.getElementById('result');

async function startScanner() {
  try {
    const devices = await codeReader.listVideoInputDevices();
    if (devices.length === 0) {
      resultElem.textContent = "No se encontró cámara.";
      return;
    }
    const deviceId = devices.find(d => d.label.toLowerCase().includes("back"))
                    ?.deviceId || devices[0].deviceId;
    await codeReader.decodeFromVideoDevice(deviceId, videoElem, (result, err) => {
      if (result) {
        resultElem.textContent = `Código detectado: ${result.getText()}`;
      }
    });
  } catch (error) {
    console.error(error);
    resultElem.textContent = "Error al acceder a la cámara.";
  }
}
startScanner();
