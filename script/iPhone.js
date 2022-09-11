const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    //display only 10 items
    const showButton = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showButton.classList.remove('d-none');
    }
    else {
        showButton.classList.add('d-none');
    }


    const noPhone = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Brand: ${phone.phone_name}</h6>
                    <p class="card-text">This is a higher second platform in the inter world, the most suprising thing is moyna pakhi kotha koy </p>
                    <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneDiv);

    });

    //stop loader
    toggleSpinner(false)

}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    //start loader
    processSearch(10);

})
//search input field inter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})


const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data)

}
const displayPhoneDetail = (phone) => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Found'}</p>
    `
}
loadPhones('apple');