//Pribavljanje svih proizvoda
async function getProducts () {
    const response = await fetch ('http://localhost:3000/products', {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Pribavljanje proizvoda po ID
async function getProductById (id) {
    const response = await fetch (`http://localhost:3000/products/${id}`, {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Pribavljanje proizvoda po ceni
async function getProductByPrice (price) {
    const response = await fetch (`http://localhost:3000/products/${price}`, {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Pribavljanje kategorija
async function getCategories () {
    const response = await fetch ('http://localhost:3000/categories', {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Pribavljanje kategorije po ID
async function getCategoryById (id) {
    const response = await fetch (`http://localhost:3000/categories/${id}`, {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Dodavanje kategorije
async function addCategory (name, image, about) {
    const response = await fetch (`http://localhost:3000/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            name: name,
            image: image,
            about: about
        })
    })
    const data = await response.json ()
    return data
}

//Azuriranje kategorija
async function updateCategory (id, name, image, about) {
    const response = fetch (`http://localhost:3000/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            name: name,
            image: image,
            about: about
        })
    })
    const data = await response.json ()
    return data
}

//Brisanje kategorije
async function deleteCategoryById (id) {
    const response = await fetch (`http://localhost:3000/categories/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json ()
    return data
}

//Pribavljanje proizvoda iz odredjene kategorije
async function getProductByCategoryId (categoryId) {
    const response = await fetch (`http://localhost:3000/products?categoryId=${categoryId}`, {
    method: 'GET'
})
    const data = await response.json () // data je niz proizvoda
    return data
}

//Dodavanje proizvoda
async function addProduct (title, image, ingridients, price, categoryId, likes) {
    const response = await fetch (`http://localhost:3000/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            title: title,
            image: image,
            ingridients: ingridients,
            price: price,
            categoryId: categoryId,
            likes: likes
        }) 
    })
    const data = await response.json ()
    return data
}

//Azuriranje proizvoda
async function updateProduct (id, title, image, ingridients, price, categoryId, likes) {
    const response = await fetch (`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            title: title,
            image: image,
            ingridients: ingridients,
            price: price,
            categoryId: categoryId,
            likes: likes
        }) 
    })
    const data = await response.json ()
    return data
}

//Brisanje proizvoda po ID
async function deleteProductById (id) {
    const response = await fetch (`http://localhost:3000/products/${id}`, {
    method: 'DELETE'
})
    const data = await response.json ()
    return data
}

//Brisanje svih proizvoda iz iste kategorije
async function deleteProductByCategoryId (categoryId) {
    const response = await fetch (`http://localhost:3000/products/${categoryId}`, {
    method: 'DELETE'
})
    const data = await response.json ()
    return data
}

//Pribavljanje korisnika
async function getUsers () {
    const response = await fetch ('http://localhost:3000/users', {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Pribavljanje korisnika po ID
async function getUsersById (id) {
    const response = await fetch (`http://localhost:3000/users/${id}`, {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Pribavljanje korisnika po userName
async function getUsersByUserName (userName) {
    const response = await fetch (`http://localhost:3000/users/${userName}`, {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Logovanje korisnika
async function usersLogin (userName, password) {
    const response = await fetch (`http://localhost:3000/users?userName=${userName}&password=${password}`, {
    method: 'GET'
})
    const data = await response.json ()
    return data
}

//Registrovanje korisnika
async function register (firstName, lastName, emali, userName, password, picture, status) {
    const response = await fetch (`http://localhost:3000/users`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
            firstName: firstName,
            lastName: lastName,
            emali: emali,
            userName: userName,
            password: password,
            picture: picture,
            status: status
        })
})
    const data = await response.json ()
    return data
}

//Izmena profila
async function updateUser (id, firstName, lastName, email, userName, password, picture, status) {
    const response = await fetch (`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password,
            picture: picture,
            status: status
        })
})
    const data = await response.json ()
    return data
}

//Brisanje korisnika
async function removeUser (id) {
    const response = await fetch (`http://localhost:3000/users/${id}`, {
    method: 'DELETE'
})
    const data = await response.json ()
    return data
}

//Newsletter
async function newsletter (mail) {
    const response = await fetch (`http://localhost:3000/newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            mail: mail
        })
    })
    const data = await response.json ()
    return data
}

//Lajkovanje
async function addLike (userId, productId) {
    const response = await fetch (`http://localhost:3000/likedProducts?userId=${userId}&productId=${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            userId: userId,
            productId: productId
        })
    })
    const data = await response.json ()
    return data
}

//Pribavljanje lajkovanih proizvoda
async function getLikedProducts () {
    const response = await fetch ('http://localhost:3000/likedProducts', {
        method: 'GET'
    })
    const data = await response.json ()
    return data
}

//Brisanje lajkova
async function dislike (id) {
    const response = await fetch (`http://localhost:3000/likedProducts/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json ()
    return data
}

//Komentari
async function addComment (userId, productId, comment) {
    const response = await fetch (`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            userId: userId,
            productId: productId,
            comment: comment
        })
    })
    const data = await response.json ()
    return data
}

//Pribavljanje komentara
async function getComments () {
    const response = await fetch (`http://localhost:3000/comments`,{
        method: 'GET'
    })
    const data = await response.json ()
    return data
}

//Porudzbine
async function addOrders (customer, items, pieces) {
    const response = await fetch (`http://localhost:3000/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer: customer,
            items:items,
            pieces:pieces
        })
    })
    const data = await response.json ()
    return data
}

//Pribavljanje porudzbina
async function getOrders () {
    const response = await fetch (`http://localhost:3000/orders`, {
        method: 'GET'
    })
    const data = await response.json ()
    return data
}

//Brisanje porudzbina
async function removeOrder (id) {
    const response = await fetch (`http://localhost:3000/orders/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json ()
    return data
}

//Reyervacije
async function addReservation (name, phone, date,time, numberOfPeople) {
    const response = await fetch (`http://localhost:3000/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            date: date,
            time: time,
            numberOfPeople: numberOfPeople
        })
    })
    const data = await response.json ()
    return data
}

//Pribavljanje rezervacija
async function getReservations () {
    const response = await fetch (`http://localhost:3000/reservations`, {
        method: 'GET'
    })
    const data = await response.json ()
    return data
}

//Brisanje rezervacija
async function removeReservation (id) {
    const response = await fetch (`http://localhost:3000/reservations/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json ()
    return data
}

export {
    getProducts, getProductById, getProductByPrice, getProductByCategoryId, addProduct,
    updateProduct, deleteProductById, getUsers, register, newsletter, getCategories,
    getCategoryById, getUsersById, usersLogin, updateUser, addLike, getLikedProducts,
    dislike, deleteCategoryById, deleteProductByCategoryId, updateCategory, addCategory,
    addComment, getUsersByUserName, getComments, addOrders, getOrders, removeOrder,
    addReservation, getReservations, removeReservation, removeUser
}