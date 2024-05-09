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

    mycursor.execute('SELECT * FROM token_table;')

    listOfUser = {}
    for id_, access_token in mycursor.fetchall():
        listOfUser[id_] = json.loads(access_token).get("access_token")

    return listOfUser

async def main():
    ListOfTkb = getListOfTkb()
    ListOfUser = getListOfUser()

    qu = []

    async with httpx.AsyncClient() as client:
        for key in ListOfUser.keys():
            api = SguAPI(client=client, token=ListOfUser[key])
            qu.append((api, ListOfTkb.get(key)))

        while True:
            taks = []
            for i in range(5):
                if (len(qu) > 0) :
                    api, dks = qu.pop()
                    taks.append(api.dangKy(dks))
        
            if (len(taks) == 0):
                break

            for i in await asyncio.gather(*taks):
                # i: httpx.Response
                print(i)


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())