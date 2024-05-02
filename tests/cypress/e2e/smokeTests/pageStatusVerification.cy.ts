/// <reference types="cypress" />

describe('Page status verification', () => {
  it('Verification of successful page loading', () => {
    cy.fixture('URLsForSmokeTests.json').then((fileData) => {
      fileData.forEach((pathObject) => {
        cy.request({ url: pathObject.path, failOnStatusCode: pathObject.status === 200 })
          .its('status')
          .should('eq', pathObject.status)
      })
    })
  })
})
