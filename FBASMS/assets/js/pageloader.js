const container = document.querySelector('#container');

const LoadMainPage = () => {
    fetch('../dashboard/pages/dashboard.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
    })
    .catch(err => console.log(err))
}

const ManageAdmins = () => {
    fetch('../dashboard/pages/admin.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
    })
    .catch(err => console.log(err))
}