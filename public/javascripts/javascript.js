
// popup handel

var data = null

/*Popup - Thêm học phần*/

// var button_themhocphan = document.querySelector('.button_themhocphan')
// var popup_themhocphan = document.querySelector('.popupthemhocphan')
// var close_themhocphan = document.querySelector('.close_themhocphan')

// button_themhocphan.onclick = () =>{
//     popup_themhocphan.classList.add('active');
// }

// close_themhocphan.onclick = () =>{
//     popup_themhocphan.classList.remove('active');
// }

// var button_nganhhoc = document.getElementById("button_nganhhoc")
// var popup_nganhhoc = document.querySelector('.popup_nganhhoc')
// var close_nganhhoc = document.querySelector('.close_nganhhoc')

// button_nganhhoc.onclick = () =>{
//     popup_nganhhoc.classList.add('active');
// }

// close_nganhhoc.onclick = () =>{
//     popup_nganhhoc.classList.remove('active');
// }

// Khi người dùng click thêm học phần
const button_themhocphan = document.querySelector('.button_themhocphan')
const add_themhocphan = document.querySelector('.add_themhocphan')

function xoaThemhocphan (){
    button_themhocphan.classList.remove('active')
    button_themhocphan.innerHTML = `
    <i class='bx bx-plus'></i>
    <span class="themhocphan">Thêm Học phần</span>
    `
    button_themhocphan.disabled = false;
    document.body.removeEventListener('click', xoaThemhocphan)
}  

button_themhocphan.onclick = (event) => {
    button_themhocphan.classList.add('active');
    button_themhocphan.innerHTML = `
    <i class='bx bx-search-alt icon_themhhocphan'></i>
    <input placeholder="Tìm học phần"/>
    <div class="google-suggest"></div>

    `
    event.stopPropagation()
    document.body.addEventListener('click', xoaThemhocphan)
    button_themhocphan.disabled = true;
}

// hết

function checkLogin() {
    return true
}

function initAccoutClick() {

    var accountPopup = document.querySelector('.menubar-right-item .accout-popup')

    function accout_hind() {
        accountPopup.style.display = 'none'
        document.querySelector('body').addEventListener('click', accout_hind)
    
    }


    document.getElementById('accout').onclick = (event) => {

        // kiểm tra xem có đăng nhập chưa
        if (!checkLogin()) {
    
            document.location.href = "/sign_up"
            return
        }
        if (accountPopup.style.display == 'block') {
            accout_hind()
            return
        }
        accountPopup.style.display = 'block'
        event.stopPropagation()
        document.querySelector('body').addEventListener('click', accout_hind)
    }
}
initAccoutClick()


// sử lý sợ kiện khi người dùng nhấn vào menu
function initMenuPopup() {
    var popup_is_show = false
    var popup_show = null   
    
    function hind_popup() {
        document.querySelectorAll('.popup').forEach((e) => {
            e.style.display = "none"
        })
        popup_is_show = false
        popup_show = null
        document.querySelector('body').removeEventListener('click', hind_popup)
    }

    
    document.querySelectorAll('.menubar-item').forEach(ele => {
        var menu = ele.querySelector('.menubar-menu')
        if (!menu) return
        menu.addEventListener('mouseenter', () => {
            if (!popup_is_show) return


            var e = ele.querySelector('.popup')

            // nếu nó enter vào cái không có popup thì không làm gì hết
            if (!e) return

            if (popup_show) {
                popup_show.style.display = 'none'
            }

            popup_show = e
            e.style.display = 'block'
        })

        menu.addEventListener('click', (event) => {
            e = ele.querySelector('.popup')

            // nếu nó không có popup thì không làm gì cả
            if (!e) return

            // nếu nhân vào cái đã hiện thị rồi hì ẩn
            if (popup_show == e) {
                hind_popup()
                return;
            }
            popup_show = e
            popup_show.style.display = 'block'
            popup_is_show = true

            event.stopPropagation()

            document.querySelector('body').addEventListener('click', hind_popup)

        })
    })

}
initMenuPopup()


// sử lý sợ kiện khi người dùng nhấn đổi theme 
document.getElementById('theme').onclick = (event) => {
    if (localStorage.getItem('theme') != 'dark') {
        setToDarkMode();
        localStorage.setItem('theme', 'dark')
    }
    else {
        setToLightMode();
        localStorage.setItem('theme', '')
    }
}


// khi người dùng nhấn vào nút thu nhỏ phóng to side bar
const sidebar = document.getElementById('siderbar')
document.querySelector('.menubar-icon').onclick = () => {
    if (sidebar.classList.contains('close')) {
        sidebar.classList.remove('close')
        document.getElementById('add-button').classList.remove('close')
    }
    else {
        document.getElementById('add-button').classList.add('close')
        sidebar.classList.add('close')
    }

}



/*
?
làm thế nào để dùng

tkb.render(e)
e là học phần 
nó sẽ vẽ tiết lên tkb

tkb.remove(id)
id của học phần đó (id_to_hoc)


cách để coi dữ liệu
trong console gõ data
là có
 */
const tkb = {
    tkb: document.getElementById('tkb'),
    hocphan: {},
    hocphan_go: {},

    clear: function () {
        Object.keys(this.hocphan).forEach(e => {
            this.remove(e)
        })
    },
    render: function (data) {
        this.hocphan[data.id_to_hoc] = data
        data.tkb.forEach(e => {
            var {thu, tbd, tkt, th, phong, gv} = e;
            var tiets = this.tkb.querySelectorAll('.tiet');
            for (let index = tbd; index <= tkt - 1; index++) {
                var thus = tiets[index].querySelectorAll('td')
                thus[thu - 1].style.display = 'none'
            }

            var tbd_ele = tiets[tbd - 1].querySelectorAll('td')[thu - 1];
            tbd_ele.rowSpan = `${tkt - tbd + 1}`
            tbd_ele.querySelector('.tiet-item').classList.add('haveitem')
            if (th) tbd_ele.querySelector('.tiet-item').classList.add('th');

            tbd_ele.querySelector('.tiet-item').innerHTML = `
                <span>${data.ten_mon} (${data.ma_mon})</span>
                <p>
                    <span>Phòng: </span>
                    ${phong}
                </p>
                <p>
                    <span>Phòng: </span>
                    ${gv}
                </p>
            `
        })

    },
    remove: function (id, deleted = true) {
        var data = this.hocphan[id]

        if (!data) return

        data.tkb.forEach(e => {
            var {thu, tbd, tkt, th} = e;
            var tiets = this.tkb.querySelectorAll('.tiet');
            for (let index = tbd; index <= tkt - 1; index++) {
                var thus = tiets[index].querySelectorAll('td')
                thus[thu - 1].style.display = ''

            }

            var tbd_ele = tiets[tbd - 1].querySelectorAll('td')[thu - 1];
            tbd_ele.rowSpan = `1`
            tbd_ele.querySelector('.tiet-item').classList.remove('haveitem')
            if (th) tbd_ele.querySelector('.tiet-item').classList.remove('th');
            tbd_ele.querySelector('.tiet-item').innerHTML = ''
        })
        if (deleted) delete this.hocphan[id];
    },
    render_go: function (data) {
        this.hocphan_go[data.id_to_hoc] = data
        data.tkb.forEach(e => {
            var {thu, tbd, tkt, th, phong, gv} = e;
            var tiets = this.tkb.querySelectorAll('.tiet');
            for (let index = tbd; index <= tkt - 1; index++) {
                var thus = tiets[index].querySelectorAll('td')
                thus[thu - 1].style.display = 'none'
            }

            var tbd_ele = tiets[tbd - 1].querySelectorAll('td')[thu - 1];
            tbd_ele.rowSpan = `${tkt - tbd + 1}`
            tbd_ele.querySelector('.tiet-item').classList.add('haveitem')
            if (th) tbd_ele.querySelector('.tiet-item').classList.add('th');
            else tbd_ele.querySelector('.tiet-item').classList.remove('th');

            tbd_ele.querySelector('.tiet-item').classList.add('ghost')
            tbd_ele.querySelector('.tiet-item').innerHTML = `
                <span>${data.ten_mon} (${data.ma_mon})</span>
                <p>
                    <span>Phòng: </span>
                    ${phong}
                </p>
                <p>
                    <span>Phòng: </span>
                    ${gv}
                </p>
            `
        })

    },
    remove_go: function (ten) {
        var data = this.hocphan_go[ten]
        
        if (!data) return

        data.tkb.forEach(e => {
            var {thu, tbd, tkt, th} = e;
            var tiets = this.tkb.querySelectorAll('.tiet');
            for (let index = tbd; index <= tkt - 1; index++) {
                var thus = tiets[index].querySelectorAll('td')
                thus[thu - 1].style.display = ''

            }

            var tbd_ele = tiets[tbd - 1].querySelectorAll('td')[thu - 1];
            tbd_ele.rowSpan = `1`
            tbd_ele.querySelector('.tiet-item').classList.remove('haveitem')
            if (th) tbd_ele.querySelector('.tiet-item').classList.remove('th');

            tbd_ele.querySelector('.tiet-item').classList.remove('ghost')
            tbd_ele.querySelector('.tiet-item').innerHTML = ''
        })
        delete this.hocphan_go[ten]
    },
    hide_all: function () {
        Object.keys(this.hocphan).forEach(e => {
            this.remove(e, false)
            console.log(e)
        })
    },
    show_all: function () {
        Object.values(this.hocphan).forEach(e => {
            this.render(e)
        })
    },

}



function initHocPhanHandel(cls) {
    function hocphanpopup(e) {
        var parent = e.parentElement
        parent.querySelector('.list-hp').classList.toggle('close')
        e.querySelector('i').classList.toggle('close')
    }
    function removeSelection(div_list_hp) {
        div_list_hp.querySelectorAll('.list-hp-item').forEach(e => {
            if (e.classList.contains("select")) {
                e.classList.remove("select")
                tkb.remove(e.getAttribute('id-to-hoc'))
            }
        })
    }

    function chonTiet(hp , div_hp_item, div_list_hp, hp_per) {
        var list_tiet_curr = []
        hp.tkb.forEach(tkb_item => {
            for (let index = tkb_item.tbd; index <= tkb_item.tkt; index++) {
                list_tiet_curr.push(`${tkb_item.thu}-${index}`)
            }
        })

        var biTrung = false
        Object.values(tkb.hocphan).forEach(hp => {

            // nếu mà mã học phần giống nhau thì nghi đè
            if (hp.ma_mon == hp_per.ma_mon) return

            // nếu học phần khác nhau mà bị chùng tiết thì sét buTrung = true
            hp.tkb.forEach(tkb_item => {
                for (let index = tkb_item.tbd; index <= tkb_item.tkt; index++) {
                    if (list_tiet_curr.includes(`${tkb_item.thu}-${index}`)) {
                        biTrung = true
                    }
                }
            })
        })

        console.log(list_tiet_curr);

        
        if (biTrung) {
            // bị trùng tiết
            console.log('bi trung')
            return
        }

        tkb.remove_go(hp.id_to_hoc)

        removeSelection(div_list_hp)

        tkb.render(hp)

        div_hp_item.classList.add("select")

    }

    function showGhost(hp, mahp) {
        if (!tkb.hocphan[hp.id_to_hoc])
        Object.values(tkb.hocphan).forEach(e => {
            if (e.ma_mon == mahp) {
                tkb.remove(e.id_to_hoc, false)
            }
        })
        tkb.render_go(hp)

    }

    function hideGhost (hp, mahp) {
        tkb.remove_go(hp.id_to_hoc)
        Object.values(tkb.hocphan).forEach(e => {
            if (e.ma_mon != mahp) {
                tkb.render(e)
            }
        })
    }

    function makeEle(mahp) {

        var list = data.ds_nhom_to.filter(e => e.ma_mon == mahp)
        var name = data.ds_mon_hoc[mahp]
        var ct = list[0].so_tc
    
        var div_hp = document.createElement('div')
        div_hp.className = "hp"
    
        var div_info = document.createElement('div')
        div_info.className = "info"
        div_info.innerHTML = `
            <span class="name">${name}</span>
            <span class="ct">${ct}ct</span>
            <i class='bx bx-chevron-down close'></i>
        `
    
        var div_list_hp = document.createElement('div')
        div_list_hp.className = "list-hp close"
    

        list.forEach(hp => {
            var div_hp_item = document.createElement('div')
            div_hp_item.className = "list-hp-item"
            div_hp_item.setAttribute('id-to-hoc', hp.id_to_hoc)


            div_hp_item.onmouseenter = () => {showGhost(hp, mahp)}
            div_hp_item.onmouseleave = () => {hideGhost(hp, mahp)}
            div_hp_item.onclick = () => {chonTiet(hp, div_hp_item, div_list_hp, hp)}
    
            var dsThu = [...new Set(hp.tkb.map(e => e.thu))]
            var dsGv = [...new Set(hp.tkb.map(e => `<p> - ${e.gv} ${e.th ? '(TH)' : ''}</p>`))]
    
            div_hp_item.innerHTML = `
                <p>Thứ:  ${dsThu.join(' và ')}</p>
                <p>GV:  </p>
                ${dsGv.join('\n')}
                <p>20/40</p>
            `
    
            div_list_hp.appendChild(div_hp_item)
        })


        div_info.onclick = () => {hocphanpopup(div_info)}
        div_list_hp.onmouseenter = () => {
            // tkb.hide_all()
    
            Object.values(tkb.hocphan).forEach(e => {
                if (e.ma_mon == mahp) {
                    tkb.remove(e.id_to_hoc, false)
                }
            })
        }
    
        div_list_hp.onmouseleave = () => {
            tkb.show_all()
        }
    
    
        div_hp.appendChild(div_info)
        div_hp.appendChild(div_list_hp)
    
        document.querySelector('.siderbar-body .ls').appendChild(div_hp)
    }

    cls.addHp = makeEle
}


// khai báo hàm addHp
// gọi hàm addHp với parameter là mã học phần
// thì nó sẽ thêm vời side bar học phần đó
initHocPhanHandel(this)