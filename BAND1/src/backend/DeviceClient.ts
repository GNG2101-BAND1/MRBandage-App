import { Socket } from 'node:net';

class DeviceClient {
    private socket: Socket;
    private port: number;
    private host: string;

    constructor(port: number, host: string) {
        this.socket = new Socket();
        this.port = port;
        this.host = host;

        this.socket.setEncoding('utf8');
        this.socket.on('data', this.processData);
    }

    /**
     * connect
     */
    public connect() {
        this.socket.connect(this.port, this.host,
            () => { console.log("Connection established"); }
        );
    }
    
    /**
     * close
     */
    public close() {
        this.socket.end();
        this.socket.destroy();
    }

    private processData(data: Buffer) {
        console.log(data);
    }

    public send(data: string) {
        if (this.socket.readyState == 'open') {
            this.socket.write(data);
        } else {
            this.socket.on('ready', () => {
                this.socket.write(data);
            });
        }
    }
}

// test
let client = new DeviceClient(5555, '192.168.4.2');
client.connect();
client.send("hello from client")
// client.close();
