/**
 * <p>A first class</p>
 *
 * @since 1.0
 */
export class FirstClass{

    private _name:String;

    /**
     * Returns the name
     *
     * @returns name
     */
    public getName():String{
      return this._name;
    }

    /**
     * Sets the name
     *
     * @param name The name
     * @param invalid A param not part of the method signature
     *
     * @returns A return param for a void method
     */
    public setName(name: String){
        this._name = name;
    }
}