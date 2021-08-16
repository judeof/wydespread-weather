/* Client side javascript file */
console.log('Client side javascript file is loaded')

//not compatible with node.js but is also async w/ callback function
//http://puzzle.mead.io/puzzle


//grabbing the form input from app.js
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//add event listener
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault() //prevents default page refresh if button is clicked and allows function to run
    const location = search.value
    message1.textContent = "Loading..."
    message2.textContent = ""

    fetch('http://localhost:3001/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error
        }else{
            message1.textContent = data.location 
            message2.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})