import {getCategoryById, updateCategory} from "./src.js"

window.addEventListener ('load', loadCategory)

const searchId = window.location.search
const foundedId = new URLSearchParams (searchId)
const id = foundedId.get ('id')

async function loadCategory () {

    const category = await getCategoryById (id)

    const productInfo = document.getElementById('product-info')

    const pageTitle = document.getElementById('title')
    pageTitle.innerHTML = category.name

    const productTitle = document.createElement('h1')
    productTitle.innerHTML = category.name
    productInfo.appendChild(productTitle)

    const img = document.createElement('img')
    img.src = category.image
    productInfo.appendChild(img)

    document.getElementById('name-input').value = category.name
    document.getElementById('image-input').value = category.image
    document.getElementById('about-input').value = category.about
}

const btnUpdate = document.getElementById('update-product')
btnUpdate.addEventListener('click', update)

async function update () {
    const name = document.getElementById('title-input').value
    const image = document.getElementById('image-input').value
    const about = document.getElementById('ingridients-input').value

    await updateCategory (id, name, image, about)
    window.location.reload()
}