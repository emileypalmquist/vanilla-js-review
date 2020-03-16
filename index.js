const imageId = 1
const imageTag = document.getElementById('image')
const likesTag = document.getElementById('likes')
const likeButton = document.getElementById('like-button')
const commentForm = document.getElementById("comment_form")
const commentUl = document.getElementById('comments')

fetch(`http://localhost:3000/images/${imageId}`)
    .then(resp => resp.json())
    .then(image => renderData(image))

fetch('http://localhost:3000/comments')
    .then(resp => resp.json())
    .then(data => {
        renderComments(data)
    })

function renderData(image) {
    imageTag.src = image.url
    imageTag.dataset.id = image.id
    likesTag.innerText = image.likes
   
}

likeButton.addEventListener('click', likeImage)

function likeImage() {
    let likes = parseInt(likesTag.innerText, 10)
    likesTag.innerText = ++likes
    updateLikes(likes)
}

function updateLikes(likes) {
    return fetch( `http://localhost:3000/images/${imageId}/likes` , {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            likes
        })
    })
}

function renderComments(data) {
    data.forEach(comment => {
        let li = document.createElement('li')
        commentUl.append(li)
        li.innerText = comment.content
        li.dataset.id = comment.id
        })
}

commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let li = document.createElement('li')
    commentUl.append(li)
    li.innerText = e.target.comment.value
    updateComments(e.target.comment.value)
    e.target.comment.value = ''
    
})

function updateComments(comment) {
    // let imageIdNew = imageTag.dataset.id
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            content: comment,
            image_id: imageId
        })
    })
}