import TcpSocket from 'react-native-tcp-socket';

const server = TcpSocket.createServer(function(socket) {
    console.log("Connection Established, server");

    socket.on('data', (data) => {
      socket.write('Echo server ' + data);
    });
  
    socket.on('error', (error) => {
      console.log('An error ocurred with client socket ', error);
    });
  
    socket.on('close', (error) => {
      console.log('Closed connection with ', socket.address());
    });
  });
  
  server.on('error', (error) => {
    console.log('An error ocurred with the server', error);
  });
  
  server.on('close', () => {
    console.log('Server closed connection');
  });

const start = () => {
    server.listen({ port: 12345, host: 'localhost' });
}

export default start;
