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

    data = a

async def update(list):

    var_string = ', '.join(['(?, ?, ?)'] * len(list))
    sql = '''
    INSERT INTO slot_hoc_phan(id_to_hoc, sl_cp, sl_dk) VALUES 
        %s
    ON DUPLICATE KEY UPDATE sl_cp = VALUES(sl_cp), sl_dk = VALUES(sl_dk);''' % var_string

    print(sql)

def main():
    test = list(range(10))

    update(test)
    pass


# mycursor = mydb.cursor()


if __name__ == "__main__":
    main()