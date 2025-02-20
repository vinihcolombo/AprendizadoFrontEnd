document.addEventListener("DOMContentLoaded", function () {
    const screen = document.querySelector('.screen');

    let totalAtual = 0;
    let buffer = "0";
    let ultimoOp = null;

    function buttonClick(value) {
        if (isNaN(value)) {
            simbolo(value);
        } else {
            handleNumber(value);
        }
        screen.innerText = buffer;
    }

    function simbolo(symbol) {
        switch (symbol) {
            case 'C':
                buffer = '0';
                totalAtual = 0;
                ultimoOp = null;
                break;
            case '=':
                if (ultimoOp === null) {
                    return;
                }
                flushOperador(parseInt(buffer));
                ultimoOp = null;
                buffer = totalAtual.toString();
                totalAtual = 0;
                break;
            case '←':
                if (buffer.length === 1) {
                    buffer = '0';
                } else {
                    buffer = buffer.slice(0, -1);
                }
                break;
            case '+':
            case '-':
            case '×':
            case '÷':
                calculo(symbol);
                break;
        }
    }

    function calculo(symbol) {
        if (buffer === '0') {
            return;
        }

        const intBuffer = parseInt(buffer);

        if (totalAtual === 0) {
            totalAtual = intBuffer;
        } else {
            flushOperador(intBuffer);
        }
        ultimoOp = symbol;
        buffer = '0';
    }

    function flushOperador(intBuffer) {
        if (ultimoOp === '+') {
            totalAtual += intBuffer;
        } else if (ultimoOp === '-') {
            totalAtual -= intBuffer;
        } else if (ultimoOp === '×') {
            totalAtual *= intBuffer;
        } else if (ultimoOp === '÷') {
            totalAtual /= intBuffer;
        }
    }

    function handleNumber(numberString) {
        if (buffer === "0") {
            buffer = numberString;
        } else {
            buffer += numberString;
        }
    }

    document.querySelectorAll('.botao-calc').forEach(button => {
        button.addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        });
    });
});
