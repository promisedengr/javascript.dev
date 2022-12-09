import mysql.connector as sql


# # Open database connection
db = sql.connect(
    host="127.0.0.1",
    user="root",
    password="",
    port="3306",
    database="python"
)

# try:
#    # Execute the SQL command
#    cursor.execute(sql)
#    # Commit your changes in the database
#    db.commit()
# except:
#    # Rollback in case there is any error
#    db.rollback()

# # disconnect from server
# db.close()

# print(connection)

cursor=db.cursor()

# creating python
# cursor.execute("CREATE table users (id int auto_increment primary key, username varchar(255), password varchar(255))")
# inserting value
query = ("INSERT INTO users (username, password) VALUES ('Anna', '123')")
value = ("Anna", "12345")
try:
    cursor.execute(query)
    db.commit()
except:
   db.rollback()
db.close()




# # #to insert multiple records
# # query = "INSERT INTO employeeinfo (name, department) VALUES (%s, %s)"
# # values = [("Amit", "RnD"),
# #         ("Akash", "HR"),
# #         ("Sumit","ML"),
# #         ("Kokan","ML"),
# #         ("Yash","DS"),
# #         ("Suresh","Accounts")]
# # connection.commit()
# # cursor.executemany(query,values)






print("The end of running app")