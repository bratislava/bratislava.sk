before(() => {
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
  cy.clearAllCookies()
  cy.setCookie('gdpr-consents', '{%22statistics%22:true}')
})
