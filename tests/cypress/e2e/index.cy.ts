/// <reference types="cypress" />

describe('Cypress test', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {

        before(() => {
          cy.visit('/')
        })
        
        it('1. Test init', () => {
					cy.get("bodyasdadsasd")
        })
			})
		})
})