
let maxInputDelay = 200;
let maxScanTime = -1;

let scanReset = true;
let scanListener = false;
let inputTimeout;
let scanTimeout;

const hiddenField = document.querySelector('#hidden');

let continousScan = false;

function startScan(continous = false, maxDelay = 200, maxTime = -1) {
    continousScan = continous;
    maxInputDelay = maxDelay;
    maxScanTime = maxTime;
    /************ INSERT FUNCTIONS BEFORE THE SCAN IS STARTED HERE ************/
  
    /************ END ************/
    if (maxScanTime >= 0) {
        scanTimeout = setTimeout(stopScan, maxScanTime);
    }
    scanListener = true;
    scanReset = true;
}

function stopScan() {
    clearTimeout(scanTimeout);
    scanReset = false;
    scanListener = false;
    /** optional button reset */
    // document.querySelector('#activate').classList.remove('active');
    
  
    /************ INSERT VALUE PROCESSING HERE. VALUE: hiddenField.value ************/
  
    /************ END ************/
    hiddenField.value = '';
    if (continousScan) startScan();
    /** add functions to execute after scan */
}

window.addEventListener('keydown', (e) => {
    if (scanListener == true && scanReset == true) {
        /** value input reset */
        hiddenField.value = '';
        scanReset = false;
    }
    if (e.key.length == 1 && scanListener == true && scanReset == false) {
        clearTimeout(inputTimeout);
        e.preventDefault();
        /** change value input */
        hiddenField.value += e.key;
        /** max delay between inputs */
        if (maxInputDelay >= 0) {
            inputTimeout = setTimeout(stopScan, maxInputDelay);
        }
    }
});

export {startScan, stopScan}

