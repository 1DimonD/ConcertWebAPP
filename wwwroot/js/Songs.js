const uri = 'api/Songs';
let songs = [];

function getSongs() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displaySongs(data))
        .catch(error => console.error("Пісні не знайдені", error));
}

function addSong() {
    const addNameTextbox = document.getElementById('add-name');

    const song = {
        name_song: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    })
        .then(response => response.json())
        .then(() => {
            getSongs();
            addNameTextBox.value = '';
        })
        .catch(error => console.error('Не вдалося додати пісню', error));
    document.getElementById('add-name').value = '';
}

function deleteSong(id) {
    const song = songs.find(song => song.song_id === id);
    if (confirm(`Ви справді бажаєте видалити пісню '${song.name_song}' ?`)) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getSongs())
            .catch(error => console.error('Не вдалося видалити пісню'), error);
    }
}

function displayEditForm(id) {
    const song = songs.find(song => song.song_id === id);

    document.getElementById('edit-id').value = song.song_id;
    document.getElementById('edit-name').value = song.name_song;
    document.getElementById('editForm').style.display = 'block';
}

function updateSong() {
    const songId = document.getElementById('edit-id').value;
    const song = {
        song_id: parseInt(songId, 10),
        name_song: document.getElementById('edit-name').value.trim()
    }


    fetch(`${uri}/${songId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    })
        .then(() => getSongs())
        .catch(error => console.error('Не вдалось змінити інформацію про пісню', error));

    document.getElementById('edit-id').value = 0;
    document.getElementById('edit-name').value = '';
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displaySongs(data) {
    const tBody = document.getElementById('songs');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(song => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Редагувати';
        editButton.setAttribute('onclick', `displayEditForm(${song.song_id})`);
        editButton.setAttribute('class', 'edit');

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Видалити';
        deleteButton.setAttribute('onclick', `deleteSong(${song.song_id})`);
        deleteButton.setAttribute('class', 'delete');

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(song.name_song);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        td2.appendChild(editButton);

        let td3 = tr.insertCell(2);
        td3.appendChild(deleteButton);
    });

    songs = data;
}

