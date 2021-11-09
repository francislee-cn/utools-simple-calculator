
Number.prototype.toFixed = function toFixed(s) {
    let times = Math.pow(10, s)
    let des = this * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
}

window.exports = {
    "calculator": {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                let num = eval(action.payload).toFixed(4);
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
            }
        }
    }
}
