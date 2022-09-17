import {getProductById, updateProduct} from "./src.js"

window.addEventListener ('load', loadProduct)

const searchId = window.location.search
const foundedId = new URLSearchParams (searchId)
const id = foundedId.get ('id')

async function loadProduct () {

    const product = await getProductById (id)

    const productInfo = document.getElementById('product-info')

    const pageTitle = document.getElementById('title')
    pageTitle.innerHTML = product.title

    const productTitle = document.createElement('h1')
    productTitle.innerHTML = product.title
    productInfo.appendChild(productTitle)

    const img = document.createElement('img')
    img.src = product.image
    productInfo.appendChild(img)

    const productPrice = document.createElement('h3')
    productPrice.innerHTML = 'price:' + ' ' + product.price
    productInfo.appendChild(productPrice)

    const ing = document.createElement('p')
    ing.innerHTML = product.ingridients
    productInfo.appendChild(ing)

    document.getElementById('title-input').value = product.title
    document.getElementById('image-input').value = product.image
    document.getElementById('ingridients-input').value = product.ingridients
    document.getElementById('price-input').value = product.price
    document.getElementById('category-input').value = product.categoryId
    document.getElementById('category-input').disabled = true
    document.getElementById('likes-input').value = product.likes
    document.getElementById('likes-input').disabled = true
}

const btnUpdate = document.getElementById('update-product')
btnUpdate.addEventListener('click', update)

async function update () {
    const title = document.getElementById('title-input').value
    const image = document.getElementById('image-input').value
    const ingridients = document.getElementById('ingridients-input').value
    const price = Number(document.getElementById('price-input').value)
    const categoryId = Number(document.getElementById('category-input').value)
    const likes = Number(document.getElementById('likes-input').value)

    await updateProduct (id, title, image, ingridients, price, categoryId, likes)
    window.location.reload()
}