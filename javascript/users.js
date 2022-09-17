import { getUsers, removeUser, updateUser } from "./src.js"

window.addEventListener('load', loadUsers)

let users = []

let dataList = document.getElementById('users')

async function loadUsers () {
    users = await getUsers ()
    console.log(users)

    for (let i = 0; i < users.length; i++) {
        let option = document.createElement('option')
        option.setAttribute('value', `${users[i].firstName} ${users[i].lastName}`)
        dataList.appendChild(option)
        console.log(`${users[i].firstName} ${users[i].lastName}`)

        let btnSearch = document.getElementById('search')
        btnSearch.addEventListener('click', searchUsers)
        async function searchUsers () {
            const fullName = document.getElementById('input-users').value
            
            if (fullName === `${users[i].firstName} ${users[i].lastName}`) {
                console.log(users[i])
                const divProfile = document.getElementById('profile')
                divProfile.innerHTML = ''
                const stat = document.getElementById('status')
                stat.innerHTML = ''

                const divImage = document.createElement('div')
                divImage.classList.add('user-image')
                divProfile.appendChild(divImage)

                const image = document.createElement('img')
                image.src = users[i].picture
                divImage.appendChild(image)

                const name = document.createElement('h5')
                name.innerHTML = `first name: ${users[i].firstName}`
                divProfile.appendChild(name)

                const nameLast = document.createElement('h5')
                nameLast.innerHTML = `last name: ${users[i].lastName}`
                divProfile.appendChild(nameLast)

                const user_name = document.createElement('h5')
                user_name.innerHTML = `user name: ${users[i].userName}`
                divProfile.appendChild(user_name)

                const userId = document.createElement('h5')
                userId.innerHTML = `id: ${users[i].id}`
                divProfile.appendChild(userId)

                const btnDelete = document.createElement('button')
                btnDelete.innerHTML = 'Delete'
                divProfile.appendChild(btnDelete)
                btnDelete.addEventListener('click',deleteUser)
                async function deleteUser () {
                    await removeUser (users[i].id)
                }

                const btnStatus = document.createElement('button')
                btnStatus.innerHTML = 'Change status'
                divProfile.appendChild(btnStatus)
                btnStatus.addEventListener('click', () => {
                    const divStatus = document.getElementById('status')
                    divStatus.innerHTML = ''
                    const userStatus = document.createElement('input')
                    const br = document.createElement('br')
                    divStatus.appendChild(userStatus)
                    divStatus.appendChild(br)
                    userStatus.value = users[i].status
                    const btnChangeStatus = document.createElement('button')
                    btnChangeStatus.innerHTML = 'Save Changes'
                    divStatus.appendChild(btnChangeStatus)

                    btnChangeStatus.addEventListener('click', async function () {
                        const status = userStatus.value
                        await updateUser (
                            users[i].id,
                            users[i].firstName,
                            users[i].lastName,
                            users[i].email,
                            users[i].userName,
                            users[i].password,
                            users[i].picture,
                            status
                        )
                        divStatus.innerHTML = ''
                    })
                })
            }
        }

        let input = document.getElementById('input-users')
        input.addEventListener('keypress', searchUsersOnEnter)
        async function searchUsersOnEnter () {
            if (event.key === 'Enter') {
                await searchUsers ()
            }
        }
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