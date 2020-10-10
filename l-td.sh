#!/bin/bash -e

main()
{
    while getopts :i:o:t:m:d:c:s:l:p: option
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
            p) PREFIX=${OPTARG};;
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

    if [ -z "$PREFIX" ]
    then
        PREFIX=""
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
            GATSBY_DEFAULT_LAN=$DEFAULTLAN GATSBY_PREFIX=$PREFIX npx gatsby build --prefix-paths
            echo "[l-td] Finished building l-td!"
        fi
    fi
    check_var_output
}

check_var_output(){
     if [ -z "$OUTPUT" ]
    then
        OUTPUT=public
    fi
    outputPath=$(absolute_path $OUTPUT $runDir)
    echo "[l-td] Moving output to $outputPath"
    mkdir -p $outputPath
    mv public $outputPath || true
}

check_var_input()
{
    mkdir -p $scriptDir/content
    if [ ! -z "$INPUT" ] #if INPUT specified
    then
        inputPath=$(absolute_path $INPUT $runDir)
        echo "[l-td] input path: $inputPath"
        if [ ! -f "$inputPath" ]; #if INPUT isn't a file
        then
            echo "[l-td] Source path: $inputPath doesn't exist"
            exit 1
        fi
        if [  ${INPUT: -5} == ".json" ] || [ ${INPUT: -5} == ".JSON" ]; #if INPUT ends in .json
        then
            yes | cp -rf $inputPath $scriptDir/content/docu.json
        else
            echo "[l-td] expected .json file"
            exit 1
        fi
    else
        echo "[l-td] No input path specified"
    fi
}

check_var_theme()
{
    mkdir -p $scriptDir/content/styles
    themePath=$scriptDir/themes/$THEME
    if [ ! -z "$THEME" ] && [ -d "$themePath" ] #check if exists in theme folder
    then
        echo "[l-td] Using theme $THEME in $themePath"
    else
        themePath=$(absolute_path $THEME $rundir)
        if [ ! -z "$THEME" ] && [ -d "$themePath" ] #check if exists somewhere else
        then
            echo "[l-td] Using theme in path $themePath"
        else
            echo "[l-td] Using default theme"
            THEME="default"
            themePath=$scriptDir/themes/$THEME
        fi
    fi
    yes | cp $themePath/favicon.ico $scriptDir/static/favicon.ico || true
    yes | cp -a $themePath/. $scriptDir/content/styles/
}

check_var_media()
{
    mkdir -p $scriptDir/content/media
    if [ ! -z "$MEDIA" ]
    then
        mediaPath=$(absolute_path $MEDIA $runDir)
        if [ -d "$mediaPath" ]
        then
            echo "[l-td] Copying media from $mediaPath"
            cp -r $mediaPath/. $scriptDir/content/media/
        else
            echo "[l-td] No media folder specified."
        fi
    fi
}

check_var_snippets()
{
    mkdir -p $scriptDir/content/snippets
    if [ ! -z "$SNIPPETS" ]
    then
        snippetsPath=$(absolute_path $SNIPPETS $urnDir)
        if [ -d "$snippetsPath" ]
        then
            echo "[l-td] Copying snippet folder from $snippetsPath"
            cp -r $snippetsPath/. $scriptDir/content/snippets/
        else
            echo "[l-td] No snippets folder specified."
        fi
    fi
}

display_help(){
    echo "[l-td] flags:"
    echo "[l-td]   -i file/path.json -> specify input json path (relative or absolute)"
    echo "[l-td]   -o folder/path -> specify output folder path (optional, default=public/, relative or absolute)"
    echo "[l-td]   -m media/folder -> specify media input folder (optional, relative or absolute)"
    echo "[l-td]   -t themeName -> specify theme name (optional)"
    echo "[l-td]   -d true -> run development server instead of build (optional, default false)"
    echo "[l-td]   -s snippet/folder -> specify snippet input folder (optional, relative or absolute)"
    echo "[l-td]   -l defaultLanguage -> specify default language for snippets with no specified language and no extension"
    echo "[l-td]   -p prefix -> if hosted in subdirectory, specify the path prefix here (no effect when '-d true' is used)"
}

#absolute_path $input $prefix
absolute_path(){
    if [[ "$1" = /* ]]
    then
        echo "$1"
    else
        echo "$2/$1"
    fi
}

main "$@"; exit
