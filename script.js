function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る
    let variables = {}; // 日本語の変数名を英語に変換するための辞書
    let varIndex = 0; // 変数ごとにユニークなIDを作る

    // 「表示("文字")」を JavaScript に変換
    code = code.replace(/表示\("([^"]+)"\);/g, 'console.log("$1"); document.getElementById("output").innerHTML += "$1<br>";');

    // 「表示(変数)」を JavaScript に変換
    code = code.replace(/表示\(([^)]+)\);/g, function(match, varName) {
        if (variables[varName]) {
            return `console.log(${variables[varName]}); document.getElementById("output").innerHTML += ${variables[varName]} + "<br>";`;
        }
        return match; // 変換できない場合はそのまま
    });

    // 「数値 変数名 = 数字;」を JavaScript に変換（日本語変数を英語変数に）
    code = code.replace(/数値 ([^=]+) = ([0-9]+);/g, function(match, varName, value) {
        let newVarName = "var_" + varIndex++;
        variables[varName] = newVarName;
        return `let ${newVarName} = ${value};`;
    });

    // 「変数名 = 数字;」を JavaScript に変換
    code = code.replace(/([^=]+) = ([0-9]+);/g, function(match, varName, value) {
        if (variables[varName]) {
            return `${variables[varName]} = ${value};`;
        }
        return match; // 変換できない場合はそのまま
    });

    return code;
}

function runCode() {
    let inputCode = document.getElementById("codeInput").value;
    let jsCode = myLanguage(inputCode);
    
    console.log("変換後のJavaScriptコード:\n", jsCode); // 変換後のJSコードを確認

    document.getElementById("output").innerHTML = ""; // 実行前にリセット
    try {
        eval(jsCode); // JavaScript に変換したコードを実行
    } catch (e) {
        document.getElementById("output").innerHTML = "エラー: " + e.message;
        console.error(e);
    }
}
