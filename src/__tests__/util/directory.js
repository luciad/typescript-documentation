import { getAllDirectories, getMostSimilarPage } from"../../util/directory"

test('getAllDirectories simple test', () => {
    let data = {
        allModule: {
            nodes: [
                {name: "this/is/a_dir"},
                {name: "this/is/another_dir"},
            ]
        }
    }
    let expectedResult = {
        name: "root",
        path: "/",
        next: [{
            name: "this",
            path: "/modules/this",
            next: [{
                name: "is",
                path:"/modules/this/is",
                next: [{
                    name:"a_dir",
                    path:"/modules/this/is/a_dir",
                    next: []
                },{
                    name:"another_dir",
                    path:"/modules/this/is/another_dir",
                    next: []
                }]
            }]
        }]
    }
    let result = getAllDirectories(data)
    expect(result).toEqual(expectedResult)
})

test('getMostSimilarPage simple test', () => {
    let objects = [
        {path: "/this/is/a/path"},
        {path: "/this/is/another/path"}
    ]
    let result = getMostSimilarPage(objects, "/this/is/a/test/path", "path")
    expect(result).toEqual({path: "/this/is/a/path"})
})