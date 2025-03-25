function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る
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
