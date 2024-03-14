const username = document.getElementById('username');
const pass = document.getElementById('pass');
const email = document.getElementById('email');
const display_name = document.getElementById('display_name')
const mssv = document.getElementById('mssv')
const khoa = document.querySelector('#khoa > div.selected')
const lop = document.querySelector('#lop > div.selected')
const inputs = document.getElementById("inputs");

function disable_button_next() {
    document.querySelector('button.next').disabled = true
}

function no_disable_button_next() {
    var have_err = false;
    const err_view = document.querySelectorAll(`.err_view`).forEach(e => {
        if (e.textContent) have_err = true;
    })

    if (have_err) return;
    document.querySelector('button.next').disabled = false

}

function optInit() {
    var last_item = document.querySelector("#inputs > input:nth-child(1)");
    inputs.addEventListener("input", function (e) {
        const target = e.target;
        const val = target.value;
        if (val.length > 1) {
            console.log(val)
            var otp = val;
            if (otp.length > 5) return;

            otp.split("").forEach((elem, index) => {
                document.querySelectorAll('#inputs input')[index].value = elem;
                last_item = document.querySelectorAll('#inputs input')[index];
            })

            const next = last_item.nextElementSibling;
            if (next) {
                last_item = next;
                next.focus();
            }

            return;
        }
        if (isNaN(val)) {
            target.value = "";
            return;
        }

        if (val != "") {
            const next = last_item.nextElementSibling;
            if (next) {
                last_item = next;
                next.focus();
            }
        }
    });

    inputs.addEventListener("keyup", function (e) {
        const target = e.target;
        const key = e.key.toLowerCase();

        if (key == "backspace" || key == "delete") {
            target.value = "";
            const prev = last_item.previousElementSibling;
            if (prev) {
                last_item = prev;
                prev.focus();
                prev.select()
            }
            return;
        }
    });

    document.querySelectorAll('#inputs input').forEach(e => {
        e.addEventListener('focus', function (event) {
            if (event.target == last_item) return
            if (!last_item) return;
            last_item.focus()
        })
    })


}
optInit()


function setErr(mess) {
    document.getElementById('err').innerHTML += `<p>${mess}</p>`
}

function clsErr() {
    document.getElementById('err').innerHTML = ''
}

function back() {
    document.querySelector('.tab1').style.display = ''
    document.querySelector('.tab2').style.display = 'none'

    document.querySelector('button.sguacc').textContent = 'Đăng ký với tài khoản trường'
    document.querySelector('button.sguacc').onclick = () => { }

    document.querySelector('button.next').onclick = next
}


async function check_user_name() {
    var check_user_name_req = await fetch('/api/check_user_name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_name: username.value
        })
    })

    console.log('check user name res', (await check_user_name_req).status)

    const json_resp = await check_user_name_req.json()
    if (json_resp.err) {
        console.log(json_resp.err_mess)
        return false
    }

    return json_resp.data;

}

async function next() {
    clsErr()
    var user = username.value
    var pas = pass.value
    var em = email.value

    if (user == '') {
        err_show('username', 'Vui lòng nhập tên đăng nhập')
        return
    }

    if (pas == '') {
        err_show('pass1', "Vui lòng nhập một khẩu")
        return
    }

    if (em == '') {
        err_show('email', "Emal không thể trống")
        return
    }

    if (user.includes(' ')) {
        // setErr('Tên đăng nhập không được chứa khoản chống')
        return
    }

    disable_button_next();

    var user_name_used = await check_user_name();
    if (user_name_used) {
        setErr("Tên đăng nhập đã tồn tại");
        return;
    }


    var email_used = await check_email(em);
    if (email_used) {
        return;
    }

    document.querySelector('.tab1').style.display = 'none'
    document.querySelector('.tab2').style.display = ''

    document.querySelector('button.sguacc').textContent = 'Back'
    document.querySelector('button.sguacc').onclick = back
    document.querySelector('button.next').onclick = sign_up

    no_disable_button_next();
}

async function sign_up() {
    var user = username.value
    var pas = pass.value
    var ema = email.value
    var dn = display_name.value
    var ms = mssv.value
    var k = document.querySelector('#khoa > div.selected').getAttribute('id_sele')
    var lop_ = document.querySelector('#lop > div.selected').getAttribute('id_sele')

    if (email.classList.contains('err')) {
        return
    }


    // var check_req = await fetch('/sign_up/checkemail', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email: ema
    //     })
    // })

    // if (check_req.status != 200) {
    //     var text = await check_req.text()
    //     setErr(text)
    //     return
    // }

    fetch('sign_up', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: pas,
            email: ema,
            display_name: dn,
            ma_sv: ms,
            khoa: k,
            lop: lop_
        })
    }).then(async e => {
        if (e.status != 200) {
            var text = await e.text()
            console.log(text);
            setErr(text)
            return
        }

        nextOtp();

    })
}

function nextOtp() {
    document.querySelector('.tab2').style.display = 'none'
    document.querySelector('.tab3').style.display = ''

    document.querySelector('button.sguacc').onclick = () => {
        document.querySelector('.tab3').style.display = 'none'
        document.querySelector('.tab2').style.display = ''
        document.querySelector('button.sguacc').onclick = back
        document.querySelector('button.next').onclick = sign_up
    }
    document.querySelector('button.next').onclick = sendOtp

}

function sendOtp() {
    const otps = document.querySelectorAll('#inputs input')
    const a = Array.from(otps)
    const otp = a.map(e => e.value).join('');
    if (otp.length != 5) return;
    console.log(otp)
    fetch('/sign_up/otp', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            otp: otp
        })
    }).then(async e => {
        const json_req = await e.json()
        if (json_req.err) {
            console.error(json_req.err_mess)
        }

        console.log(json_req)
        document.location.pathname = '/sign_in'
        
    })
}


// Handle event

function err_show(id, err) {
    const input = document.getElementById(id)
    const err_view = document.querySelector(`.err_view.${id}`)
    if (err) {
        if (input) input.classList.add('err');
        err_view.textContent = err
        return
    }

    input.classList.remove('err')
    err_view.textContent = ''

}

function intiCheck() {

    document.getElementById('username').addEventListener('keyup', (event) => {
        var name = event.target.value;
        var err_mess = null
        if (name.includes(' ')) {
            err_mess = "Tên Không được có khoản cách"
        }
        err_show('username', err_mess)
    })

    document.getElementById('username').addEventListener('focusout', async event => {
        var name = event.target.value;
        var err_mess = null

        if (name.length < 5) {
            err_mess = "Tên đăng nhập quá ngắn"
            err_show('username', err_mess)
            return
        }

        var user_name_used = await check_user_name();

        if (user_name_used) {
            err_show('username', 'Tên đăng nhập đã tồn tại')
            disable_button_next();
        }
        else {
            err_show('username', null)
            no_disable_button_next()
        }
    })

    document.getElementById('pass').addEventListener('focusout', event => {
        var pa = event.target.value;
        var err_mess = null;

        if (pa.length < 7) {
            err_mess = "Mật khẩu quá ngắn"
        }
        err_show('pass', err_mess)
    })
}


intiCheck()
/**
 * 
 * @param {Element} elem 
 * @param {*} data 
*/
function create_sele_box(elem, data) {
    elem.innerHTML = ''
    var div_selected = document.createElement('div')
    div_selected.className = 'selected'
    div_selected.textContent = elem.getAttribute('placeholder')
    div_selected.setAttribute('id_sele', '')
    elem.appendChild(div_selected)

    var div_selec_popup = document.createElement('div')
    div_selec_popup.className = 'selec-popup'

    function closePopup() {
        elem.style.borderColor = ''
        div_selec_popup.classList.remove('open')
        document.removeEventListener('click', closePopup)
    }
    elem.addEventListener('click', event => {
        elem.style.borderColor = 'black'
        div_selec_popup.classList.add('open')
        event.stopPropagation()
        document.body.addEventListener('click', closePopup)
    })

    var div_search = document.createElement('div')
    var div_option_container = document.createElement('div')

    div_search.className = 'search'
    var input = document.createElement('input')
    input.setAttribute('placeholder', 'Tên hoặt mã số')
    input.addEventListener('keyup', event => {
        // filter

        var text = event.target.value;
        div_option_container.childNodes.forEach(e => {

            if (e.textContent.toLowerCase().includes(text.toLowerCase())) {
                e.style.display = 'block'
            }
            else if (e.querySelector('input').id.toLowerCase().includes(text.toLowerCase())) {
                e.style.display = 'block'
            }
            else {
                e.style.display = 'none'
            }
        })
    })
    div_search.appendChild(input)
    div_selec_popup.appendChild(div_search)

    div_option_container.className = 'option-container'
    data.forEach(element => {
        var { id, display_name } = element;
        if (id == '') return

        var div_option = document.createElement('div')
        div_option.className = 'option'

        var input_radio = document.createElement('input')
        input_radio.type = 'radio'
        input_radio.id = id
        input_radio.name = 'elect' + elem.id
        input_radio.addEventListener('change', event => {
            // console.log(display_name)
            div_selected.textContent = display_name
            div_selected.setAttribute('id_sele', id)
            closePopup()
        })

        div_option.append(input_radio)

        var label = document.createElement('label')
        label.setAttribute('for', id)
        label.textContent = display_name

        div_option.appendChild(label)

        div_option_container.appendChild(div_option)
    });
    div_selec_popup.appendChild(div_option_container)

    elem.appendChild(div_selec_popup)
}

fetch('api/ds_khoa').then(e => e.json()).then(e => {
    if (e.err_mess) {
        console.error(e.err_mess)
        return
    }
    create_sele_box(document.getElementById('khoa'), e.data)
})

fetch('api/ds_lop').then(e => e.json()).then(e => {
    if (e.err_mess) {
        console.error(e.err_mess)
        return
    }
    create_sele_box(document.getElementById('lop'), e.data)
})


async function check_email(email) {
    var check_email_req = await fetch('api/check_email', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email
        })
    })

    const json_resp = await check_email_req.json()

    return json_resp.data
    

}

function email_event() {
    var id_event = null;
    document.getElementById('email').addEventListener('keyup', event => {
        if (id_event) clearTimeout(id_event);
        id_event = setTimeout(async () => {
            var email = document.getElementById('email').value
            if (email.includes('@')) {
                var email_used = await check_email(email);
                if (email_used) {
                    err_show("email", "Đã tồn tại");
                    disable_button_next();
                }
                else {
                    err_show("email", null);
                    no_disable_button_next();
                }
            }
        }, 500)
    })
}

email_event()