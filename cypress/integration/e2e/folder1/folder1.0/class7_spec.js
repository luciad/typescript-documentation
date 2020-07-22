
describe('Class7 test', () => {
  it('Searches Class7 page for expected contents, mostly tags', () => {
cy.visit('http://localhost:8000/modules/folder1/folder1.0/class7/Class7')
cy.get(".textblock").contains("Comment for myVar")
cy.get(".textblock").contains("Comment for type T")
cy.get(".textblock").contains("Comment for returnvalue")
cy.get(".tags").contains("since")
cy.get(".tags").contains("1.1")

cy.visit("http://localhost:8000/modules/folder1/folder1.0/class7/MyModule")
cy.get(".textblock").contains("Actual namespace comment")

cy.visit("http://localhost:8000/modules/folder1/folder1.0/class7")
cy.get(".textblock").contains("This is a file comment")


cy.visit('http://localhost:8000/modules/folder1/folder1.0/class8/Class8/snippetDoesntExist')
cy.get(".notfound")
})
})