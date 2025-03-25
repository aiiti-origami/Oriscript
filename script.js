function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る

    // 「表示("文字")」を JavaScript に変換
    code = code.replace(/表示\("([^"]+)"\);/g, 'console.log("$1"); document.getElementById("output").innerHTML += "$1<br>";');

    // 「表示(変数)」を JavaScript に変換
    code = code.replace(/表示\(([^)]+)\);/g, 'console.log($1); document.getElementById("output").innerHTML += $1 + "<br>";');

    // 「ボタン("名前") { ... }」を JavaScript に変換
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

    // 「数値 変数名 = 数字;」を JavaScript に変換
    code = code.replace(/数値 ([a-zA-Z_][a-zA-Z0-9_]*) = ([0-9]+);/g, 'let $1 = $2;');

    // 「変数名 = 数字;」を JavaScript に変換
    code = code.replace(/([a-zA-Z_][a-zA-Z0-9_]*) = ([0-9]+);/g, '$1 = $2;');

    return code;
}

function runCode() {
    let inputCode = document.getElementById("codeInput").value;
    let jsCode = myLanguage(inputCode);
    
    console.log("変換後のJavaScriptコード:\n", jsCode); // 変換後のJSコードを表示

    document.getElementById("output").innerHTML = ""; // 実行前にリセット
    try {
        eval(jsCode); // JavaScript に変換したコードを実行
    } catch (e) {
        document.getElementById("output").innerHTML = "エラー: " + e.message;
        console.error(e);
    }
}
