window.exports = {
    "calculator": {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                let num = eval(action.payload);
                callbackSetList([
                    {
                        title: num,
                        logo: "logo.png",
                        description: action.payload + " = " + num
                    }
                ])
            },
            select: (action, itemData, callbackSetList) => {
                utools.copyText(itemData.title)
                window.utools.hideMainWindow()
                window.utools.outPlugin()
            }
        }
    }
}
