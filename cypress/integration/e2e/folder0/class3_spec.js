
describe('Class3 test', () => {
    it('Searches Class3 page for expected contents, mostly @imgs', () => {
      cy.visit('http://localhost:8000/modules/folder0/class3/Class3/test_image')

      cy.get('.mainlogo').find('img').should('have.attr', 'src').should('include','logo')
      cy.get('.textblock').find('img').should('have.attr', 'src').should('include','example_image.png')
      cy.get('.textblock').find('img').should('have.attr', 'alt').should('include','example image')

      cy.visit('http://localhost:8000/modules/folder0/class3/Class3/non_existing')

      cy.get('.textblock').find('img').should('have.attr', 'alt').should('match',/imgs\/example.jpg|alt text/)

      cy.visit('http://localhost:8000/modules/folder0/class3/Class3/custom_css')

      cy.get('.textblock').find('img').should('have.attr', 'src').should('include','example_image.png')
      cy.get('.textblock').find('img').should('have.css', 'width', '100px')
      cy.get('.textblock').find('img').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })