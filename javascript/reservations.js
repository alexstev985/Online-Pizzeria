import { getReservations, removeReservation } from "./src.js"

window.addEventListener ('load', loadReservations)

let reservations = []

async function loadReservations () {
    reservations = await getReservations ()
    console.log(reservations)

    const divReservations = document.getElementById('reservations')

    for (let i = 0; i < reservations.length; i++) {
        const divReservation = document.createElement('div')
        divReservation.classList.add('product')
        divReservations.appendChild(divReservation)

        const name = document.createElement('p')
        name.innerHTML = `name: ${reservations[i].name}`
        divReservation.appendChild(name)

        const phone = document.createElement('p')
        phone.innerHTML = `phone: ${reservations[i].phone}`
        divReservation.appendChild(phone)

        const date = document.createElement('p')
        date.innerHTML = `date: ${reservations[i].date}`
        divReservation.appendChild(date)

        const time = document.createElement('p')
        time.innerHTML = `time: ${reservations[i].time}`
        divReservation.appendChild(time)

        const people = document.createElement('p')
        people.innerHTML = `number of people: ${reservations[i].numberOfPeople}`
        divReservation.appendChild(people)

        const btnConfirm = document.createElement('button')
        btnConfirm.innerHTML = 'Confirm Reservation'
        divReservation.appendChild(btnConfirm)

        btnConfirm.addEventListener('click', async function () {
            await removeReservation (reservations[i].id)
            window.location.reload()
        })
    }
}

window.addEventListener('scroll', backToTop)

function backToTop () {

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('back-to-top').style.display = 'block'
    } else {
        document.getElementById('back-to-top').style.display = 'none'
    }
}

const btnTop = document.getElementById('back-to-top')
btnTop.addEventListener('click', function () {
    document.documentElement.scrollTop = 0
})

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
