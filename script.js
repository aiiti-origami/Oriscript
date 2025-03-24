function myLanguage(code) {
    code = code.replace(/表示\("(.+)"\)/g, 'console.log("$1"); output.innerHTML += "$1<br>";');
    code = code.replace(/ボタン\("(.+)"\) \{([^}]+)\}/g, 
        'output.innerHTML += `<button onclick="$2">$1</button>`;');
    return code;
}

function runCode() {
    let inputCode = document.getElementById("codeInput").value;
    let jsCode = myLanguage(inputCode);
    document.getElementById("output").innerHTML = ""; // 実行前にリセット
    eval(jsCode);
}
