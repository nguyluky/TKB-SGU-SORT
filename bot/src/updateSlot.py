import asyncio
import datetime
import mysql.connector
import SGUAPI

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root1772005",
  database="tkbsgusort"
)

async def getValue():
    token = None
    with open('token.txt') as file:
        token = file.read()
    

    a = SGUAPI.SguAPI(token=token)

    data = await a.getDsDk()
    if data['code'] != 200: return None

    li = []
    for i in data['data']['ds_nhom_to']:
        li.append((i['id_to_hoc'], i['sl_cp'], i['sl_dk']))

    return li

async def update(ls):
    if not ls: return
    var_string = ',\n'.join(['(%s, %s, %s)'] * len(ls))
    values = [x for xs in ls for x in xs]
    sql = '''
    INSERT INTO slot_hoc_phan(id_to_hoc, sl_cp, sl_dk) VALUES 
        %s
    ON DUPLICATE KEY UPDATE sl_cp = VALUES(sl_cp), sl_dk = VALUES(sl_dk);''' % var_string


    cur = mydb.cursor()
    cur.execute(sql, values)
    mydb.commit()


async def main():

    while 1:
        arr = await getValue()
        await update(arr)
        print(datetime.datetime.now(), "update", len(arr) if type(arr) == list else "no token")
        await asyncio.sleep(15 * 60)


if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())