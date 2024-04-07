const language = Cypress.env('language')
const url = defineUrl(language)

describe('Test the same app in two different languages (EN and PT-BR)', () => {
  beforeEach(() => {
    // Log which language is being tested
    cy.log(`Testing in ${language === 'en' ? 'English' : language === 'pt-br' ? 'Portuguese (Brazil)' : 'Invalid language'}`)
  })

  it('checks all of the home page translations', () => {
    // Define the translations for the home page (index.html)
    const translations = require(`../fixtures/index/${language}`)
    // Freeze the browser's clock
    cy.clock()
    // Visit the application's home page
    cy.visit(`${url}/index.html`)
    // Check title
    cy.title().should('be.equal', translations.title)
    // Check heading and paragraph below it
    cy.contains('h1', translations.heading).should('be.visible')
    cy.contains('p', translations.paragraphBelowHeading).should('be.visible')
    // Check firstname, lastname, email, and phone
    cy.contains('label[for="firstName"]', translations.firstName)
      .should('be.visible')
      .and('contain', `(${translations.required})`)
      .type('John')
    cy.contains('label[for="lastName"]', translations.lastName)
      .should('be.visible')
      .and('contain', `(${translations.required})`)
      .type('Doe')
    cy.contains('label[for="email"]', translations.email)
      .should('be.visible')
      .and('contain', `(${translations.required})`)
      .type('johndoe@example.com')
    cy.contains('label[for="phone"]', translations.phone)
      .should('be.visible')
      .type('5555555')
    // Check products
    cy.contains('label', translations.product.label).should('be.visible')
    cy.get('#product')
      .as('productSelectField')
    cy.get('@productSelectField')
      .find('option:disabled')
      .then(selectOption => {
        expect(selectOption[0].innerText).to.equal(translations.product.select)
      })
    cy.get('@productSelectField')
      .find(`option[value="${translations.product.blog.value}"]`)
      .should('exist')
      .then(selectOption => {
        expect(selectOption[0].innerText).to.equal(translations.product.blog.content)
      })
    cy.get('@productSelectField')
      .find(`option[value="${translations.product.courses.value}"]`)
      .should('exist')
      .then(selectOption => {
        expect(selectOption[0].innerText).to.equal(translations.product.courses.content)
      })
    cy.get('@productSelectField')
      .find(`option[value="${translations.product.mentorship.value}"]`)
      .should('exist')
      .then(selectOption => {
        expect(selectOption[0].innerText).to.equal(translations.product.mentorship.content)
      })
    cy.get('@productSelectField')
      .find(`option[value="${translations.product.youtube.value}"]`)
      .should('exist')
      .then(selectOption => {
        expect(selectOption[0].innerText).to.equal(translations.product.youtube.content)
      })
    // Check support type
    cy.contains('#support-type label', translations.typeOfService.label)
      .should('be.visible')
    cy.get(`input[type="radio"][value="${translations.typeOfService.help.toLowerCase()}"]`)
      .should('be.visible')
      .and('be.checked')
    cy.get(`input[type="radio"][value="${translations.typeOfService.praise.toLowerCase()}"]`)
      .should('be.visible')
      .and('not.be.checked')
    cy.get(`input[type="radio"][value="${translations.typeOfService.feedback.toLowerCase()}"]`)
      .should('be.visible')
      .and('not.be.checked')
    // Check preferred means of contact
    cy.contains('label', translations.preferredMeansOfContact.label)
      .should('be.visible')
    cy.get(`input[type="checkbox"][value="${translations.preferredMeansOfContact.email.value}"]`)
      .should('be.visible')
      .and('not.be.checked')
      .next()
      .should('contain', translations.preferredMeansOfContact.email.label)
    cy.get(`input[type="checkbox"][value="${translations.preferredMeansOfContact.phone.value}"]`)
      .should('be.visible')
      .and('not.be.checked')
      .next()
      .should('contain', translations.preferredMeansOfContact.phone.label)
      .prev()
      .check()
    // Check phone became required
    cy.contains('label[for="phone"]', translations.phone)
      .should('be.visible')
      .and('contain', ` (${translations.required})`)
    // Check text area section
    translations.testArea.labels.forEach(label => {
      cy.contains('label', label)
        .should('be.visible')
        .and('contain', ` (${translations.required})`)
    })
    cy.get('textarea').type('Test text.')
    // Check attach file
    cy.contains('label', translations.attachAFile).should('be.visible')
    // Check privacy policy link
    cy.contains('a', translations.privacyPolicy).should('be.visible')
    // Check send button
    cy.contains('button', translations.send)
      .as('sendButton')
      .should('be.visible')
      .click()
    // Check the success message
    cy.contains('span', translations.successMessage).should('be.visible')
    // Advance the browser's clock in 3 seconds
    cy.tick(3000)
    // Check the error message
    cy.get('@sendButton').click()
    cy.contains('span', translations.errorMessage).should('be.visible')
  })

  it('checks all of the privacy page translations', () => {
    // Define the translations for the privacy page (privacy.html)
    const translations = require(`../fixtures/privacy/${language}`)
    // Visit the application's privacy page
    cy.visit(`${url}/privacy.html`)
    // Check title
    cy.title().should('be.equal', translations.title)
    // Check heading
    cy.contains('h1', translations.heading).should('be.visible')
    // Check paragraphs
    translations.paragraphs.forEach(paragraph => {
      cy.contains('p', paragraph).should('be.visible')
    })
  })
})

function defineUrl(lang) {
  if (lang === 'en') return 'https://tat-csc.s3.sa-east-1.amazonaws.com'
  if (lang === 'pt-br') return 'https://cac-tat.s3.eu-central-1.amazonaws.com'
  return `Not supported language: ${lang}.`
}
