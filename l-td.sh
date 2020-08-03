#!/bin/bash -e

main()
{
    while getopts :i:o:t:m:d:c:s:l: option
    do
        case "${option}"
        in
            i) INPUT=${OPTARG};;
            o) OUTPUT=${OPTARG};;
            t) THEME=${OPTARG};;
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
    runDir=$(pwd)
    scriptDir=$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")
    echo rundir $runDir
    echo scriptDir $scriptDir
    cd "$scriptDir"

    check_var_input
    check_var_theme
    check_var_media
    check_var_snippets

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
        echo "[l-td] Moving output to $runDir/$OUTPUT"
    else
        echo "[l-td] Default output path: $runDir/public (no output path specified)"
        OUTPUT=public
    fi
    mkdir -p $runDir/$OUTPUT
    mv public $runDir/$OUTPUT
}

check_var_input()
{
    mkdir -p $scriptDir/content
    if [ ! -z "$INPUT" ] #if INPUT specified
    then
        echo "[l-td] source path: $runDir/$INPUT"
        if [ ! -f "$runDir/$INPUT" ]; #if INPUT isn't a file
        then
            echo "[l-td] Source path: $runDir/$INPUT doesn't exist"
            exit 1
        fi
        if [  ${INPUT: -5} == ".json" ] || [ ${INPUT: -5} == ".JSON" ]; #if INPUT ends in .json
        then
            yes | cp -rf $runDir/$INPUT $scriptDir/content/docu.json
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
    mkdir -p $scriptDir/src/styles
    if [ ! -z "$THEME" ] && [ -d "$scriptDir/themes/$THEME" ]
    then
        echo "[l-td] Using theme $THEME"
         yes | cp -a $scriptDir/themes/$THEME/. $scriptDir/src/styles/
    else
        echo "[l-td] Using default theme"
         yes | cp -a $scriptDir/themes/default/. $scriptDir/src/styles/
    fi
}

check_var_media()
{
    mkdir -p $scriptDir/content/media
    if [ ! -z "$MEDIA" ] && [ -d "$runDir/$MEDIA" ]
    then
        echo "[l-td] Copying media from $MEDIA"
        cp -r $runDir/$MEDIA/. $scriptDir/content/media/
    else
        echo "[l-td] No media folder specified."
    fi
}

check_var_snippets()
{
    mkdir -p $scriptDir/content/snippets
    if [ ! -z "$SNIPPETS" ] && [ -d "$scriptDir/$SNIPPETS" ]
    then
        echo "[l-td] Copying snippet folder from $SNIPPETS"
        cp -r $runDir/$SNIPPETS/. $scriptDir/content/snippets/
    else
        echo "[l-td] No media folder specified."
    fi
}

display_help(){
    echo "[l-td] flags:"
    echo "[l-td] -i file/path.json -> specify input json path (optional if run succesfully before)"
    echo "[l-td] -o output/folder -> specify output folder path (optional, default=public/)"
    echo "[l-td] -m media/folder -> specify media input folder (optional)"
    echo "[l-td] -t themeName -> specify theme path (optional)"
    echo "[l-td] -d true -> run gatsby develop instead of gatsby build (default false)"
    echo "[l-td] -s snippet/folder -> specify snippet input folder (optional)"
    echo "[l-td] -l defaultLanguage -> specify default language for snippets with no specified language and no extension"
    echo "[l-td] Example:"
    echo "[l-td] ./l-td.sh -i myDocumentation.json -o myOutput -m media -n true -t default"
}

main "$@"; exit
