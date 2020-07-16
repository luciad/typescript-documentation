/**
 * This class is used to text images
 */
export class Class3 {

    /**
     * This is an image:
     * {@img src:images/example_image.png; alt:example image}
     */
    test_image:String;

    /**
     * This image has custom css to make its width 100px and its background-color red
     * {@img src:images/example_image.png; alt:example image; style:'width': '100px', 'background-color':'rgb(255,0,0)'}
     */
    custom_css:String;

    /**
     * This image sourcepath doesn't exist and no alt is specified:
     * {@img src:imgs/example.jpg}
     *
     * This image sourcepath doesn't exist and alt is specified:
     * {@img src:imgs/example.jpg; alt:alt text}
     */
    non_existing:String;
}