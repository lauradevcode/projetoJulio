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

window.generatePDF = function () {
  const element = document.querySelector(".container");
  
  const opt = {
    margin: [0, -12, 0, 0], // mantendo a margem que estava funcionando
    filename: "relatorio-treebios.pdf",
    image: {
      type: "jpeg",
      quality: 0.98,
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    },
  };

  // Loader simples
  const loader = document.createElement("div");
  loader.innerHTML = "Gerando PDF...";
  loader.style.position = "fixed";
  loader.style.top = "50%";
  loader.style.left = "50%";
  loader.style.transform = "translate(-50%, -50%)";
  loader.style.padding = "20px";
  loader.style.background = "#3B5998";
  loader.style.color = "white";
  loader.style.borderRadius = "10px";
  loader.style.zIndex = "9999";
  document.body.appendChild(loader);

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .then(() => {
      document.body.removeChild(loader);
    })
    .catch((err) => {
      console.error("Erro ao gerar PDF:", err);
      document.body.removeChild(loader);
      alert("Erro ao gerar o PDF. Por favor, tente novamente.");
    });
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
        colunaQuartil.textContent = "X";
        colunaQuartil.classList.add("marked", quartil); // Adiciona a classe do quartil
      }
      linha.appendChild(colunaQuartil);
    });

    tabelaCorpo.appendChild(linha);
  });
}

function formatarPrescricao(texto, quartil) {
  const linhas = texto.split('\n').filter(linha => linha.trim());
  let html = '';

  // Título do quartil
  html += `<div class="quartil-header">Quartil ${quartil} - Orientações terapêuticas para performar seu Hemograma</div>`;

  let currentBlock = null;
  
  linhas.forEach(linha => {
    linha = linha.trim();
    
    if (linha === '') return;
    
    // Verifica se é título em maiúsculas
    if (linha === linha.toUpperCase() && 
        !linha.startsWith('OBJETIVO:') && 
        !linha.startsWith('SUGESTÃO:') && 
        !linha.startsWith('FREQUENCIA:') &&
        !linha.startsWith('ARTIGO:')) {
      
      if (linha.includes('...')) {
        // Medicamentos com linha pontilhada
        const [nome, valor] = linha.split('...');
        html += `
          <div class="medication-line">
            <span class="med-name">${nome.trim()}</span>
            <span class="med-dots"></span>
            <span class="med-value">${valor.trim()}</span>
          </div>`;
      } else {
        // Título de receita
        if (currentBlock) html += '</div>';
        html += `
          <div class="recipe">
            <div class="recipe-title">${linha}</div>`;
        currentBlock = 'recipe';
      }
    } else if (linha.startsWith('OBJETIVO:')) {
      html += `<div><span class="tag">OBJETIVO:</span> ${linha.replace('OBJETIVO:', '')}</div>`;
    } else if (linha.startsWith('SUGESTÃO:')) {
      html += `<div><span class="tag">SUGESTÃO:</span> ${linha.replace('SUGESTÃO:', '')}</div>`;
    } else if (linha.startsWith('FREQUENCIA:')) {
      html += `<div><span class="tag">FREQUENCIA:</span> ${linha.replace('FREQUENCIA:', '')}</div>`;
    } else if (linha.startsWith('ARTIGO:')) {
      html += `
        <div class="article">ARTIGO:</div>
        <div class="article-content">${linha.replace('ARTIGO:', '').trim()}</div>`;
    } else if (linha.includes('tele-consulta profissional:')) {
      html += `<div class="contact-info">${linha}</div>`;
    } else {
      html += `<div class="recipe-content">${linha}</div>`;
    }
  });
  
  if (currentBlock) html += '</div>';
  
  return html;
}

function exibirPrescricoesPorQuartil(resultados, prescricoes) {
  const prescricoesDiv = document.getElementById("prescricoes");
  prescricoesDiv.innerHTML = "";

  const quartisExibidos = new Set();
  const ordemQuartis = ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5"];

  ordemQuartis.forEach((quartil) => {
    const examesNesteQuartil = Object.entries(resultados).filter(
      ([, dados]) => dados.quartil === quartil
    );

    if (examesNesteQuartil.length > 0 && !quartisExibidos.has(quartil)) {
      quartisExibidos.add(quartil);
      
      // Formata o número do quartil para exibição
      const quartiNum = quartil.substring(1);
      
      // Gera o HTML formatado para o quartil
      const prescricaoHtml = formatarPrescricao(prescricoes[quartil], quartiNum);
      prescricoesDiv.innerHTML += prescricaoHtml;
    }
  });
}

// Função para exibir o status geral
function exibirStatusGeral(resultados) {
  const statusGrid1 = document.getElementById("status-grid-1");
  const statusGrid2 = document.getElementById("status-grid-2");

  const firstGridItems = ["hemacias", "hemoglobina", "vcm", "hcm", "chcm"];
  const secondGridItems = [
    "leucocitos",
    "plaquetas",
    "rdw",
    "eosinofilos",
    "monocitos",
  ];

  statusGrid1.innerHTML = firstGridItems
    .map(
      (item) => `
      <div class="status-item">
          ${resultados[item]?.status || "IDEAL"}
      </div>
  `
    )
    .join("");

  statusGrid2.innerHTML = secondGridItems
    .map(
      (item) => `
      <div class="status-item">
          ${resultados[item]?.status || "IDEAL"}
      </div>
  `
    )
    .join("");
}

// Recuperar os resultados e exibir na página
document.addEventListener("DOMContentLoaded", () => {
  // Recuperar os resultados do localStorage
  const resultados = JSON.parse(localStorage.getItem("resultadosExames"));
  const nome = localStorage.getItem("nome");
  const sobrenome = localStorage.getItem("sobrenome");
  const dataExame = localStorage.getItem("dataExame");
  const faixaEtaria = localStorage.getItem("faixaEtaria");
  const nomeAvaliador = localStorage.getItem("nomeAvaliador");
  const telefoneAvaliador = localStorage.getItem("telefoneAvaliador");

  if (!resultados || !nome || !sobrenome || !dataExame || !faixaEtaria) {
    alert("Erro: Informações incompletas!");
    window.location.href = "../exames/exames.html";
    return;
  }

  const metricsGrids = document.querySelectorAll(".metrics-grid");
  const metricsContainer = document.querySelector(".metrics-container");
  const genero = localStorage.getItem("generoSelecionado");

  if (faixaEtaria === "adulto") {
    metricsContainer.classList.add(`adulto-${genero}`);
  } else {
    metricsContainer.classList.add(faixaEtaria);
  }

  metricsGrids.forEach((grid) => {
    if (faixaEtaria === "adulto") {
      grid.classList.add(`adulto-${genero}`);
    } else {
      grid.classList.add(faixaEtaria);
    }
  });

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
  const patientInfo = document.getElementById("patient-info");
  patientInfo.innerHTML = `
        <div class="info-left">
            <p>Paciente: ${nome} ${sobrenome}</p>
            <p>Data exame: ${dataExameFormatada}</p>
            <p>Data relatório: ${dataAtual}</p>
        </div>
        <div class="info-right">
            <p>Nome Completo do avaliador: ${nomeAvaliador}</p>
            <p>Telefone do avaliador: ${telefoneAvaliador}</p>
        </div>
    `;

  // Exibir tabela e prescrições
  preencherTabela(resultados); // Preenche a tabela com os resultados
  exibirStatusGeral(resultados); // Exibe o status geral dos exames
  exibirPrescricoesPorQuartil(resultados, prescricoes); // Exibe prescrições sem duplicidades
});
