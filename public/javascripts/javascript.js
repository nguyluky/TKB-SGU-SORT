
// popup handel

var popup_is_show = false
var popup_show = null
var data = null

function checkLogin() {
    return false
}

function accout_hind() {
    document.querySelector('.siderbar-right-item .accout-popup').style.display = 'none'
    document.querySelector('body').addEventListener('click', accout_hind)

}

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


document.getElementById('accout').onclick = (event) => {

    // kiểm tra xem có đăng nhập chưa
    if (!checkLogin()) {

        document.location.href = "/sign_up"
        return
    }
    if (document.querySelector('.siderbar-right-item .accout-popup').style.display == 'block') {
        accout_hind()
        return
    }
    document.querySelector('.siderbar-right-item .accout-popup').style.display = 'block'
    event.stopPropagation()
    document.querySelector('body').addEventListener('click', accout_hind)
}

document.getElementById('mod').onclick = (event) => {
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
const resize = document.getElementById('resize')

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
        this.hocphan.forEach((e) => {
            console.log(e)
        })
    },
    render: function (data) {
        this.hocphan[data.id_to_hoc] = data

        console.log(data)
        data.tkb.forEach(e => {
            var {thu, tbd, tkt, th} = e;
            var tiets = this.tkb.querySelectorAll('.tiet');
            for (let index = tbd; index <= tkt - 1; index++) {
                var thus = tiets[index].querySelectorAll('td')
                thus[thu - 1].style.display = 'none'

            }

            var tbd_ele = tiets[tbd - 1].querySelectorAll('td')[thu - 1];
            tbd_ele.rowSpan = `${tkt - tbd + 1}`
            tbd_ele.querySelector('.tiet-item').classList.add('haveitem')
            if (th) tbd_ele.querySelector('.tiet-item').classList.add('th');
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
        })
    },
    render_ghost: function () {
        
    }


}


function test(index) {
    fetch('api/dshocphan', {
        method: "POST"
    }).then(e => e.json()).then(e => {
        data = e
        // var a = e[index]
        // console.log(a)

        // tkb.render(a)
    })
}