from bit import PrivateKeyTestnet, Key
import sys, getopt

def main(argv):
    src = ''
    ntw = ''
    try:
        opts, args = getopt.getopt(argv,"f:n:",[])
    except getopt.GetoptError:
        print('state=wrong_addr')
        return
    for opt, arg in opts:
        if opt == "-f":
            src = arg
        elif opt == "-n":
            ntw = arg
    if(ntw == 'main'):
        my_key = Key(src)
    else:
        my_key = PrivateKeyTestnet(src)
    balance = my_key.get_balance('btc')
    print('state=ok')
    print('balance='+str(balance))

if __name__ == "__main__":
   main(sys.argv[1:])