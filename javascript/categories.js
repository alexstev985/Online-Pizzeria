import { getCategories, addCategory, deleteCategoryById } from "./src.js"

window.addEventListener ('load', loadCategories)

let categories = []

async function loadCategories () {
    categories = await getCategories ()
    console.log(categories)
    showCategories (categories)
}

async function showCategories (categories) {
    const divProducts = document.getElementById('products')
    divProducts.innerHTML = ''

    for (let i = 0; i < categories.length; i++) {
        const divProduct = document.createElement('div')
        divProduct.classList.add ('product')
        divProducts.appendChild(divProduct)

        const title = document.createElement('h2')
        title.innerHTML = categories[i].name
        divProduct.appendChild(title)

        const image = document.createElement('img')
        image.src = categories[i].image
        divProduct.appendChild(image)

        const divButtons = document.createElement('div')
        divButtons.classList.add ('buttons')
        divProduct.appendChild(divButtons)

        const btnRemove = document.createElement('button')
        btnRemove.innerHTML = 'Remove'
        divButtons.appendChild(btnRemove)
        btnRemove.addEventListener ('click', removeCategory)

        async function removeCategory () {
            await deleteCategoryById (categories[i].id)
            window.location.reload()
        }

        const btnUpdate = document.createElement('button')
        btnUpdate.innerHTML = 'Update'
        divButtons.appendChild(btnUpdate)
        btnUpdate.addEventListener ('click', function () {
        window.open (`/pages/category_update.html?id=${categories[i].id}`, '_self')
        })
    }
}


const btnOpenInputs = document.getElementById('add-product')
btnOpenInputs.addEventListener('click', openInputs)

async function openInputs () {
    document.getElementById('div-inputs').style.display = 'block'
}

const btnAddProduct = document.getElementById('new-product')
btnAddProduct.addEventListener('click', addNewCategory)

async function addNewCategory () { 
    const name = document.getElementById('name-input').value
    const image = document.getElementById('image-input').value
    const about = document.getElementById('about-input').value

    await addCategory (name, image, about)
    window.location.reload()
}

const btnClose = document.getElementById('close')
btnClose.addEventListener('click', closeInputs)

async function closeInputs () {
    document.getElementById('div-inputs').style.display = 'none'
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
