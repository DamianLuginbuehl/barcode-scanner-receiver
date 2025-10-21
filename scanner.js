
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
    /************ THESE FUNCTIONS ARE EXECUTED BEVORE THE SCAN IS STARTED ************/

    /************ END ************/
    hiddenField.value = '';
    if (maxScanTime >= 0) {
        scanTimeout = setTimeout(terminateScan, maxScanTime);
    }
    scanListener = true;
    scanReset = true;
}

function stopScan() {
    continousScan = false;
    terminateScan();

    /************ THESE FUNCTIONS ARE EXECUTED AFTER THE SCAN IS FINISHED ************/

    /************ END ************/
}

function processResult(value) {
    /************ INSERT VALUE PROCESSING HERE. VALUE: hiddenField.value ************/
    
    /************ END ************/
}






function terminateScan() {
    clearTimeout(scanTimeout);
    scanReset = false;
    scanListener = false;
    if (!continousScan) return;
    hiddenField.value = '';
    startScan(continousScan, maxInputDelay, maxScanTime);
}

window.addEventListener('keydown', (e) => {
    if (scanListener == true && scanReset == true) {
        /** value input reset */
        document.activeElement.blur();
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
            inputTimeout = setTimeout(terminateScan, maxInputDelay);
        }
    }
    else if (scanListener == true && e.key === "Enter") {
        processResult(hiddenField.value);
        hiddenField.value = '';
    }
});

export { startScan, stopScan };
