#!/bin/bash -e

main()
{
    while getopts :i:o:t:n:m:d: option
    do
        case "${option}"
        in
            i) INPUT=${OPTARG};;
            o) OUTPUT=${OPTARG};;
            t) THEME=${OPTARG};;
            n) NPM=${OPTARG};;
            m) MEDIA=${OPTARG};;
            d) DEVELOP=${OPTARG};;
            \?) echo "[tsdocs] Invalid option: -$OPTARG" >&2
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

    echo "[tsdocs] running tsdocs..."
    npx gatsby clean
    if [  "$DEVELOP" == "true" ]
    then
        echo "[tsdocs] developing..."
        npx gatsby develop
    else
        echo "[tsdocs] building..."
        npx gatsby build
        echo "[tsdocs] Finished building tsdocs!"
    fi

    check_var_output
}

check_var_output(){
     if [ ! -z "$OUTPUT" ]
    then
        echo "[tsdocs] Moving output to $OUTPUT"
        mv public $OUTPUT
    else
        echo "[tsdocs] Default output path: public (no output path specified)"
    fi
}

check_var_input()
{
    if [ ! -z "$INPUT" ] #if INPUT specified
    then
        echo "[tsdocs] source path: $INPUT"
        if [ ! -f "$INPUT" ]; #if INPUT isn't a file
        then
            echo "[tsdocs] Source path: $INPUT doesn't exist"
            exit 1
        fi
        if [  ${INPUT: -5} == ".json" ] || [ ${INPUT: -5} == ".JSON" ]; #if INPUT ends in .json
        then
            yes | cp -rf $INPUT content/docu.json
        else
            echo "[tsdocs] expected json file"
            exit 1
        fi
    else
        echo "[tsdocs] No input path specified"
    fi
}

check_var_theme()
{
    if [ ! -z "$THEME" ] && [ -d "themes/$THEME" ]
    then
        echo "[tsdocs] Using theme $THEME"
         yes | cp -a themes/$THEME/. src/styles/
    else
        echo "[tsdocs] Using default theme"
         yes | cp -a themes/default/. src/styles/
    fi
}

check_var_media()
{
    if [ ! -z "$MEDIA" ] && [ -d "$MEDIA" ]
    then
        echo "[tsdocs] Copying media from $MEDIA"
        cp -r $MEDIA/. content/imgs/
    else
        echo "[tsdocs] No media folder specified."
    fi
}

check_var_npm()
{
       if [  "$NPM" == "true" ]
    then
        echo "[tsdocs] running npm install (disable using -n true)"
        npm install
    else
        echo "[tsdocs] skipping npm install"
    fi
}

display_help(){
    echo "[tsdocs] flags:"
    echo "[tsdocs] -i file/path.json -> specify input json path (optional if run succesfully before)"
    echo "[tsdocs] -o output/folder -> specify output folder path (optional, default=public/)"
    echo "[tsdocs] -m media/folder -> specify media input folder (optional)"
    echo "[tsdocs] -n true -> run npm install (default false)"
    echo "[tsdocs] -t themeName -> specify theme path (optional)"
    echo "[tsdocs] -d true -> run gatsby develop instead of gatsby build (default false)"
    echo "[tsdocs] Example:"
    echo "[tsdocs] ./tsdocs.sh -i myDocumentation.json -o myOutput -m imgs -n true -t default"
}

main "$@"; exit
