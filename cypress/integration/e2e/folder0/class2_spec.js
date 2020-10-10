
describe('Class2 test', () => {
    it('Searches Class2 and AbstractClass2 page for expected contents, mostly flags', () => {
      cy.visit('http://localhost:8000/modules/folder0/class2/Class2/variable')



      cy.get(".flag_isExported").contains("isExported")
      cy.get(".flag_isOptional").contains("isOptional")
      cy.get(".flag_isPrivate").contains("isPrivate")
      cy.get(".flag_isStatic").contains("isStatic")

      cy.get(".type").contains("any")


      cy.visit('http://localhost:8000/modules/folder0/class2/AbstractClass2/abstractFunction')

      cy.get(".flag_isExported").contains("isExported")
      cy.get(".flag_isAbstract").contains("isAbstract")
    })
  })