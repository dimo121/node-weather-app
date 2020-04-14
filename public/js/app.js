console.log('client side js file is loaded')

//continue with course section 57 browser based fetch api to make client side http request


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//event listener 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("/weather?address="+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'The temperature is '+data.temperature+' C. '+ data.summary
                console.log(data.temperature+ ' C')
                console.log(data.location)
                console.log(data.summary)
            }
        })
    })
})