function showErr(ele, mess) {
    const parent = ele.parentElement;
    const errIcon = parent.querySelector('.icon-err')
    const toolTip = parent.querySelector('.tooltip')

    if (!errIcon.classList.contains('show')) {
        errIcon.classList.add('show')
    }

    toolTip.textContent = mess
}

/**
 * @param {Element} ele 
 */
function hideErr(ele) {
    const parent = ele.parentElement;
    const errIcon = parent.querySelector('.icon-err')
    const toolTip = parent.querySelector('.tooltip')

    errIcon.classList.remove('show')
    toolTip.textContent = ''
}


function sign_in() {
    hideErr(document.getElementById('user-name'))
    var user = document.getElementById('user-name').value;
    var pass = document.getElementById('password').value;

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
            showErr(document.getElementById('user-name'), "MK hoặc tài khoản không đúng")
            document.getElementById('password').value = ''
            return
        }

        var lastUrl = sessionStorage.getItem('befor') ? 'https://tkbsgusort.id.vn/' + sessionStorage.getItem('befor') : null;
        sessionStorage.setItem('befor', null);
        var urlSearch = (new URLSearchParams(location.search)).get("url")
        urlSearch = urlSearch ? 'https://tkbsgusort.id.vn' + urlSearch : null;
        document.location = lastUrl || urlSearch || 'https://tkbsgusort.id.vn/tkbs';
    });

}


/**
 * 
 * @param {Element} ele 
 */
function showPasswordHandel(ele) {
    const parentNode = ele.parentNode;
    const icon = parentNode.querySelector('.hide-pass i')

    const mouseUP = () => {
        ele.type = 'password'
        document.body.removeEventListener('mouseup', mouseUP);

    }

    icon.addEventListener('mousedown', (e) => {
        if (ele.type == 'text') {
            icon.className = 'bx bx-hide'
            ele.type = 'password'
        }
        else {
            ele.type = 'text';
            icon.className = 'bx bx-show'
        }
        // document.body.addEventListener('mouseup', mouseUP);
    })
}

showPasswordHandel(document.getElementById('password'))