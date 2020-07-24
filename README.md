<h1 align="center">
  Luciad's typescript documentation generator
</h1>

Generates webpages based on json output from  [typedoc](https://typedoc.org/). This project is made using [gatsby](www.gatsby.org).


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
      -d true -> run gatsby develop instead of gatsby build (optional, default false)
    ```

    Example:

    ```shell
    $ ./l-td.sh -i myDocumentation.json -o myOutput -m media -n true -t default -d true
    ```

    You can also use ```npm run build``` by putting ```--``` before the flags.

    Example:

    ```shell
    $ npm run build -- -i myDocumentation.json -o myOutput -m media -n true -t default
    ```
    ### Quick flag explanation

    `-i`: input json file. This is the json output of typedoc.

    `-o`: output folder. The generated files will be exported here.

    `-m`: media input folder. Using `{@img src:image.jpg; alt:altName}` in your documentation will source these files from this folder.

    `-n`: if  set to true, the script will run `npm install`.

    `-t`: theme name. Uses theme with given name from themes/ folder.

    `-d`: if set to true, the script will run `gatsby develop` instead of `gatsby build `, which will run the site on `http://localhost:8000`.

    # Supported features
    ## In your documentation
    ### HTML tags
    HTML tags can be used in any part of your documentation.
    [sanitize-html](https://www.npmjs.com/package/sanitize-html) is used to sanitize the text. Default settings except all attributes are allowed. These are the allowed tags:

    ` 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'abbr', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe'`.

    Double new lines automatically get converted to `<br>`. If you want to explicitly specify spacing, you can use `&nbsp;` (not necessary in highlighted code).

    ### Highlighted code
    [prism-js](https://prismjs.com/) is used to highlight code.
    To get highlighted code, simply use following syntax:

    \```language

    this.isCode();

    \```

    Supported languages (more can be added in .babelrc):

    `'javascript', 'json', 'css'`

    You can also omit language to get non-highlighted code in a box.

    Do not put HTML tags inside code fragments. This could mess up formatting and won't work anyways.

    Note: for inline code, you can just use HTML tags: `<code>` and `</code>`

    ### l-td specific tags

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

    If you want to display text that differs from the name of the linked item, you can do it as follows:
    ```
    {@link itemName display name}
    ```
    The link generated by the above reference will show up as  `display name` but link to `itemName`.

    #### Linking to images
    You can specify a media folder using flag `-m mediaFolder`. To use these images in your documentation, use the following syntax:
    ```
    {@img src:path/to/img.jpg; alt:altName}
    ```
    If no `alt` is specified, src is used as HTML alt attribute.

    CSS styling can be provided as follows:

    ```
    {@img src:logo.png; style:'height': '4em', 'width': '10em'}
    ```

    The image it would take would be located at mediaFolder/path/to/img.jpg.

    #### Linking to external snippets
    You can link to external code snippets. These snippets are files located in the media folder set using the flag `-m mediaFolder`. One snippet shows a complete file. To use external snippets, use the following syntax:
    ```
    {@snippet path/to/snippet.ext language}
    ```

    The above snippet would be located at `mediaFolder/path/to/snippet.ext`.

    `language` is optional but must be one of the languages made available in .babelrc for highlighting to work. The supported languages are: `'javascript', 'json', 'css', 'none'`.

    If no language is specified, the extension of the file is assigned as language.

    Example for javascript file:

    ```
    {@snippet path/to/snippet.js javascript}
    ```

    Example for text file:


    ```
    {@snippet path/to/snippet.txt}
    ```


    #### Other

    Special characters such as "<" need to be escaped.

    ## Change l-td to your liking

    ### Logo
    The logo in the left sidebar can be changed by putting a file logo.* in your provided media folder (* being the extension).

    ### Themes
    To add an existing theme, simply paste its folder in themes/

    To make a new theme, feel free to copy paste themes/default to themes/yourThemeName and change the css.

    #### Hide flags
    Specific flags can be hidden or altered by a theme with css. Each flag with name `flagName` is part of a div with classname `flag_flagName`. An example for hiding the `isExported` flag:
    ```
    .flag_isExported {
      display: none;
    }
    ```
    ### Icons
    To change or add icons, open `icons.css` inside the theme folder and change the `content: url()` tag and/or add cases. If you want to change which items appear in the legend, add or remove them in src/components/right/right-sidebar.js

    ### HTML
    To change how the HTML gets generated, feel free to change the react elements in src/components.