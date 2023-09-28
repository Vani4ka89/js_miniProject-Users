/////////////////////////////////////////  Users  ///////////////////////////////////////
const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
}

const renderUsers = async () => {
    const users = await fetchUsers();
    const mainUsersBlock = document.getElementsByClassName('main-users-block')[0];

    for (const user of users) {
        const userBlock = document.createElement('div');
        const a = document.createElement('a');

        userBlock.classList.add('user-block');
        a.classList.add('user-btn');

        userBlock.innerText = `${user.id}.  ${user.name}`;
        a.innerText = 'more info';

        a.href = `user-details.html?userId=${user.id}`;

        userBlock.appendChild(a);
        mainUsersBlock.appendChild(userBlock);
    }
}

renderUsers();