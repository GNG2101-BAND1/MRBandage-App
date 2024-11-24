import socket


client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('localhost', 12345))
print(client.recv(100))
client.send('ping'.encode())
print(client.recv(100))
# client.close()
