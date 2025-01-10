// Seleciona o visor da calculadora onde os valores e resultados serão exibidos
const visor = document.querySelector('.visorCalculadora');

// Variáveis para armazenar os valores da operação e o resultado
let primeiroValor = ""; 
let segundoValor = "";  
let operacao = "";      
let resultado = "";     

// Adiciona eventos para mudar a cor dos botões numéricos ao passar o mouse
document.querySelectorAll("button").forEach(button => {
    if (!isNaN(button.value)) { // Verifica se o botão é numérico
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'orange'; // Muda a cor de fundo ao passar o mouse
            button.style.color = 'white'; // Muda a cor do texto
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = ""; // Restaura a cor original ao sair com o mouse
            button.style.color = ""; // Restaura a cor do texto original
        });
    }
});

// Adiciona eventos de clique aos botões
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', () => {
        var value = button.value; // Obtém o valor do botão clicado
        
        if (!isNaN(value)) { // Se o valor for numérico
            if (operacao === '') {
                primeiroValor += value; // Adiciona ao primeiro número
                visor.innerText = primeiroValor; // Atualiza o visor
                button.style.backgroundColor = '#c78100'; // Destaca o botão clicado
            } else {
                segundoValor += value; // Adiciona ao segundo número
                visor.innerText = segundoValor; // Atualiza o visor
                button.style.backgroundColor = '#c78100'; // Destaca o botão clicado
            }
        } else if (["+", "-", "x", "/"].includes(value)) { // Se for uma operação
            operacao = value; // Armazena a operação
            visor.innerText = operacao; // Exibe a operação no visor

            // Remove a cor de fundo de outros botões de operação
            document.querySelectorAll("#subtracao, #adicao, #divisao, #multiplicacao").forEach(opButton => {
                opButton.style.backgroundColor = ""; // Restaura a cor padrão
            });

            // Destaca o botão de operação clicado
            button.style.backgroundColor = 'blue';

            // Restaura a cor após um intervalo
            setTimeout(() => {
                button.style.backgroundColor = '';
            }, 100);

        } else if (value === "=") { // Se for o botão "="
            button.style.backgroundColor = 'rgb(0, 90, 5)'; // Destaca o botão "="
            setTimeout(() => {
                button.style.backgroundColor = ''; // Restaura a cor original
            }, 100);
            
            // Realiza o cálculo e exibe o resultado
            resultado = calcular(primeiroValor, segundoValor, operacao);
            visor.innerText = resultado; 
            primeiroValor = resultado;  // Armazena o resultado como primeiro valor
            segundoValor = "";          // Reseta o segundo valor
            operacao = "";              // Reseta a operação
        } else if (value === "C") { // Se for o botão "C" (limpar)
            button.style.backgroundColor = 'red'; // Destaca o botão "C"
            setTimeout(() => {
                button.style.backgroundColor = ''; // Restaura a cor original
            }, 100);

            // Reseta todos os valores e o visor
            primeiroValor = "";
            segundoValor = "";
            operacao = "";
            resultado = "";
            visor.innerText = "0"; // Exibe 0 no visor
        }
    });
});

// Função que realiza o cálculo com base na operação selecionada
function calcular(valor1, valor2, operacao) {
    const num1 = parseFloat(valor1); // Converte o primeiro valor para número
    const num2 = parseFloat(valor2); // Converte o segundo valor para número
    switch (operacao) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "x": return num1 * num2;
        case "/": return num2 !== 0 ? num1 / num2 : "Erro;"; // Evita divisão por zero
        default: return "Erro!"; // Caso uma operação inválida seja detectada
    }
}
