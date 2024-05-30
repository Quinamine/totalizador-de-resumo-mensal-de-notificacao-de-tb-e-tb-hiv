"use strict"

const referencia = {
    retornarIndicador(inputTarget) {
        const indicadorOutput = document.querySelector(".reference-row__output--indicador");
     

        let classeDoIndicadorColunar = inputTarget.parentElement.dataset.coltitle;
        let indicadorColunar = document.querySelector(`.${classeDoIndicadorColunar}`).innerText;
    

        let inputTargetTemIndicadoresLineares = inputTarget.parentElement.dataset.indicadores;
        if(inputTargetTemIndicadoresLineares) {
            const classDoContainerDosIndicadores = inputTarget.parentElement.dataset.indicadores;
            const indicadores = document.querySelectorAll(`.${classDoContainerDosIndicadores} span`);
            const inputTargetAndSiblings = inputTarget.parentElement.children;

            let inputTargetIndex = 0;
            for (let i=0; i < inputTargetAndSiblings.length; i++) {
                if(inputTarget === inputTargetAndSiblings[i]) {
                    inputTargetIndex = i;
                }
            }

            let indicadorLinear = indicadores[inputTargetIndex].innerText;
            let classDoTituloDaSeccao = inputTarget.parentElement.dataset.sectiontitle
            let tituloDaSeccao = document.querySelector(`.${classDoTituloDaSeccao}`).innerText;
            indicadorColunar = `${tituloDaSeccao} <br> Linha: ${indicadorLinear} <br> Coluna: ${indicadorColunar}.`;
        }

        indicadorOutput.innerHTML = indicadorColunar; 
        
        

    },

    retornarFaixaEtaria(inputTarget) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output--idade");
        let faixaEtaria;

        let inputTargetHasFaixaEtaria = inputTarget.parentElement.dataset.faixaetaria
        inputTargetHasFaixaEtaria ? 
        faixaEtaria = inputTarget.parentElement.dataset.faixaetaria : faixaEtaria = "&minus;";

        faixaEtariaOutput.innerHTML = faixaEtaria;
    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__col-de-inputs input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            if(!inputCelular.matches("[readonly]")) {
                referencia.retornarIndicador(inputCelular);
                referencia.retornarFaixaEtaria(inputCelular);
            }
        });
    });

    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;