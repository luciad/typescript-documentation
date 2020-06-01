
import { fixModuleName, pathToModule, pathToExport, getComments }  from "../../util/util"

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
    expect(retVals.returns).toEqual([])
    expect(retVals.tags).toEqual([])
})