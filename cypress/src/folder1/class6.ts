import { FirstClass } from "../firstclass";

/**
 * Class used to test signatures
 */
export class Class6 {

    /**
     * This is a constructor
     * @param var0
     */
    constructor(var0: FirstClass){}
    private _property;

    get property() {
        return this._property;
    };

    set property(prop) {
        this.property = prop;
    };

}