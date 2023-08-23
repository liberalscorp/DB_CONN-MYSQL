
// to prevent the js from running before the html is loaded
document.addEventListener('DOMContentLoaded', function () {

    // helper function to add listeners to delete and edit buttons
    document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "deleteRowBtn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "editRowBtn") {
        editRow(event.target.dataset.id);
    }
});
    
const updateBtn = document.querySelector('#updateRowBtn');
const searchBtn = document.querySelector('#searchBtn');

// search by id results
searchBtn.onclick = function() {
    const searchValue = document.querySelector('#searchInput').value;

    fetch('http://localhost:5000/get/' + searchValue)
    .then(response => response.json())
    .then(data => loadTable(data['data']));
}

// delete row by id results
function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}
// edit row by id results
function editRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#updateNameInput').dataset.id = id;
    document.querySelector('#updateAgeInput').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#updateNameInput');
    const updateAgeInput = document.querySelector('#updateAgeInput');

    console.log("New Name : " + updateNameInput + " New Age : " + updateAgeInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value,
            age: updateAgeInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


const addInfoBtn = document.querySelector('#addInfoBtn');

addInfoBtn.onclick = function () {
    const nameInput = document.querySelector('#nameInput');
    const ageInput = document.querySelector('#ageInput');
    console.log("Name : " + nameInput + " Age : " + ageInput);

    const name = nameInput.value;
    const age = ageInput.value;

    nameInput.value = "";
    ageInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name , age : age})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="deleteRowBtn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="editRowBtn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, age, date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="deleteRowBtn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="editRowBtn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadTable(data['data']));
    
});

