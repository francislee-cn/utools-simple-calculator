const calc = require('./calc.min.js')

function isFormula(str){
    return /^(?:\(*-?\d+(\.\d+)?\)* ?[+\-*/] ?)+\(*-?\d+(\.\d+)?\)*$/.test(str)
}

window.exports = {
    "calculator": {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                if (!isFormula(action.payload)) {
                    return
                }
                let num = calc(action.payload);
                callbackSetList([{
                    title: num,
                    logo: "logo.png",
                    description: action.payload + " = " + num
                }])
            },
            select: (action, itemData, callbackSetList) => {
                utools.copyText(itemData.title)
                window.utools.hideMainWindow()
                window.utools.outPlugin()
            },
            placeholder: "输入算式",
            search: (action, searchWord, callbackSetList) => {
                if (!isFormula(searchWord)) {
                    return
                }
                let num = calc(searchWord);
                callbackSetList([{
                    title: num,
                    logo: "logo.png",
                    description: searchWord + " = " + num
                }])
            },
        }
    }
}
