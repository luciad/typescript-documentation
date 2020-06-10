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

1.  **Put json file, as well as the image folders (if any) in the  content/ folder.**



1.  **Test the site**
  Navigate into your new site’s directory and start it up.

    ```shell
    $ cd tsd/
    $ gatsby develop
    ```

    Your site is now running at `http://localhost:8000`!

  1. **Build the site**
      ```shell
      $ gatsby build
      ```
