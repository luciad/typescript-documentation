<h1 align="center">
  Luciad's typescript documentation generator
</h1>

Generates HTML pages based on json output from  [typedoc](https://typedoc.org/). This project is made using [gatsby](www.gatsby.org).


## Quick start

1.  **Generate json file.**

    Use typedoc to generate a json file, as described [here](https://typedoc.org/api/).

    ```shell
    $ npm install typedoc --save-dev
    $ typedoc --json path/to/output.json path/to/typescript/project/
    ```

  1. **Build the site.**

  Make sure npm is available.

  ```shell
    flags:
    -i file/path.json -> specify input json path (optional if run succesfully before)
    -o folder/path -> specify output folder path (optional, default=public/)
    -n true -> skip npm install (default false)
    -t themeName -> specify theme path (optional)
  ```

  Example:

  ```shell
  $ ./tsdocs.sh -i myDocumentation.json -o myOutput -n true -t default
  ```

  You can also use ```npm run build``` by putting ```--``` before the flags.

  Example:

  ```shell
  $ npm run build -- -i myDocumentation.json -o myOutput -n true -t default
  ```