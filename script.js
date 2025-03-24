function myLanguage(code) {
    let buttonIndex = 0; // ボタンごとにユニークなIDを作る
    code = code.replace(/表示\("(.+)"\)/g, 'console.log("$1"); document.getElementById("output").innerHTML += "$1<br>";');

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
    eval(jsCode);
}
