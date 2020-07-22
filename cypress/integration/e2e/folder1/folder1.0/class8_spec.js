
describe('Class8 test', () => {
  it('Searches Class8 page for expected contents, mostly external snippets', () => {
cy.visit('http://localhost:8000/modules/folder1/folder1.0/class8/Class8/workingSnippet')
cy.get(".language-javascript").contains("This is a test snippet")


cy.visit('http://localhost:8000/modules/folder1/folder1.0/class8/Class8/snippetDoesntExist')
cy.get(".notfound")
})
})