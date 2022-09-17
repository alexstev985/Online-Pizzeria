import { getOrders, removeOrder } from "./src.js"

window.addEventListener('load', loadOrders)
let orders = []

async function loadOrders () {
    orders = await getOrders ()
    console.log(orders)

    const divOrders = document.getElementById('order-list')
    for (let i = 0; i < orders.length; i++) {
        const customer = document.createElement('h2')
        customer.innerHTML = orders[i].customer
        divOrders.appendChild(customer)

        console.log(orders[i].customer)

        const id = orders[i].id

        const allItems = orders[i].items
        console.log(allItems)

        const allPieces = orders[i].pieces
        console.log(allPieces)

        
        const table = document. createElement('table')
        divOrders.appendChild(table)

        const tr = document.createElement('tr')
        table.appendChild(tr)

        const thItems = document.createElement('th')
        thItems.innerHTML = 'items'
        tr.appendChild(thItems)

        const thPieces = document.createElement('th')
        thPieces.innerHTML = 'pieces'
        tr.appendChild(thPieces)
        
        for (let j = 0; j < allItems.length; j++) {
            for (let k = 0; k < allPieces.length; k++) {
                if (j == k) {
                    const tr2 = document.createElement('tr')
                    table.appendChild(tr2)
                    const tdItems = document.createElement('td')
                    tdItems.innerHTML = allItems[j]
                    tr2.appendChild(tdItems)

                    const tdPices = document.createElement('td')
                    tdPices.innerHTML = allPieces[k]
                    tr2.appendChild(tdPices)
                }
            }
        }

        const btnOrder = document.createElement('button')
        btnOrder.innerHTML = `complete order for <br> ${orders[i].customer}`
        btnOrder.classList.add('button')
        divOrders.appendChild(btnOrder)
        btnOrder.addEventListener('click', async function () {
            await removeOrder (id)
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