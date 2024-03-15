  
function setErr(mess) {
    document.querySelector('.err_view.a').innerHTML += `<p>${mess}</p>` 
}

function clsErr() {
    document.querySelector('.err_view.a').innerHTML = ''
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

        const json_data = await response.json();

        console.log(json_data)
        if (!json_data.success) {
            setErr(json_data.mess)
            return
        }


        document.location.pathname = sessionStorage.getItem('befor');

        // if (response.status == 200) {
            // document.location.pathname = sessionStorage.getItem('befor');
        //     return;
        // }

        // // TODO: chỉnh lại cái này
        // var mess;
        // if (response.status == 400) mess = "Tên đăng nhập hoặc mật khẩu không đúng";
        // else mess = await response.text();
        // setErr(mess);
    });

}