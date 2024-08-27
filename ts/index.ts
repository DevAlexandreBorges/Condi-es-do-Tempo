const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-loc");
const sectionTempoInfo = document.querySelector("#tempo-info");
const btnLoc = document.querySelector("#btn-loc");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const loc = input.value;

  if (loc.length < 3) {
    alert("O local precisa ter pelo menos 3 letras.. ");
    return;
  }

  try {
    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=fea8ef8770fbe9347bf06b663d0023d8&lang=pt_br&units=metric
  `);

    const dados = await response.json();

    const infos = {
      temperatura: Math.round(dados.main.temp),
      nome: dados.name,
      icone: `https:openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };
    sectionTempoInfo.innerHTML = ` 
            <div class="tempo-dados">
              <h2>${infos.nome}</h2>
  
              <span>${infos.temperatura}°C</span>
            </div>
  
            <img
              src="${infos.icone}"
              alt="Imagem demostrativa"
            />`;
  } catch (err) {
    console.log(
      "Erro ao obter as informações da API, por favor tente novamente!",
      err
    );
  }
});
