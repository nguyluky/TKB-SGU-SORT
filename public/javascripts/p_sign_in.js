
function setErr(mess) {
    document.getElementById('err').innerHTML += `<p>${mess}</p>` 
}

function clsErr() {
    document.getElementById('err').innerHTML = ''
}

function sign_in() {
    clsErr()
    var user = document.getElementById('username').value;
    var pass = document.getElementById('pass').value;

    fetch('/sign_in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: pass
        })
    }).then(async (response) => {
        if (response.status == 200) {
            document.location.pathname = '';
            return;
        }

        var mess;
        if (response.status == 300) mess = "Tên đăng nhập hoặc mật khẩu không đúng";
        else mess = await response.text();
        setErr(mess);
    });

}