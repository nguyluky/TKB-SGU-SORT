'use client'
var user_info;
var isloaded = false;
var isIconUpdate = false;

const urlApis = {
    getDshocphan   : "/api/dshocphan",
    getDskhoa      : "/api/dskhoa",
    getDslop       : "/api/dslop",
    
    getUserinfo    : "/api/userinfo",
    getTkbs        : "/api/tkbs",
    updateTkb      : "/api/tkb",
    createTkb      : "/api/tkb",
    getTkb         : "/api/tkb",
    getTkb         : "/api/tkb",
    getInviteLink  : "/api/getinvitelink"
}

function checkLogin() {
    return user_info;
}

function dataFormatString(data) {
    var date = new Date(data)
    return date.toLocaleString()
}

function log_out() {
    fetch('/sign_in/log_out').then(e => {
        document.location.reload()
    })
}


function updateUserAccoutIcon(value) {
    if (user_info) {
        console.log('is login')
        document.querySelector('div.user-info > p:nth-child(1)').textContent = user_info['display_name'] ? user_info['display_name'] : '++++++++++++'
        document.querySelector('div.user-info > p.mssv').textContent = `MSSV: ${user_info['ma_sv'] ? user_info['ma_sv'] : '**********'}`
        document.querySelector('div.user-info > p:nth-child(3)').textContent = `Khoa: ${user_info['khoa'] ? user_info['khoa'] : '****'}`
        document.querySelector('div.user-info > p:nth-child(4)').textContent = `Lớp: ${user_info['lop'] ? user_info['lop'] : '****'}`
        document.getElementById('accout').innerHTML = '<i class="bx bxs-user-circle"></i>'
        return
    }
    else {
        console.log('no login')
        document.getElementById('accout').innerHTML = "<p> Sign In </p>"
        return
    }

}

function get_use_info() {
    fetch('/api/get_user_info').then(e => e.json()).then(json_ => {

        console.log(json_)
        // console.log(json_)
        if (json_.err) {
            sessionStorage.setItem('isLogin', false)
            updateUserAccoutIcon(false)
            console.error("chưa đăng nhậm")
            return
        }

        user_info = json_.data
        sessionStorage.setItem('isLogin', true)
        updateUserAccoutIcon(true)
    })
}

get_use_info()

function beforNavigationPage() {
}

function initAccoutClick() {

    var accountPopup = document.querySelector('.menubar-right-item .accout-popup')

    function accout_hind() {
        accountPopup.style.display = 'none'
        document.querySelector('body').addEventListener('click', accout_hind)

    }


    var account = document.getElementById('accout')
    if (account) account.onclick = (event) => {

        // kiểm tra xem có đăng nhập chưa
        if (!checkLogin()) {
            sessionStorage.setItem('befor', document.location.pathname)
            beforNavigationPage()
            document.location.href = "/sign_in"
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

// sử lý sợ kiện khi người dùng nhấn đổi theme 
function initThemeClick() {

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
}


document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    isloaded = true
    initAccoutClick()
    initThemeClick()

    updateUserAccoutIcon()
});

