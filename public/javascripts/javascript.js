
// popup handel

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

document.querySelectorAll('.sidebar-item').forEach(ele => {
    var menu = ele.querySelector('.sidebar-menu')
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


document.getElementById('accout').onclick = () => {
    console.log('login')
}