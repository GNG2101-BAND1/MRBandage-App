import socket;

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((socket.gethostname(), 5555))
server.listen(1)
print("Server started and listening on", server.getsockname())

conn, addr = server.accept()
print("Connection received:", conn)
conn.send("hello from server".encode())
print(conn.recv(100))
conn.close()
server.close()
