
describe('FirstClass test', () => {
    it('Searches first class page for expected contents', () => {
      cy.visit('http://localhost:8000/modules/firstclass/FirstClass')

      cy.contains('Directories')
      cy.contains("Legend")
      cy.contains("FirstClass")
      cy.contains("A first class")
      cy.contains("_name")
      cy.contains("getName() : String")

      cy.get('a').contains("setName").click()
      cy.url().should('include', '/firstclass/FirstClass/setName')
    })
  })