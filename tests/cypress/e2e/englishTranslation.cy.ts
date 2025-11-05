/// <reference types="cypress" />

type Device = 'desktop' | 'mobile'

describe('English translation', { testIsolation: false }, () => {
  const devices: Device[] = ['desktop', 'mobile']

  const changePageTranslation = (device: Device) => {
    if (device === 'desktop') {
      cy.dataCy('change-language-button').click()
    } else {
      cy.dataCy('mobile-change-language-button').click()
    }
  }

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {
        before(() => {
          cy.visit('/')
          cy.setCookie('CookieConsent', 'false') // Set CookieBot cookies to something to prevent cookie banner to show up
        })

        it('displays SK homepage with welcome text', () => {
          cy.get('h1').first().should('contain.text', 'Vitajte')
        })

        it('displays EN homepage after changing translation', () => {
          changePageTranslation(device)
          cy.location('pathname', { timeout: 10000 }).should('eq', '/en')
        })

        it('displays EN homepage with welcome text', () => {
          cy.get('h1').first().should('contain.text', 'Vitajte')
        })

        it('displays SK homepage after changing translation again', () => {
          changePageTranslation(device)
          cy.location('pathname', { timeout: 10000 }).should('eq', '/')
        })
      })
    })
})
