const axios = require('axios')

const array = []

//fetch('https://jsonplaceholder.typicode.com/todos/1')
axios('https://jsonplaceholder.typicode.com/todos/1') 
// {status: 'pending', result: unedfined }.then()
.then(res => {  // successHandler 
    console.log(res.data)
    array.push(res.data); 
    console.log(array)
    return 'algo'
}, err => console.log(err)) // errorHandler
.then(res => 'otro string')
.then(res => console.log(res))
.catch(err => console.log(err))   //.then(null, err => console.log(err))
.finally(() => console.log('Este es el final'))

console.log(array)
// Acción asincrónica --> la petición a la api 
// Promesa --> // {status: 'rejected', result: err }
// Camino de éxito --> es que la api me responda ok
// Camino de error --> ocurra un error


console.log('hola')

// Asynchronous non-bloking

// Otro lado:

// res => array.push(res.data) X
// err => console.log(err) 
// () => console.log('Este es el final') --> cb





const promise1 = axios('https://jsonplaceholder.typicode.com/todos/1') 
                .then(res => array.push(res.data))
                .catch(err => console.log(err))   //.then(null, err => console.log(err))

const promise2 = axios('https://jsonplaceholder.typicode.com/todos/2') 
                .then(res => array.push(res.data))
                .catch(err => console.log(err))   //.then(null, err => console.log(err))

const promise3 = axios('https://jsonplaceholder.typicode.com/todos/3') 
                .then(res => array.push(res.data))
                .catch(err => console.log(err))   //.then(null, err => console.log(err))



Promise.all([promise1, promise2, promise3]) // [{status: full}, {status: full}, {status: 'El ERROR'}]
.then(values => console.log(values))
.catch(err => console.log(err))
                
                