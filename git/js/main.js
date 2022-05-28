let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'creat'; 
let tmp;


// getTotal

function getTotal () {
    if( price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result;
        total.style.background = '#040'
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}


// creatProduct

let dataPro;
// save in localStorage
if (localStorage.getItem('product') != null) {
    dataPro = JSON.parse(localStorage.getItem( 'product'));
    showData();
}else {
    dataPro = [];
}

submit.onclick = function(){
    let newProw = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    // count , // cleanData
    if (title.value != ''
    &&price.value != ''
    &&category.value != ''
    &&newProw.count <= 100 ) {
        if(mood=== 'creat') {
            if(newProw.count > 1) {
                for(let i=0 ; i<newProw.count ; i++) {
                    dataPro.push(newProw);
                }
            }else{
            dataPro.push(newProw);}
        }
        else{
            dataPro[tmp] = newProw;
            mood = 'creat'
            submit.innerHTML = 'creat'
            count.style.display = 'block'
        }
        clearData();
    }

    
    // save in localStorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    
    showData();
}

// clearInputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// showData

function showData() {
    getTotal();
    let table = '';
    for(i=0 ; i < dataPro.length ; i++ ) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick='updateProduct(${i})'>update</button></td>
        <td><button onclick='deleteProduct(${i})' id="delate">delate</button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML= table;
    let btnDelete = document.getElementById('btn-delete')
    if(dataPro.length > 0 ) { 
        btnDelete.innerHTML = `
        <button onclick ='deleteAll()'> Delete All ( ${dataPro.length - 1} ) </button>`
}
else {
    btnDelete.innerHTML = '';
}
}

// delete

function deleteProduct(i) {
    dataPro.splice(i,1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}


// deleteAll

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// update

function updateProduct(i) {
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discount.value= dataPro[i].discount
    getTotal();
    count.style.display='none';
    category.value= dataPro[i].category;
    submit.innerHTML='Update'
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior :'smooth'
    })
}






// search

let searchMood = 'title';

    function getSearchMood(id) {
        let search = document.getElementById('search');
        if( id == 'searchTitle') {
            searchMood = 'Title';
        }
        else {
            searchMood = 'Category';
        }
        search.placeholder = 'Search By ' + searchMood;
        search.focus();
        search.value='';
        showData();
    }

function search(value) {
    let table = '';
    for(i=0 ; i < dataPro.length ; i++ ) {
    if( searchMood = 'title') {
        if (dataPro[i].title.toLowerCase().includes(value.toLowerCase()) == true ) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update">update</button></td>
        <td><button onclick='deleteProduct(${i})' id="delate">delate</button></td>
    </tr>`
        }
}
else{
    
        if (dataPro[i].category.toLowerCase().includes(value.toLowerCase()) == true ) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update">update</button></td>
        <td><button onclick='deleteProduct(${i})' id="delate">delate</button></td>
    </tr>`
        }
    }
} 
document.getElementById('tableBody').innerHTML= table;
}
    




