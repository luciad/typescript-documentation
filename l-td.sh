#!/bin/bash -e

main()
{
    while getopts :i:o:t:n:m:d:c:s:l: option
    do
        case "${option}"
        in
            i) INPUT=${OPTARG};;
            o) OUTPUT=${OPTARG};;
            t) THEME=${OPTARG};;
            n) NPM=${OPTARG};;
            m) MEDIA=${OPTARG};;
            d) DEVELOP=${OPTARG};;
            c) COPYONLY=${OPTARG};;
            s) SNIPPETS=${OPTARG};;
            l) DEFAULTLAN=${OPTARG};;
            \?) echo "[l-td] Invalid option: -$OPTARG" >&2
                display_help
                exit 1;;
        esac
    done

    scriptDir=$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")
    cd "$scriptDir"

    check_var_input
    check_var_theme
    check_var_media
    check_var_snippets
    check_var_npm

    if [ -z "$DEFAULTLAN" ]
    then
        DEFAULTLAN=none
    fi

    echo "[l-td] running l-td..."
    npx gatsby clean
    if [ "$COPYONLY" == "true" ]
    then
        echo "[l-td] copied files"
    else
        if [  "$DEVELOP" == "true" ]
        then
            echo "[l-td] developing..."
            GATSBY_DEFAULT_LAN=$DEFAULTLAN npx gatsby develop
        else
            echo "[l-td] building..."
            GATSBY_DEFAULT_LAN=$DEFAULTLAN npx gatsby build
            echo "[l-td] Finished building l-td!"
        fi
    fi
    check_var_output
}

check_var_output(){
     if [ ! -z "$OUTPUT" ]
    then
        echo "[l-td] Moving output to $OUTPUT"
        mkdir -p $OUTPUT
        mv public $OUTPUT
    else
        echo "[l-td] Default output path: public (no output path specified)"
    fi
}

check_var_input()
{
    if [ ! -z "$INPUT" ] #if INPUT specified
    then
        echo "[l-td] source path: $INPUT"
        if [ ! -f "$INPUT" ]; #if INPUT isn't a file
        then
            echo "[l-td] Source path: $INPUT doesn't exist"
            exit 1
        fi
        if [  ${INPUT: -5} == ".json" ] || [ ${INPUT: -5} == ".JSON" ]; #if INPUT ends in .json
        then
            mkdir -p content
            yes | cp -rf $INPUT content/docu.json
        else
            echo "[l-td] expected json file"
            exit 1
        fi
    else
        echo "[l-td] No input path specified"
    fi
}

check_var_theme()
{
    mkdir -p src/styles
    if [ ! -z "$THEME" ] && [ -d "themes/$THEME" ]
    then
        echo "[l-td] Using theme $THEME"
         yes | cp -a themes/$THEME/. src/styles/
    else
        echo "[l-td] Using default theme"
         yes | cp -a themes/default/. src/styles/
    fi
}

check_var_media()
{
    mkdir -p content/media
    if [ ! -z "$MEDIA" ] && [ -d "$MEDIA" ]
    then
        echo "[l-td] Copying media from $MEDIA"
        cp -r $MEDIA/. content/media/
    else
        echo "[l-td] No media folder specified."
    fi
}

check_var_snippets()
{
    if [ ! -z "$SNIPPETS" ] && [ -d "$SNIPPETS" ]
    then
        echo "[l-td] Copying snippet folder from $SNIPPETS"
        mkdir -p content/snippets
        cp -r $SNIPPETS/. content/snippets/
    else
        echo "[l-td] No media folder specified."
    fi
}

check_var_npm()
{
    if [  "$NPM" == "true" ]
    then
        echo "[l-td] running npm install (disable using -n true)"
        npm install
    else
        echo "[l-td] skipping npm install"
    fi
}

display_help(){
    echo "[l-td] flags:"
    echo "[l-td] -i file/path.json -> specify input json path (optional if run succesfully before)"
    echo "[l-td] -o output/folder -> specify output folder path (optional, default=public/)"
    echo "[l-td] -m media/folder -> specify media input folder (optional)"
    echo "[l-td] -n true -> run npm install (default false)"
    echo "[l-td] -t themeName -> specify theme path (optional)"
    echo "[l-td] -d true -> run gatsby develop instead of gatsby build (default false)"
    echo "[l-td] -s snippet/folder -> specify snippet input folder (optional)"
    echo "[l-td] -l defaultLanguage -> specify default language for snippets with no specified language and no extension"
    echo "[l-td] Example:"
    echo "[l-td] ./l-td.sh -i myDocumentation.json -o myOutput -m media -n true -t default"
}

main "$@"; exit