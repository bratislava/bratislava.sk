/// <reference types="cypress" />

describe('S02 - ', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {

        before(() => {
          cy.visit('/')
        })
        
        it('1. Checking homepage search with results.', () => {
          cy.dataCy('homepage-search-field').should('be.visible')
          cy.dataCy('homepage-search-field').type('Bratislava')
          cy.dataCy('homepage-search-results').should('be.visible')
          cy.dataCy('homepage-search-results').then((results) => {
            cy.wrap(Cypress.$('[data-cy=homepage-search-all-results]', results)).should('be.visible')
            cy.wrap(Cypress.$('[data-cy=homepage-search-all-results]', results)).click()
          })
          cy.location('pathname', {timeout: 4000})
          .should('eq', '/vyhladavanie?keyword=Bratislava');
          cy.dataCy('search-field').should('contain', 'Bratislava')
          cy.dataCy('search-section-Stránky').should('be.visible')
          cy.dataCy('search-section-Stránky').then((section) => {
            cy.dataCy('search-section-results').should('contain', '[data-cy=search-result-card]')
          })
        })

        it('2. Checking homepage search with no results.', () => {
          cy.dataCy('homepage-search-field').should('be.visible')
          cy.dataCy('homepage-search-field').type('jbfhrebhgberhgerbhbcbeybgfyefbhbewhf')
          cy.dataCy('homepage-search-no-results').should('be.visible')
          cy.dataCy('homepage-search-results').should('contain', 'Ľutujeme, pre dané vyhľadávanie sa nenašli žiadne výsledky.')
          cy.dataCy('homepage-search-button').click()
          cy.location('pathname', {timeout: 4000})
          .should('eq', '/vyhladavanie?keyword=jbfhrebhgberhgerbhbcbeybgfyefbhbewhf');
          
          cy.dataCy('search-field').should('contain', 'jbfhrebhgberhgerbhbcbeybgfyefbhbewhf')
          cy.dataCy('search-section-Stránky').should('be.visible')
          cy.dataCy('search-section-Stránky').should('contain', 'Žiadne výsledky')
          cy.dataCy('search-section-Články').should('be.visible')
          cy.dataCy('search-section-Články').should('contain', 'Žiadne výsledky')
          cy.dataCy('search-section-Kontakty').should('be.visible')
          cy.dataCy('search-section-Kontakty').should('contain', 'Žiadne výsledky')
        })
			})
		})
})