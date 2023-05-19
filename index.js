var unisat;
var currentAddr;
var balance;

async function loadunisat() {
    console.log(window)
    if (window.unisat) {
        unisat = window.unisat;
        console.log("unisat", unisat);
    } else {
        console.log("No provider");
    }
}

function refreshData() {
    console.log("Refreshing data...");
}

async function connect() {
    console.log("Connecting...");
    const result = await unisat.requestAccounts();
}

async function getBasicInfo() {
    currentAddr = await unisat.getAccounts();
    balance = await unisat.getBalance();
}

window.addEventListener("load", function () {
    loadunisat();
});

const connectButton = document.getElementById('connect-wallet');

connectButton.addEventListener('click', function () {
    connect()
})

const connectButton1 = document.getElementById('connect-wallet-1');

connectButton1.addEventListener('click', function () {
    connect()
})
