
// popup handel

var popup_is_show = false
var popup_show = null

function hind_popup() {
    document.querySelectorAll('.popup').forEach((e) => {
        e.style.display = "none"
    })
    popup_is_show = false
    document.querySelector('body').addEventListener('click', hind_popup)
}

document.querySelectorAll('.sidebar-item').forEach(ele => {
    var menu = ele.querySelector('.sidebar-menu')
    if (!menu) return
    menu.addEventListener('mouseenter', () => {
        if (!popup_is_show) return
        var e = ele.querySelector('.popup')
        if (!e) return // nếu nó enter vào cái không có popup thì không làm gì hết
        if (popup_show) {
            popup_show.style.display = 'none'
        }
        popup_show = e
        e.style.display = 'block'
    })

    menu.addEventListener('click', (event) => {
        popup_is_show = true
        popup_show = ele.querySelector('.popup')
        popup_show.style.display = 'block'
        event.stopPropagation()
        document.querySelector('body').addEventListener('click', hind_popup)

    })
})
