const math = require('./math.min.js')

function isFormula(str){
    return /^(?:\(*-?\d+(\.\d+)?\)* ?[+\-*/%^] ?)+\(*-?\d+(\.\d+)?\)*$/.test(str)
}
window.exports = {
    "calculator": {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                if (!isFormula(action.payload)) {
                    return
                }
                let num = math.format(math.evaluate(action.payload),{precision: 16,upperExp: 16});
                callbackSetList([
                    {
                        title: num,
                        logo: "logo.png",
                        description: action.payload + " = " + num
                    },
                    {
                        next: true,
                        title: num,
                        logo: "logo.png",
                        description: "带入结果，继续计算"
                    },
                ])
            },
            select: (action, itemData, callbackSetList) => {
                if (itemData.next) {
                    utools.setSubInputValue(itemData.title)
                } else {
                    utools.copyText(itemData.title)
                    window.utools.hideMainWindow()
                    window.utools.outPlugin()
                }
            },
            placeholder: "输入算式",
            search: (action, searchWord, callbackSetList) => {
                if (!isNaN(searchWord)){
                    return;
                }
                let num = math.format(math.evaluate(searchWord),{precision: 16, upperExp: 16});
                if (isNaN(num)) {
                    return;
                }
                callbackSetList([
                    {
                        title: num,
                        logo: "logo.png",
                        description: searchWord + " = " + num
                    },
                    {
                        next: true,
                        title: num,
                        logo: "logo.png",
                        description: "带入结果，继续计算"
                    }
                ])
            },
        }
    }
}
