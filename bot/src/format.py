import json
import re


def tkbs(text: str):
    r = []

    tbds = [
        "07:00",
        "07:50",
        "09:00",
        "09:50",
        "10:40",
        "13:00",
        "13:50",
        "15:00",
        "15:50",
        "16:40",
        "17:40",
        "18:30",
        "19:20",
    ]

    tkts = [
        "07:50",
        "08:40",
        "09:50",
        "10:40",
        "11:30",
        "12:50",
        "14:40",
        "15:50",
        "16:40",
        "17:30",
        "18:30",
        "19:20",
        "20:10",
    ]

    for str_ in text.split('<hr>'):
        if (str_ == ''): continue
        thu = re.findall(r"Thứ (\d+)", str_)[0]


        # Lấy thời gian bắt đầu và kết thúc
        gio_bat_dau = re.findall(r"từ (\d+:\d+)", str_)[0]
        gio_ket_thuc = re.findall(r"đến (\d+:\d+)", str_)[0]

        # Lấy phòng học
        phong_hoc = re.findall(r"Ph (.*?),", str_)[0]

        try :
            giang_vien = re.findall(r"GV (.*?)(?:,|$)", str_)[0]
        except:
            giang_vien = None

        r.append({
                    "thu": thu,
                    "tbd": tbds.index(gio_bat_dau) + 1,
                    "tkt": tkts.index(gio_ket_thuc) + 1,
                    "phong": phong_hoc,
                    "gv": giang_vien,
                    "th": False
                })

    return r

def main():

    dataJson = json.load(open('src/filename.json', encoding='utf-8'))

    ds_khoa = {}
    for i in dataJson['data']['ds_khoa']:
        ds_khoa[i['ma']] = i


    ds_lop = {}
    for i in dataJson['data']['ds_lop']:
        ds_lop[i['ma']] = i


    ds_mon_hoc = {}
    for i in dataJson['data']['ds_mon_hoc']:
        ds_mon_hoc[i['ma']] = i['ten']

    ds_nhom_to = []
    for i in dataJson['data']['ds_nhom_to']:

        
        # i['ten_mon'] = ds_mon_hoc[i['ma_mon']]
        ds_nhom_to.append({
            "id_to_hoc": i['id_to_hoc'],
            "id_mon": i['id_mon'],
            "ma_mon": i["ma_mon"],
            "ten_mon": ds_mon_hoc[i['ma_mon']],
            "so_tc": int(i['so_tc']),
            "lop": ds_lop[i['lop']],
            "ds_lop": [ds_lop[j] for j in i['ds_lop']],
            "ds_khoa": [ds_khoa[j] for j in i.get('ds_khoa', [])],
            "tkb": tkbs(i['tkb'])
        })

    json.dump({
        "ds_nhom_to": ds_nhom_to,
        "ds_mon_hoc": ds_mon_hoc
        }, open('text.json', encoding='utf-8', mode='w+'), ensure_ascii=False, indent=2)
    # print(ds_nhom_to)


if __name__ == "__main__":
    main()