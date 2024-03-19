/// <reference types="cypress" />

describe('OB - 1', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  // cy.location('pathname', {timeout: 4000})
  // .should('eq', '/vyhladavanie');

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {

        before(() => {
          cy.visit('/')
        })
        
        it('1. Checking official board.', () => {
          cy.dataCy('homepage-tab-OfficialBoard').click()
          cy.dataCy('homepage-tab-OfficialBoard').should('have.class', 'selected:font-semibold')
          cy.dataCy('official-board-results').find('[data-cy=search-result-card]')
          cy.dataCy('official-board-button').click()
          cy.location('pathname', { timeout: 4000 })
            .should('eq', '/mesto-bratislava/transparentne-mesto/uradna-tabula');
          cy.dataCy('search-results').should('exist')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').should('exist')
          cy.dataCy('pagination').should('exist')

          cy.dataCy('search-field').type('Zápis{enter}')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').should('exist')

          cy.dataCy('search-field').clear().type('vjftrfrcygoihikjki{enter}')
          cy.dataCy('no-search-results').should('exist')
          cy.dataCy('no-search-results').should('contain', 'Nič sme nenašli')
        })
      })
   })
})
