
describe('Class1 test', () => {
    it('Searches Class1 page for expected contents, mostly code fragments (makes sure the syntax has been correctly converted to pre/code blocks)', () => {
      cy.visit('http://localhost:8000/modules/folder0/class1/Class1')


      cy.contains("Legend")
      cy.wait(100) // wait for the code blocks to be converted correctly
      cy.get("pre .language-css").get("code").contains(":root")
      cy.get("pre .language-javascript").get("code").contains("// a comment")
      cy.get("pre .language-json").get("code").contains("compilerOptions")
      cy.get("pre .language-none").get("code").contains("cowsay")
      cy.get("code").contains("Some inline code")
    })
  })