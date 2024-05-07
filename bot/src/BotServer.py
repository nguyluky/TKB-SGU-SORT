import asyncio
from http import client
import json
from operator import le
import mysql.connector
from pprint import pprint
from SGUAPI import SguAPI
import httpx

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root1772005",
  database="tkbsgusort"
)


def getListOfTkb():

    mycursor = mydb.cursor()

    mycursor.execute("SELECT id_user, json_data FROM tkb_save")

    myresult = mycursor.fetchall()

    listOfUser = {}
    for user_id, list_dk in myresult:
        users = json.loads(user_id)
        dks = json.loads(list_dk)

        if type(users) == str:
            if not listOfUser.get(users, None):
                listOfUser[users] = [dks]
            else:
                listOfUser[users].append(dks)

        else:
            for user in users:
                if not listOfUser.get(user, None):
                    listOfUser[user] = [dks]
                else:
                    listOfUser[user].append(dks)

    return listOfUser

def getListOfUser():
    mycursor = mydb.cursor()

    mycursor.execute('SELECT username,pass,id,type_signup FROM user_login_info')

    listOfUser = {}
    for userName, password, id_, typeUp in mycursor.fetchall():
        listOfUser[id_] = (userName, password, typeUp)

    return listOfUser

async def main():
    ListOfTkb = getListOfTkb()
    ListOfUser = getListOfUser()

    qu = []

    async with httpx.AsyncClient() as client:
        loginTaks = []
        for key in ListOfTkb.keys():
            if ListOfUser[key][2] == "SGU":
                api = SguAPI(client=client)
                loginTaks.append(api.login(ListOfUser[key][0], ListOfUser[key][1]))
                qu.append(api)

        await asyncio.gather(*loginTaks)
        print(qu[0].token)
        while True:
            taks = []
            for i in range(5):
                if (len(qu) > 0) :
                    api: SguAPI = qu.pop()
                    taks.append(api.getUserInfo())
        
            if (len(taks) == 0):
                break

            print(await asyncio.gather(*taks))

        

    
if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())