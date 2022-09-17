import { updateUser, getUsersById } from "./src.js"

window.addEventListener ('load', loadProfile)

const urlSearchParams = window.location.search
const params = new URLSearchParams (urlSearchParams)
const id = params.get('id')
console.log(id)

async function loadProfile () {
    
    const user = await getUsersById (id)
    console.log(user)
    console.log(id)

    const loginDiv = document.getElementById('login')

    const title = document.createElement('h1')
    title.innerHTML = `Welcome ${user.firstName}`
    loginDiv.appendChild(title)

    const image = document.createElement('img')
    image.src = user.picture
    loginDiv.appendChild(image)

    const divButtons = document.createElement('div')
    divButtons.classList.add ('buttons')
    loginDiv.appendChild(divButtons)

    const btnShop = document.createElement('button')
    btnShop.innerHTML = 'Shop now' + ' ' + '<i class="fas fa-shopping-basket"></i>'
    divButtons.appendChild(btnShop)
    btnShop.addEventListener('click', function () {
        window.open (`/pages/shop.html?id=${id}`, '_self')
    })

    const btnUpdate = document.createElement('button')
    btnUpdate.innerHTML = 'Update profile'
    divButtons.appendChild(btnUpdate)
    btnUpdate.addEventListener ('click', updateProfile)

    async function updateProfile () {
        if (id != null) {
            const divInput = document.getElementById('input')
            divInput.style.display = 'block'
        
            document.getElementById('first-name').value = user.firstName
            document.getElementById('last-name').value = user.lastName
            document.getElementById('e-mail').value = user.email
            document.getElementById('user-name').value = user.userName
            document.getElementById('password').value = user.password
            document.getElementById('picture').value = user.picture
            
            
            const btnSaveChanges = document.getElementById('update-data')
            btnSaveChanges.addEventListener ('click', saveChanges)

            async function saveChanges () {
                const firstName = document.getElementById('first-name').value
                const lastName = document.getElementById('last-name').value
                const email = document.getElementById('e-mail').value
                const user_name = document.getElementById('user-name').value
                const passwd = document.getElementById('password').value
                const picture = document.getElementById('picture').value
                const status = ''
                
                await updateUser (id, firstName, lastName, email, user_name, passwd, picture, status)
                window.location.reload ()
            }
        }
    }

    const btnLogOut = document.createElement('button')
    btnLogOut.innerHTML = 'Log Out'
    divButtons.appendChild(btnLogOut)
    btnLogOut.addEventListener('click', function () {
    window.open (`/pages/login.html`, '_self')
    })
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
