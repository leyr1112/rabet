var provider;
var unisat;
var accounts = [];
var address;
var balance;
var connected;
var unisatInstalled;
var network = "livenet";

function clickConnectButton() {
    if (provider == false) {
        window.location.href("https://rabet.vercel.app");
    }
    if (network == "testnet") {
        changeNetwork();
        return;
    }
    if (!connected) {
        connect();
        return;
    }
}

const connectButton = document.getElementById("connect-wallet");

connectButton.addEventListener("click", function () {
    clickConnectButton();
});

const connectButton1 = document.getElementById("connect-wallet-1");

connectButton1.addEventListener("click", function () {
    clickConnectButton();
});

async function loadUnisat() {
    if (window.unisat) {
        provider = true;
        unisat = window.unisat;
        console.log("unisat", unisat);
        setBasicInfo();
        setTimeout(function () {
            setBasicInfo();
        }, 3000);
        init();
    } else {
        provider = false;
        console.log("No provider");
    }
}

function init() {
    unisat.getAccounts().then((_accounts) => {
        console.log(_accounts)
        handleAccountsChanged(_accounts);
    });
    unisat.on("accountsChanged", handleAccountsChanged);
    unisat.on("networkChanged", handleNetworkChanged);
    return () => {
        unisat.removeListener("accountsChanged", handleAccountsChanged);
        unisat.removeListener("networkChanged", handleNetworkChanged);
    };
}

function handleAccountsChanged(_accounts = []) {
    if (_accounts.length > 0) {
        if (accounts.length != 0) {
            if (accounts[0] == _accounts[0]) {
                return;
            }
        }
        connected = true;
        accounts = _accounts;
        address = _accounts[0];
        setBasicInfo();
    } else {
        connected = false;
    }
}

function handleNetworkChanged() {
    changeNetwork();
    setBasicInfo();
}

async function changeNetwork() {
    network = await unisat.switchNetwork("livenet");
}

async function connect() {
    const result = await unisat.requestAccounts();
    console.log('connect() result', result)
    handleAccountsChanged(result);
}

async function setBasicInfo() {
    address = [await unisat.getAccounts()];
    balance = await unisat.getBalance();
    network = await unisat.getNetwork();
    setUI();
}

function setUI() {
    if (!provider) {
        connectButton.innerText = "No Unisat";
    } else if (!connected) {
        connectButton.innerText = "Connect";
    } else {
        connectButton.innerText = shortedAddress(address);
    }
}

window.addEventListener("load", function () {
    loadUnisat();
});

function shortedAddress(fullStr) {
    const strLen = 30
    const separator = '...'

    if (fullStr?.length <= strLen) return fullStr

    const sepLen = separator.length
    const charsToShow = strLen - sepLen
    const frontChars = Math.ceil(charsToShow / 3)
    const backChars = Math.floor(charsToShow / 3)

    return (
        fullStr?.substr(0, frontChars) + separator + fullStr?.substr(fullStr?.length - backChars)
    )
}
