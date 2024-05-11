/// <reference types="cypress" />

describe('Page 404', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {

        before(() => {
          cy.visit('/93dfcaf3d923ec47edb8580667473987', {failOnStatusCode: false})
        })

        it('1. Check if the 404 page is displayed.', () => {
					cy.dataCy("404-image").should("be.visible")
					cy.dataCy("404-left-side", "div").contains("404").should("be.visible")
					cy.dataCy("404-left-side", "p").contains("Ľutujeme, pre dané vyhľadávanie sa nenašli žiadne výsledky.").should("be.visible")
					cy.dataCy("404-left-side", "a").should("be.visible").click()
        })

				it('2. Check if I was redirected to the homepage.', () => {
					cy.location('pathname', {timeout: 4000})
          .should('eq', '/');
        })
      })
   })
})
