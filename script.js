document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Criar um objeto com os dados do formulário
    let contact = { name, email, phone, subject, message };

    // Recuperar mensagens antigas (se existirem)
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    // Adicionar a nova mensagem à lista
    messages.push(contact);

    // Salvar no LocalStorage
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Mensagem salva com sucesso!");

    // Limpar o formulário
    this.reset();

    // Atualizar a exibição das mensagens
    displayMessages();
  });

// Pegar o botão do modo escuro
let darkModeToggle = document.getElementById("dark-mode-toggle");

// Verificar se o usuário já ativou o modo escuro antes
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

// Adicionar evento de clique para ativar/desativar o modo escuro
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // Salvar no LocalStorage se o modo escuro está ativado ou não
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});
