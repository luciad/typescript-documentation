import { FirstClass } from "../firstclass";

/**
 * <p><i>Class</I> <b>0</b></p>
 *
 * @since sometime
 */
export class Class0{

    /**
     * The name of this class (private)
     */
    private _name:String;
    /**
     * This link doesn't exist: {@link Boolean}
     *
     */
    myBool:Boolean;
    /**
     *  {@link Class0.myClass0 This should link to itself}
     */
    myClass0:Class0;
    /**
     * This link should be bold:
     *  <b>{@link FirstClass}<b/>
     */
    myFirstClass:FirstClass;


    /**
     * Returns the name
     * and this text should be on the same line (this is shortText).
     *
     * This text should be on a different line though (this is text).
     *
     * ( < newLine)
     * This should link to itself: {@link Class0.getName}, and so should this: {@link getName} but this shouldn't: {@link FirstClass.getName}
     * @returns <b>name</b>
     */
    public getName():String{
      return this._name;
    }

    /**
     * Sets the name
     *
     * @param name The name
     *
     * @returns A return param for a void method
     */
    public setName(name: String){
        this._name = name;
    }
}