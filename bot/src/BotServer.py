import socket
import queue
import time
from threading import Thread

HOST = '127.0.0.1'  
PORT = 8000        

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(2)

q = queue.Queue(10)

def backgroundP():
    while True:
        a = q.get()
        # s.sendall(bytes(a, 'utf8'))
        time.sleep(2);    
        print("ok" , a)


def server():
    while True:
        client, addr = s.accept()
        
        try:
            print('Connected by', addr)
            while True:
                data = client.recv(1024)
                str_data = data.decode("utf8")
                if not data:
                    break
                    
                print("Client: " + str_data)
                q.put(str_data)
                # msg = input("Server: ")
                    
        finally:
            client.close()

    s.close()


t1 = Thread(target=server, args=())
t2 = Thread(target=backgroundP)

t1.start()
t2.start()
t1.join()
t2.join()