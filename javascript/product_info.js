import {addComment, getComments, getProductById, getUsers, getUsersById} from "./src.js"

const urlSearchParams = window.location.search
const params = new URLSearchParams (urlSearchParams)
const productId = params.get('id')
console.log(productId)

const urlSearchUser = window.location.search
const userParams = new URLSearchParams (urlSearchUser)
const userId = userParams.get('userId')
console.log(userId)

window.addEventListener ('load', loadProduct)

async function loadProduct () {

    const product = await getProductById (productId)

    const productInfo = document.getElementById('product-info')

    const pageTitle = document.getElementById('title')
    pageTitle.innerHTML = product.title

    const title = document.createElement('h1')
    title.innerHTML = product.title
    productInfo.appendChild(title)

    const img = document.createElement('img')
    img.src = product.image
    productInfo.appendChild(img)

    const price = document.createElement('h3')
    price.innerHTML = 'price:' + ' ' + product.price
    productInfo.appendChild(price)

    const ing = document.createElement('p')
    ing.classList.add('ing')
    ing.innerHTML = product.ingridients
    productInfo.appendChild(ing)
}

window.addEventListener('load', loadComments)

async function loadComments () {
    const comments = await getComments ()
    console.log(comments)

    const users = await getUsers ()
    console.log(users)

    for (let i = 0; i < comments.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (comments[i].productId == productId && users[j].id == comments[i].userId) {
                
                const divComments = document.getElementById('comments')

                const divComment = document.createElement('div')
                divComment.classList.add('comment')
                divComments.appendChild(divComment)
            
                const divUser = document.createElement('div')
                divUser.classList.add('user')
                divComment.appendChild(divUser)
            
                const image = document.createElement('img')
                image.src = users[j].picture
                divUser.appendChild(image)
            
                const name = document.createElement('h4')
                name.innerHTML = users[j].userName
                divUser.appendChild(name)
            
                const text = document.createElement('p')
                text.innerHTML = comments[i].comment
                divComment.appendChild(text)
            }
        }
    }
}

const btnComment = document.getElementById('post-comment')
btnComment.addEventListener('click', commentProduct)

async function commentProduct () {
    const user = await getUsersById (userId)
    console.log(user)

    const product = await getProductById (productId)
    console.log(product)

    const comment = document.getElementById('input-comment').value
    if (comment == '') {
        document.getElementById('input-comment').style.border = '2px solid red'
        alert('Please, write a comment')
        return
    }

    await addComment (user.id, product.id, comment)

    const divComments = document.getElementById('comments')

    const divComment = document.createElement('div')
    divComment.classList.add('comment')
    divComments.appendChild(divComment)

    const divUser = document.createElement('div')
    divUser.classList.add('user')
    divComment.appendChild(divUser)

    const image = document.createElement('img')
    image.src = user.picture
    divUser.appendChild(image)

    const name = document.createElement('h4')
    name.innerHTML = user.userName
    divUser.appendChild(name)

    const text = document.createElement('p')
    text.innerHTML = comment
    divComment.appendChild(text)
}