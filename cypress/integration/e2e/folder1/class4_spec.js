
describe('Class4 test', () => {
        it('Searches Class4 page for expected contents, mostly type and signature-summary', () => {
      cy.visit('http://localhost:8000/modules/folder1/class4/Class4/function')

      cy.get(".signaturesummarylist").contains("function")
      cy.get(".signaturesummarylist").contains("(")
      cy.get(".signaturesummarylist").contains("string")

      cy.get(".signaturesummarylist").contains("Class0").click()
      cy.url().should('include', '/class0/Class0')

      cy.visit('http://localhost:8000/modules/folder1/class4/Class4/function')
      cy.get(".signaturesummarylist").contains("Class1").click()
      cy.url().should('include', '/class1/Class1')

      cy.visit('http://localhost:8000/modules/folder1/class4/Class4/function')
      cy.get(".returns").get("code").contains("null")
      cy.get(".returns").get("a").contains("Class1").click()
      cy.url().should('include', '/class1/Class1')
    })
  })