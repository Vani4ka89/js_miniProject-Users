//////////////////////////////////  Comments of Post  ///////////////////////////////

const url = new URL(location.href);
const postId = url.searchParams.get('postId');

const fetchPost = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await response.json();
}

const fetchComments = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return await response.json();
}

const renderPostAndComments = async () => {
    const post = await fetchPost();
    const postInfo = document.getElementsByClassName('post-info')[0];

    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    h2.innerText = `${post.title}`;
    p.innerText = `${post.body}`;

    postInfo.append(h2, p);

    const comments = await fetchComments();
    const list = document.createElement('ul');

    for (const comment of comments) {
        const span = document.createElement('span');
        const item = document.createElement('li');

        span.classList.add('email-style');

        span.innerText = `_${comment['email']}`;
        item.innerHTML = `<span>${comment.name}:</span> ${comment.body}. `;

        item.appendChild(span);
        list.appendChild(item);
        postInfo.appendChild(list);
    }
}
renderPostAndComments();