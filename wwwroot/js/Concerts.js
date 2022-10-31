const uri = 'api/Concerts';
let concerts = [];

function getConcerts() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayConcerts(data))
        .catch(error => console.error("Концерти не знайдені", error));
}

function addConcert() {
    const addNameTextbox = document.getElementById('add-name');
    const addGenreTextbox = document.getElementById('add-genre');
    const addDateTextbox = document.getElementById('add-date');
    const addArtistTextbox = document.getElementById('add-artist');

    const concert = {
        name_concert: addNameTextbox.value.trim(),
        name_genre: addGenreTextbox.value.trim(),
        date: addDateTextbox.value,
        artist_id: parseInt(addArtistTextbox, 10)
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(concert)
    })
        .then(response => response.json())
        .then(() => {
            getConcerts();
            addNameTextBox.value = '';
            addGenreTextbox.value = '';
            addDateTextbox.value = '';
        })
        .catch(error => console.error('Не вдалося додати концерт', error));
    document.getElementById('add-name').value = '';
    document.getElementById('add-genre').value = '';
    document.getElementById('add-date').value = '';
}

function deleteConcert(id) {
    const concert = concerts.find(concert => concert.concert_id === id);
    if (confirm(`Ви справді бажаєте видалити концерт '${concert.name_concert}' ?`)) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getConcerts())
            .catch(error => console.error('Не вдалося видалити концерт'), error);
    }
}

function displayEditForm(id) {
    const concert = concerts.find(concert => concert.concert_id === id);

    document.getElementById('edit-id').value = concert.concert_id;
    document.getElementById('edit-name').value = concert.name_concert;
    document.getElementById('edit-genre').value = concert.name_genre;
    document.getElementById('edit-date').value = concert.date;
    document.getElementById('edit-artist').value = concert.artist_id;
    document.getElementById('editForm').style.display = 'block';
}

function updateConcert() {
    const concertId = document.getElementById('edit-id').value;
    const artistId = document.getElementById('edit-artist').value;

    const concert = {
        concert_id: parseInt(concertId, 10),
        name_artist: document.getElementById('edit-name').value.trim(),
        name_genre: document.getElementById('edit-genre').value.trim(),
        date: document.getElementById('edit-date').value.trim(),
        artist_id: parseInt(artistId, 10)
    }

    fetch(`${uri}/${concertId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(concert)
    })
        .then(() => getConcerts())
        .catch(error => console.error('Не вдалось змінити інформацію про концерт', error));

    document.getElementById('edit-id').value = 0;
    document.getElementById('edit-name').value = '';
    document.getElementById('edit-genre').value = '';
    document.getElementById('edit-date').value = '';
    document.getElementById('edit-artist').value = '';
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayConcerts(data) {
    const tBody = document.getElementById('concerts');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(concert => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Редагувати';
        editButton.setAttribute('onclick', `displayEditForm(${concert.concert_id})`);
        editButton.setAttribute('class', 'edit');

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Видалити';
        deleteButton.setAttribute('onclick', `deleteConcert(${concert.concert_id})`);
        deleteButton.setAttribute('class', 'delete');

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(concert.name_concert);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode1 = document.createTextNode(concert.name_genre);
        td2.appendChild(textNode1);

        let td3 = tr.insertCell(2);
        let textNode2 = document.createTextNode(concert.date);
        td3.appendChild(textNode2);

        let td4 = tr.insertCell(3);
        let textNode3 = document.createTextNode(concert.artist_id);
        td4.appendChild(textNode3);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    concerts = data;
}

