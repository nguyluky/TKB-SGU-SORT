var data = null;
var isSave = false;
// Khi người dùng click thêm học phần
const button_themhocphan = document.querySelector('.button_themhocphan')
const add_themhocphan = document.querySelector('.add_themhocphan')

// TODO khi nguoi dung chuat phai vao hoc phan
async function initFile() {
    console.log(tkb_id)
    if (!tkb_id) return;
    var a = createPopup('info', "get tkb save", -1)
    var req = await fetch(`/api/tkb?` + new URLSearchParams({
        tkb_id: tkb_id
    }))
    var data_json = await req.json()
    console.log(data_json)

    if (data_json.err_mess) {
        console.log('err')
        createPopup('err', data_json.err_mess, -1)
        return
    }

    data_json.data.json_data.forEach(id_to_hoc => {
        data.ds_nhom_to.forEach(e => {
            if (e.id_to_hoc == id_to_hoc) {
                // console.log(e)
                addHp(e.ma_mon)
                tkb.render(e)
            }
        })
    })

    a.remove()
    createPopup('success', "Tải thời khóa biểu thành công")
}

function themhocphanButtonEventInit() {
    function xoaThemhocphan() {
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
        button_themhocphan.innerHTML = `<i class='bx bx-search-alt icon_themhhocphan'></i>`

        var input = document.createElement('input')
        input.setAttribute('placeholder', 'Tìm học phần')

        var div = document.createElement('div')
        div.className = 'search-suggest'
        div.style.display = 'none'

        // fiter
        input.addEventListener('keyup', event => {
            var t = event.target.value;

            var max_ = 10

            div.childNodes.forEach(e => {
                if (t == '') {
                    e.style.display = 'none'
                    return
                }

                if (max_ == 0) {

                }
                else if (e.textContent.toLowerCase().includes(t.toLowerCase())) {
                    max_--;
                    e.style.display = ''
                }
                else if (e.getAttribute('id_hp').includes(e)) {
                    max_--;
                    e.style.display = ''
                }
                else (
                    e.style.display = 'none'
                )
            })

            if (max_ == 10) {
                div.style.display = 'none'
            }
            else div.style.display = ''

        })

        // tạo đề xuất
        Object.keys(data.ds_mon_hoc).forEach(e => {
            var option = document.createElement('div')
            option.className = 'search-option'
            option.setAttribute('id_hp', e)
            option.onclick = function () {
                addHp(`${e}`)
                xoaThemhocphan()
            }
            option.textContent = `${data.ds_mon_hoc[e]} - ${e}`
            option.style.display = 'none'
            div.appendChild(option)
        })

        button_themhocphan.appendChild(input)
        button_themhocphan.appendChild(div)

        event.stopPropagation()
        setTimeout(() => {
            document.querySelector('#add-button > input').focus()
        }, 100)
        document.body.addEventListener('click', xoaThemhocphan)
        button_themhocphan.disabled = true;
    }
}
themhocphanButtonEventInit()


// sử lý sợ kiện khi người dùng nhấn vào menu
function menuPopupEventInit() {
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

            document.querySelector('body').addEventListener('click', hind_popup)
            event.stopPropagation()

        })
    })

}
menuPopupEventInit()


// khi người dùng nhấn vào nút thu nhỏ phóng to side bar
function sliveBarIconEventInit() {
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
}
sliveBarIconEventInit()


function hocPhanEventInit(cls) {
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

    function chonTiet(hp, div_hp_item, div_list_hp, hp_per) {
        var list_tiet_curr = []

        // tiet hoc pham moi them vao
        hp.tkb.forEach(tkb_item => {
            for (let index = tkb_item.tbd; index <= tkb_item.tkt; index++) {
                list_tiet_curr.push(`${tkb_item.thu}-${index}`)
            }
        })

        var biTrung = false
        var biKhacSC = false
        Object.values(tkb.hocphan).forEach(hp_ed => {

            // nếu mà mã học phần giống nhau thì nghi đè
            if (hp_ed.ma_mon == hp_per.ma_mon) return

            // xo xanh neu co bat cu tiet nao co trong tiet hoc pham moi la bij trung
            hp_ed.tkb.forEach(tkb_item => {
                for (let index = tkb_item.tbd; index <= tkb_item.tkt; index++) {
                    if (list_tiet_curr.includes(`${tkb_item.thu}-${index}`)) {
                        biTrung = true
                    }
                }
            })

            // khac co so hay khong
            hp_ed.tkb.forEach(tkb_item => {
                hp.tkb.forEach(tkb_item1 => {
                    if (tkb_item.thu == tkb_item1.thu && tkb_item.phong[0] != tkb_item1.phong[0]) {
                        if (tkb_item.tkt <= 5 && tkb_item1.tkt <= 5)
                            biTrung = true;

                        else if (tkb_item.tkt > 5 && tkb_item1.tkt > 5)
                            biKhacSC = true;
                    }
                })
            })

        })

        console.log(list_tiet_curr);


        if (biTrung) {
            // bị trùng tiết
            createPopup('err', "Trùng tiết")
            return
        }

        if (biKhacSC) {
            createPopup('err', "Khác cơ sở")
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

    function hideGhost(hp, mahp) {
        tkb.remove_go(hp.id_to_hoc)
        Object.values(tkb.hocphan).forEach(e => {
            if (e.ma_mon != mahp) {
                tkb.render(e)
            }
        })
    }

    var list_hp = []

    function makeEle(mahp) {

        if (list_hp.includes(mahp)) return
        list_hp.push(mahp);

        var list = data.ds_nhom_to.filter(e => e.ma_mon == mahp)
        var name = data.ds_mon_hoc[mahp]
        var ct = list[0].so_tc

        var div_hp = document.createElement('div')
        div_hp.className = "hp"
        div_hp.setAttribute('mahp', mahp)

        var div_info = document.createElement('div')
        div_info.className = "info"
        div_info.innerHTML = `
            <span class="name">${name}</span>
            <span class="ct">${ct}ct</span>
        `
        // <i class='bx bx-chevron-down close'></i>

        var icon = document.createElement('i')
        icon.className = 'bx bx-chevron-down close'

        var dele_id = null
        var candele = false
        icon.addEventListener('mouseenter', () => {
            dele_id = setTimeout(() => {
                icon.classList.remove('bx-chevron-down')
                icon.classList.add('bx-x')
                candele = true

            }, 200)
        })

        icon.addEventListener('mouseleave', () => {
            clearTimeout(dele_id)
            icon.classList.add('bx-chevron-down')
            icon.classList.remove('bx-x')
            candele = false
        })

        icon.addEventListener('click', () => {
            if (candele) {
                removeHp(mahp)
            }
        })

        div_info.appendChild(icon)

        var div_list_hp = document.createElement('div')
        div_list_hp.className = "list-hp close"


        list.forEach(hp => {
            var div_hp_item = document.createElement('div')
            div_hp_item.className = "list-hp-item"
            div_hp_item.setAttribute('id-to-hoc', hp.id_to_hoc)


            div_hp_item.onmouseenter = () => { showGhost(hp, mahp) }
            div_hp_item.onmouseleave = () => { hideGhost(hp, mahp) }
            div_hp_item.onclick = () => { chonTiet(hp, div_hp_item, div_list_hp, hp) }
            div_hp_item.addEventListener('contextmenu', (event) => {
                console.log('ok')
                event.preventDefault()
            })

            var dsThu = [...new Set(hp.tkb.map(e => "T" + e.thu + " - P:" + e.phong))]
            var dsGv = [...new Set(hp.tkb.map(e => `<p> - ${e.gv} ${e.th ? '(TH)' : ''}</p>`))]

            div_hp_item.innerHTML = `
                <p>${dsThu.join(' | ')}</p>
                <p>GV:  </p>
                ${dsGv.join('\n')}
                <p>20/40</p>
            `

            div_list_hp.appendChild(div_hp_item)
        })


        div_info.onclick = () => { hocphanpopup(div_info) }
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

    function removeHp(mahp) {
        var hp = document.querySelector(`.hp[mahp="${mahp}"]`)
        if (!hp) return
        hp.remove()
        Object.values(tkb.hocphan).forEach(e => {
            if (e.ma_mon == mahp) {
                tkb.remove(e.id_to_hoc)
            }
        })
    }

    cls.removeHp = removeHp

    cls.addHp = makeEle
}


/**
 * tkb user to render table 'thời khóa biểu' when user click on 'hocphan' button
 */

const tkb = {
    tkb: document.getElementById('tkb'),
    hocphan: {},
    hocphan_go: {},

    /**
     * clear all the hocphan in table tkb
     */
    clear: function () {
        Object.keys(this.hocphan).forEach(e => {
            this.remove(e)
        })
    },
    /**
     * render hocphan in table tkb
     * @param {*} data hocphan information and in hocphan data haved tkb to render
     */
    render: function (data) {
        this.hocphan[data.id_to_hoc] = data
        data.tkb.forEach(e => {
            var { thu, tbd, tkt, th, phong, gv } = e;
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
    /**
     * remove hocphan in table tkb
     * @param {*} id The id of the hoc phan
     * @param {boolean} deleted if false is chunk hidden element
     */
    remove: function (id, deleted = true) {
        var data = this.hocphan[id]

        if (!data) return

        data.tkb.forEach(e => {
            var { thu, tbd, tkt, th } = e;
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
    /**
     * look like a render function a distinct from render function are is not add to list 'hocphan' and ez to remove
     * @param {*} data 
     */
    render_go: function (data) {
        this.hocphan_go[data.id_to_hoc] = data
        data.tkb.forEach(e => {
            var { thu, tbd, tkt, th, phong, gv } = e;
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
    /**
     * remove the render_go
     * @param {*} ten 
     */
    remove_go: function (ten) {
        var data = this.hocphan_go[ten]

        if (!data) return

        data.tkb.forEach(e => {
            var { thu, tbd, tkt, th } = e;
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

    /**
     * hide all 'hocphan' in table tkb
     */
    hide_all: function () {
        Object.keys(this.hocphan).forEach(e => {
            this.remove(e, false)
            console.log(e)
        })
    },
    /**
     * show all 'hocphan' is hidden
     */
    show_all: function () {
        Object.values(this.hocphan).forEach(e => {
            this.render(e)
        })
    },

}

// khai báo hàm addHp
// gọi hàm addHp với parameter là mã học phần
// thì nó sẽ thêm vời side bar học phần đó
hocPhanEventInit(this)

function get_dshocphan() {
    var load_popup = createPopup('info', 'get data', -1)
    fetch('/api/dshocphan').then(e => e.json()).then(e => {
        data = e
        load_popup.remove()
        initFile()
    })
}

get_dshocphan()

function makeSavePopup(img_url, oncancel, onok) {
    //Create Elements
    var div_popupitem_savetkb_1 = document.createElement("div");
    var div_left_1_1 = document.createElement("div");
    var div_name_1_1_1 = document.createElement("div");
    var input__1_1_1_1 = document.createElement("input"); //
    var div_mt_1_1_2 = document.createElement("div");
    var textarea__1_1_2_1 = document.createElement("textarea"); //
    var div_pp_1_1_3 = document.createElement("div");
    var div_public_1_1_3_1 = document.createElement("div");
    var input__1_1_3_1_1 = document.createElement("input");
    var label__1_1_3_1_2 = document.createElement("label");
    var span__1_1_3_1_2_1 = document.createElement("span");
    var i_bx_bxslockopenalt_1_1_3_1_2_1_1 = document.createElement("i");
    var span__1_1_3_1_2_2 = document.createElement("span");
    var div_private_1_1_3_2 = document.createElement("div");
    var input__1_1_3_2_1 = document.createElement("input");
    var label__1_1_3_2_2 = document.createElement("label");
    var span__1_1_3_2_2_1 = document.createElement("span");
    var i_bx_bxslockalt_1_1_3_2_2_1_1 = document.createElement("i");
    var span__1_1_3_2_2_2 = document.createElement("span");
    var div_right_1_2 = document.createElement("div");
    var img__1_2_1 = document.createElement("img");
    var div_button_1_3 = document.createElement("div");
    var button_save_1_3_1 = document.createElement("button");
    var button_cancel_1_3_2 = document.createElement("button");
    //Create Text Nodes
    var textNode_1_1_3_1_2_1_1 = document.createTextNode("public");
    var textNode_1_1_3_1_2_2_1 = document.createTextNode("Mọi người có thể thấy và sử dụng thời khóa biểu của bạn");
    var textNode_1_1_3_2_2_1_1 = document.createTextNode("private");
    var textNode_1_1_3_2_2_2_1 = document.createTextNode("Chỉ mình bạn hoặc các người bạn cho phép được sử dụng");
    var textNode_1_3_1_1 = document.createTextNode("save");
    var textNode_1_3_2_1 = document.createTextNode("cancel");
    //Set Attributes
    div_popupitem_savetkb_1.setAttribute("class", "popup-item save-tkb");
    div_left_1_1.setAttribute("class", "left");
    div_name_1_1_1.setAttribute("class", "name");
    input__1_1_1_1.setAttribute("type", "text");
    input__1_1_1_1.setAttribute("placeholder", "TKB name");
    input__1_1_1_1.setAttribute("id", "file_save_name")
    div_mt_1_1_2.setAttribute("class", "mt");
    textarea__1_1_2_1.setAttribute("name", "");
    textarea__1_1_2_1.setAttribute("id", "");
    textarea__1_1_2_1.setAttribute("placeholder", "Miêu tả");
    textarea__1_1_2_1.setAttribute("id", "file_save_des")
    div_pp_1_1_3.setAttribute("class", "pp");
    div_public_1_1_3_1.setAttribute("class", "public");
    input__1_1_3_1_1.setAttribute("type", "radio");
    input__1_1_3_1_1.setAttribute("name", "type");
    input__1_1_3_1_1.setAttribute("id", "public");
    label__1_1_3_1_2.setAttribute("for", "public");
    i_bx_bxslockopenalt_1_1_3_1_2_1_1.setAttribute("class", "bx bxs-lock-open-alt");
    div_private_1_1_3_2.setAttribute("class", "private");
    input__1_1_3_2_1.setAttribute("type", "radio");
    input__1_1_3_2_1.setAttribute("name", "type");
    input__1_1_3_2_1.setAttribute("id", "private");
    input__1_1_3_2_1.setAttribute("checked", "");
    label__1_1_3_2_2.setAttribute("for", "private");
    i_bx_bxslockalt_1_1_3_2_2_1_1.setAttribute("class", "bx bxs-lock-alt");
    div_right_1_2.setAttribute("class", "right");
    img__1_2_1.setAttribute("src", img_url);
    img__1_2_1.setAttribute("alt", "");
    div_button_1_3.setAttribute("class", "button");
    button_save_1_3_1.setAttribute("class", "save");
    button_cancel_1_3_2.setAttribute("class", "cancel");
    button_cancel_1_3_2.onclick = () => {
        oncancel(div_popupitem_savetkb_1)
    }
    button_save_1_3_1.onclick = () => {
        onok(div_popupitem_savetkb_1)
    }
    //Append Children
    div_popupitem_savetkb_1.appendChild(div_left_1_1);
    div_left_1_1.appendChild(div_name_1_1_1);
    div_name_1_1_1.appendChild(input__1_1_1_1);
    div_left_1_1.appendChild(div_mt_1_1_2);
    div_mt_1_1_2.appendChild(textarea__1_1_2_1);
    div_left_1_1.appendChild(div_pp_1_1_3);
    div_pp_1_1_3.appendChild(div_public_1_1_3_1);
    div_public_1_1_3_1.appendChild(input__1_1_3_1_1);
    div_public_1_1_3_1.appendChild(label__1_1_3_1_2);
    label__1_1_3_1_2.appendChild(span__1_1_3_1_2_1);
    span__1_1_3_1_2_1.appendChild(i_bx_bxslockopenalt_1_1_3_1_2_1_1);
    span__1_1_3_1_2_1.appendChild(textNode_1_1_3_1_2_1_1);
    label__1_1_3_1_2.appendChild(span__1_1_3_1_2_2);
    span__1_1_3_1_2_2.appendChild(textNode_1_1_3_1_2_2_1);
    div_pp_1_1_3.appendChild(div_private_1_1_3_2);
    div_private_1_1_3_2.appendChild(input__1_1_3_2_1);
    div_private_1_1_3_2.appendChild(label__1_1_3_2_2);
    label__1_1_3_2_2.appendChild(span__1_1_3_2_2_1);
    span__1_1_3_2_2_1.appendChild(i_bx_bxslockalt_1_1_3_2_2_1_1);
    span__1_1_3_2_2_1.appendChild(textNode_1_1_3_2_2_1_1);
    label__1_1_3_2_2.appendChild(span__1_1_3_2_2_2);
    span__1_1_3_2_2_2.appendChild(textNode_1_1_3_2_2_2_1);
    div_popupitem_savetkb_1.appendChild(div_right_1_2);
    div_right_1_2.appendChild(img__1_2_1);
    div_popupitem_savetkb_1.appendChild(div_button_1_3);
    div_button_1_3.appendChild(button_save_1_3_1);
    button_save_1_3_1.appendChild(textNode_1_3_1_1);
    div_button_1_3.appendChild(button_cancel_1_3_2);
    button_cancel_1_3_2.appendChild(textNode_1_3_2_1);

    return div_popupitem_savetkb_1
}
function saveTkb() {

    var base64;
    var popup;
    function cancelHandle() {
        popup.remove()
    }

    function saveHandle(ele) {
        // console.log(ele)
        var name = ele.querySelector('#file_save_name').value
        var des = ele.querySelector('#file_save_des').value

        console.log(name, des)

        fetch('/api/tkb', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: des,
                id_to_hocs: Object.keys(tkb.hocphan),
                thumbnail: base64.substring(23)
            })
        }).then(async e => {
            var resp_json = await e.json()
            let stateObj = { id: "200" };
            tkb_id = resp_json.data.tkb_id
            window.history.pushState(stateObj, "", "/tkb/" + tkb_id);
            createPopup('success', '')
            cancelHandle()
        })
    }

    if (!checkLogin()) {
        createPopup('err', 'Bạn chưa có đăng nhập', 2000)
        return;
    }

    if (tkb_id) {
        fetch('/api/tkb?' + new URLSearchParams({
            "tkb_id": tkb_id
        }), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_to_hocs: Object.keys(tkb.hocphan)
            })
        }).then(async e => {
            var resp_json = await e.json()
            if (resp_json.err_mess) {
                createPopup('err', resp_json.err_mess)
            }

            createPopup('success', '')
        })

    }
    else {


        html2canvas(document.querySelector("body > div.main-body > div.tkb"),
            {
                windowWidth: 1300,
                windowHeight: 616,
            }).then(e => {
                console.log(e)
                base64 = e.toDataURL('image/jpeg')

                var ele = document.getElementById('popup-area')

                popup = makeSavePopup(base64, cancelHandle, saveHandle)
                ele.appendChild(popup)
            })
        console.log(Object.keys(tkb.hocphan))
    }


}

function createPopup(type, mess, duration = 2000) {
    function createElem() {
        var node_1 = document.createElement('DIV');
        node_1.setAttribute('class', `item-notification ${type}`);

        var node_2 = document.createElement('SPAN');
        node_2.setAttribute('class', 'icon body');
        node_1.appendChild(node_2);

        var node_3 = document.createElement('I');
        if (type == 'err') {
            node_3.setAttribute('class', 'bx bx-x-circle');

        }
        else if (type == 'warning') {
            node_3.setAttribute('class', 'bx bx-info-circle');

        }
        else
            node_3.setAttribute('class', 'bx bx-check-circle');

        node_2.appendChild(node_3);

        var node_4 = document.createElement('SPAN');
        node_4.textContent = type.toUpperCase() + ':'
        node_2.appendChild(node_4);

        var node_5 = document.createElement('SPAN');
        node_5.textContent = mess;
        node_2.appendChild(node_5);

        var node_6 = document.createElement('SAMP');
        node_6.setAttribute('class', 'close');
        node_6.addEventListener('click', function () {
            node_1.remove()
        })
        node_1.appendChild(node_6);


        var node_7 = document.createElement('I');
        node_7.setAttribute('class', 'bx bx-x');
        node_6.appendChild(node_7);



        return node_1;
    }

    var node_1 = createElem();
    document.getElementById('notification').appendChild(node_1)
    if (duration > 0) {
        setTimeout(() => {
            node_1.remove()
        }, duration)
    }
    return node_1

}

function filterClickEventInit() {
    const popup_ = document.querySelector('.popup-filter')
    var filter_stor = {
        thu: [],
        tiet: [],
        hp: new Set(),
        gv: new Set()
    }

    function hide_filter() {
        popup_.classList.remove('show')
        document.body.removeEventListener('click', hide_filter)
    }

    function filterRenderHP() {
        var a = document.querySelector('div.filter-item.hocphan > div.items > div')
        a.querySelectorAll('label')
        a.innerHTML = ''
        document.querySelectorAll('#siderbar > div.siderbar-body > div  div.hp').forEach(e => {
            var mahp = e.getAttribute('mahp')

            var name = data.ds_mon_hoc[mahp]

            a.innerHTML += `<li mahp="${mahp}"><label><input ${filter_stor.hp.has(mahp) ? '': 'checked'} type="checkbox">${name}</label></li>`
        })
    }

    function filterRenderGV() {
        var a = document.querySelector('div.filter-item.gv > div.items > div')
        a.innerHTML = ''
        var list_ = new Set()
        Object.values(tkb.hocphan).forEach(e => {
            e.tkb.forEach(j => {
                list_.add(j.gv)
            })
        })


        Array.from(list_).forEach(e => {
            a.innerHTML += `<li><label><input checked type="checkbox">${e}</label></li>`
        })
    }

    function HandleFilterHP() {
        document.querySelectorAll('div.filter-item.hocphan > div.items li').forEach(e => {
            var a = e.getAttribute('mahp')
            if(e.querySelector('input').checked) {
                document.querySelector(`div.hp[mahp="${a}"]`).style.display = null
                filter_stor.hp.delete(a)
                return
            }
            filter_stor.hp.add(a)
            document.querySelector(`div.hp[mahp="${a}"]`).style.display = "none"
        })

    }

    function HandleFilterGv() {
        document.querySelectorAll('div.filter-item.gv > div.items li')
    }


    document.querySelector('#siderbar > div.info-filter > span.button-filter-wall > div > div.top > div.right').onclick = hide_filter
    popup_.addEventListener('click', (event) => {
        HandleFilterHP();
        event.stopPropagation()
    })

    
    document.querySelector('.button-filter').onclick = (event) => {
        if (popup_.classList.contains('show')) {
            hide_filter()
        }
        else {
            popup_.classList.add('show')
            filterRenderHP()
            filterRenderGV()
            document.body.addEventListener('click' , hide_filter)
            event.stopPropagation()
        }
    }
}
filterClickEventInit()
