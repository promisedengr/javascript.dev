from tkinter import *
from  tkinter import ttk


ws  = Tk()
ws.title('PythonGuides')
ws.geometry('500x500')
ws['bg'] = '#AC99F2'

game_frame = Frame(ws)
game_frame.pack()

#scrollbar
game_scroll = Scrollbar(game_frame)
game_scroll.pack(side=RIGHT, fill=Y)

game_scroll = Scrollbar(game_frame,orient='horizontal')
game_scroll.pack(side= BOTTOM,fill=X)

my_game = ttk.Treeview(game_frame,yscrollcommand=game_scroll.set, xscrollcommand =game_scroll.set)


my_game.pack()

game_scroll.config(command=my_game.yview)
game_scroll.config(command=my_game.xview)

#define our column
 
my_game['columns'] = ('player_id', 'player_name', 'player_Rank')

# format our column
my_game.column("#0", width=0,  stretch=NO)
my_game.column("player_id",anchor=CENTER, width=80)
my_game.column("player_name",anchor=CENTER,width=80)
my_game.column("player_Rank",anchor=CENTER,width=80)


#Create Headings 
my_game.heading("#0",text="",anchor=CENTER)
my_game.heading("player_id",text="Id",anchor=CENTER)
my_game.heading("player_name",text="Name",anchor=CENTER)
my_game.heading("player_Rank",text="Rank",anchor=CENTER)


#add data 
my_game.insert(parent='',index='end',iid=0,text='',
values=('1','Ninja','101'))
my_game.insert(parent='',index='end',iid=1,text='',
values=('2','Ranger','102'))
my_game.insert(parent='',index='end',iid=2,text='',
values=('3','Deamon','103'))
my_game.insert(parent='',index='end',iid=3,text='',
values=('4','Dragon','104'))
my_game.insert(parent='',index='end',iid=4,text='',
values=('5','CrissCross','105'))
my_game.insert(parent='',index='end',iid=5,text='',
values=('6','ZaqueriBlack','106'))
my_game.insert(parent='',index='end',iid=6,text='',
values=('7','RayRizzo','107'))
my_game.insert(parent='',index='end',iid=7,text='',
values=('8','Byun','108'))
my_game.insert(parent='',index='end',iid=8,text='',
values=('9','Trink','109'))
my_game.insert(parent='',index='end',iid=9,text='',
values=('10','Twitch','110'))
my_game.insert(parent='',index='end',iid=10,text='',
values=('11','Animus','111'))
my_game.pack()

frame = Frame(ws)
frame.pack(pady=20)

#labels
playerid= Label(frame,text = "player_id")
playerid.grid(row=0,column=0 )

playername = Label(frame,text="player_name")
playername.grid(row=0,column=1)

playerrank = Label(frame,text="Player_rank")
playerrank.grid(row=0,column=2)

#Entry boxes
playerid_entry= Entry(frame)
playerid_entry.grid(row= 1, column=0)

playername_entry = Entry(frame)
playername_entry.grid(row=1,column=1)

playerrank_entry = Entry(frame)
playerrank_entry.grid(row=1,column=2)

#Select Record
def select_record():
    #clear entry boxes
    playerid_entry.delete(0,END)
    playername_entry.delete(0,END)
    playerrank_entry.delete(0,END)
    
    #grab record
    selected=my_game.focus()
    #grab record values
    values = my_game.item(selected,'values')
    #temp_label.config(text=selected)

    #output to entry boxes
    playerid_entry.insert(0,values[0])
    playername_entry.insert(0,values[1])
    playerrank_entry.insert(0,values[2])

#save Record
def update_record():
    selected=my_game.focus()
    #save new data 
    my_game.item(selected,text="",values=(playerid_entry.get(),playername_entry.get(),playerrank_entry.get()))
    
   #clear entry boxes
    playerid_entry.delete(0,END)
    playername_entry.delete(0,END)
    playerrank_entry.delete(0,END)

#Buttons
select_button = Button(ws,text="Select Record", command=select_record)
select_button.pack(pady =10)

refresh_button = Button(ws,text="Refresh Record",command=update_record)
refresh_button.pack(pady = 10)

temp_label =Label(ws,text="")
temp_label.pack()

ws.mainloop()