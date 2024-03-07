/// <reference types="cypress" />

describe('S01 - ', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {

        before(() => {
          cy.visit('/')
        })
        
        it('1. Showing official board', () => {
          //cy.dataCy('homepage-tab-OfficialBoard').scrollIntoView().click()
        })
			})
		})
})