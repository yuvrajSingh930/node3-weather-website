console.log('Ther is Nothing in the Life of Me')
//use to fetch the data from the webite
fetch('http://localhost:3000/weather?address=boston%20England').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(error);
        }
        else{
            console.log(data.place);
            console.log(data.forecast)
        }
    })
})

const whetherForm=document.querySelector('form')

const Search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')

const messageTwo=document.querySelector('#message-2')

whetherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=Search.value
    messageOne.textContent='Finding The Location...'
    messageOne.textContent=''
    messageTwo.textContent=''
    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=(data.error)
            }
            else{
                messageOne.textContent=data.place
                messageTwo.textContent=data.forecast
            }
        })
    })
})