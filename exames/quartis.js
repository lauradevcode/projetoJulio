// Intervalos de quartis para cada parâmetro
const quartisPadrao = {
    masculino: {
        crianca: {
          hemoglobina_crianca: { Q0: [0, 13.0], Q1: [13.0, 13.875], Q2: [13.875, 14.75], Q3: [14.75, 15.625], Q4: [15.625, 16.5], Q5: [16.5, Infinity] },
          hematocrito_crianca: { Q0: [0, 30], Q1: [30, 33.625], Q2: [33.625, 37.25], Q3: [37.25, 40.875], Q4: [40.875, 44.5], Q5: [44.5, Infinity] },
          hemacias_crianca: { Q0: [0, 4.07], Q1: [4.07, 4.395], Q2: [4.395, 4.72], Q3: [4.72, 5.045], Q4: [5.045, 5.37], Q5: [5.37, Infinity] },
          vcm_crianca: { Q0: [0, 70], Q1: [70, 74], Q2: [74, 78], Q3: [78, 82], Q4: [82, 86], Q5: [86, Infinity] },
          hcm_crianca: { Q0: [0, 23.2], Q1: [23.2, 25.325], Q2: [25.325, 27.45], Q3: [27.45, 29.575], Q4: [29.575, 31.7], Q5: [31.7, Infinity] },
          chcm_crianca: { Q0: [0, 30], Q1: [30, 31.625], Q2: [31.625, 33.25], Q3: [33.25, 34.875], Q4: [34.875, 36.5], Q5: [36.5, Infinity] },
          leucocitos_crianca: { Q0: [0, 4000], Q1: [4000, 6500], Q2: [6500, 9000], Q3: [9000, 11500], Q4: [11500, 14000], Q5: [14000, Infinity] },
          plaquetas_crianca: { Q0: [0, 140], Q1: [140, 230], Q2: [230, 320], Q3: [320, 410], Q4: [410, 500], Q5: [500, Infinity] },
          rdw_crianca: { Q0: [0, 11], Q1: [11, 12.25], Q2: [12.25, 13.5], Q3: [13.5, 14.75], Q4: [14.75, 16], Q5: [16, Infinity] }, 
          eosinofilos_crianca: { Q0: [0,  0.5], Q1: [0.2, 0.15], Q2: [0.15, 0.25], Q3: [0.25, 0.35], Q4: [0.35, 0.5], Q5: [0.5, Infinity] },
          monocitos_crianca: { Q0: [0, 0.2], Q1: [0.2, 0.35], Q2: [0.35, 0.5], Q3: [0.5, 0.65], Q4: [0.65, 0.8], Q5: [0.8, Infinity] },

        },
        adulto: {
          hemoglobina_adulto: { Q0: [0, 13.0], Q1: [13.0, 13.875], Q2: [13.875, 14.75], Q3: [14.75, 15.625], Q4: [15.625, 16.5], Q5: [16.5, Infinity] },
          hematocrito_adulto: { Q0: [0, 36], Q1: [36, 40.5], Q2: [40.5, 45], Q3: [45, 49.5], Q4: [49.5, 54], Q5: [54, Infinity] },
          hemacias_adulto: { Q0: [0, 4.5], Q1: [4.5, 4.9], Q2: [4.9, 5.3], Q3: [5.3, 5.7], Q4: [5.7, 6.1], Q5: [6.1, Infinity] },
          vcm_adulto: { Q0: [0, 80], Q1: [80, 84.5], Q2: [84.5, 89], Q3: [89, 93.5], Q4: [93.5, 98], Q5: [98, Infinity] },
          hcm_adulto: { Q0: [0, 26.8], Q1: [26.8, 28.325], Q2: [28.325, 29.85], Q3: [29.85, 31.375], Q4: [31.375, 32.9], Q5: [32.9, Infinity] },
          chcm_adulto: { Q0: [0, 30], Q1: [30, 31.625], Q2: [31.625, 33.25], Q3: [33.25, 34.875], Q4: [34.875, 36.5], Q5: [36.5, Infinity] },
          leucocitos_adulto: { Q0: [0, 3600], Q1: [3600, 5450], Q2: [5450, 7300], Q3: [7300, 9150], Q4: [9150, 11000], Q5: [11000, Infinity] },
          plaquetas_adulto: { Q0: [0, 130], Q1: [130, 210], Q2: [210, 290], Q3: [290, 370], Q4: [370, 450], Q5: [450, Infinity] },
          rdw_adulto: { Q0: [0, 11], Q1: [11, 12.25], Q2: [12.25, 13.5], Q3: [13.5, 14.75], Q4: [14.75, 16], Q5: [16, Infinity] },
          eosinofilos_adulto: { Q0: [0,  0.5], Q1: [0.2, 0.15], Q2: [0.15, 0.25], Q3: [0.25, 0.35], Q4: [0.35, 0.5], Q5: [0.5, Infinity] },
          monocitos_adulto: { Q0: [0, 0.2], Q1: [0.2, 0.35], Q2: [0.35, 0.5], Q3: [0.5, 0.65], Q4: [0.65, 0.8], Q5: [0.8, Infinity] },

        },
        idoso: {
          hemoglobina_idoso: { Q0: [0, 11.5], Q1: [11.5, 12.4], Q2: [12.4, 13.3], Q3: [13.3, 14.2], Q4: [14.2, 15.1], Q5: [15.1, Infinity] },
          hematocrito_idoso: { Q0: [0, 33], Q1: [33, 36.25], Q2: [36.25, 39.5], Q3: [39.5, 42.75], Q4: [42.75, 46], Q5: [46, Infinity] },
          hemacias_idoso: { Q0: [0, 4.0], Q1: [4.0, 4.265], Q2: [4.265, 4.63], Q3: [4.63, 4.995], Q4: [4.995, 5.36], Q5: [5.36, Infinity] },
          vcm_idoso: { Q0: [0, 80], Q1: [80, 84.5], Q2: [84.5, 89], Q3: [89, 93.5], Q4: [93.5, 98], Q5: [98, Infinity] },
          hcm_idoso: { Q0: [0, 27], Q1: [27, 28.25], Q2: [28.25, 29], Q3: [29, 30], Q4: [30, 31], Q5: [31, Infinity] },
          chcm_idoso: { Q0: [0, 30], Q1: [30, 31.625], Q2: [31.625, 33.25], Q3: [33.25, 34.875], Q4: [34.875, 36.5], Q5: [36.5, Infinity] },
          leucocitos_idoso: { Q0: [0, 3600], Q1: [3600, 5450], Q2: [5450, 7300], Q3: [7300, 9150], Q4: [9150, 11000], Q5: [11000, Infinity] },
          plaquetas_idoso: { Q0: [0, 130], Q1: [130, 210], Q2: [210, 290], Q3: [290, 370], Q4: [370, 450], Q5: [450, Infinity] },
          rdw_idoso: { Q0: [0, 11], Q1: [11, 12.25], Q2: [12.25, 13.5], Q3: [13.5, 14.75], Q4: [14.75, 16], Q5: [16, Infinity] },
          eosinofilos_idoso: { Q0: [0,  0.5], Q1: [0.2, 0.15], Q2: [0.15, 0.25], Q3: [0.25, 0.35], Q4: [0.35, 0.5], Q5: [0.5, Infinity] },
          monocitos_idoso: { Q0: [0, 0.2], Q1: [0.2, 0.35], Q2: [0.35, 0.5], Q3: [0.5, 0.65], Q4: [0.65, 0.8], Q5: [0.8, Infinity] },

        },
    },
    feminino: {
      crianca: {
        hemoglobina_crianca: { Q0: [0, 10.5], Q1: [10.5, 11.375], Q2: [11.375, 12.25], Q3: [12.25, 13.125], Q4: [13.125, 14], Q5: [14, Infinity] },
        hematocrito_crianca: { Q0: [0, 30], Q1: [30, 33.625], Q2: [33.625, 37.25], Q3: [37.25, 40.875], Q4: [40.875, 44.5], Q5: [44.5, Infinity] },
        hemacias_crianca: { Q0: [0, 4.07], Q1: [4.07, 4.395], Q2: [4.395, 4.72], Q3: [4.72, 5.045], Q4: [5.045, 5.37], Q5: [5.37, Infinity] },
        vcm_crianca: { Q0: [0, 70], Q1: [70, 74], Q2: [74, 78], Q3: [78, 82], Q4: [82, 86], Q5: [86, Infinity] },
        hcm_crianca: { Q0: [0, 23.2], Q1: [23.2, 25.325], Q2: [25.325, 27.45], Q3: [27.45, 29.575], Q4: [29.575, 31.7], Q5: [31.7, Infinity] },
        chcm_crianca: { Q0: [0, 30], Q1: [30, 31.625], Q2: [31.625, 33.25], Q3: [33.25, 34.875], Q4: [34.875, 36.5], Q5: [36.5, Infinity] },
        leucocitos_crianca: { Q0: [0, 4000], Q1: [4000, 6500], Q2: [6500, 9000], Q3: [9000, 11500], Q4: [11500, 14000], Q5: [14000, Infinity] },
        plaquetas_crianca: { Q0: [0, 140], Q1: [140, 230], Q2: [230, 320], Q3: [320, 410], Q4: [410, 500], Q5: [500, Infinity] },
        rdw_crianca: { Q0: [0, 11], Q1: [11, 12.25], Q2: [12.25, 13.5], Q3: [13.5, 14.75], Q4: [14.75, 16], Q5: [16, Infinity] },
        eosinofilos_crianca: { Q0: [0,  0.5], Q1: [0.2, 0.15], Q2: [0.15, 0.25], Q3: [0.25, 0.35], Q4: [0.35, 0.5], Q5: [0.5, Infinity] },
        monocitos_crianca: { Q0: [0, 0.2], Q1: [0.2, 0.35], Q2: [0.35, 0.5], Q3: [0.5, 0.65], Q4: [0.65, 0.8], Q5: [0.8, Infinity] },

      },
    adulto: {
        hemoglobina_adulto: { Q0: [0, 14.0], Q1: [14.0, 15.0], Q2: [15.1, 16.0], Q3: [16.1, 17.0], Q4: [17.1, 18.0], Q5: [18.0, Infinity] },
        hematocrito_adulto: { Q0: [0, 42], Q1: [42, 44], Q2: [45, 47], Q3: [48, 50], Q4: [51, 52], Q5: [52, Infinity] },
        hemacias_adulto: { Q0: [0, 4.5], Q1: [4.5, 4.8], Q2: [4.9, 5.2], Q3: [5.3, 5.5], Q4: [5.6, 5.9], Q5: [5.9, Infinity] },
        vcm_adulto: { Q0: [0, 80], Q1: [80, 85], Q2: [86, 90], Q3: [91, 95], Q4: [96, 100], Q5: [100, Infinity] },
        hcm_adulto: { Q0: [0, 27], Q1: [27, 28], Q2: [29, 30], Q3: [31, 32], Q4: [33, 33], Q5: [33, Infinity] },
        chcm_adulto: { Q0: [0, 32], Q1: [32, 33], Q2: [34, 34], Q3: [35, 35], Q4: [36, 36], Q5: [36, Infinity] },
        leucocitos_adulto: { Q0: [0, 4.0], Q1: [4.0, 5.5], Q2: [5.6, 7.5], Q3: [7.6, 9.5], Q4: [9.6, 11.0], Q5: [11.0, Infinity] },
        plaquetas_adulto: { Q0: [0, 150], Q1: [150, 225], Q2: [226, 300], Q3: [301, 375], Q4: [376, 450], Q5: [450, Infinity] },
        rdw_adulto: { Q0: [0, 11.5], Q1: [11.5, 12.5], Q2: [12.6, 13.5], Q3: [13.6, 14.0], Q4: [14.1, 14.5], Q5: [14.5, Infinity] },
        eosinofilos_adulto: { Q0: [0,  0.5], Q1: [0.2, 0.15], Q2: [0.15, 0.25], Q3: [0.25, 0.35], Q4: [0.35, 0.5], Q5: [0.5, Infinity] },
        monocitos_adulto: { Q0: [0, 0.2], Q1: [0.2, 0.35], Q2: [0.35, 0.5], Q3: [0.5, 0.65], Q4: [0.65, 0.8], Q5: [0.8, Infinity] },

      },
    idoso: {
        hemoglobina_idoso: { Q0: [0, 11.5], Q1: [11.5, 12.4], Q2: [12.5, 13.3], Q3: [13.4, 14.2], Q4: [14.3, 15.1], Q5: [15.1, Infinity] },
        hematocrito_idoso: { Q0: [0, 33], Q1: [33, 36.25], Q2: [36.26, 39.5], Q3: [39.51, 42.75], Q4: [42.76, 46], Q5: [46, Infinity] },
        hemacias_idoso: { Q0: [0, 4.0], Q1: [4.0, 4.265], Q2: [4.266, 4.63], Q3: [4.631, 4.995], Q4: [4.996, 5.36], Q5: [5.36, Infinity] },
        vcm_idoso: { Q0: [0, 80], Q1: [80, 84.5], Q2: [84.6, 89], Q3: [89.1, 93.5], Q4: [93.6, 98], Q5: [98, Infinity] },
        hcm_idoso: { Q0: [0, 27], Q1: [27, 28.25], Q2: [28.26, 29], Q3: [29.01, 30], Q4: [30.01, 31], Q5: [31, Infinity] },
        chcm_idoso: { Q0: [0, 30], Q1: [30, 31.625], Q2: [31.626, 33.25], Q3: [33.26, 34.875], Q4: [34.876, 36.5], Q5: [36.5, Infinity] },
        leucocitos_idoso: { Q0: [0, 3600], Q1: [3600, 5450], Q2: [5451, 7300], Q3: [7301, 9150], Q4: [9151, 11000], Q5: [11000, Infinity] },
        plaquetas_idoso: { Q0: [0, 130], Q1: [130, 210], Q2: [211, 290], Q3: [291, 370], Q4: [371, 450], Q5: [450, Infinity] },
        rdw_idoso: { Q0: [0, 11], Q1: [11, 12.25], Q2: [12.26, 13.5], Q3: [13.51, 14.75], Q4: [14.76, 16], Q5: [16, Infinity] },
        eosinofilos_idoso: { Q0: [0,  0.5], Q1: [0.2, 0.15], Q2: [0.15, 0.25], Q3: [0.25, 0.35], Q4: [0.35, 0.5], Q5: [0.5, Infinity] },
        monocitos_idoso: { Q0: [0, 0.2], Q1: [0.2, 0.35], Q2: [0.35, 0.5], Q3: [0.5, 0.65], Q4: [0.65, 0.8], Q5: [0.8, Infinity] },

      },
    },
  };
// Carregar quartis do localStorage ou usar os padrões
const quartis = JSON.parse(localStorage.getItem("quartis")) || quartisPadrao;

// Função para determinar o status do resultado com base nos intervalos
function determinarStatus(valor, intervalos, quartilVerde) {
  if (!intervalos || isNaN(valor)) {
    return { status: "Fora da curva", quartil: null }; // Valor ou intervalos inválidos
  }

  for (const [quartil, range] of Object.entries(intervalos)) {
    if (valor >= range[0] && valor <= range[1]) {
      if (quartil === quartilVerde) {
        return { status: "Ideal", quartil };
      }
      if (quartil === "Q0") {
        return { status: "Fora da curva", quartil };
      }
      if (quartil === "Q1") {
        return { status: "Abaixo do ideal", quartil };
      }
      if (quartil === "Q3") {
        return { status: "Alto", quartil };
      }
      if (quartil === "Q4") {
        return { status: "Muito alto", quartil };
      }
      if (quartil === "Q5") {
        return { status: "Fora da curva", quartil };
      }
    }
  }
}

// Função principal para calcular os quartis e status
function calcularQuartisFormulario() {
  const genero = localStorage.getItem("generoSelecionado");
  const faixaEtaria = localStorage.getItem("faixaEtaria");

  if (!genero || !faixaEtaria || !quartis[genero] || !quartis[genero][faixaEtaria]) {
    alert("Erro: Gênero ou faixa etária não selecionados ou inválidos!");
    return;
  }

  const inputs = {
    hemoglobina: parseFloat(document.getElementById("hemoglobina").value),
    hemacias: parseFloat(document.getElementById("hemacias").value),
    hematocrito: parseFloat(document.getElementById("hematocrito").value),
    vcm: parseFloat(document.getElementById("vcm").value),
    hcm: parseFloat(document.getElementById("hcm").value),
    chcm: parseFloat(document.getElementById("chcm").value),
    leucocitos: parseFloat(document.getElementById("leucocitos").value),
    plaquetas: parseFloat(document.getElementById("plaquetas").value),
    eosinofilos: parseFloat(document.getElementById("eosinofilos").value),
    monocitos:parseFloat(document.getElementById("monocitos").value),
    rdw: parseFloat(document.getElementById("rdw").value),
  };

  const valoresInvalidos = Object.entries(inputs).filter(
    ([key, value]) => isNaN(value) || value <= 0
  );

  if (valoresInvalidos.length > 0) {
    alert(
      "Erro: Os seguintes campos possuem valores inválidos ou estão vazios:\n" +
        valoresInvalidos.map(([key]) => key).join(", ")
    );
    return;
  }

  const quartilVerde = {
    hemoglobina: "Q2",
    hemacias: "Q2",
    hematocrito: "Q2",
    vcm: "Q2",
    hcm: "Q2",
    chcm: "Q2",
    leucocitos: "Q2",
    plaquetas: "Q2",
    rdw: "Q2",
    eosinofilos: "Q2",
    monocitos: "Q2",

  };

  const resultados = Object.keys(inputs).reduce((acc, key) => {
    const intervalo = quartis[genero][faixaEtaria][`${key}_${faixaEtaria}`];
    acc[key] = determinarStatus(inputs[key], intervalo, quartilVerde[key]);
    return acc;
  }, {});

  localStorage.setItem("resultadosExames", JSON.stringify(resultados));
  window.location.href = "../relatorio/relatorio.html";
}