
describe('Class6 test', () => {
    it('Searches Class6 page for expected contents, mostly signatures', () => {
  cy.visit('http://localhost:8000/modules/folder1/class6/Class6/constructor')

  cy.contains("new Class6")
  cy.get('a').contains('FirstClass').click({force: true})
  cy.url().should('include', '/firstclass/FirstClass')

  cy.visit('http://localhost:8000/modules/folder1/class6/Class6/property')
  cy.contains("read")
  cy.contains("write")

  cy.visit('http://localhost:8000/modules/folder1/class5/myInterface')
  cy.get(".kind-string").contains("Interface")
})
})