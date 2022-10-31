const url = 'api/Sections';
let sections = [];

function getSections() {
    fetch(url)
        .then(response => response.json())
        .then(data => _displaySections(data))
        .catch(error => console.error('Unable to get sections.', error));
}

function addSection() {
    const add_name_sectionTextBox = document.getElementById('add-name_section');
    const add_ticket_numberTextBox = document.getElementById('add-ticket_number');
    const add_priceTextBox = document.getElementById('add-price');

    const section = {
        name_section: add_name_sectionTextBox.nodeValue.trim();
        number_ticket: add_ticket_numberTextBox.nodeValue;
        price: add_priceTextBox.nodeValue;
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(section)
    })
        .then(response => response.json())
        .then(() => {
            getSections();
            add_name_sectionTextBox.nodeValue = "";
            add_ticket_numberTextBox.nodeValue = "";
            add_priceTextBox.nodeValue = "";
        })
        .catch(error => console.error('Uanble to add section.', error));
}

function deleteSection(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getSections())
        .catch(error => console.error('Uanble to add section.', error));
}

function displayEditForm(id) {
    const section = sections.find(section => section.id === id);

    document.getElementById('edit-id').nodeValue = section.id;
    document.getElementById('edit-name_section').nodeValue = section.name_section;
    document.getElementById('edit-ticket_number').nodeValue = section.number_ticket;
    document.getElementById('edit-price').nodeValue = section.price;
    document.getElementById('editForm').style.display = 'block';
}

function updateSection() {
    const sectionId = document.getElementById('edit-id').nodeValue;
    const section = {
        id: parseInt(sectionId, 10),
        name_section: document.getElementById('edit-name_section').nodeValue.trim();
        number_ticket: parseInt(document.getElementById('edit-ticket_number').nodeValue, 10);
        price: parseInt(document.getElementById('edit-price').nodeValue, 10);
    };

    fetch(`${url}/${sectionId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(section)
    })
        .then(() => getSections())
        .catch(error => console.error('Unable to update section.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displaySections(data) {
    const tBody = document.getElementById('sections');
    tBody.innerHTML = "";

    const button = document.createElement('button');
    data.forEach(section => {
        let editBotton = button.cloneNode(false);
        editBotton.innerText = 'Edit';
        editBotton.setAttribut('onclick', `displayEditForm(${category.id}`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteCategory(${category.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(section.name_section);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeInfo = document.createTextNode(section.number_ticket);
        td2.appendChild(textNodeInfo);

        let td3 = tr.insertCell(2);
        let textNodeInfo = document.createTextNode(section.price);
        td3.appendChild(textNodeInfo);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    sections = data;
}