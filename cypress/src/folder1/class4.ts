import { Class0 } from "../folder0/class0";
import { Class1 } from "../folder0/class1";

/**
 * Class used to test type & signature-summary
 */
export class Class4{
    /**
     *
     * @param string a string
     * @param object an object
     * @param class0 a Class0
     * @param undefined undefined type
     * @returns returns a {@link Class1} or <code>null</code>
     */
    function(string:string, object:object | Callback | MyNumber | PrimitiveArray, class0:Class0, undefined, primitiveArray: PrimitiveArray): Class1 | null {
        return null
    }
}

type PrimitiveArray = Array<string|number|boolean>;
type MyNumber = number;
type Callback = () => void;