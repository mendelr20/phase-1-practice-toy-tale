function allToyData(){
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then((data) => {
      data.forEach(displayToys)
    })
  }

let addToy = false;


function displayToys(toy){
   let name = document.createElement('p')
   name.textContent = toy.name
   let img = document.createElement('img')
   img.src = toy.image
   console.log(toy)
   img.className = "toy-avatar"
   
   let likes = toy.likes
   let likeButton = document.createElement('button')
   likeButton.id = "like"
   likeButton.textContent = `${likes} likes`
   likeButton.addEventListener('click', () => {
     likes ++
     likeButton.textContent = `${likes} likes`
   })
   
   let div = document.createElement('div')
   div.className = "card"
   div.append(name)
   div.appendChild(img)
   div.appendChild(likeButton)
   document.querySelector("#toy-collection").appendChild(div)
  }
  
allToyData()


let submitBtn = document.querySelector("#addToyBtn")


submitBtn.addEventListener('click', submit)
let formName = document.querySelector("input[name='name']")
let imgUrl = document.querySelector("input[name='image']")
 
function submit(e){
  e.preventDefault()
  let submitInfo = {
  name: formName.value,
  image: imgUrl.value
  }
  submitPost(submitInfo)
}




function submitPost(submitInfo){
  console.log(submitInfo)
  fetch('http://localhost:3000/toys', {
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  
  body: JSON.stringify({
    "name": submitInfo.name,
    "image": submitInfo.img,
    "likes": 0
  })
})
.then((res) => {
  return res.json()
})
.then((data) => {
  console.log(data)
  displayToys(data)
})
}



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});

