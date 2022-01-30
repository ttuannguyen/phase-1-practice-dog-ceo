//console.log('%c HI', 'color: firebrick')

// document.addEventListener("DOMContentLoaded", function () {

//     fetchImages();
//     fetchBreeds();
// })
//or move script down to the bottom


/** GLOBAL */
const container = document.querySelector('#dog-image-container');
const ulContainer = document.querySelector("#dog-breeds") //select tip: go to Elements in Dev Tools and do Copy selector
const dropDown = document.querySelector('#breed-dropdown');
let breedsArr = []; //setting breedsArr as a global var will allow us to pass elements into it to use with multiple functions; we're changing the elements inside the arr so it has to be let 

/** EVENT LISTENERS */
ulContainer.addEventListener('click', handleClick);
dropDown.addEventListener('change', handleChange);


/* CHALLENGE 1 */
//Take an array of images, turn it into img elements, append each to the DOM
//Method 1

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
function getImages() {
    fetch(imgUrl)
    .then(res => res.json())
    .then(images => {
        const imgs = images.message;
        let imgsArr = createImages(imgs);
        renderImages(imgsArr);
    })
}

function createImages(imgs) {
    return imgs.map((img) => {
        let i = `<img src=${img}>`; //creating an image tag with a source vs document.createElement
        //using template literal will recogize it as a string vs node
        return i; //important bc map doesn't modify until it sees what it should return
    })
}

function renderImages(imgsArr) {
    imgsArr.forEach(element => {
        renderElement(element)
    })
}



function renderElement(element) {
    ulContainer.innerHTML += element; //+= to add the next element during each iteration vs overriding
    //updated to ulContainer from container
}

//getImages();


//Method 2
// function fetchImages() {
//     fetch(imgUrl)
//     .then(res=> res.json())
//     .then(imagesData => {
//         imagesData.message.forEach(image => renderImages(image))
//     });
//   }
  
// function renderImages(dogImages) {
//     let container = document.getElementById('dog-image-container');
//     let newImage = document.createElement('img');
//     newImage.src = dogImages; 
//     container.appendChild(newImage);
// }


/* CHALLENGE 2 */
const breedUrl = 'https://dog.ceo/api/breeds/list/all' //nested 
function getBreeds() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(breeds => {
        //here we are dealing with an obj; we want to turn into array with Objects.keys()
        //debugger'
        breedsArr = Object.keys(breeds.message); //access the desired data. we also need to pass this breed arr to handleChange. this var and its values are now accessible in any func
        const breedsLis = createLiElements(breedsArr);
        renderBreedLis(breedsLis);

    })
}
getBreeds();

function createLiElements(breeds) {
    return breeds.map((breed) => {
        let li = `<li>${breed}</li>`; //creating an image tag with a source vs document.createElement
        //using template literal will recogize it as a string vs node
        //console.log(li);
        return li; //important bc map doesn't modify until it sees what it should return
    })
}

function renderBreedLis(breedsLis) {
    breedsLis.forEach(element => {
        renderElement(element)
    })
}

/* CHALLENGE 3 */
//Objective: Once we are able to load all of the dog breeds onto the page, add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown
//Plan: wrap the event listener in the ul#dog-breeds where the li's are housed in
//Reason: sometimes if we change the elements are on DOM, we lose the associated event listener
function handleClick(event) {
    //event.target.style.color = 'green'; //meets requirement
    //good ref: to toggle back and forth
    if(event.target.style.color === 'green') {
        event.target.style.color = 'black';
    } else {
        event.target.style.color = 'green';
    }
}

/* CHALLENGE 4 */
//Objective: add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown

function handleChange(event) {
    //debugger; //with dropdown, it's important to have an empty option so you can debug the ones with values 
    const letter = event.target.value;
    //we need to get the breedsArr:
    //console.log(breedsArr);
    //filter out the breeds
    const filteredBreeds = breedsArr.filter(breed => breed.startsWith(letter));
    const filteredBreedsLis = createLiElements(filteredBreeds);
    ulContainer.innerHTML =''; //we need to clear out the ones we're not selecting => set container to empty
    renderBreedLis(filteredBreedsLis);


}