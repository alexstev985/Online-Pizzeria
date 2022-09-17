import { getCategories, getProducts, deleteProductById, addProduct } from "./src.js"

const urlSearchParams = window.location.search
const params = new URLSearchParams (urlSearchParams)
const userStatus = params.get('status')
console.log(userStatus)

window.addEventListener ('load', loadProducts)


const select = document.getElementById('category-select')

let products = []

async function loadProducts () {
    products = await getProducts ()
    console.log(products)

    const categories = await getCategories ()
    console.log(categories)

    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = categories[i].name
        option.value = categories[i].id
        select.appendChild(option)
    }

    showProducts (products)
}

async function showProducts (products) {
    const divProducts = document.getElementById('products')
    divProducts.innerHTML = ''

    for (let i = 0; i < products.length; i++) {
        const divProduct = document.createElement('div')
        divProduct.classList.add ('product')
        divProducts.appendChild(divProduct)

        const title = document.createElement('h2')
        title.innerHTML = products[i].title
        divProduct.appendChild(title)

        const image = document.createElement('img')
        image.src = products[i].image
        divProduct.appendChild(image)

        const price = document.createElement('p')
        price.innerHTML = products[i].price + ' ' + 'rsd'
        divProduct.appendChild(price)

        const divButtons = document.createElement('div')
        divButtons.classList.add ('buttons')
        divProduct.appendChild(divButtons)

        const btnRemove = document.createElement('button')
        btnRemove.innerHTML = 'Remove'
        divButtons.appendChild(btnRemove)
        btnRemove.addEventListener ('click', removeProduct)

        async function removeProduct () {
            await deleteProductById (products[i].id)
            window.location.reload()
        }

        const btnUpdate = document.createElement('button')
        btnUpdate.innerHTML = 'Update'
        divButtons.appendChild(btnUpdate)
        btnUpdate.addEventListener ('click', function () {
        window.open (`/pages/product_update.html?id=${products[i].id}`, '_self')
        })

        const divLike = document.createElement('div')
        divLike.classList.add ('like-button')
        divProduct.appendChild(divLike)

        const likesNumber = document.createElement('p')
        likesNumber.innerHTML = products[i].likes + ' ' + 'likes'
        divLike.appendChild(likesNumber)
    }
}

select.addEventListener ('change', filterProducts)

async function filterProducts () {
    const categoryId = select.value
    console.log(categoryId)
    
    const filteredProducts = products.filter (product => product.categoryId == categoryId)
    showProducts (filteredProducts)

    if (select.value == 'default') {
        showProducts (products)
    }
}

const sorting = document.getElementById('sort')
sorting.addEventListener ('change', sortProducts)

async function sortProducts () {
    if (sorting.value == 'asc') {
        const sortedProductsAsc = products.sort ((a, b) => a.price - b.price)
        filterProducts (sortedProductsAsc)
    }
    if (sorting.value == 'desc') {
        const sortedProductsDesc = products.sort ((a, b) => b.price - a.price)
        filterProducts (sortedProductsDesc)
    }
    if (sorting.value == 'rating') {
        const sortedByRating = products.sort ((a, b) => b.likes - a.likes)
        filterProducts (sortedByRating)
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

const btnOpenInputs = document.getElementById('add-product')
btnOpenInputs.addEventListener('click', openInputs)

async function openInputs () {
    document.getElementById('div-inputs').style.display = 'block'
}

const btnAddProduct = document.getElementById('new-product')
btnAddProduct.addEventListener('click', addNewProduct)

async function addNewProduct () { 
    const title = document.getElementById('title-input').value
    const image = document.getElementById('image-input').value
    const ingridients = document.getElementById('ingridients-input').value
    const price = Number(document.getElementById('price-input').value)
    const categoryId = Number(document.getElementById('category-select').value)
    const likes = 0

    if (categoryId.value == 'default') {
        alert('Select product category')
        return
    }

    await addProduct (title, image, ingridients, price, categoryId, likes)
    window.location.reload()
}

const btnClose = document.getElementById('close')
btnClose.addEventListener('click', closeInputs)

async function closeInputs () {
    document.getElementById('div-inputs').style.display = 'none'
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
