const scriptURL = 'https://script.google.com/macros/s/AKfycbw_BMpSB-KM2pqeGI0tIBCXPkvTKIxrA6JWZH1Hp8jMKwxT1bybOWSGlA5e47rCZi1Q8Q/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
})
