
describe('FirstClass test', () => {
    it('Searches first class page for expected contents, some basic sanity tests', () => {
      cy.visit('http://localhost:8000/modules/firstclass/FirstClass')

      cy.contains("FirstClass")
      cy.contains("A first class")
      cy.contains("_name")
      cy.contains("getName() : String")

      cy.get('a').contains("setName").click({force: true})
      cy.url().should('include', '/firstclass/FirstClass/setName')

      cy.visit("http://localhost:8000/modules/folder1/class4")

      cy.contains("Class4")
      cy.contains("Callback")
      cy.contains(/^PrimitiveArray/).click({force: true})

      cy.url().should('include', '/class4/PrimitiveArray')
    })
  })