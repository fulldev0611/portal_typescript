const wsUrl = 'ws://localhost:3001/ws';

export const connectWebsocket = async (): Promise<WebSocket> => {
    console.log('connecting websocket....');
    return new Promise(function(resolve, reject) {
        const ws = new WebSocket(wsUrl);
        ws.onopen = function() {
            console.log('CONNECTED');
            resolve(ws);
        };
        ws.onerror = function(err) {
            reject(err);
        };
    });
}

class Socket {
    ws: WebSocket;
    url: string;
    retries: number;
    token: string;

    constructor(url: string, token: string) {
        this.retries = 0;
        this.url = url;
        this.token = token;
        this.ws = new WebSocket(url);
    }

    retryConnect() {
        if (this.retries > 5) {
            return Error('Reached max retry attempts for websocket');
        }
        if (this.ws) {
            this.ws.close();
        } 
        this.ws = new WebSocket(this.url);
        this.retries += 1;
    }

    sendMessage(message: string) {
        this.ws.send(message);
    }

}