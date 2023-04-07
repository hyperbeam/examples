class Socket {
    addr;
    onMessage;
    sock;

    constructor(addr, onMessage) {
        this.addr = addr;
        this.onMessage = onMessage;
        this.setupSock();
    }

    setupSock = () => {
        const sock = chrome.runtime.connectNative(this.addr);
        sock.onDisconnect.addListener(this.onClose);
        sock.onMessage.addListener(this.onMessage);
        this.sock = sock;
    };

    onClose = () => {
        setTimeout(this.setupSock, 1000);
    };

    send(message) {
        const { sock } = this;
        if (sock) {
            sock.postMessage(message);
        }
    }

    sendObj(type, data = {}) {
        this.send({ type, data });
    }
}

let peers = [];
const hyperbeamSocket = new Socket("Hyperbeam", handleMessage);

async function handleMessage(payload) {
    switch(payload.type) {
        case 'init':
            peers = data.peers;
            break;
        case 'new_peer':
            peers.push(data);
            break;
        case 'destroy_peer':
            const index = peers.indexOf(data);
            if (index > -1) {
                peers.splice(index, 1);
            }
            break;
        case 'recv_peer':
            handlePeerMessage(data);
            break;
    }
}

async function handlePeerMessage(payload) {
    // We wont use this here, but it's here to illustrate that it exists.
    const peerId = payload.id;
    const message = payload.data;

    document.getElementById("messagebox").value = message;
}

document.getElementById("messagebox").addEventListener("input", event => {
    hyperbeamSocket.send({
        type: "send_peer",
        data: {
            ids: peers,
            data: event.target.value,
        }
    });
});


