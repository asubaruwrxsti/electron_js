const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

const getButton = document.getElementById('btn2')
getButton.addEventListener('click', () => {
    const title = window.electronAPI.getTitle()
    console.log(title)
});

const convertButton = document.getElementById('convert')
const result = document.getElementById('result')
convertButton.addEventListener('click', () => {
    const from_curr = document.getElementById('currency_from').value
    const to_curr = document.getElementById('currency_to').value
    const amount = document.getElementById('amount').value
    const converted = window.electronAPI.convert(from_curr, to_curr, amount)
    console.log(converted)
});