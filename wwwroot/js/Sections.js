const uri = 'api/Section';
let sections = [];

function getSections() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displaySections(data))
        .catch(error => console.error("Секції не знайдені", error));
}

function addSection() {
    const addNameTextbox = document.getElementById('add-name');
    const addNumberTextbox = document.getElementById('add-tnumber');
    const addPriceTextbox = document.getElementById('add-price');

    const section = {
        name_section: addNameTextbox.value.trim(),
        number_tickets: parseInt(addNumberTextbox.value),
        price: parseInt(addPriceTextbox.value)

    };

    fetch(uri, {
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
            addNameTextBox.value = '';
            addNumberTextbox.value = '';
            addPriceTextbox.value = '';
        })
        .catch(error => console.error('Не вдалося додати секцію', error));
    document.getElementById('add-name').value = '';
    document.getElementById('add-tnumber').value = '';
    document.getElementById('add-price').value = '';
}

function deleteSection(id) {
    const section = sections.find(section => section.section_id === id);
    if (confirm(`Ви справді бажаєте видалити секцію '${section.name_section}' ?`)) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getSections())
            .catch(error => console.error('Не вдалося видалити секцію'), error);
    }
}

function displayEditForm(id) {
    const section = sections.find(section => section.section_id === id);

    document.getElementById('edit-id').value = section.section_id;
    document.getElementById('edit-name').value = section.name_section;
    document.getElementById('edit-tnumber').value = section.number_tickets;
    document.getElementById('edit-price').value = section.price;
    document.getElementById('editForm').style.display = 'block';
}

function updateSection() {
    const sectionId = document.getElementById('edit-id').value;
    const section = {
        section_id: parseInt(artistId, 10),
        name_artist: document.getElementById('edit-name').value.trim()
    }


    fetch(`${uri}/${artistId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    })
        .then(() => getArtists())
        .catch(error => console.error('Не вдалось змінити інформацію про артиста', error));

    document.getElementById('edit-id').value = 0;
    document.getElementById('edit-name').value = '';
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayArtists(data) {
    const tBody = document.getElementById('artists');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(artist => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Редагувати';
        editButton.setAttribute('onclick', `displayEditForm(${artist.artist_id})`);
        editButton.setAttribute('class', 'edit');

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Видалити';
        deleteButton.setAttribute('onclick', `deleteArtist(${artist.artist_id})`);
        deleteButton.setAttribute('class', 'delete');

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(artist.name_artist);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        td2.appendChild(editButton);

        let td3 = tr.insertCell(2);
        td3.appendChild(deleteButton);
    });

    sections = data;
}

