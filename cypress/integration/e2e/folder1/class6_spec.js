
describe('Class6 test', () => {
    it('Searches Class6 page for expected contents, mostly signatures', () => {
  cy.visit('http://localhost:8000/modules/folder1/class6/Class6/constructor')

  cy.get(".kindString").contains("Class")
  cy.get(".signaturesummarylist").contains("new Class6")
  cy.get(".signaturesummarylist").get('a').contains('FirstClass').click()
  cy.url().should('include', '/firstclass/FirstClass')

  cy.visit('http://localhost:8000/modules/folder1/class6/Class6/property')
  cy.get(".signaturesummarylist").contains("get")
  cy.get(".signaturesummarylist").contains("set")
  cy.get(".signaturesummarylist").contains("prop")

  cy.visit('http://localhost:8000/modules/folder1/class5/myInterface')
  cy.get(".kindString").contains("Interface")
})
})