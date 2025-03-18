// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// esse comando possui dados fixos
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Walmyr')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('walmyr@talkingabouttesting.com')
  cy.get('#open-text-area').type('obrigado!')
  cy.get('button[type="submit"]').click()
})

// esse comando necessita que a gente passe os dados quando o chamamos
Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text)
  cy.get('button[type="submit"]').click()
})

// esse comando permite que a gente chame ele passando ou nao dados.
Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@test.com',
  text: 'test'
}) => {
  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text)
  cy.get('button[type="submit"]').click()
})