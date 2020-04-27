// http://localhost:3000/images/:id
// http://localhost:3000/images/:id/likes
// http://localhost:3000/comments
const imageId = 1

function getImage() {
  fetch(`http://localhost:3000/images/${imageId}`)
  .then((response) => response.json())
  .then((image) => renderImage(image))
}

getImage()

function renderImage(imageInfo) {
  const likeSpan = document.getElementById('likes')
  likeSpan.textContent = imageInfo.likes
  const image = document.getElementById('image')
  image.src = imageInfo.url
  const comment = document.getElementById('comments')
  imageInfo.comments.forEach( c =>{
      const li = document.createElement("li")
      li.textContent = c.content
      comment.append(li)
  })
}

function listenToLikeBtn() {
  const likeBtn = document.getElementById('like-button')
  likeBtn.addEventListener('click', function() {
    updateLikes()
  })
}

listenToLikeBtn()

function updateLikes(){
    let likes = parseInt(document.getElementById('likes').innerText)
    likes += 1
    const newLikes = document.getElementById('likes')
    newLikes.textContent = likes
    console.log(likes)
    const patchObj = {
        method: "PATCH",
        headers:{
            "Content-type": "application/json", 
            Accept: "application/json"
        },
        body: JSON.stringify({
            likes
        })
    }
    fetch(`http://localhost:3000/images/${imageId}/likes`, patchObj)
}

function listenToFormSubmit() {
  const form = document.getElementById('comment_form')
//   const comment = document.getElementById('comment-input')
  form.addEventListener('submit', function(event) {
    event.preventDefault()
    let commentInput = event.target.comment
    createComment(commentInput.value)
    event.target.comment.value = ''
    console.log(commentInput)
  })
}
listenToFormSubmit()

function createComment(content) {
    const comment = document.getElementById('comments')
    const li = document.createElement("li")
    li.innerText = content
    comment.append(li)
    updateComment(content)

}

function updateComment(comment){
    const postObj = {
        method: "POST",
        headers:{
            "Content-type": "application/json", 
            Accept: "application/json"
        },
        body: JSON.stringify({
            content: comment,
            image_id: imageId
        })
    }
    fetch(`http://localhost:3000/comments`, postObj)
}