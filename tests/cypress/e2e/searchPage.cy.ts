/// <reference types="cypress" />

describe('S01 - ', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {

        beforeEach(() => {
          cy.visit('/')
        })
        
        it('1. Checking search page.', () => {
          if (device === 'desktop') {
            cy.dataCy('search-button').click()
          } else {
            cy.dataCy('search-button-mobile').click()
          }
          cy.location('pathname', {timeout: 4000})
            .should('eq', '/vyhladavanie');
          
          cy.dataCy('allResults-tab').should('be.visible')
          cy.dataCy('pages-tab').should('be.visible')
          cy.dataCy('articles-tab').should('be.visible')
          cy.dataCy('users-tab').should('be.visible')

          cy.dataCy('search-section-Stránky').should('be.visible')
          cy.dataCy('search-section-Stránky').should('contain', 'Zadajte hľadaný výraz')
          cy.dataCy('search-section-Články').should('be.visible')
          cy.dataCy('search-section-Články').should('contain', 'Zadajte hľadaný výraz')
          cy.dataCy('search-section-Kontakty').should('be.visible')
          cy.dataCy('search-section-Kontakty').should('contain', 'Zadajte hľadaný výraz')
        })

        it('2. Checking search results - pages.', () => {
          cy.visit('/vyhladavanie')
          cy.dataCy('search-field').type("skolstvo{enter}")
          cy.dataCy('search-section-Stránky').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-section-more-button]', section)).click()
          })
          cy.dataCy('pages-tab').should('have.attr', '[data-selected=true]')
          cy.dataCy('search-section-results').should('contain', '[data-cy=search-result-card]')
          cy.dataCy('search-section-results').contains('[data-cy=search-result-card]').click()
          cy.location('pathname', {timeout: 4000})
          .should('not.eq', '/vyhladavanie');
        })

        it('3. Checking search results - articles.', () => {
          cy.visit('/vyhladavanie')
          cy.dataCy('search-field').type("Bratislava{enter}")
          cy.dataCy('search-section-Články').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-section-more-button]', section)).click()
          })
          cy.dataCy('articles-tab').should('have.attr', '[data-selected=true]')
          cy.dataCy('search-section-results').should('contain', '[data-cy=search-result-card]')
          cy.dataCy('search-section-results').contains('[data-cy=search-result-card]').click()
          cy.location('pathname', {timeout: 4000})
          .should('not.eq', '/vyhladavanie');
        })

        it('4. Checking search results - contacts.', () => {
          cy.visit('/vyhladavanie')
          cy.get('[data-cy=users-tab]').click()
          cy.get('[data-cy=search-field]').type("primátor{enter}")
          cy.dataCy('users-tab').should('have.attr', '[data-selected=true]')
          cy.dataCy('search-section-results').should('contain', '[data-cy=search-result-card]')
        })
			})
		})
})