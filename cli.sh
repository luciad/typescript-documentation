#!/bin/bash -e

main()
{
    while getopts :i:o:t:n:m:d:c: option
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
            \?) echo "[l/td] Invalid option: -$OPTARG" >&2
                display_help
                exit 1;;
        esac
    done

    scriptDir=$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")
    cd "$scriptDir"

    check_var_input
    check_var_theme
    check_var_media
    check_var_npm

    echo "[l/td] running l/td..."
    npx gatsby clean
    if [ "$COPYONLY" == "true" ]
    then
        echo "[l/td] copied files"
    else
        if [  "$DEVELOP" == "true" ]
        then
            echo "[l/td] developing..."
            npx gatsby develop
        else
            echo "[l/td] building..."
            npx gatsby build
            echo "[l/td] Finished building l/td!"
        fi
    fi
    check_var_output
}

check_var_output(){
     if [ ! -z "$OUTPUT" ]
    then
        echo "[l/td] Moving output to $OUTPUT"
        mv public $OUTPUT
    else
        echo "[l/td] Default output path: public (no output path specified)"
    fi
}

check_var_input()
{
    if [ ! -z "$INPUT" ] #if INPUT specified
    then
        echo "[l/td] source path: $INPUT"
        if [ ! -f "$INPUT" ]; #if INPUT isn't a file
        then
            echo "[l/td] Source path: $INPUT doesn't exist"
            exit 1
        fi
        if [  ${INPUT: -5} == ".json" ] || [ ${INPUT: -5} == ".JSON" ]; #if INPUT ends in .json
        then
            yes | cp -rf $INPUT content/docu.json
        else
            echo "[l/td] expected json file"
            exit 1
        fi
    else
        echo "[l/td] No input path specified"
    fi
}

check_var_theme()
{
    if [ ! -z "$THEME" ] && [ -d "themes/$THEME" ]
    then
        echo "[l/td] Using theme $THEME"
         yes | cp -a themes/$THEME/. src/styles/
    else
        echo "[l/td] Using default theme"
         yes | cp -a themes/default/. src/styles/
    fi
}

check_var_media()
{
    if [ ! -z "$MEDIA" ] && [ -d "$MEDIA" ]
    then
        echo "[l/td] Copying media from $MEDIA"
        cp -r $MEDIA/. content/imgs/
    else
        echo "[l/td] No media folder specified."
    fi
}

check_var_npm()
{
       if [  "$NPM" == "true" ]
    then
        echo "[l/td] running npm install (disable using -n true)"
        npm install
    else
        echo "[l/td] skipping npm install"
    fi
}

display_help(){
    echo "[l/td] flags:"
    echo "[l/td] -i file/path.json -> specify input json path (optional if run succesfully before)"
    echo "[l/td] -o output/folder -> specify output folder path (optional, default=public/)"
    echo "[l/td] -m media/folder -> specify media input folder (optional)"
    echo "[l/td] -n true -> run npm install (default false)"
    echo "[l/td] -t themeName -> specify theme path (optional)"
    echo "[l/td] -d true -> run gatsby develop instead of gatsby build (default false)"
    echo "[l/td] Example:"
    echo "[l/td] ./l/td.sh -i myDocumentation.json -o myOutput -m imgs -n true -t default"
}

main "$@"; exit
