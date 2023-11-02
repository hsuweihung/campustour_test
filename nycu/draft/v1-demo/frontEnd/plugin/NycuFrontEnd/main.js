
if (!window.wouldLoadFrontEnd) {
    window.wouldLoadFrontEnd = true
    window.noGuardian = true // 關閉自毀程式，交付時記得刪除

    // config 路徑要相對於 html
    const pluginList = [
        // {name:"TeamPano",serverHost:null,configSrc:"./frontEnd/plugin/TeamPano/static/config.js"},
        // {name:"NpmFrontEnd",serverHost:"http://192.168.168.70:3000",configSrc:null},
        { name: "NycuFrontEnd", serverHost: "http://192.168.168.33:3000", configSrc: null },
    ]

    const addScript = (src, callback = () => { }) => {
        const newScript = document.createElement("script")
        newScript.src = src
        newScript.onload = () => {
            if (callback && typeof callback === "function") {
                callback();
            }
        };
        document.body.appendChild(newScript);
    }

    addScript("./frontEnd/purr.js", () => {
        // window.guardian.key("") // 可以修改自毀密碼
        // window.guardian.start() // 修改後重啟自毀程式

        // 可以在者裡使用 purr.js 中所有的功能
        const { addScript } = frontEnd.utils
        // addScript("./frontEnd_/main.js")


        // 下面兩行是固定的不用動
        window.hasKrpano = true
        frontEnd.utils.addPlugin(pluginList)
    })
}

