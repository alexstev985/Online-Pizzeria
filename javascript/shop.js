import { getCategories, getProducts, getProductById,  getUsersById, addLike,
    getLikedProducts, updateProduct, addOrders } from "./src.js"

window.addEventListener ('load', loadProducts)
const urlSearchParams = window.location.search
const params = new URLSearchParams (urlSearchParams)
const usersId = params.get('id')
console.log(usersId)
let allUsers = await getUsersById (usersId)

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
        if (usersId != null) { // ako je korisnik ulogovan ucitava se stranica
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
    
            const btnOrder = document.createElement('button')
            btnOrder.innerHTML = 'Add to cart'
            divButtons.appendChild(btnOrder)
            btnOrder.addEventListener ('click', order)
    
            let qty = 1
            let total = document.getElementById('total-price')
            let btnCart = document.getElementById('btn-order')
    
            async function order () {
    
                const ordertable = document.getElementById('order-table')
                
                total.style.display = 'block'
    
                btnCart.style.display = 'block'
    
                const row = document. createElement('tr')
                ordertable.appendChild(row)
    
                const tdImg = document.createElement('td')
                tdImg.classList.add('table-image')
                row.appendChild(tdImg)
    
                const image = document.createElement('img')
                tdImg.appendChild(image)
                image.src = products[i].image
    
                const tdName = document.createElement('td')
                tdName.innerHTML = products[i].title
                tdName.classList.add('item')
                row.appendChild(tdName)
    
                const tdQty = document.createElement('td')
                row.appendChild(tdQty)
    
                const divQty = document.createElement('div')
                divQty.classList.add('table-div')
                tdQty.appendChild(divQty)
    
                const btnRed = document.createElement('button')
                btnRed.innerHTML = '-'
                divQty.appendChild(btnRed)
                btnRed.addEventListener ('click', reduceQty)
    
                const quantity = document.createElement('p')
                quantity.innerHTML = qty
                quantity.classList.add('qty')
                divQty.appendChild(quantity)
                
                const btnAdd = document.createElement('button')
                btnAdd.innerHTML = '+'
                divQty.appendChild(btnAdd)
                btnAdd.addEventListener ('click', increaseQty)
    
                const tdPrice = document.createElement('td')
                row.appendChild(tdPrice)
                tdPrice.classList.add ('price')
                tdPrice.innerHTML = products[i].price
                
                total.innerHTML = 'total:' + ' ' + sumPrice ()
    
                const tdRemove = document.createElement('td')
                row.appendChild(tdRemove)
    
                const btnRemove = document.createElement('button')
                btnRemove.innerHTML = 'Remove'
                tdRemove.appendChild(btnRemove)
                btnRemove.addEventListener ('click', function () {
                    row.remove()
                    total.innerHTML = 'total:' + ' ' + sumPrice ()
                    const rows = document.getElementsByTagName('tr')
                    if (rows.length === 0) {
                        total.style.display = 'none'
                        btnCart.style.display = 'none'
                    }
                })
    
                async function increaseQty () {
                    qty++
                    quantity.innerHTML = qty
                    tdPrice.innerHTML = products[i].price * qty
                    total.innerHTML = 'total:' + ' ' + sumPrice ()
                }
    
                async function reduceQty () {
                    qty--
                    quantity.innerHTML = qty
                    tdPrice.innerHTML = products[i].price * qty
                    if (qty < 1) {
                        qty = 1
                        quantity.innerHTML = qty
                        tdPrice.innerHTML = products[i].price * qty
                    }
                    total.innerHTML = 'total:' + ' ' + sumPrice ()
                }
            }
    
            const btnView = document.createElement('button')
            btnView.innerHTML = 'View Details'
            divButtons.appendChild(btnView)
            btnView.addEventListener ('click', function () {
                window.open (`/pages/product_info.html?id=${products[i].id}&userId=${allUsers.id}&userName=${allUsers.userName}`, '_blank')
            })
    
            const divLike = document.createElement('div')
            divLike.classList.add ('like-button')
            divProduct.appendChild(divLike)
    
            const btnLike = document.createElement('button')
            btnLike.innerHTML = 'Like' + ' ' + '<i class="far fa-thumbs-up"></i>'
            divLike.appendChild(btnLike)
    
            const likesNumber = document.createElement('p')
            likesNumber.innerHTML = products[i].likes + ' ' + 'likes'
            divLike.appendChild(likesNumber)
    
            btnLike.addEventListener ('click', likeProduct)
    
            async function likeProduct () {
                const user = await getUsersById (usersId)
                console.log(user)
                const userId = user.id
                const productId = products[i].id
                const allLikedProducts = await getLikedProducts ()
                console.log(allLikedProducts)
    
                for (let k = 0; k < allLikedProducts.length; k++) {
                    if (userId == allLikedProducts[k].userId && 
                        productId == allLikedProducts[k].productId) {
                            alert('You already liked this product')
                            btnLike.innerHTML = 'Liked'
                            return
                        }
                }
                
                await addLike (userId, productId)
                const newLikesNumber = products[i].likes + 1
                likesNumber.innerHTML = newLikesNumber + ' ' + 'likes'
                await updateProduct (productId,
                products[i].title,
                products[i].image,
                products[i].ingridients,
                products[i].price,
                products[i].categoryId,
                newLikesNumber)
                btnLike.innerHTML = 'Liked'
                console.log(allLikedProducts)
            }
        }
    }

    function sumPrice() {
        const tdPrices = document.getElementsByClassName('price')
        let sum = 0
        for (let j = 0; j < tdPrices.length; j++) {
            sum += Number (tdPrices[j].innerHTML)
        }
        return sum
    }
}

const btnYourOrder = document.getElementById('btn-order')
btnYourOrder.addEventListener('click', async function () {

    let item = getItems()
    let piece = getQty()
    let customer = `${allUsers.firstName} ${allUsers.lastName}`

    await addOrders (customer, item, piece)

    document.getElementById('message').innerHTML =
    `thank you for your order ${allUsers.userName}`

    document.getElementById('order-table').style.display = 'none'
    document.getElementById('total-price').style.display = 'none'
    document.getElementById('btn-order').style.display = 'none'
})

function getItems () {
    const tdItems = document.getElementsByClassName('item')
    let items = []
    for (let k = 0; k < tdItems.length; k++) {
        items.push(tdItems[k].innerHTML)
    }
    return items
}

function getQty () {
    const tdQty = document.getElementsByClassName('qty')
    let pieces = []
    for (let l = 0; l < tdQty.length; l++) {
        pieces.push(tdQty[l].innerHTML)
    }
    return pieces
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
