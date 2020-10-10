[![Build Status](https://travis-ci.com/luciad/typescript-documentation.svg?branch=master)](https://travis-ci.com/luciad/typescript-documentation)
<h1 align="center">
  Luciad's typescript documentation generator
</h1>

Generates webpages based on json output from  [typedoc](https://typedoc.org/). This project is made using [gatsby](www.gatsby.org).


# Quick start

1.  **Generate json file.**

    Use typedoc to generate a json file from your code, as described [here](https://typedoc.org/api/).

    ```shell
    $ npm install typedoc
    $ typedoc --json path/to/output.json path/to/typescript/project/
    ```

1. **Build the site.**

    Install this npm package.

    Flags:
    ```shell
      -i file/path.json -> specify input json path (relative or absolute)
      -o folder/path -> specify output folder path (optional, default=public/, relative or absolute)
      -m media/folder -> specify media input folder (optional, relative or absolute)
      -t themeName -> specify theme name (optional)
      -d true -> run development server instead of build (optional, default false)
      -s snippet/folder -> specify snippet input folder (optional, relative or absolute)
      -l defaultLanguage -> specify default language for snippets with no specified language and no extension
      -p prefix -> if hosted in subdirectory, specify the path prefix here (no effect when '-d true' is used)
    ```

    Example:

    ```shell
    $ l-td -i myDocumentation.json -o myOutput -m media -s snippets -t default -p /my/subdirectory
    ```
    If not installed as npm package, use `./l-td.sh` instead of `l-td`.

    ### Quick flag explanation

    `-i`: input json file. This is the json output of typedoc.

    `-o`: output folder. The generated files will be exported here.

    `-m`: media input folder. Using `{@img src:image.jpg; alt:altName}` in your documentation will source these files from this folder.

    `-t`: theme name or folder.

    `-d`: if set to true, the script will run `gatsby develop` instead of `gatsby build `, which will run the site on `http://localhost:8000`.

    `-s`: snippet input folder. Using `{@snippet path/to/snippet.ext language}` will search both this folder and the media folder for the snippet.

    `-l`: default snippet language: Using `{@snippet path/to/snippet}` with no extension or language specified will use this for highlighting. Default `none`.

    `-p`: path prefix. eg. if you want to host the site on example.com/docs, use `-p /docs`. This has no effect if flag `-d true` is used.

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

    Note that the name is case sensitive.

    If more items exist with the same name you can specify (part of) its path:
    ```
    {@link \"path/to\" nameOfLinkedItem}
    ```
    or you can also do this for any parent/child:
    ```
    {@link className.functionName}
    ```

    If you want to display text that differs from the name of the linked item, you can do it as follows:
    ```
    {@link itemName display name}
    ```
    The link generated by the above reference will show up as  `display name` but link to `itemName`.

    Links to external sites also work (it needs to start with http/https):
    ```
    {@link https://www.example.org example}
    ```

    #### Linking to images
    You can specify a media folder using flag `-m mediaFolder`. To use these images in your documentation, use the following syntax:
    ```
    {@img src:path/to/img.jpg; alt:altName}
    ```
    If no `alt` is specified, src is used as HTML alt attribute.

    Note: a `;` is used to split the parameters.

    CSS styling can be provided as follows:

    ```
    {@img src:logo.png; style:'height': '4em', 'width': '10em'}
    ```

    The image it would take would be located at mediaFolder/path/to/img.jpg.

    #### Linking to external snippets
    You can link to external code snippets. These snippets are files located in the snippet folder (`-s snippetFolder`) or the media folder (`-m mediaFolder`). One snippet shows a complete file. To use external snippets, use the following syntax:
    ```
    {@snippet path/to/snippet.ext language}
    ```

    The above snippet would be located at `snippetFolder/path/to/snippet.ext` OR `mediaFolder/path/to/snippet.ext` depending on where the file exists.

    `language` is optional but must be one of the languages made available in .babelrc for highlighting to work. The supported languages are: `'javascript', 'json', 'css', 'none'`.

    If no language is specified, the extension of the file is assigned as language. If no language is specified and the file has no extension, `-l defaultLanguage` is assigned. If there is also no default language specified, `none` is assigned.

    Example for javascript file:

    ```
    {@snippet path/to/snippet.js javascript}
    ```

    Example for text file:


    ```
    {@snippet path/to/snippet.txt}
    ```


    #### Other

    Special characters such as "<" need to be escaped using `&lt;` (unless used for HTML).

    ## Change l-td to your liking

    ### Themes
    You can specify a theme with the `-t` tag. The program will first look if the specified theme exists in its own /themes/ folder. If not, it checks in the folder where the program is executed (absolute paths also work).

    eg.
    ```
    l-td -t /absolute/path/to/theme
    ```
    or
    ```
    l-td -t default
    ```
    The above uses the built in default theme

    or
    ```
    l-td -t myTheme
    ```
    The above uses the theme located in relative (from where l-td is running) folder myTheme.

    To make a new theme, feel free to copy themes/default and change the css.

    #### Hide flags
    Specific flags can be hidden or altered by a theme with css. Each flag with name `flagName` is part of a div with classname `flag_flagName`. An example for hiding the `isExported` flag:
    ```css
    .flag_isExported {
      display: none;
    }
    ```

    ### HTML
    To change how the HTML gets generated, feel free to change the react elements in src/components.