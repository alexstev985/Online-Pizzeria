import {newsletter, getCategories} from "./src.js"

document.getElementById('subscribe').addEventListener('click', addEmail)

async function addEmail () {
    const emailInput = document.getElementById('news-letter').value

    if (emailInput == '') {
        document.getElementById('news-letter').style.border = '2px solid red'
        alert('Please enter email')
        return
    }

    await newsletter (emailInput)
    window.location.reload()
}

let categories = await getCategories ()
console.log(categories)

let currentIndex = 0

let image = document.getElementById('slider-img')
image.src = categories[currentIndex].image
image.classList.add('w3-animate-top')

let desc = document.getElementById('slider-text')
desc.innerHTML = categories[currentIndex].about
desc.classList.add('w3-animate-bottom')

function changeImage (value) {
    currentIndex = currentIndex + value
    if (currentIndex < 0){
        currentIndex = categories.length - 1
    }
    if (currentIndex > categories.length - 1){
        currentIndex = 0
    }
    image.src = categories[currentIndex].image
    desc.innerHTML = categories[currentIndex].about

    if (document.getElementById('slider-img').classList == 'w3-animate-top') {
        document.getElementById('slider-img').classList = 'w3-animate-bottom'
    } else {
        document.getElementById('slider-img').classList = 'w3-animate-top'
    }

    if (document.getElementById('slider-text').classList == 'w3-animate-bottom') {
        document.getElementById('slider-text').classList = 'w3-animate-top'
    } else {
        document.getElementById('slider-text').classList = 'w3-animate-bottom'
    }
}

var interval
interval = setInterval(function(){
    changeImage(1)
}, 5000)

var btnNext = document. getElementById('next')
btnNext.addEventListener('click', function () {
    changeImage(1)
})

var btnPreview = document.getElementById('preview')
btnPreview.addEventListener('click', function () {
    changeImage(-1)
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