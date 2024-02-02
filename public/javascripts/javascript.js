
// popup handel

var popup_is_show = false
var popup_show = null

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