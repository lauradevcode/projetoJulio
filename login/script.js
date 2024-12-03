// Evento para gerenciar o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de autenticação básica
    if (username === "admin" && password === "1234") {
        alert("Login bem-sucedido!");

        // Salva o estado de autenticação na sessão (sessionStorage)
        sessionStorage.setItem('isLoggedIn', 'true');

        // Redireciona para a página de dados cadastrais
        window.location.href = '../dadosCadastrais/DadosCadastrais.html';
    } else {
        alert("Usuário ou senha incorretos.");
    }
});

// Redireciona automaticamente se o usuário já estiver logado na sessão
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = '../dadosCadastrais/DadosCadastrais.html';
}
