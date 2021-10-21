const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

//dom elements
const btn = document.getElementById('btn');
const color = document.querySelector('.color');
//getRandomNumber
function getRandomNumber(){
    return colors[Math.floor(Math.random() * colors.length)];
    
}


btn.addEventListener('click', function(){
    // console.log('clicked');
    //get random number between 0-3
    // console.log(randomNumber);
    var randomNumber = getRandomNumber();
    color.innerHTML = randomNumber;
    document.body.style.backgroundColor = randomNumber;

});