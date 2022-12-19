
# https://www.mycompiler.io/view/394rngW
from hashlib import md5

class MD5:
    def __init__(self, data = "Hello, world!"):
        self.data = data
    def encrypt(self):
        self.data = md5(self.data.encode()).hexdigest()
        return "Crypted: "+self.data
    def decrypt(self, data):
        print(self.data)
        if md5(data.encode()).hexdigest() == self.data:
            return "Decrypted: "+data
        else:
            return "Error"

crypt = MD5()
print(crypt.encrypt()) # Encrypt
print(crypt.decrypt("Hello, world!")) # Decrypt data argument