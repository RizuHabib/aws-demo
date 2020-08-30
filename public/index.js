
window.addEventListener('load', e => {

    console.log('body loaded');
    fetch(`http://localhost:3000/blockers`)
        .then(response => response.json())
        .then(res => {
            var table = document.getElementById("blockers");
            table.innerHTML = '';
            var row1 = table.insertRow(-1);
            row1.insertCell(0).innerHTML = `Title`;
            row1.insertCell(1).innerHTML = `Start Time`;
            row1.insertCell(2).innerHTML = `End Time`;
            row1.insertCell(3).innerHTML = `Description`;
            table.rows.item(0).style.backgroundColor = "green";
            res.forEach(b => {
                var row = table.insertRow(-1)
                row.insertCell(0).innerHTML = `${b.title}`;
                row.insertCell(1).innerHTML = `${b.startTime}`;
                row.insertCell(2).innerHTML = `${b.endTime}`;
                row.insertCell(3).innerHTML = `${b.description}`;
            });
        });
});
document.getElementById("post").addEventListener("click", function (event) {

    event.preventDefault();
    let title = document.getElementById('title').value;
    let startTime = document.getElementById('startTime').value;
    let endTime = document.getElementById('endTime').value;
    let description = document.getElementById('description').value;
    console.log('-------------------------------------------');
    console.log(title);
    console.log(startTime);
    console.log('-------------------------------------------');

    fetch(`http://localhost:3000/blockers?title=${title}&startTime=${startTime}
    &endTime=${endTime}&description=${description}`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: {}
        }).then(response => response.json())
        .then(res => {
            var table = document.getElementById("blockers");
            table.innerHTML = '';

            var row1 = table.insertRow(-1);
            row1.insertCell(0).innerHTML = `Title`;
            row1.insertCell(1).innerHTML = `Start Time`;
            row1.insertCell(2).innerHTML = `End Time`;
            row1.insertCell(3).innerHTML = `Description`;
            table.rows[0].style.backgroundColor = 'green';
            res.forEach(b => {
                var row = table.insertRow(-1)
                row.insertCell(0).innerHTML = `${b.title}`;
                row.insertCell(1).innerHTML = `${b.startTime}`;
                row.insertCell(2).innerHTML = `${b.endTime}`;
                row.insertCell(3).innerHTML = `${b.description}`;
            });
        });



});

document.getElementById("delete").addEventListener("click", function (event) {
    event.preventDefault();
    console.log('delete button pressed');
    fetch(`http://localhost:3000/blockers`,
        {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: {}
        })
        .then(res => {
            console.log('deleting...', res);

            var table = document.getElementById("blockers");
            table.innerHTML = '';
            var row1 = table.insertRow(-1);
            row1.insertCell(0).innerHTML = `Title`;
            row1.insertCell(1).innerHTML = `Start Time`;
            row1.insertCell(2).innerHTML = `End Time`;
            row1.insertCell(3).innerHTML = `Description`;
            table.rows[0].style.backgroundColor = 'green';
        });
});