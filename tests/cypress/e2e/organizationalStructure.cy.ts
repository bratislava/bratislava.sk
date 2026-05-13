/// <reference types="cypress" />

describe('OS01 -', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {
        before(() => {
          cy.visit('/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura')
          cy.setCookie('CookieConsent', 'false') // Set CookieBot cookies to something to prevent cookie banner to show up
        })

        it('1. Check organizational structure data.', () => {
          cy.dataCy('page-heading')
            .invoke('text')
            .then((text) => {
              expect(text.replace(/\u00a0/g, ' ')).equal('Organizačná štruktúra')
            })

          cy.dataCy('organizational-structure-container')
            .find('> [data-cy=organizational-structure-accordion]')
            .should('have.length', 3)
            .as('topLevelAccordions')

          cy.get('@topLevelAccordions')
            .eq(0)
            .should('contain', 'Magistrát hlavného mesta SR Bratislavy')
          cy.get('@topLevelAccordions')
            .eq(1)
            .should('contain', 'Primátor hlavného mesta SR Bratislavy')
          cy.get('@topLevelAccordions').eq(2).should('contain', 'Útvar mestskej kontrolórky')

          cy.get('@topLevelAccordions').eq(1).as('primatorAccordion').click()

          cy.get('@primatorAccordion')
            .find('[data-cy=organizational-structure-accordion-content]')
            .first()
            .within(() => {
              cy.dataCy('structure-accordion-card-name').should(
                'contain',
                'Vallo Matúš, Ing. arch.',
              )
              cy.dataCy('structure-accordion-card-job').should('contain', 'Primátor')
              cy.dataCy('structure-accordion-card-email').should(
                'contain',
                'primator@bratislava.sk',
              )
            })
        })
      })
    })
})
