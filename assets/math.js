// ==========================
// 1. BASIC CALCULATOR LOGIC
// ==========================
function calcBasic(operator) {
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    let res = 0;

    if (isNaN(n1) || isNaN(n2)) {
        alert("Please enter valid numbers!");
        return;
    }

    switch (operator) {
        case '+': res = n1 + n2; break;
        case '-': res = n1 - n2; break;
        case '*': res = n1 * n2; break;
        case '/': 
            if(n2 === 0) { alert("Cannot divide by Zero!"); return; }
            res = n1 / n2; 
            break;
    }

    document.getElementById("basicResult").innerText = `Result: ${res}`;
}

// ==========================
// 2. PERCENTAGE CALCULATOR LOGIC
// ==========================
function calcPercentage() {
    let percent = parseFloat(document.getElementById("percVal").value);
    let total = parseFloat(document.getElementById("percTotal").value);

    if (isNaN(percent) || isNaN(total)) {
        alert("Please enter values!");
        return;
    }

    let result = (percent / 100) * total;
    document.getElementById("percResult").innerText = `${percent}% of ${total} is ${result}`;
}
