let score = 0;  // スコア初期化

// myLanguage関数の変更
function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る

    // 表示を実行結果に変換
    code = code.replace(/表示\("(.+)"\)/g, 'console.log("$1"); document.getElementById("output").innerHTML += "$1<br>";');

    // ボタンを作成
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

    // 変数を作成
    code = code.replace(/変数\("(.+)", (\d+)\)/g, function(match, varName, value) {
        return `let ${varName} = ${value};`;
    });

    // 変数の値を増やす
    code = code.replace(/増やす\("(.+)", (\d+)\)/g, function(match, varName, value) {
        return `${varName} += ${value};`;
    });

    // 変数の値を表示
    code = code.replace(/表示変数\("(.+)"\)/g, function(match, varName) {
        return `document.getElementById("output").innerHTML += "${varName}: " + ${varName} + "<br>";`;
    });

    return code;
}

// 実行ボタンが押されたとき
function runCode() {
    let inputCode = document.getElementById("codeInput").value;
    let jsCode = myLanguage(inputCode);
    document.getElementById("output").innerHTML = ""; // 実行前にリセット
    eval(jsCode);
}
