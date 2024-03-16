function otpInput() {
    var lastInput = document.querySelector('#otp > label:nth-child(1) > input[type=text]')

    document.querySelector('#otp').addEventListener('click', (event) => {
        if (event.target == lastInput) return
        lastInput.focus()
    })

    document.querySelectorAll("#otp > label > input[type=text]").forEach((ele, index) => {
        ele.addEventListener('input', (event) => {
            const val = event.target.value;

            if (isNaN(val)) {
                event.target.value = "";
                return;
            }

            if (val.length > 1) {

                event.target.value = val.substring(0,1);

                val.split('').forEach((value, index) => {
                    var ele = document.querySelectorAll(`#otp > label > input[type=text]`)[index]
                    if (ele) {
                        lastInput = ele;
                        lastInput.value = value
                    }
                })

                if (document.querySelectorAll(`#otp > label > input[type=text]`)[val.length]) {
                    lastInput = document.querySelectorAll(`#otp > label > input[type=text]`)[val.length]
                }
                lastInput.focus()
            }

            else if (val != "") {
                const next = document.querySelectorAll(`#otp > label > input[type=text]`)[index + 1]
                if (next) {
                    lastInput = next;
                    lastInput.focus();
                }
            }


        })

        ele.addEventListener('keyup' , (event) => {
            const target = event.target;
            const key = event.key.toLowerCase();

            if (key == "backspace" || key == "delete") {
                target.value = "";
                const prev = document.querySelector(`#otp > label:nth-child(${index}) > input[type=text]`);
                if (prev) {
                    lastInput = prev;
                    lastInput.focus();
                    lastInput.select()
                }
                return;
            }
        })
    })
}

otpInput()

function getOtp() {
    var otp = Array.from(document.querySelectorAll(`#otp > label > input[type=text]`)).map(e => e.value).join('')
    return otp
}

async function sendOtp() {

    const otp = getOtp()
    const otpResp = await fetch('/sign_up/otp', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            otp: otp
        })
    })

    const json_req = await otpResp.json()
    if (!json_req.success) {
        console.error(json_req)
        alert(json_req.errMess)
        return
    }

    console.log(json_req)
    document.location.pathname = '/sign_in'
}