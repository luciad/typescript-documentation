
describe('Class6 test', () => {
    it('Searches Class6 page for expected contents, mostly signatures', () => {
  cy.visit('http://localhost:8000/modules/folder1/class6/Class6/constructor')

  cy.get(".signature-summary").contains("new Class6")
  cy.get(".signature-summary").get('a').contains('FirstClass').click({force: true})
  cy.url().should('include', '/firstclass/FirstClass')

  cy.visit('http://localhost:8000/modules/folder1/class6/Class6/property')
  cy.get(".signature-summary").contains("get")
  cy.get(".signature-summary").contains("set")
  cy.get(".signature-summary").contains("prop")

  cy.visit('http://localhost:8000/modules/folder1/class5/myInterface')
  cy.get(".kind-string").contains("Interface")
})
})