<h1 align="center">
  Luciad's typescript documentation generator
</h1>

Generates HTML pages based on json output from  [typedoc](https://typedoc.org/). This project is made using [gatsby](www.gatsby.org).


## Quick start

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
