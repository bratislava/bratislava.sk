/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

/* eslint-disable-next-line @typescript-eslint/no-namespace */
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @param attribute data-cy name.
     * @param specify It is used to specify the search, for example pointing to a child.
     * @example cy.dataCy('greeting')
     */
    dataCy(attribute: string, specify?: string): Chainable<any>
  }
}

Cypress.Commands.add('dataCy', (attribute, specify) => {
  const selector = `[data-cy=${attribute}]${specify ? specify : ''}`
  cy.get(selector)
})
/* eslint-enable @typescript-eslint/no-explicit-any */
