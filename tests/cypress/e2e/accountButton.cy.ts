/// <reference types="cypress" />

describe('Account button', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {
        before(() => {
          cy.visit('/')
        })

        it('1. Checking account button.', () => {
          if (device === 'desktop') {
            cy.dataCy('account-button')
              .should('be.visible')
              .then(($accountButton) => {
                expect($accountButton).to.have.attr('target', '_blank')
                $accountButton.attr('target', '_self')
              })
            cy.dataCy('account-button').click()
            cy.url().should('include', 'https://konto.bratislava.sk')
          } else {
            cy.dataCy('mobile-menu-button').click()
            cy.dataCy('mobile-account-button')
              .should('be.visible')
              .then(($a) => {
                expect($a).to.have.attr('target', '_blank')
                $a.attr('target', '_self')
              })
            cy.dataCy('mobile-account-button').click()
            cy.url().should('include', 'https://konto.bratislava.sk')
          }
        })
      })
    })
})
