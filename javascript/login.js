import { usersLogin } from "./src.js";

document.getElementById('login').addEventListener ('click', login)

async function login () {
    const userName = document.getElementById('input-username').value
    const password = document.getElementById('input-password').value

    const userLog = await usersLogin (userName, password)
    const logedUser = userLog[0]

    if (userLog.length === 0) {
        alert('Wrong user name or password')
        document.getElementById('input-username').style.border = '2px solid red'
        document.getElementById('input-password').style.border = '2px solid red'
        return
    } else {
        if (userName == logedUser.userName && password == logedUser.password) {
            window.open (`/pages/user_page.html?id=${logedUser.id}`, '_self')
        }
    }

    if (userName == logedUser.userName && password == logedUser.password && logedUser.status === 'admin') {
        window.open (`/pages/menagement.html?status=${logedUser.status}`, '_self')
    }
}

let name = document.getElementById('input-username')
name.addEventListener('keypress', loginOnEnter)
let pass = document.getElementById('input-password')
pass.addEventListener('keypress', loginOnEnter)

async function loginOnEnter () {
    if (event.key === 'Enter') {
        await login ()
    }
}

const checkBox = document.getElementById('show-password')
checkBox.addEventListener('click', myFunction)
function myFunction() {
    var x = document.getElementById("input-password")
    if (x.type === "password") {
    x.type = "text"
    } else {
    x.type = "password"
    }
}

let btnShowHide = document.getElementById('btn-hide')
btnShowHide.innerHTML = '<i class="fas fa-bars"></i>'
btnShowHide.addEventListener('click', function () {
    if (document.getElementById('nav').classList == 'nav') {
        document.getElementById('nav').classList = 'nav-show'
        this.innerHTML = '<i class="fas fa-times"></i>'
    } else {
        document.getElementById('nav').classList = 'nav'
        this.innerHTML = '<i class="fas fa-bars"></i>'
    }
})