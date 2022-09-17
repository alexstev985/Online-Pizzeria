import { register, getUsers, getUsersById } from "./src.js"

window.addEventListener ('load', loadUsers)

const searchParams = window.location.search
const params = new URLSearchParams(searchParams)
const id = params.get('id')
console.log(id)

let users = []

async function loadUsers () {
    users = await getUsers ()
    console.log(users)
}

document.getElementById ('register').addEventListener ('click', addUser)

async function addUser () {
    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const email = document.getElementById('e-mail').value
    const userName = document.getElementById('user-name').value
    const password = document.getElementById('password').value
    const picture = document.getElementById('picture').value
    const status = ''

    if (firstName == '') {
        document.getElementById('first-name').style.border = '2px solid red'
        alert('Enter your first name')
        return
    }

    if (lastName == '') {
        document.getElementById('last-name').style.border = '2px solid red'
        alert('Enter your last name')
        return
    }

    if (email == '') {
        document.getElementById('e-mail').style.border = '2px solid red'
        alert('Enter your e-mail address')
        return
    }

    if (userName == '') {
        document.getElementById('user-name').style.border = '2px solid red'
        alert('Enter your user name')
        return
    }

    if (password == '') {
        document.getElementById('password').style.border = '2px solid red'
        alert('Enter your password')
        return
    }

    for (let i = 0; i < users.length; i++) {
        if (email == users[i].email) {
            document.getElementById('e-mail').style.border = '2px solid red'
            alert('This e-mail address already exists')
            return
        }
        if (userName == users[i].userName) {
            document.getElementById('user-name').style.border = '2px solid red'
            alert('This user name already exists')
            return
        }
        if (password == users[i].password) {
            document.getElementById('password').style.border = '2px solid red'
            alert('This password already exists')
            return
        }
    }

    if (id == null &&
        firstName != '' &&
        lastName != '' &&
        email != '' &&
        password != '') {
        const newUser = await register (firstName, lastName, email, userName, password, picture, status)
        window.open (`/pages/user_page.html?id=${newUser.id}`, '_self')
    }
}

let firstName = document.getElementById('first-name')
firstName.addEventListener('keypress', addUserOnEnter)
let lastName = document.getElementById('last-name')
lastName.addEventListener('keypress', addUserOnEnter)
let email = document.getElementById('e-mail')
email.addEventListener('keypress', addUserOnEnter)
let userName = document.getElementById('user-name')
userName.addEventListener('keypress', addUserOnEnter)
let password = document.getElementById('password')
password.addEventListener('keypress', addUserOnEnter)
let picture = document.getElementById('picture')
picture.addEventListener('keypress', addUserOnEnter)

async function addUserOnEnter () {
    if (event.key === 'Enter') {
        await addUser ()
    }
}

const checkBox = document.getElementById('show-password')
checkBox.addEventListener('click', myFunction)
function myFunction() {
    var x = document.getElementById("password")
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