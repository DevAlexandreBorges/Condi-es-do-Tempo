"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-loc");
const sectionTempoInfo = document.querySelector("#tempo-info");
const btnLoc = document.querySelector("#btn-loc");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const loc = input.value;
    if (loc.length < 3) {
        alert("O local precisa ter pelo menos 3 letras.. ");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=fea8ef8770fbe9347bf06b663d0023d8&lang=pt_br&units=metric
  `);
        const dados = yield response.json();
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
    }
    catch (err) {
        console.log("Erro ao obter as informações da API, por favor tente novamente!", err);
    }
}));
