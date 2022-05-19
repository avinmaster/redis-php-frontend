const address = 'localhost:8080'

const keysList = document.getElementById('keys-list')

fetch(`http://${address}`).then(async function (response) {
  const data = (await response.json()).data
  
  keysList.innerHTML = ''
  Object.entries(data).forEach(([key, value]) => {
    const keyNode = document.createElement("li")
    const text = document.createTextNode(`${key} ${value}`)
    keyNode.dataset.key = key
    keyNode.prepend(text)

    const deleteBtn = document.createElement("button")
    const btnText = document.createTextNode('X')
    deleteBtn.prepend(btnText)
    deleteBtn.onclick = deleteKey
    keyNode.appendChild(deleteBtn)

    keysList.prepend(keyNode)
  })
}).catch(function (err) {
  console.warn('Something went wrong.', err)
})

function deleteKey() {
  const key = this.parentElement.dataset.key

  fetch(`http://${address}/${key}`, {
    method: 'GET'
  }).then(async function () {
    document.querySelectorAll(`[data-key=${key}]`).forEach(el => el.remove())
  }).catch(function (err) {
    console.warn('Something went wrong.', err)
  })
}