/// <reference types="cypress" />

describe('OS01 -', { testIsolation: false }, () => {
  const devices = ['desktop', 'mobile']

  devices
    .filter((device) => Cypress.env('devices')[`${device}`])
    .forEach((device) => {
      context(device, Cypress.env('resolution')[`${device}`], () => {
        before(() => {
          cy.visit('/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura')
        })

        it('1. Check organizational structure data.', () => {
          cy.dataCy('page-heading')
            .invoke('text')
            .then((text) => {
              expect(text.replace(/\u00a0/g, ' ')).equal('Organizačná štruktúra')
            })

          cy.dataCy('organizational-structure-container').then((container) => {
            cy.wrap(Cypress.$(`[data-cy=organizational-structure-accordion]`, container)).should(
              'have.length',
              3,
            )
            cy.wrap(
              Cypress.$(`[data-cy=organizational-structure-accordion]`, container).eq(0),
            ).should('contain', 'Magistrát hlavného mesta SR Bratislavy')
            cy.wrap(
              Cypress.$(`[data-cy=organizational-structure-accordion]`, container).eq(1),
            ).should('contain', 'Primátor hlavného mesta SR Bratislavy')
            cy.wrap(
              Cypress.$(`[data-cy=organizational-structure-accordion]`, container).eq(2),
            ).should('contain', 'Útvar mestskej kontrolórky')

            cy.wrap(
              Cypress.$(`[data-cy=organizational-structure-accordion]`, container).eq(1),
            ).click()
          })

          cy.dataCy('organizational-structure-accordion-content').then((content) => {
            cy.wrap(Cypress.$(`[data-cy=structure-accordion-card-name]`, content)).should(
              'contain',
              'Vallo Matúš, Ing. arch.',
            )
            cy.wrap(Cypress.$(`[data-cy=structure-accordion-card-job]`, content)).should(
              'contain',
              'Primátor',
            )
            cy.wrap(Cypress.$(`[data-cy=structure-accordion-card-name]`, content)).should(
              'contain',
              'Vallo Matúš, Ing. arch.',
            )
            cy.wrap(Cypress.$(`[data-cy=structure-accordion-card-phone]`, content)).should(
              'contain',
              '+421-904099004',
            )

            if (device === 'mobile') {
              cy.wrap(Cypress.$(`[data-cy=structure-accordion-card-email-mobile]`, content)).should(
                'contain',
                'primator@bratislava.sk',
              )
              cy.dataCy('file-wrapper-mobile').within((wrapper) => {
                cy.wrap(Cypress.$(`[data-cy=file-card]`, wrapper)).should('exist')

                cy.wrap(Cypress.$(`[data-cy=file-card-download]`, wrapper)).should('exist')
                cy.wrap(Cypress.$(`[data-cy=file-card-download]`, wrapper))
                  .should('have.attr', 'href')
                  .should('not.be.empty')
                  .and('include', '.pdf')
              })
            } else {
              cy.wrap(Cypress.$(`[data-cy=structure-accordion-card-email]`, content)).should(
                'contain',
                'primator@bratislava.sk',
              )
              cy.dataCy('file-wrapper-desktop').within((wrapper) => {
                cy.wrap(Cypress.$(`[data-cy=file-card]`, wrapper)).should('exist')

                cy.wrap(Cypress.$(`[data-cy=file-card-download]`, wrapper)).should('exist')
                cy.wrap(Cypress.$(`[data-cy=file-card-download]`, wrapper))
                  .should('have.attr', 'href')
                  .should('not.be.empty')
                  .and('include', '.pdf')
              })
            }
          })
        })
      })
    })
})
