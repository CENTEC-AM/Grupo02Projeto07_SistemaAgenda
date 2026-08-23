const STORAGE_KEY = "contatos_agenda";

// Contatos do localStorage
function obterContatos() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

// Salvar contatos
function salvarContatos(contatos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contatos));
}

// Capturar o evento de cadastro
document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.querySelector("#formCadastro");

  if (formCadastro) {
    formCadastro.addEventListener("submit", (event) => {
      event.preventDefault();

      const contatos = obterContatos();

      const novoContato = {
        id: Date.now(),
        nome: document.querySelector("#nome").value.trim(),
        sobrenome: document.querySelector("#sobrenome").value.trim(),
        empresa: document.querySelector("#empresa").value.trim(),
        telefone: document.querySelector("#telefone").value.trim(),
        observacoes: document.querySelector("#observacoes").value.trim(),
      };

      contatos.push(novoContato);
      salvarContatos(contatos);

      alert("Contato salvo com sucesso!");
      window.location.href = "AgendaDeContatos.html";
    });
  }

  // Renderizar a tabela
  const tabelaContatos = document.querySelector("#tabelaContatosCorpo");
  if (tabelaContatos) {
    renderizarTabela();
  }
});

// Exibir a lista na tela principal
function renderizarTabela() {
  const corpoTabela = document.querySelector("#tabelaContatosCorpo");
  const contatos = obterContatos();

  if (!corpoTabela) return;

  corpoTabela.innerHTML = "";

  if (contatos.length === 0) {
    corpoTabela.innerHTML =
      "<tr><td colspan='5'>Nenhum contato cadastrado.</td></tr>";
    return;
  }

  contatos.forEach((contato) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${contato.nome} ${contato.sobrenome}</td>
      <td>${contato.empresa}</td>
      <td>${contato.telefone}</td>
      <td>${contato.observacoes}</td>
      <td>
        <button onclick="removerContato(${contato.id})">Excluir</button>
      </td>
    `;
    corpoTabela.appendChild(linha);
  });
}

// Função de exclusão
function removerContato(id) {
  if (confirm("Deseja realmente excluir este contato?")) {
    let contatos = obterContatos();
    contatos = contatos.filter((c) => c.id !== id);
    salvarContatos(contatos);
    renderizarTabela();
  }
}
