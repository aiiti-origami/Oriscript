function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る

    // 「表示」を JavaScript に変換
    code = code.replace(/表示\("(.+)"\)/g, 'console.log("$1"); document.getElementById("output").innerHTML += "$1<br>";');

    // 「ボタン」を JavaScript に変換
    code = code.replace(/ボタン\("(.+)"\) \{([^}]+)\}/g, function(match, btnText, btnAction) {
        let btnId = "btn" + buttonIndex++;
        let jsAction = myLanguage(btnAction); // ボタン内のコードも変換
        return `
            document.getElementById("output").innerHTML += '<button id="${btnId}">${btnText}</button>';
            setTimeout(() => {
                document.getElementById("${btnId}").onclick = function() { ${jsAction} };
            }, 10);
        `;
    });

    // 「変数（数値）」を JavaScript に変換
    code = code.replace(/数値 ([a-zA-Z_][a-zA-Z0-9_]*) = ([0-9]+);/g, 'let $1 = $2;');

    // 「変数の代入」を JavaScript に変換
    code = code.replace(/([a-zA-Z_][a-zA-Z0-9_]*) = ([0-9]+);/g, '$1 = $2;');

    return code;
}
