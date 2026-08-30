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

  // ====== ATUALIZAR (EDITAR) ======
  const formAtualizar = document.querySelector("#formAtualizar");

  if (formAtualizar) {
    // Pega o id da URL (ex: Atualizar.html?id=123)
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    // Se existir um id, busca o contato e preenche o formulário
    if (id) {
      const contato = obterContatoPorId(id);
      if (contato) {
        document.querySelector("#nome").value = contato.nome;
        document.querySelector("#sobrenome").value = contato.sobrenome;
        document.querySelector("#empresa").value = contato.empresa;
        document.querySelector("#telefone").value = contato.telefone;
        document.querySelector("#observacoes").value = contato.observacoes;
      }
    }

    // Quando o formulário for enviado
    formAtualizar.addEventListener("submit", (event) => {
      event.preventDefault();

      const contatos = obterContatos();
      const index = contatos.findIndex((c) => c.id === id);

      if (index !== -1) {
        contatos[index] = {
          id: id,
          nome: document.querySelector("#nome").value.trim(),
          sobrenome: document.querySelector("#sobrenome").value.trim(),
          empresa: document.querySelector("#empresa").value.trim(),
          telefone: document.querySelector("#telefone").value.trim(),
          observacoes: document.querySelector("#observacoes").value.trim(),
        };
        salvarContatos(contatos);
        alert("Contato atualizado com sucesso!");
        window.location.href = "AgendaDeContatos.html";
      }
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
  <a href="Contato.html?id=${contato.id}"><button>Visualizar</button></a>
  <a href="Atualizar.html?id=${contato.id}"><button>Editar</button></a>
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

// Função que retorna um contato específico pelo ID
function obterContatoPorId(id) {
  const contatos = obterContatos();
  return contatos.find((contato) => contato.id === id);
}
