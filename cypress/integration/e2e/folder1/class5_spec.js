
describe('Class5 test', () => {
    it('Searches Class5 page for expected contents, mostly kindStrings', () => {
  cy.visit('http://localhost:8000/modules/folder1/class5/Class5')

  cy.get(".kind-string").contains("Class")
  cy.get(".kind-string").contains("Method")

  cy.visit('http://localhost:8000/modules/folder1/class5/myEnum')
  cy.get(".kind-string").contains("Enum")
  cy.get(".kind-string").contains("Enumeration member")

  cy.visit('http://localhost:8000/modules/folder1/class5/myInterface')
  cy.get(".kind-string").contains("Interface")
})
})