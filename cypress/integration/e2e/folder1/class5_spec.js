
describe('Class5 test', () => {
    it('Searches Class5 page for expected contents, mostly kindStrings', () => {
  cy.visit('http://localhost:8000/modules/folder1/class5/Class5')

  cy.get(".kindString").contains("Class")
  cy.get(".kindString").contains("Method")

  cy.visit('http://localhost:8000/modules/folder1/class5/myEnum')
  cy.get(".kindString").contains("Enum")
  cy.get(".kindString").contains("Enumeration member")

  cy.visit('http://localhost:8000/modules/folder1/class5/myInterface')
  cy.get(".kindString").contains("Interface")
})
})