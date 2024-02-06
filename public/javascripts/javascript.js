
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


/*Popup - Thêm học phần*/

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


function initMenuPopup() {
    var popup_is_show = false
    var popup_show = null   
    
    function hind_popup() {
        document.querySelectorAll('.popup').forEach((e) => {
            e.style.display = "none"
        })
        popup_is_show = false
        popup_show = null
        document.querySelector('body').addEventListener('click', hind_popup)
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

const tkb = {
    tkb: document.getElementById('tkb'),
    hocphan: {},
    clear: function () {
        Object.keys(this.hocphan).forEach(e => {
            this.remove(e)
        })
    },
    render: function (data) {
        this.hocphan[data.id_to_hoc] = data

        console.log(data)
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
    remove: function (ten) {
        var data = this.hocphan[ten]


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
    },
    render_ghost: function (ma_mon) {
        data.ds_nhom_to.forEach(e => {
            if (e.ma_mon == ma_mon) {
                this.render(e)
            }
        })
    }


}


function hocphanpopup(e) {
    console.log(e);
    var parent = e.parentElement
    parent.querySelector('.list-hp').classList.toggle('close')
    e.querySelector('i').classList.toggle('close')
}

function addHp(mahp) {
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

    div_info.onclick = () => {hocphanpopup(div_info)}

    var div_list_hp = document.createElement('div')
    div_list_hp.className = "list-hp close"

    list.forEach(e => {
        var div_hp_item = document.createElement('div')
        div_hp_item.className = "list-hp-item"


        var dsThu = [...new Set(e.tkb.map(e => e.thu))]
        var dsGv = [...new Set(e.tkb.map(e => `<p> - ${e.gv} ${e.th ? '(TH)' : ''}</p>`))]

        div_hp_item.innerHTML = `
            <p>Thứ:  ${dsThu.join(' và ')}</p>
            <p>GV:  </p>
            ${dsGv.join('\n')}
            <p>20/40</p>
        `

        div_list_hp.appendChild(div_hp_item)
    })

    div_hp.appendChild(div_info)
    div_hp.appendChild(div_list_hp)

    document.querySelector('.siderbar-body .ls').appendChild(div_hp)
}
