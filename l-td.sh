#!/bin/bash -e

main()
{
    while getopts :i:o:t:m:d:c:s:l:p:r: option
    do
        case "${option}"
        in
            i) LTD_INPUT=${OPTARG};;
            o) LTD_OUTPUT=${OPTARG};;
            t) LTD_THEME=${OPTARG};;
            m) LTD_MEDIA=${OPTARG};;
            d) LTD_DEVELOP=${OPTARG};;
            c) LTD_COPYONLY=${OPTARG};;
            s) LTD_SNIPPETS=${OPTARG};;
            l) LTD_DEFAULTLAN=${OPTARG};;
            p) LTD_PREFIX=${OPTARG};;
            r) LTD_REPLACE_PACKAGE_NAMES=${OPTARG};;
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

    if [ -z "$LTD_DEFAULTLAN" ]
    then
        LTD_DEFAULTLAN=none
    fi

    if [ -z "$LTD_PREFIX" ]
    then
        LTD_PREFIX=""
    fi

    if [ -z "$LTD_REPLACE_PACKAGE_NAMES" ]
    then
        LTD_REPLACE_PACKAGE_NAMES=""
    fi

    echo "[l-td] running l-td..."
    npx gatsby clean
    if [ "$LTD_COPYONLY" == "true" ]
    then
        echo "[l-td] copied files"
    else
        if [  "$LTD_DEVELOP" == "true" ]
        then
            echo "[l-td] developing..."
            GATSBY_DEFAULT_LAN=$LTD_DEFAULTLAN GATSBY_REPL_PACK_NAMES=$LTD_REPLACE_PACKAGE_NAMES npx gatsby develop
        else
            echo "[l-td] building..."
            GATSBY_DEFAULT_LAN=$LTD_DEFAULTLAN GATSBY_PREFIX=$LTD_PREFIX GATSBY_REPL_PACK_NAMES=$LTD_REPLACE_PACKAGE_NAMES npx gatsby build --prefix-paths
            echo "[l-td] Finished building l-td!"
        fi
    fi
    check_var_output
}

check_var_output(){
     if [ -z "$LTD_OUTPUT" ]
    then
        LTD_OUTPUT=public
    fi
    outputPath=$(absolute_path $LTD_OUTPUT $runDir)
    echo "[l-td] Moving output to $outputPath"
    mkdir -p $outputPath
    mv public $outputPath 2>/dev/null || true
}

check_var_input()
{
    mkdir -p $scriptDir/content
    if [ ! -z "$LTD_INPUT" ] #if LTD_INPUT specified
    then
        inputPath=$(absolute_path $LTD_INPUT $runDir)
        echo "[l-td] input path: $inputPath"
        if [ ! -f "$inputPath" ]; #if LTD_INPUT isn't a file
        then
            echo "[l-td] Source path: $inputPath doesn't exist"
            exit 1
        fi
        if [  ${LTD_INPUT: -5} == ".json" ] || [ ${LTD_INPUT: -5} == ".JSON" ]; #if LTD_INPUT ends in .json
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
    themePath=$scriptDir/themes/$LTD_THEME
    if [ ! -z "$LTD_THEME" ] && [ -d "$themePath" ] #check if exists in theme folder
    then
        echo "[l-td] Using theme $LTD_THEME in $themePath"
    else
        themePath=$(absolute_path $LTD_THEME $rundir)
        if [ ! -z "$LTD_THEME" ] && [ -d "$themePath" ] #check if exists somewhere else
        then
            echo "[l-td] Using theme in path $themePath"
        else
            echo "[l-td] Using default theme"
            LTD_THEME="default"
            themePath=$scriptDir/themes/$LTD_THEME
        fi
    fi
    yes | cp $themePath/favicon.ico $scriptDir/static/favicon.ico || true
    yes | cp -a $themePath/. $scriptDir/content/styles/
}

check_var_media()
{
    mkdir -p $scriptDir/content/media
    if [ ! -z "$LTD_MEDIA" ]
    then
        mediaPath=$(absolute_path $LTD_MEDIA $runDir)
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
    if [ ! -z "$LTD_SNIPPETS" ]
    then
        snippetsPath=$(absolute_path $LTD_SNIPPETS $urnDir)
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
    echo "[l-td]   -r replaceRule -> replace start of module names (strToReplace0,replacement0;strToReplace1,replacement1)"
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
