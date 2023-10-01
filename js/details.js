/////////////////////////////////  User Info & Post Titles  ////////////////////////////////////

const url = new URL(location.href);
const userId = url.searchParams.get('userId');

const fetchUser = async ()=>{
    const response= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return await response.json();
}

const fetchPosts = async ()=>{
   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
   return await response.json();
}

const renderUserInfo = async () => {
    const user = await fetchUser();
    const mainDataBlock = document.getElementsByClassName('main-data')[0];

    function getInfoFromUser(user) {
        for (const key in user) {
            if (typeof user[key] === 'object') {
                getInfoFromUser(user[key]);
            } else {
                const infoBlock = document.createElement('div');
                const h4 = document.createElement('h4');

                infoBlock.classList.add('info-block');

                h4.innerText = `${key}: ${user[key]}`;

                infoBlock.appendChild(h4);
                mainDataBlock.appendChild(infoBlock);
            }
        }
    }
    getInfoFromUser(user);

    const posts = await fetchPosts();
    const titles = document.getElementsByClassName('post-title-block')[0];
    const container = document.getElementsByClassName('container')[0];

    const list = document.createElement('ul');
    const btn = document.createElement('button');

    list.classList.add('list');
    btn.classList.add('post-btn');

    btn.innerText = 'post of current user'.toUpperCase();

    container.appendChild(btn);
    titles.appendChild(list);

    const showPostsTitles = function () {
        for (const post of posts) {
            const item = document.createElement('li');
            const a = document.createElement('a');

            item.innerText = `${post.title}`;
            a.innerText = 'details';

            a.href = `post-details.html?postId=${post.id}`;

            list.appendChild(item);
            item.appendChild(a);
        }
        btn.style.display = 'none';
    }
    btn.addEventListener('click', showPostsTitles);
}

renderUserInfo();