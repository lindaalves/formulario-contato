document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validação básica dos campos obrigatórios
    if (!name || !email || !message) {
      alert(
        "Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem)!"
      );
      return;
    }

    // Criar um objeto com os dados do formulário
    const contact = { name, email, phone, subject, message };

    // Recuperar mensagens antigas do LocalStorage (se existirem)
    const storedMessages = localStorage.getItem("messages");
    const messages = storedMessages ? JSON.parse(storedMessages) : [];

    // Adicionar a nova mensagem à lista
    messages.push(contact);

    // Salvar a lista atualizada no LocalStorage
    try {
      localStorage.setItem("messages", JSON.stringify(messages));
      alert("Mensagem salva com sucesso!");
      this.reset(); // Limpar o formulário após o sucesso
      displayMessages(); // Atualizar a exibição das mensagens
    } catch (error) {
      console.error("Erro ao salvar no LocalStorage:", error);
      alert(
        "Ocorreu um erro ao salvar sua mensagem. Por favor, tente novamente."
      );
    }
  });

// Função para exibir as mensagens (assumindo que você tenha um elemento com o ID 'messages-container')
function displayMessages() {
  const messagesContainer = document.getElementById("messages-container");
  if (messagesContainer) {
    messagesContainer.innerHTML = ""; // Limpar a exibição anterior
    const storedMessages = localStorage.getItem("messages");
    const messages = storedMessages ? JSON.parse(storedMessages) : [];

    if (messages.length > 0) {
      const ul = document.createElement("ul");
      messages.forEach((msg, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>Nome:</strong> ${msg.name}<br>
          <strong>E-mail:</strong> ${msg.email}<br>
          ${msg.phone ? `<strong>Telefone:</strong> ${msg.phone}<br>` : ""}
          ${msg.subject ? `<strong>Assunto:</strong> ${msg.subject}<br>` : ""}
          <strong>Mensagem:</strong> ${msg.message}
          <hr>
        `;
        ul.appendChild(li);
      });
      messagesContainer.appendChild(ul);
    } else {
      messagesContainer.textContent = "Nenhuma mensagem salva ainda.";
    }
  }
}

// Chamar a função para exibir as mensagens ao carregar a página
document.addEventListener("DOMContentLoaded", displayMessages);
