import socket
import threading;

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# server.bind((socket.gethostname(), 5555))
server.bind(('localhost', 12345))
server.listen(1)
print("Server started and listening on", server.getsockname())

conn, addr = server.accept()
print("Connection received:", conn)
conn.send("server ping".encode())
conn.send(conn.recv(100))
conn.close()

server.close()
