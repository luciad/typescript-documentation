
describe('FirstClass test', () => {
    it('Searches first class page for expected contents, some basic sanity tests', () => {
      cy.visit('http://localhost:8000/modules/firstclass/FirstClass')

      cy.contains('Directories')
      cy.contains("Legend")
      cy.contains("FirstClass")
      cy.contains("A first class")
      cy.contains("_name")
      cy.contains("getName() : String")

      cy.get('a').contains("setName").click()
      cy.url().should('include', '/firstclass/FirstClass/setName')

      cy.visit("http://localhost:8000/modules/folder1/class4")

      cy.contains("Class4")
      cy.contains("Callback")
      cy.contains("PrimitiveArray").click()

      cy.url().should('include', '/class4/PrimitiveArray')
    })
  })