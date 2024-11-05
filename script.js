
let maxInputDelay = 200;
let maxScanTime = -1;

let scanReset = true;
let scanListener = false;
let inputTimeout;
let scanTimeout;

function startScan() {
    /** add functions to execute before initiating scan */
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
    document.querySelector('#activate').classList.remove('active');
    /** add functions to execute after scan */
}

window.addEventListener('keydown', (e) => {
    if (scanListener == true && scanReset == true) {
        /** value input reset */
        document.querySelector('#hidden').value = '';
        scanReset = false;
    }
    if (e.key.length == 1 && scanListener == true && scanReset == false) {
        clearTimeout(inputTimeout);
        e.preventDefault();
        /** change value input */
        document.querySelector('#hidden').value += e.key;
        /** max delay between inputs */
        if (maxInputDelay >= 0) {
            inputTimeout = setTimeout(stopScan, maxInputDelay)
        }
    }
})

/** activation button */
document.querySelector('#activate').addEventListener('click', (e) => {
    e.preventDefault();
    if (scanListener == false) {
        startScan();
        /** activator button */
        document.querySelector('#activate').classList.add('active');
    }
    else {
        stopScan();
    }
})

