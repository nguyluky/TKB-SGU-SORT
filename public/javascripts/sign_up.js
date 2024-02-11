const username = document.getElementById('username');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
const email = document.getElementById('email');


function setErr(mess) {
    document.getElementById('err').innerHTML += `<p>${mess}</p>` 
}

function clsErr() {
    document.getElementById('err').innerHTML = ''
}

function sign_up() {
    clsErr()
    var user = username.value;
    var pas = pass.value;
    var pas2 = pass2.value;
    var em = email.value;

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

    fetch('sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: pas,
            email: em
        })
    }).then(async e => {
        if (e.status == 200) {
            document.location.pathname='/sign_in'
            return  
        }

        var text = await e.text()
        console.log(text);
        setErr(text)
    })
}