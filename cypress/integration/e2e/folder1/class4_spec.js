
describe('Class4 test', () => {
        it('Searches Class4 page for expected contents, mostly type and signature-summary', () => {
      cy.visit('http://localhost:8000/modules/folder1/class4/Class4/function')

      cy.contains("function")
      cy.contains("(")
      cy.contains("string")

      cy.contains(/^Class0$/).click({force: true})
      cy.url().should('include', '/class0/Class0')

      cy.visit('http://localhost:8000/modules/folder1/class4/Class4/function')
      cy.contains(/^Class1$/).click({force: true})
      cy.url().should('include', '/class1/Class1')

      cy.visit('http://localhost:8000/modules/folder1/class4/Class4/function')
      cy.get(".returns").get("code").contains("null")
      cy.get(".returns").get("a").contains(/^Class1$/).click({force: true})
      cy.url().should('include', '/class1/Class1')

      cy.visit('http://localhost:8000/modules/folder1/class4/Callback')
      cy.contains("void")

      cy.visit('http://localhost:8000/modules/folder1/class4/Callback2')
      cy.contains("string")
      cy.contains("array")
      cy.get('a').contains("Class0")
      cy.get('a').contains("Class1")
      cy.get('a').contains("MyNumber")

      cy.get('.kind-string').contains("Type alias")
    })
  })