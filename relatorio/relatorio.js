// Importar prescrições de ambos os arquivos
import { quartisAdultosPrescricoes } from "../prescricoes/quartisAdulto.js";
import { quartisCriancaPrescricoes } from "../prescricoes/quartisCrianca.js";

// Mapeamento de nomes exibidos para os exames
const nomesExames = {
  hemoglobina: "Hemoglobina",
  hemacias: "Hemácias",
  hematocrito: "Hematócrito",
  vcm: "VCM",
  hcm: "HCM",
  chcm: "CHCM",
  leucocitos: "Leucócitos",
  plaquetas: "Plaquetas",
  rdw: "RDW",
  eosinofilos: "Eosinófilos",
  monocitos: "Monócitos",
};

// Determinar qual prescrição usar com base na faixa etária
function getPrescricoesPorFaixaEtaria(faixaEtaria) {
  if (faixaEtaria === "crianca") {
    return quartisCriancaPrescricoes;
  } else if (faixaEtaria === "adulto" || faixaEtaria === "idoso") {
    return quartisAdultosPrescricoes;
  }
  return {};
}

// Função para preencher a tabela com os resultados
function preencherTabela(resultados) {
  const tabelaCorpo = document.getElementById("tabela-corpo");
  tabelaCorpo.innerHTML = ""; // Limpa a tabela antes de adicionar os dados

  Object.entries(resultados).forEach(([exame, dados]) => {
    const linha = document.createElement("tr");

    // Nome do exame traduzido
    const colunaExame = document.createElement("td");
    colunaExame.textContent = nomesExames[exame] || exame;
    linha.appendChild(colunaExame);

    // Quartis
    ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5"].forEach((quartil) => {
      const colunaQuartil = document.createElement("td");
      if (dados.quartil === quartil) {
        colunaQuartil.textContent = "X"; // Marca o quartil associado
        colunaQuartil.classList.add("marked");
      }
      linha.appendChild(colunaQuartil);
    });

    tabelaCorpo.appendChild(linha);
  });
}

function exibirPrescricoesPorQuartil(resultados, prescricoes) {
  const prescricoesDiv = document.getElementById("prescricoes");
  prescricoesDiv.innerHTML = ""; // Limpar conteúdo anterior

  // Set para rastrear quais quartis já foram exibidos
  const quartisExibidos = new Set();

  // Ordem definida para os quartis
  const ordemQuartis = ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5"];

  // Iterar sobre os quartis em ordem fixa
  ordemQuartis.forEach((quartil) => {
    // Verificar se existe algum exame associado ao quartil
    const examesNesteQuartil = Object.entries(resultados).filter(
      ([, dados]) => dados.quartil === quartil
    );

    // Se o quartil foi encontrado e ainda não foi exibido, adicionar prescrição
    if (examesNesteQuartil.length > 0 && !quartisExibidos.has(quartil)) {
      quartisExibidos.add(quartil);

      // Criar um item de prescrição para o quartil
      const item = document.createElement("div");
      item.className = "prescricao-item";
      item.innerHTML = `
        <strong>Prescrição para Quartil ${quartil}:</strong><br>
        ${prescricoes[quartil] || "Nenhuma prescrição disponível para este quartil."}
      `;
      prescricoesDiv.appendChild(item);
    }
  });
}

// Função para exibir o status geral
function exibirStatusGeral(resultados) {
  const statusDiv = document.getElementById("status-geral");
  const statusGeral = Object.entries(resultados)
    .map(
      ([exame, dados]) =>
        `${nomesExames[exame] || exame}: ${dados.status}`
    )
    .join("<br>");
  statusDiv.innerHTML = statusGeral;
}

// Recuperar os resultados e exibir na página
document.addEventListener("DOMContentLoaded", () => {
  // Recuperar os resultados do localStorage
  const resultados = JSON.parse(localStorage.getItem("resultadosExames"));
  const nome = localStorage.getItem("nome");
  const sobrenome = localStorage.getItem("sobrenome");
  const dataExame = localStorage.getItem("dataExame");
  const faixaEtaria = localStorage.getItem("faixaEtaria");

  if (!resultados || !nome || !sobrenome || !dataExame || !faixaEtaria) {
    alert("Erro: Informações incompletas!");
    window.location.href = "../exames/exames.html";
    return;
  }

  // Obter a prescrição correta com base na faixa etária
  const prescricoes = getPrescricoesPorFaixaEtaria(faixaEtaria);

  // Obter a data atual formatada
  const hoje = new Date();
  const dataAtual = hoje.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Formatar a data do exame
  const dataExameFormatada = new Date(dataExame).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Exibir nome, sobrenome, data do exame e data atual
  const header = document.querySelector("header");
  const infoDiv = document.createElement("div");
  infoDiv.className = "info-geral";
  infoDiv.innerHTML = `
    <p><strong>Nome:</strong> ${nome} ${sobrenome}</p>
    <p><strong>Data do Exame:</strong> ${dataExameFormatada}</p>
    <p><strong>Data do Relatório:</strong> ${dataAtual}</p>
  `;
  header.appendChild(infoDiv);

  // Exibir tabela e prescrições
  preencherTabela(resultados); // Preenche a tabela com os resultados
  exibirStatusGeral(resultados); // Exibe o status geral dos exames
  exibirPrescricoesPorQuartil(resultados, prescricoes); // Exibe prescrições sem duplicidades
});
