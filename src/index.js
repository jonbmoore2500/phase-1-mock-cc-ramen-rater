// write your code here
document.addEventListener('DOMContentLoaded', () => {
    createMenu();
    addCreateBtn();
    addUpdateBtn();
    addDeleteBtn();
})

let idRamen = 1
let ramenData = []
function createMenu() {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(ramen => {
            processMenu(ramen)
        });
        previewRamen(idRamen)
    })
}

function processMenu(ramen) {
    let ramenThumbnail = document.createElement('div')
    ramenData.push(ramen)
    ramenThumbnail.innerHTML = `<img id="${ramen.id}" src="${ramen.image}">`
    ramenThumbnail.addEventListener('click', (e) => {
        idRamen = e.target.id
        previewRamen(idRamen);
    })
    let menuCont = document.getElementById('ramen-menu')
    menuCont.appendChild(ramenThumbnail)

}

function previewRamen(idRam) {
    let selectedRam = ramenData.find(ramenObj => parseInt(ramenObj.id) === parseInt(idRam))
    document.querySelector('.detail-image').src=`${selectedRam.image}`
    document.querySelector('.name').innerText = `${selectedRam.name}`
    document.querySelector('.restaurant').innerText = `${selectedRam.restaurant}`
    document.querySelector('#rating-display').innerText = `${parseInt(selectedRam.rating)}`
    document.querySelector('#comment-display').innerText = `${selectedRam.comment}`
}

function addCreateBtn() {
    let createForm = document.getElementById('new-ramen')
    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNew(e)
        createForm.reset();
    })
}

function addUpdateBtn() {
    let updateForm = createForm = document.getElementById('edit-ramen')
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateRamen(e)
        updateForm.reset();
    })
}
function addDeleteBtn() {
    let deleteForm = document.getElementById('delete-ramen')
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        deleteRamen(e)
    })
}


function addNew(e) {
    let newRamenObj = {
        "name": `${e.target.querySelector('#new-name').value}`,
        "restaurant": `${e.target.querySelector('#new-restaurant').value}`,
        "image": `${e.target.querySelector('#new-image').value}`,
        "rating": `${e.target.querySelector('#new-rating').value}`,
        "comment": `${e.target.querySelector('#new-comment').value}`
    }
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(resp => resp.json())
    .then(data => processMenu(data))
}

function updateRamen(e) {
    let updateRamenObj = {
        "rating": `${e.target.querySelector('#new-rating').value}`,
        "comment": `${e.target.querySelector('#new-comment').value}`
    }
    console.log(e.target)
    fetch(`http://localhost:3000/ramens/${idRamen}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateRamenObj)
    })
    .then(() => {
        document.getElementById('ramen-menu').innerHTML = '';
        ramenData = [];
        createMenu();
        }
    )
}

function deleteRamen(e) {
    fetch(`http://localhost:3000/ramens/${idRamen}`, {
        method: 'DELETE'
    })
    .then(() => console.log('Delete successful'))
    .then(() => {
        document.getElementById('ramen-menu').innerHTML = '';
        ramenData = [];
        createMenu();
    })
}