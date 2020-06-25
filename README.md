<h1 align="center">
  Luciad's typescript documentation generator
</h1>

Generates HTML pages based on json output from  [typedoc](https://typedoc.org/). This project is made using [gatsby](www.gatsby.org).


# Quick start

1.  **Generate json file.**

    Use typedoc to generate a json file from your code, as described [here](https://typedoc.org/api/).

    ```shell
    $ npm install typedoc --save-dev
    $ typedoc --json path/to/output.json path/to/typescript/project/
    ```

1. **Build the site.**

    Make sure npm is available.

    Flags:
    ```shell
      -i file/path.json -> specify input json path (optional if run succesfully before)
      -o folder/path -> specify output folder path (optional, default=public/)
      -m media/folder -> specify media input folder (optional)
      -n true -> run npm install (optional, default false)
      -t themeName -> specify theme path (optional)
    ```

    Example:

    ```shell
    $ ./tsdocs.sh -i myDocumentation.json -o myOutput -m imgs -n true -t default
    ```

    You can also use ```npm run build``` by putting ```--``` before the flags.

    Example:

    ```shell
    $ npm run build -- -i myDocumentation.json -o myOutput -m imgs -n true -t default
    ```
    ### Quick flag explanation

    `-i`: input json file. This is the json output of typedoc.

    `-o`: output folder. The generated files will be exported here.

    `-m`: media input folder. Using `{@img image.jpg}` in your documentation will source these files from this folder.

    `-n`: if  set to true, the script will run `npm install`.

    `-t`: theme name. Uses theme with given name from themes/ folder.

    # Supported features
    ## In your documentation
    ### HTML tags
    HTML tags can be used in any part of your documentation.
    [sanitize-html](https://www.npmjs.com/package/sanitize-html) is used to sanitize the text. Default settings except all attributes are allowed. These are the allowed tags:

    ` 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'abbr', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe'`.

    New lines automatically get converted to `<br>` and spaces get converted to `&nbsp;`.

    ### Highlighted code
    [prism-js](https://prismjs.com/) is used to highlight code.
    To get highlighted code, simply use following syntax:

    \```language

    this.isCode();

    \```

    Supported languages (more can be added in .babelrc):

    `'javascript', 'json', 'css'`

    You can also omit language to get non-highlighted code in a box.

    Note: for inline code, you can just use HTML tags: `<code>` and `</code>`

    ### tsdocs specific tags

    #### Linking to other pages

    To link to another page (eg. a function or class) in documentation, use the following syntax:
    ```
    {@link nameOfLinkedItem}
    ```

    If more items exist with the same name you can specify (part of) its path:
    ```
    {@link \"path/to\" nameOfLinkedItem}
    ```
    or you can also do this:
    ```
    {@link className.functionName}
    ```
    #### Linking to images
    You can specify a media folder using flag `-m mediaFolder`. To use these images in your documentation, use the following syntax:
    ```
    {@img path/to/img.jpg}
    ```
    The image it would take would be located at mediaFolder/path/to/img.jpg.