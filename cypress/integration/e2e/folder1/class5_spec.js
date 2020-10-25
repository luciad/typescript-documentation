
describe('Class5 test', () => {
    it('Searches Class5 page for expected contents, mostly kindStrings', () => {
  cy.visit('http://localhost:8000/modules/folder1/class5/Class5')

  cy.get(".kind-string").contains("Class")

  cy.visit('http://localhost:8000/modules/folder1/class5/myEnum')
  cy.get(".kind-string").contains("Enum")

  cy.visit('http://localhost:8000/modules/folder1/class5/myInterface')
  cy.get(".kind-string").contains("Interface")
})
})