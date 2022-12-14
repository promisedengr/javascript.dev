from tkinter import *
from  tkinter import ttk
import pymsgbox

import mysql.connector as sql
import hashlib



ws  = Tk()
ws.title('PythonGuides')
ws.geometry('860x500')
ws['bg'] = '#AC99F2'

game_frame = Frame(ws)
game_frame.pack()

#scrollbar
game_scroll = Scrollbar(game_frame)
game_scroll.pack(side=RIGHT, fill=Y)

game_scroll = Scrollbar(game_frame, orient='horizontal')
game_scroll.pack(side= BOTTOM,fill=X)

my_game = ttk.Treeview(game_frame,yscrollcommand=game_scroll.set, xscrollcommand =game_scroll.set)

my_game.pack()

game_scroll.config(command=my_game.yview)
game_scroll.config(command=my_game.xview)

db = sql.connect(
    host="127.0.0.1",
    user="root",
    password="",
    port="3306",
    database="python"
)
cursor=db.cursor()


#define our column and heading of Table
my_game['columns'] = ('id', 'username', 'description', 'password', 'm_password')
my_game.column("#0", width=0,  stretch=NO)
my_game.column("id",anchor=CENTER, width=80)
my_game.column("username",anchor=CENTER, width=80)
my_game.column("description",anchor=CENTER,width=80)
my_game.column("password",anchor=CENTER,width=80)
my_game.column("m_password",anchor=CENTER,width=80)

my_game.heading("#0",text="",anchor=CENTER)
my_game.heading("id",text="Id",anchor=CENTER)
my_game.heading("username",text="Username",anchor=CENTER)
my_game.heading("description",text="Description",anchor=CENTER)
my_game.heading("password",text="Password",anchor=CENTER)
my_game.heading("m_password",text="Master Password",anchor=CENTER)




# fetching data from mysql
def fetchDataFromDB():
    print('fetchDataFromDB')
    cursor.execute("SELECT * FROM passwords")
    records = cursor.fetchall()
    for idx, row in enumerate(records):
        my_game.insert(parent='',index='end',iid=idx+1,text='', values=row)





#add data

cursor.execute("SELECT * FROM passwords")
records = cursor.fetchall()
for idx, row in enumerate(records):
    print(row[3])
    my_game.insert(parent='',index='end',iid=idx+1,text='', values=row)





my_game.pack()

frame = Frame(ws)
frame.pack(pady=20)

#labels
usernameLabel= Label(frame,text = "Username")
usernameLabel.grid(row=0,column=0 )
descriptionLabel = Label(frame,text="Description")
descriptionLabel.grid(row=0,column=1)
passwordLabel = Label(frame,text="Password")
passwordLabel.grid(row=0,column=2)
mPasswordLabel = Label(frame,text="Master Password")
mPasswordLabel.grid(row=0,column=3)

#Entry boxes
username_entry= Entry(frame)
username_entry.grid(row= 1, column=0)
description_entry = Entry(frame)
description_entry.grid(row=1,column=1)
password_entry = Entry(frame)
password_entry.grid(row=1,column=2)
mPassword_entry = Entry(frame)
mPassword_entry.grid(row=1,column=3)

#Select Record
def select_record():
    #clear entry boxes
    username_entry.delete(0,END)
    description_entry.delete(0,END)
    password_entry.delete(0,END)
    
    #grab record
    selected=my_game.focus()
    #grab record values
    values = my_game.item(selected,'values')
    #temp_label.config(text=selected)

    #output to entry boxes
    username_entry.insert(0,values[0])
    description_entry.insert(0,values[1])
    password_entry.insert(0,values[2])

#save Record
def update_record():
    selected=my_game.focus()
    #save new data 
    my_game.item(selected,text="",values=(username_entry.get(),description_entry.get(),password_entry.get()))
    
   #clear entry boxes
    username_entry.delete(0,END)
    description_entry.delete(0,END)
    password_entry.delete(0,END)
# Create a new Record
def createRecord():
    print('hello')
    # getting entry to save data
    i_name = username_entry.get()
    i_description = description_entry.get()
    i_password = password_entry.get()
    i_mPassword = mPassword_entry.get()

    # validating the empty string for all entry
    if i_name == "":
        pymsgbox.alert('Please insert username!', 'Alert')
        return
    if i_description == "":
        pymsgbox.alert('Please insert your link!', 'Alert')
        return
    if i_password == "":
        pymsgbox.alert('Please insert your password!', 'Alert')
        return
    if i_mPassword == "":
        pymsgbox.alert('Please insert your master password!', 'Alert')
        return
    
    value = (i_name, i_description, hashlib.md5(i_password.encode('utf-8')).hexdigest(), hashlib.md5(i_mPassword.encode('utf-8')).hexdigest()) 
    query = ("INSERT INTO passwords (username, description, password, m_password) VALUES (%s, %s, %s, %s)")
    # save entry to mysql
    try:
        cursor.execute(query, value)
        db.commit()
    except:
        db.rollback()
    # db.close()

    #clear entry boxes
    username_entry.delete(0,END)
    description_entry.delete(0,END)
    password_entry.delete(0,END)
    mPassword_entry.delete(0,END)
    fetchDataFromDB()
    pymsgbox.alert('Successfully stored to MySQL database', 'Info')
    print('done')
    




#Buttons
select_button = Button(ws,text="Select Record", command=select_record)
select_button.pack(pady =10)

create_button = Button(ws,text="Create Record", command=createRecord)
create_button.place(x=25, y=450)
# create_button.pack(pady =10)

edit_button = Button(ws,text="Edit ",command=update_record)
edit_button.pack(pady = 10)

temp_label =Label(ws,text="")
temp_label.pack()

ws.mainloop()