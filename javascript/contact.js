import { addReservation } from "./src.js"

let btnBookTable = document.getElementById('reservation')
btnBookTable.addEventListener('click', makeReservation)

async function makeReservation () {
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const numberOfPeople = Number(document.getElementById('num-people').value)

    if (name == '') {
        document.getElementById('name').style.border = '2px solid red'
        alert('Please, enter your name')
        return
    }

    if (phone == '') {
        document.getElementById('phone').style.border = '2px solid red'
        alert('Please, enter your phone number')
        return
    }

    if (date == '') {
        document.getElementById('date').style.border = '2px solid red'
        alert('Please, enter the date')
        return
    }

    if (time == '') {
        document.getElementById('time').style.border = '2px solid red'
        alert('Please, enter the time')
        return
    }

    if (numberOfPeople == '') {
        document.getElementById('num-people').style.border = '2px solid red'
        alert('Please, enter the number of people')
        return
    }

    if (numberOfPeople < 1) {
        document.getElementById('num-people').style.border = '2px solid red'
        alert('Please, enter the correct number of people')
        return
    }

    await addReservation (name, phone, date, time, numberOfPeople)

    document.getElementById('input').style.display = 'none'
    
    const message = document.getElementById('message')
    message.style.display = 'block'
    message.innerHTML = 'your reservation is recived'
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