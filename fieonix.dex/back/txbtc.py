from bit import PrivateKeyTestnet, Key
import sys, getopt

def main(argv):
    src = ''
    tgt = ''
    amt = ''
    ntw = ''
    try:
        opts, args = getopt.getopt(argv,"f:t:m:n:",[])
    except getopt.GetoptError:
        print('state=wrong_addr')
        return
    for opt, arg in opts:
        if opt == "-f":
            src = arg
        elif opt == "-t":
            tgt = arg
        elif opt == "-m":
            amt = float(arg)
        elif opt == "-n":
            ntw = arg
    if(ntw == 'main'):
        my_key = Key(src)
    else:
        my_key = PrivateKeyTestnet(src)
    balance = my_key.get_balance('btc')
    min_fee = 0.0005
    if(float(balance) < min_fee+amt):
        print('state=cash_out')
    else:
        outputs = [(tgt, amt, 'btc')]
        my_key.send(outputs, unspents=my_key.get_unspents())
        print('state=ok')

if __name__ == "__main__":
   main(sys.argv[1:])