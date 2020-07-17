/**
 * This is a file comment
 * @packageDocumentation
 */

/**
 * Class for testing comment tags
 * @since 1.1
 */
export default class Class7{

    /**
     * @param myVar     Comment for myVar
     * @typeParam T     Comment for type T
     * @returns    Comment for returnvalue
     * @event
     * @category Category name
     */
    tagTester<T>(myVar: T): Object{
        return null
    }

    /**
     * @hidden
     */
    imHidden: String

}

/**
 * Actual namespace comment.
 * @preferred
 */
namespace MyModule { }
/**
 * Dismissed namespace comment.
 * This is the longer comment but will be dismissed in favor of the preferred comment.
 */
namespace MyModule { }