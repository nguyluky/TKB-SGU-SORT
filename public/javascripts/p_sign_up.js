const AsyncFunction = async function () { }.constructor;
let listElementCheck = [];

async function sendCreateAccount(userName, password, email, fullName, mssv, khoa, lop) {

    const create_accoutn_resp = await fetch('sign_up', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userName,
            password: password,
            email: email,
            display_name: fullName,
            ma_sv: mssv,
            khoa: khoa,
            lop: lop
        })
    })

    return await create_accoutn_resp.json()
}

async function sendOtp(otp) {
    console.log(otp)
    const send_otp_resp = await fetch('/sign_up/otp', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            otp: otp
        })
    })

    return await send_otp_resp.json()
}



async function sendCheckEmailServer(email) {

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
    console.log(json_resp)
    return json_resp.data;
}

/**
 * 
 * @param {Element} ele input fil
 * @param {string} mess 
 */
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


/**
 * 
 * @param {Element} ele 
 * @param {CallableFunction} getErr 
 */
function handleErrCheck(ele, getErr) {

    listElementCheck.push([ele, getErr])

    async function handleEvent(event) {

        if (getErr instanceof AsyncFunction) {
            var mess = await getErr(event.target)
        }
        else var mess = getErr(event.target)

        if (mess) {
            showErr(ele, mess);
            return
        }

        hideErr(ele);
    }

    ele.addEventListener('keyup', handleEvent)
    ele.addEventListener('focusout', handleEvent)
    ele.addEventListener('focusin', handleEvent)
}

async function checkAll() {
    var haveErr = false


    async function checkErrasync([ele, getErr]) {
        // const value = ele.value;

        if (getErr instanceof AsyncFunction) {
            var mess = await getErr(ele)
        }
        else var mess = getErr(ele)

        if (mess) {
            showErr(ele, mess)
            haveErr = true
            return
        }

        hideErr(ele)
    }

    var allPromise = listElementCheck.map(e => checkErrasync(e))
    await Promise.all(allPromise)
    return haveErr
}


async function checkValidName(target) {

    var userName = target.value

    const return_model = {
        HAVE_WHILL_SPACE: "Không được có khoản trắng.",
        USERNAME_AREADY_EXIT: "Tên đăng nhập đã tồn tại.",
        NO_INPUT: "Không được để chống",
        SPECIAL_CHARACTERS: "Không được chứa ký tự đặp biệt."
    }
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (userName.includes(' ')) return return_model.HAVE_WHILL_SPACE;
    if (userName == '') return return_model.NO_INPUT;
    if (format.test(userName)) return return_model.SPECIAL_CHARACTERS;


}

async function checkValidEmail(target) {

    var email = target.value

    const return_model = {
        EMAIL_INVALID: "Email không hợp lệ",
        NO_INPUT: "Không được để chống",
        AREADY_EXIT: "Email đã được sử dụng"
    }

    if (email == "") return return_model.NO_INPUT

    const a = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!a) return return_model.EMAIL_INVALID

    if (await sendCheckEmailServer(email)) return return_model.AREADY_EXIT

}

async function checkValidPassword2(target) {
    var pass = target.value
    const pass1 = document.getElementById('password').value

    if (pass == "") return "Không được để chống"
    if (pass1 != pass) return "Không giống"
}

/**
 * 
 * @param {EventListener} event
 */
async function checkValidPassword(target) {
    var pass = target.value
    const return_model = {
        HAVE_SPACE: "Không được có khoản trắng",
        NGAN: "Quá nắng"
    }

    if (pass.length < 5) return return_model.NGAN;
    if (pass.includes(' ')) return return_model.HAVE_SPACE
}


async function handleSignUpClick(event) {

    event.target.classList.add("loading");
    const fullFill = await checkAll();
    if (fullFill) {
        event.target.classList.remove("loading");
        return;
    }

    const userName = document.getElementById('user-name').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    const fullName = document.getElementById('full-name').value
    const mssv = document.getElementById('mssv').value
    const khoa = document.getElementById('khoa').getAttribute('data_id')
    const lop = document.getElementById('lop').getAttribute('data_id')

    console.log(userName, password, email, fullName, mssv, khoa, lop)
    const data = await sendCreateAccount(userName, password, email, fullName, mssv, khoa, lop)

    if (data.success) {
        location.pathname = "/sign_up/otp"
        return
    }

    event.target.classList.remove("loading");
    showErr(document.getElementById(data.errLocation), data.errMess)

}

async function chekcMSSV(target) {
    // console.log(event)
    if (target.value.length > 10)
        target.value = target.value.substring(0, 10)
}

/**
 * 
 * @param {Element} input 
 * @param {Array<[string, string]>} data   
 */
function createDropDown(input, data) {

    var Node12;
    var Node1111;
    var popup;
    function filter(value) {
        Node12.childNodes.forEach(element => {

            if (element.textContent.toLowerCase().includes(value.toLowerCase())) {
                element.style.display = null
            }
            else
                element.style.display = 'none'
        })
    }

    function hidePopup(event) {
        console.log('ok2')
        popup.classList.remove('show');
        document.body.removeEventListener('click', hidePopup)
    }

    function setValue(id, value) {
        input.value = value
        input.setAttribute('data_id', id)
    }

    /**
     * 
     * @param {Event} event 
     */
    function showPopup(event) {
        console.log('ok')
        if (popup.classList.contains('show')) {
            event.target.blur()
            console.log('all')
            return
        }

        popup.classList.add('show');
        Node1111.focus()
    }

    function createElement(data) {
        var Node1 = document.createElement("div");
        Node1.setAttribute("class", "dropdown-popup");
        Node1.addEventListener('click', (event) => event.preventDefault())

        var Node11 = document.createElement("div");
        Node11.setAttribute("class", "search");
        Node1.appendChild(Node11);

        var Node111 = document.createElement("div");
        Node111.setAttribute("class", "wall-input");
        Node11.appendChild(Node111);

        Node1111 = document.createElement("input");
        Node1111.setAttribute("type", "text");
        Node1111.setAttribute("placeholder", "Search");
        Node1111.addEventListener('focus', (event) => {
            event.stopPropagation()
            setTimeout(() => {
                document.body.addEventListener('click', hidePopup)
            }, 200)
        })
        Node1111.addEventListener('keyup', (event) => {
            filter(event.target.value)
        })
        Node111.appendChild(Node1111);

        Node12 = document.createElement("div");
        Node12.setAttribute("class", "view");
        Node1.appendChild(Node12);

        data.forEach(({ id, display_name }) => {
            var Node121 = document.createElement("div");
            Node121.setAttribute("class", "item");

            if (display_name.includes('-')) display_name = display_name.split('-')[1];
            else if (display_name.includes('(ngành)')) display_name = display_name.replaceAll("(ngành) ", '')
            display_name = display_name + " - " + id
            Node121.textContent = display_name
            Node121.title = display_name
            Node121.setAttribute('data-id', id)
            Node121.onclick = (event) => {
                setValue(id, display_name)
                popup.classList.remove('show');
                document.removeEventListener('click', hidePopup)
                event.preventDefault()
            }
            Node12.appendChild(Node121);
        });

        return Node1
    }


    popup = createElement(data)
    input.parentNode.appendChild(popup)
    input.addEventListener('click', showPopup)
}


async function getDsKhoa() {

    const dsKhoaResp = await fetch(urlApis.getDskhoa)


    const json_data = await dsKhoaResp.json()

    if (json_data.err) {
        console.error(json_data)
        return
    }

    createDropDown(document.getElementById('khoa'), json_data.data)
}




async function getDsLop() {

    const dsKhoaResp = await fetch(urlApis.getDslop)


    const json_data = await dsKhoaResp.json()

    if (json_data.err) {
        console.error(json_data)
        return
    }

    createDropDown(document.getElementById('lop'), json_data.data)
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


// ===============================================
//                         RUN
// ===============================================
getDsLop()
getDsKhoa()

handleErrCheck(document.getElementById("user-name"), checkValidName)
handleErrCheck(document.getElementById("email"), checkValidEmail)
handleErrCheck(document.getElementById("password"), checkValidPassword)
handleErrCheck(document.getElementById("password-2"), checkValidPassword2)
handleErrCheck(document.getElementById('mssv'), chekcMSSV)

showPasswordHandel(document.getElementById('password-2'))
showPasswordHandel(document.getElementById('password'))

document.getElementById('sign-up').onclick = handleSignUpClick

