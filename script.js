const textArea = document.querySelector('.text-area');
const outputContent = document.querySelector('.output-content');
const outputImage = document.querySelector('.output-image');
const outputMessage = document.querySelector('.output-content p');
const outputInstructions = document.querySelector('.output-content h6');

// Função para validar o texto
function validarTexto(texto) {
  const regex = /[^a-z\s]/; // Permite apenas letras minúsculas sem acentos e espaços
  if (regex.test(texto)) {
    alert("Texto inválido! Não use letras maiúsculas, acentos ou caracteres especiais.");
    return false;
  }
  return true;
}

// Função para criptografar o texto
function btnEncriptar() {
  const texto = textArea.value;
  if (validarTexto(texto)) {
    const textoEncriptado = encriptar(texto);
    mostrarResultado(textoEncriptado);
  }
}

// Função para descriptografar o texto
function btnDesencriptar() {
  const texto = textArea.value;
  if (validarTexto(texto)) {
    const textoDesencriptado = desencriptar(texto);
    mostrarResultado(textoDesencriptado);
  }
}

// Lógica de criptografia
function encriptar(texto) {
  let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
  texto = texto.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (texto.includes(matrizCodigo[i][0])) {
      texto = texto.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }
  }
  return texto;
}

// Lógica de descriptografia
function desencriptar(texto) {
  let matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
  texto = texto.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (texto.includes(matrizCodigo[i][0])) {
      texto = texto.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }
  }
  return texto;
}

// Função para mostrar o resultado no campo de saída
function mostrarResultado(texto) {
  outputImage.style.display = "none";  // Esconde a imagem
  outputMessage.textContent = texto;   // Mostra o texto criptografado/descriptografado
  outputInstructions.style.display = "none";  // Esconde as instruções

  // Verifica se o botão de copiar já existe, senão, cria um
  let botaoCopiar = document.querySelector('.btn-copiar');
  if (!botaoCopiar) {
    botaoCopiar = document.createElement('button');
    botaoCopiar.textContent = 'Copiar';
    botaoCopiar.classList.add('btn-copiar');
    botaoCopiar.onclick = copiarTexto;
    outputContent.appendChild(botaoCopiar);
  }
  botaoCopiar.style.display = 'inline-block';  // Mostra o botão de copiar
}

// Função para copiar o texto
function copiarTexto() {
  const textoCopiado = outputMessage.textContent;
  navigator.clipboard.writeText(textoCopiado)
    .then(() => {
      alert('Texto copiado com sucesso!');
    })
    .catch((err) => {
      console.error('Erro ao copiar texto: ', err);
    });
}
