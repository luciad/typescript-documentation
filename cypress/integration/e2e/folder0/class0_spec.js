
describe('Class0 test', () => {
    it('Searches class0 page for expected contents, mostly @link tests as well as some html parsing tests', () => {
      cy.visit('http://localhost:8000/modules/folder0/class0/Class0')


      cy.get('p').get('i').contains("Class")
      cy.get('p').get('b').contains("0")
      cy.contains("_name")
      cy.contains("getName() : String")


      cy.get('a').contains("This should link to itself").click({force: true})
      cy.url().should('include', '/class0/Class0/myClass0')

      cy.wait(50)

      cy.get('a').contains(/^Class0$/).click({force: true})
      cy.url().should('include', '/class0/Class0')

      cy.wait(50)

      cy.get('a').contains(/^getName$/).click({force: true})
      cy.url().should('include', '/class0/Class0/getName')

      cy.wait(10)
/* TRAVIS FAILS HERE
      cy.get('a').contains(/^Class0$/).click({force: true})
      cy.url().should('include', '/class0/Class0')

      cy.wait(10)

      cy.get('a').contains("FirstClass.getName").click({force: true})
      cy.url().should('include', '/firstclass/FirstClass/getName')

      cy.visit('http://localhost:8000/modules/folder0/class0/Class0')

      cy.wait(10)

      cy.get('.type').get('a').contains(/^FirstClass/).click({force: true})
      cy.url().should('include', '/firstclass/FirstClass')
      */
    })
  })