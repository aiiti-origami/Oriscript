function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る
    let variables = {}; // 変数の格納場所

    // 「表示("文字")」を JavaScript に変換
    code = code.replace(/表示\("([^"]+)"\);/g, 'console.log("$1"); document.getElementById("output").innerHTML += "$1<br>";');

    // 「表示(変数)」を JavaScript に変換
    code = code.replace(/表示\(([^)]+)\);/g, function(match, varName) {
        if (variables[varName] !== undefined) {
            return `console.log(${variables[varName]}); document.getElementById("output").innerHTML += ${variables[varName]} + "<br>";`;
        }
        return match; // 変換できない場合はそのまま
    });

    // 「数値 変数名 = 数字;」を JavaScript に変換（変数を保存する）
    code = code.replace(/数値 ([^=]+) = ([0-9]+);/g, function(match, varName, value) {
        variables[varName] = value; // 変数を保存
        return `let ${varName} = ${value};`;
    });

    // 「変数名 = 数字;」を JavaScript に変換（変数に新しい値を代入）
    code = code.replace(/([^=]+) = ([0-9]+);/g, function(match, varName, value) {
        if (variables[varName] !== undefined) {
            variables[varName] = value; // 変数に新しい値を代入
            return `${varName} = ${value};`;
        }
        return match; // 変換できない場合はそのまま
    });

    return code;
}

function runCode() {
    let inputCode = document.getElementById("codeInput").value;
    let jsCode = myLanguage(inputCode);
    
    document.getElementById("output").innerHTML = ""; // 実行前にリセット
    try {
        eval(jsCode); // JavaScript に変換したコードを実行
    } catch (e) {
        document.getElementById("output").innerHTML = "エラー: " + e.message;
        console.error(e);
    }
}
