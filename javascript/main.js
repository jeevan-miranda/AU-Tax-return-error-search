//select template from HTML
const errorTemplate = document.querySelector('[data-error-template]')
const errorContainer = document.querySelector('[data-error-card-container]')
//pull search input from HTML
const searchInput = document.querySelector('[data-search]')

//event listener to filter error list when value entered in search field.
//listener should run on input
searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase()
  errors.forEach((error) => {
    const isShown =
      error.code.toLowerCase().includes(value) ||
      error.name.toLowerCase().includes(value) ||
      error.description.toLowerCase().includes(value) ||
      error.explanation.toLowerCase().includes(value)
    error.element.classList.toggle('hide', !isShown)
  })
})

let errors = []

//link json with error list to this JS script file.
fetch('/javascript/errors.json')
  .then((response) => response.json())
  .then((data) => {
    errors = data.map((error) => {
      //get content from within data-error-template so it can be edited
      const card = errorTemplate.content.cloneNode(true).children[0]
      //grab body and header sections so data can be added in
      const code = card.querySelector('[data-code]')
      const name = card.querySelector('[data-name]')
      const description = card.querySelector('[data-description]')
      const explanation = card.querySelector('[data-explanation]')
      code.textContent = error.code
      name.textContent = error.name
      description.textContent = error.description
      explanation.textContent = error.explanation
      errorContainer.append(card)
      return {
        code: error.code,
        name: error.name,
        description: error.description,
        explanation: error.explanation,
        element: card,
      }
    })
  })
