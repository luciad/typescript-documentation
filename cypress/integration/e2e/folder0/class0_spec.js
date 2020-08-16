
describe('Class0 test', () => {
    it('Searches class0 page for expected contents, mostly @link tests as well as some html parsing tests', () => {
      cy.visit('http://localhost:8000/modules/folder0/class0/Class0')

      cy.contains('Directories')
      cy.contains("Legend")
      cy.get('p').get('i').contains("Class")
      cy.get('p').get('b').contains("0")
      cy.contains("_name")
      cy.contains("getName() : String")


      cy.get('a').contains("This should link to itself").click()
      cy.url().should('include', '/class0/Class0/myClass0')

      cy.wait(500)

      cy.get('a').contains("folder0/class0/Class0").click()
      cy.url().should('include', '/class0/Class0')

      cy.get('a').contains("Class0.getName").click()
      cy.url().should('include', '/class0/Class0/getName')

      cy.get('a').contains("folder0/class0/Class0").click()
      cy.url().should('include', '/class0/Class0')

      cy.get('a').contains(/^getName$/).click()
      cy.url().should('include', '/class0/Class0/getName')

      cy.get('a').contains("folder0/class0/Class0").click()
      cy.url().should('include', '/class0/Class0')

      cy.get('a').contains("FirstClass.getName").click()
      cy.url().should('include', '/firstclass/FirstClass/getName')

      cy.visit('http://localhost:8000/modules/folder0/class0/Class0')

      cy.get('.type').get('a').contains(/^FirstClass/).click()
      cy.url().should('include', '/firstclass/FirstClass')
    })
  })