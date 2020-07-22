
/**
 * This class is used to test external snippets
 */
export default class Class8 {

  /**
   * This snippet should work & be highlighted in javascript
   *
   * {@snippet snippets/testsnippet.js javascript}
   */
  workingSnippet:void;

  /**
   * shortText...
   *
   * This snippet doesn't exist and has no language specified:
   *
   * {@snippet this/doesnt/exist}
   *
   * This one doens't exist but does have a language:
   *
   * {@snippet this/also/doesnt/exist javascript}
   */
  snippetDoesntExist:void;

  /**
   * shortText...
   *
   * This snippet has "js" as language (instead of javascript)
   *
   * {@snippet snippets/testsnippet.js js}
   *
   * This snippet has a space in its language (language should display as java)
   *
   * {@snippet snippets/testsnippet.js java script}
   */
  faultyLanguages:void;
}