
import { fixModuleName, pathToModule, pathToExport, getComments, getParameters, getSignatures, getFlags }  from "../../util/util"

test('fixModuleName 404', () => {
    expect(fixModuleName(null)).toBe("404")
})

test('fixModuleName .d',  () => {
    let module = {
        name: '"someModule.d"',
    }
    expect(fixModuleName(module)).toBe("someModule")
})

test('pathToModule simple test', () => {
    let module = {
        name: '"someModule.d"',
    }
    expect(pathToModule(module)).toBe("/modules/someModule")
})

test('pathToExport simple test', () => {
    let module = {
        name: '"someModule.d"',
    }
    let exprt = {
        name: "someExport"
    }
    expect(pathToExport(module, exprt)).toBe("/modules/someModule/someExport")
})

test('getComments simple test', () => {
    let data = {
        comment: {
            text: "test text",
            shortText: "test shortText",
            returns: "test returns",
            tags: [
                {
                    text: "test tag text 1",
                    tag: "test tag tag 1",
                },
                {
                    text: "test tag text 2",
                    tag: "test tag tag 2",
                }],
        }
    }

    let retVals = getComments(data)
    expect(retVals.text).toBe(data.comment.text)
    expect(retVals.shortText).toBe(data.comment.shortText)
    expect(retVals.returns).toBe(data.comment.returns)
    expect(retVals.tags[0]).toEqual({text: "test tag text 1", tag: "test tag tag 1"})
    expect(retVals.tags[1]).toEqual({text: "test tag text 2", tag: "test tag tag 2"})
})

test('getComments empty test', () => {
    let data = {
        comment: {

        }
    }

    let retVals = getComments(data)
    expect(retVals.text).toBe("")
    expect(retVals.shortText).toBe("")
    expect(retVals.returns).toEqual("")
    expect(retVals.tags).toEqual([])
})

test('getParameters simple name type test', () => {
    let data = {
        parameters: [{
            name: "param1",
            type: {
                name: "type1"
        }},
        {
            name: "param2",
            type: {
                name: "type2"
        }}]
    }
    let params = getParameters(data)
    expect(params[0].name).toEqual("param1")
    expect(params[0].type).toEqual("type1")
    expect(params[1].name).toEqual("param2")
    expect(params[1].type).toEqual("type2")
})

test('getSignatures simple test', () => {
    let data = {
        setSignature: [
            "setSign1",
            "setSign2"
        ],
        getSignature: [
            "getSign"
        ],
        signatures: [
            "sign"
        ]
    }

    let signatures = getSignatures(data)
    expect(signatures.length).toEqual(4)
    let expected = ["setSign1", "setSign2", "getSign", "sign"]
    for(let signature of expected){
        expect(signatures.includes(signature)).toBeTruthy()
    }
})

test('getFlags simple test', () => {
    let data = {
        flags: {
            "isExported": true,
            "flag1": true
          },
    }
    let flags = getFlags(data)
    expect(flags.includes("isExported")).toBeTruthy()
    expect(flags.includes("flag1")).toBeTruthy()
    expect(flags.length).toEqual(2)
})