var user_info;

fetch('/sign_in/checkLogin', {
    method: "POST"
}).then(e => {
    if (e.status == 200) {
        sessionStorage.setItem('isLogin', true)
        return
    }
    sessionStorage.setItem('isLogin', false)
})

function checkLogin() {
    return sessionStorage.getItem('isLogin') == 'true';
}

function log_out() {
    fetch('/sign_in/log_out').then(e => {
        document.location.reload()
    })
}

function get_use_info() {
    fetch('/api/get_user_info', { method: "POST", }).then(e => e.json()).then(json_ => {
        // console.log(json_)

        if (json_.err_mess) {
            console.error("chưa đăng nhậm")
            return
        }
        user_info = json_.data
    })
}

get_use_info()

function initAccoutClick() {

    var accountPopup = document.querySelector('.menubar-right-item .accout-popup')

    function accout_hind() {
        accountPopup.style.display = 'none'
        document.querySelector('body').addEventListener('click', accout_hind)

    }


    document.getElementById('accout').onclick = (event) => {

        // kiểm tra xem có đăng nhập chưa
        if (!checkLogin()) {
            sessionStorage.setItem('befor', document.location.pathname)
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
    initAccoutClick()
    initThemeClick()

    if (!checkLogin()) {
        document.getElementById('accout').innerHTML = "<p> Sign In </p>"
    }

    if (user_info) {
        document.querySelector('div.user-info > p:nth-child(1)').textContent = user_info['display_name'] ? user_info['display_name'] : '++++++++++++'
        document.querySelector('div.user-info > p.mssv').textContent = `MSSV: ${user_info['ma_sv'] ? user_info['ma_sv'] : '**********'}`
        document.querySelector('div.user-info > p:nth-child(3)').textContent = `Khoa: ${user_info['khoa'] ? user_info['khoa'] : '****'}`
        document.querySelector('div.user-info > p:nth-child(4)').textContent = `Lớp: ${user_info['lop'] ? user_info['lop'] : '****'}`
    }
});


