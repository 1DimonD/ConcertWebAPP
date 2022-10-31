const uri = 'api/Artists';
let artists = [];

function getArtists() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayArtists(data))
        .catch(error => console.error("Артисти не знайдені", error));
}

function addArtist() {
    const addNameTextbox = document.getElementById('add-name');

    const artist = {
        name_artist: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    })
        .then(response => response.json())
        .then(() => {
            getArtists();
            addNameTextBox.value = '';
        })
        .catch(error => console.error('Не вдалося додати артиста', error));
    document.getElementById('add-name').value = '';
}

function deleteArtist(id) {
    const artist = artists.find(artist => artist.artist_id === id);
    if (confirm(`Ви справді бажаєте вигнати артиста '${artist.name_artist}' ?`)) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getArtists())
            .catch(error => console.error('Не вдалося вигнати артиста'), error);
    }    
}

function displayEditForm(id) {
    const artist = artists.find(artist => artist.artist_id === id);    

    document.getElementById('edit-id').value = artist.artist_id;
    document.getElementById('edit-name').value = artist.name_artist;
    document.getElementById('editForm').style.display = 'block';
}

function updateArtist() {
    const artistId = document.getElementById('edit-id').value;
    const artist = {
        artist_id: parseInt(artistId, 10),
        name_artist: document.getElementById('edit-name').value.trim()    }    

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

    artists = data;
}

