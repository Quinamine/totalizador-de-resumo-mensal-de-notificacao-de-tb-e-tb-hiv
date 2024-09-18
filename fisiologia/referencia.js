"use strict"
const referencia = {
    retornarIndicadorEfaixaEtaria(inputTarget) {
        const indicadorOutput = document.querySelector(".reference__output--indicador");
        const faixaEtariaOutput = document.querySelector(".reference__output--idade");
        const celulaComFocoEirmas = inputTarget.parentElement.children;
        // Seccoes
        let isSection1 = inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--1");
        let isSection2 = inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--2");
        let isSection3 = inputTarget.parentElement.matches(".ficha__seccao__body--3");
        let isSection4 = inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--4");
        let isSubSection4 = inputTarget.parentElement.matches(".ficha__seccao-4__pseudo-body")
        if(isSection1) {
            const indicadores = document.querySelectorAll(".ficha__seccao-1__subcol-de-indicadores--1 span");
            const subindicadores = document.querySelectorAll(".ficha__seccao-1__subcol-de-indicadores--2 span");
            let celulaFocadaIndex;
            let indicadorIndex, subindicadorIndex;           
            for(let i = 0; i < celulaComFocoEirmas.length; i++) {
                if(inputTarget === celulaComFocoEirmas[i]) {
                    celulaFocadaIndex = i;
                    indicadorIndex = i < 4 ? 0
                    : i < 8 ? 1
                    : 2;
                    subindicadorIndex = i;
                }
            }
            indicadorOutput.textContent = `${indicadores[indicadorIndex].textContent}: ${subindicadores[subindicadorIndex].textContent}`;
            faixaEtariaOutput.textContent = inputTarget.parentElement.dataset.faixaetaria;
        } else if(isSubSection4) {
            let tituloDaSeccao = document.querySelector(".ficha__seccao-4__subtitulo--2");
            let indicadores = document.querySelectorAll(".indicadores-da-subseccao-4 span");
            let celulaFocadaIndex;           
            for(let i = 0; i < celulaComFocoEirmas.length; i++) {
                if(inputTarget === celulaComFocoEirmas[i]) {
                    celulaFocadaIndex = i;
                }
            }
            indicadorOutput.textContent = `${tituloDaSeccao.textContent}: ${indicadores[celulaFocadaIndex].textContent}`;
            faixaEtariaOutput.textContent = "-";
        } else {
            let tituloDaSeccao;
            if(isSection2) {
                tituloDaSeccao = document.querySelector("#titulo-da-seccao-2");
            }
            else if(isSection3) {
                tituloDaSeccao = document.querySelector("#titulo-da-seccao-3");
                let indicador = `${tituloDaSeccao.textContent}: ${celulaComFocoEirmas[0].textContent}`;
                indicadorOutput.textContent = indicador;
                faixaEtariaOutput.textContent = "-";
                return !1;
            } else if(isSection4) {
                tituloDaSeccao = document.querySelector("#titulo-da-seccao-4")
            } else {
                tituloDaSeccao = document.querySelector("#titulo-da-seccao-5");
            }
            let indicador = `${tituloDaSeccao.textContent}: ${celulaComFocoEirmas[0].textContent}`;
            indicadorOutput.textContent = indicador;
            let faixasEtarias = ["0 - 4","5 - 9","10 - 14","15 - 19","20 - 24","25 - 34","35 - 44","45 - 54","55 - 64","≥ 65"];
            let celulaFocadaIndex;           
            for(let i = 0; i < celulaComFocoEirmas.length; i++) {
                if(inputTarget === celulaComFocoEirmas[i]) {
                    celulaFocadaIndex = i - 1;
                }
            }
            faixaEtariaOutput.textContent = faixasEtarias[celulaFocadaIndex];
        }
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            if(!inputCelular.matches("[readonly]")) {
                referencia.retornarIndicadorEfaixaEtaria(inputCelular);
            }
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;