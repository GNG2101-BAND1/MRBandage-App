import TcpSocket from 'react-native-tcp-socket';
import { ConnectionOptions } from 'react-native-tcp-socket/lib/types/Socket';

class DeviceClient {
    private socket: TcpSocket.Socket;
    private port: number;
    private host: string;

    constructor(port: number, host: string) {
        this.socket = new TcpSocket.Socket();
        this.port = port;
        this.host = host;

        this.socket.setEncoding('utf8');
        this.socket.on('data', this.processData);
    }

    /**
     * connect
     */
    public connect() {
        const options: ConnectionOptions = {
            port: this.port,
            host: this.host,
            localAddress: '127.0.0.1',
            reuseAddress: true
        }

        this.socket.connect(options, () => { console.log("Connection established");});
    }
    
    /**
     * close
     */
    public close() {
        this.socket.end();
        this.socket.destroy();
    }

    private processData(data: String | Buffer) {
        console.log(data);
    }

    public send(data: string) {
        if (!this.socket.pending) {
            this.socket.write(data);
        } else {
            this.socket.on('connect', () => {
                this.socket.write(data);
            });
        }
    }

    /**
     * connected
     */
    public connected() {
        return this.socket.readyState == 'open';
    }
}

export default DeviceClient;

// // test
// const PORT = 5555;  // this should match the port number on the ESP
// const ADDRESS = '';  // this should match the localIP of the ESP

// let client = new DeviceClient(PORT, ADDRESS);
// client.connect();
// client.send("hello from client")
// // client.close();
