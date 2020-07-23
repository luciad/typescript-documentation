import { Class0 } from "../folder0/class0";
import { Class1 } from "../folder0/class1";
import { Class2 } from "../folder0/class2";
import { Class3 } from "../folder0/class3";

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
    function(string:string, object:object | Callback | MyNumber | PrimitiveArray | Callback2, class0:Class0, undefined, primitiveArray: PrimitiveArray): Class1 | null {
        return null
    }

    combineReducers<S, A extends Class0 = Class0>(
        var0: Helper<S, A>
      ): Helper<OtherHelper<S>, A> | OtherHelper<{objects: Class0 & Class1 & Class2}> {
          return null
      }


}

class Helper<S,A> {

}

class OtherHelper<S>{

}

type PrimitiveArray = Array<string|number|Class0>;
type otherArray = [object, number, string];
type thirdArray = (string|number)[];
type MyNumber = number;
type Callback = () => void;
type Callback2 = (string: string, array:Array<Class0 | Class1 >) => MyNumber;