/// <reference types="cypress" />

describe('English translation', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {
        before(() => {
          cy.visit('/kontakty-a-uradne-hodiny')
          cy.setCookie('CookieConsent', 'false') // Set CookieBot cookies to something to prevent cookie banner to show up
        })

        it('1. Translating contact page.', () => {
          cy.dataCy('heading-two')
            .eq(0)
            .invoke('text')
            .then((text) => {
              expect(text.replace(/\u00a0/g, ' ')).equal('Kontakty')
            })

          if (device === 'desktop') {
            cy.dataCy('change-language-button').click()
          } else {
            cy.dataCy('mobile-change-language-button').click()
          }
        })

        it('2. Checking page heading translation.', () => {
          cy.wait(500)
          cy.location('pathname', { timeout: 10000 }).should('eq', '/en/visiting-and-office-hours')
          cy.dataCy('heading-two').eq(0).should('contain.text', 'Opening hours')

          if (device === 'desktop') {
            cy.dataCy('change-language-button').click()
          } else {
            cy.dataCy('mobile-change-language-button').click()
          }
        })

        it('3. Checking original language.', () => {
          cy.wait(500)
          cy.location('pathname', { timeout: 10000 }).should('eq', '/kontakty-a-uradne-hodiny')
          cy.dataCy('heading-two').eq(0).should('contain.text', 'Kontakty')
        })
      })
    })
})
