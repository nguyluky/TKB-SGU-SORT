const username = document.getElementById('username');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
const email = document.getElementById('email');
const display_name = document.getElementById('display_name')
const mssv = document.getElementById('mssv')
const khoa = document.getElementById('khoa')
const lop = document.getElementById('lop')

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
    // TODO:
    document.querySelector('button.sguacc').onclick = () => {

    }
}

function next() {
    clsErr()
    var user = username.value
    var pas = pass.value
    var pas2 = pass2.value

    if (user == '') {
        setErr('Vui lòng nhập tên đăng nhập')
        return
    }

    if (pass == '') {
        setErr('Vui lòng nhập mật khẩu')
        return
    }

    if (user.includes(' ')) {
        setErr('Tên đăng nhập không được chứa khoản chống')
        return
    }

    if (pas != pas2) {
        setErr('Mật khẩu không giống')
        return
    }

    fetch('/sign_up/checkacc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_name: username.value
        })
    }).then(e => {
        console.log(e.status)
        if (e.status == 200)  {
            document.querySelector('.tab1').style.display = 'none'
            document.querySelector('.tab2').style.display = ''
        
            document.querySelector('button.sguacc').textContent = 'Back'
            document.querySelector('button.sguacc').onclick = back
            document.querySelector('button.next').onclick = sign_up
        
            return
        }

        setErr("Tên đăng nhập đã tồn tại")
    })

  
}

function sign_up() {
    var user = username.value
    var pas = pass.value
    var pas2 = pass2.value
    var ema = email.value
    var dn = display_name.value
    var ms = mssv.value
    var k = khoa.value
    var lop_ = lop.value




    fetch('sign_up', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: pas,
            email: ema
        })
    }).then(async e => {
        if (e.status !== 200) {
            var text = await e.text()
            console.log(text);
            setErr(text)
            return  
        }


        var rq = await fetch('sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                display_name : dn,
                ma_sv        : ms,
                khoa         : k,
                lop          : lop_
            })
        })

        if (rq.status != 200)
        {
            console.log(rq.status);
        }


        document.location.pathname = '/sign_in'


    })
}