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
          cy.dataCy('officialBoard-tab').should('be.visible')

          cy.dataCy('search-section-Stránky').scrollIntoView().should('be.visible')
          cy.dataCy('search-section-Stránky').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-results]', section)).find('[data-cy=search-result-card]').should('exist')
          })          
          cy.dataCy('search-section-Články').scrollIntoView().should('be.visible')
          cy.dataCy('search-section-Články').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-results]', section)).find('[data-cy=search-result-card]').should('exist')
          })      
          cy.dataCy('search-section-Kontakty').scrollIntoView().should('be.visible')
          cy.dataCy('search-section-Kontakty').should('contain', 'Zadajte hľadaný výraz')   

          cy.get('[data-cy^=search-section-Úradná]').scrollIntoView().should('be.visible')
          cy.get('[data-cy^=search-section-Úradná]').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-results]', section)).find('[data-cy=search-result-card]').should('exist')
          })   
        })

        it('2. Checking search results - pages.', () => {
          cy.visit('/vyhladavanie')
          cy.dataCy('search-field').type("skolstvo{enter}")
          cy.dataCy('search-section-Stránky').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-section-more-button]', section)).click()
          })
          cy.dataCy('pages-tab').should('have.class', 'selected:bg-category-700')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').should('exist')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').eq(0).click()
          cy.location('pathname', {timeout: 4000})
          .should('not.eq', '/vyhladavanie');
        })

        it('3. Checking search results - articles.', () => {
          cy.visit('/vyhladavanie')
          cy.dataCy('search-field').type("Bratislava{enter}")
          cy.dataCy('search-section-Články').then((section) => {
            cy.wrap(Cypress.$('[data-cy=search-section-more-button]', section)).click()
          })
          cy.dataCy('articles-tab').should('have.class', 'selected:bg-category-700')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').should('exist')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').eq(0).click()
          cy.location('pathname', {timeout: 4000})
          .should('not.eq', '/vyhladavanie');
        })

        it('4. Checking search results - contacts.', () => {
          cy.visit('/vyhladavanie')
          cy.get('[data-cy=users-tab]').click()
          cy.get('[data-cy=search-field]').type("primátor{enter}")
          cy.dataCy('users-tab').should('have.class', 'selected:bg-category-700')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').should('exist')
        })

        it('5. Checking search results - official board.', () => {
          cy.visit('/vyhladavanie')
          cy.get('[data-cy=officialBoard-tab]').click()
          cy.get('[data-cy=search-field]').type("MHD{enter}")
          cy.dataCy('officialBoard-tab').should('have.class', 'selected:bg-category-700')
          cy.dataCy('search-results').find('[data-cy=search-result-card]').should('exist')
        })
      })
    })
})
