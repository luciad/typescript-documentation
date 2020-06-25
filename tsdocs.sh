
main()
{
    #!/bin/bash
    while getopts :i:o:t: option
    do
        case "${option}"
        in
            i) INPUT=${OPTARG};;
            o) OUTPUT=${OPTARG};;
            t) THEME=${OPTARG};;
            \?) echo "[tsdocs] Invalid option: -$OPTARG" >&2
                display_help
                exit 1;;
        esac
    done

    check_var_input

    echo "[tsdocs] running tsdocs..."
    gatsby clean
    echo "[tsdocs] building..."
    gatsby build
    echo "[tsdocs] Finished building tsdocs!"
    check_var_output
}

check_var_output(){
     if [ ! -z "$OUTPUT" ]
    then
        mvdir public $OUTPUT
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

display_help(){
    echo "[tsdocs] flags:"
    echo "[tsdocs] -i file/path.json -> specify input json path (optional if run succesfully before)"
    echo "[tsdocs] -o folder/path -> specify output folder path (optional, default=public/)"
    echo "[tsdocs] -t theme/path -> specify theme path (optional/doesn't work yet)"
}
main "$@"; exit
