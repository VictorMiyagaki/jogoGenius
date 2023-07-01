///////////////
// VARIÁVEIS //
///////////////

const cores = ['verde', 'vermelho', 'azul', 'amarelo'];
let listaDeCoresDoJogo = [];
let listaDeCoresDoJogador = [];
let jogoComecou = false;
let podeTeclar = false;
let nivel;

///////////////////////////////////////
// EVENTOS (TECLADO, MOUSE, CELULAR) //
///////////////////////////////////////

// AÇÕES EXECUTADAS AO APERTAR AS TECLAS 'ENTER', 'A', 'S', 'Z' OU 'X'
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !jogoComecou) {
        iniciarJogo();
    }
    if (jogoComecou && podeTeclar && listaDeCoresDoJogador.length < listaDeCoresDoJogo.length) {
        switch (event.key) {
            case 'a':
                animacaoCliqueDoBotao('verde');
                adicionarCorClicada('verde');
                break;
            case 's':
                animacaoCliqueDoBotao('vermelho');
                adicionarCorClicada('vermelho');
                break;
            case 'z':
                animacaoCliqueDoBotao('amarelo');
                adicionarCorClicada('amarelo');
                break;
            case 'x':
                animacaoCliqueDoBotao('azul');
                adicionarCorClicada('azul');
                break;
        }
    }
});

// AÇÕES EXECUTADAS AO CLICAR/TOCAR OS BOTÕES 'VERDE', 'VERMELHO', 'AMARELO' OU 'AZUL'
document.querySelectorAll('.botao').forEach(function (botao) {
    botao.addEventListener('click', function () {
        if (jogoComecou && podeTeclar && listaDeCoresDoJogador.length < listaDeCoresDoJogo.length) {
            const corDoBotaoClicado = this.getAttribute('id');
            animacaoCliqueDoBotao(corDoBotaoClicado);
            adicionarCorClicada(corDoBotaoClicado);
        }
    })
});

// AÇÃO EXECUTADA AO CLICAR/TOCAR NA FRASE 'CLIQUE AQUI'
document.getElementById('cliqueAqui').addEventListener('click', function () {
    iniciarJogo();
});

////////////////////
// LÓGICA DO JOGO //
////////////////////

// PARTE 1 - INICIA O JOGO
function iniciarJogo() {
    podeTeclar = true;
    jogoComecou = true;
    nivel = 0;
    document.getElementById('cliqueAqui').classList.add('esconder');
    proximoNivelDoJogo();
}

// PARTE 2 - INICIA O PRÓXIMO NÍVEL DO JOGO
function proximoNivelDoJogo() {
    nivel++;
    atualizarTextoNivel('Nível ' + nivel);
    listaDeCoresDoJogo.push(corAleatoria());
    piscarCoresDoJogo();
}

// PARTE 3 - PISCA A SEQUÊNCIA DE CORES DO JOGO
function piscarCoresDoJogo() {
    podeTeclar = false;
    document.querySelector('.circuloPretoMenor').classList.add('verdeClaro');
    setTimeout(function () {
        for (let i = 0; i < listaDeCoresDoJogo.length; i++) {
            setTimeout(function () {
                animacaoCliqueDoBotao(listaDeCoresDoJogo[i]);
                if (i === listaDeCoresDoJogo.length - 1) {
                    setTimeout(function () {
                        podeTeclar = true;
                        document.querySelector('.circuloPretoMenor').classList.remove('verdeClaro');
                    }, 500);
                }
            }, 500 * i);
        };
    }, 250);
}

// PARTE 4 - CHECA CADA RESPOSTA DO USUÁRIO
function checarResposta() {
    const posicaoAtual = listaDeCoresDoJogador.length - 1
    if (listaDeCoresDoJogo[posicaoAtual] === listaDeCoresDoJogador[posicaoAtual]) {
        if (listaDeCoresDoJogo.length === listaDeCoresDoJogador.length) {
            setTimeout(function () {
                listaDeCoresDoJogador = [];
                proximoNivelDoJogo();
            }, 1000);
        };
    }
    else {
        finalizarJogo();
    }
}

// PARTE 5 - FINALIZA O JOGO
function finalizarJogo() {
    tocarSom('errado');
    animacao(".fundoRosa", "vermelho", 300);
    animacao('#' + 'cliqueAqui', 'esconder');
    listaDeCoresDoJogo = [];
    listaDeCoresDoJogador = [];
    jogoComecou = false;
    atualizarTextoNivel('Aperte ENTER para começar')
}

///////////////////////
// LÓGICA DO JOGADOR // 
///////////////////////

// PARTE ÚNICA - ADICIONA UMA COR NA E CHECA A RESPOSTA
function adicionarCorClicada(corDoBotaoClicado) {
    listaDeCoresDoJogador.push(corDoBotaoClicado);
    checarResposta();
}

////////////////////////
// FUNÇÕES AUXILIARES //
////////////////////////

// ATUALIZA O TEXTO DO TÍTULO ONDE MOSTRA O NÍVEL ATUAL DO JOGO
function atualizarTextoNivel(texto) {
    document.getElementById('nivel').textContent = texto;
}

// RETORNA UMA COR ALEATÓRIA ENTRE 'VERMELHO', 'VERDE', 'AZUL' OU 'AMARELO
function corAleatoria() {
    let numeroAleatorio = Math.floor(Math.random() * 4);
    let corAleatoria = cores[numeroAleatorio];
    return corAleatoria;
}

// FUNÇÃO QUE FAZ O BOTÃO PISCAR E REPRODUZ UM SOM
function animacaoCliqueDoBotao(corDoBotaoClicado) {
    tocarSom(corDoBotaoClicado);
    animacao('#' + corDoBotaoClicado, 'botaoAnimado', 100);
}

///////////////
// ANIMAÇÕES //
///////////////

// ANIMAÇÃO QUE REPRODUZ UM SOM
function tocarSom(cor) {
    const audio = new Audio('sons/' + cor + '.mp3');
    audio.play();
}

// ANIMAÇÃO QUE ADICIONA E REMOVE UMA CLASSE (BOTÃO PISCANDO OU FUNDO VERMELHO QUANDO O JOGADOR ERRA)
function animacao(elemento, classe, tempo) {
    document.querySelector(elemento).classList.add(classe);
    setTimeout(function () {
        document.querySelector(elemento).classList.remove(classe);
    }, tempo);
}

////////////////////////////////
// ANIMAÇÕES DE BOTÕES EXTRAS //
////////////////////////////////

// BOTÃO QUE FAZ O CÍRCULO GIRAR

document.querySelector('.botaoGirar').addEventListener('click', function () {
    document.querySelector('.circuloPreto').classList.toggle('animacaoGiro');
    document.querySelector('.botaoGirar').classList.toggle('botaoExtraVerde');
});

// BOTÃO QUE FAZ O FUNDO VIRAR UMA BALADA

document.querySelector('.botaoBalada').addEventListener('click', function () {
    document.querySelector('.fundoRosa').classList.toggle('baladinha');
    document.querySelector('.botaoBalada').classList.toggle('botaoExtraVerde');
});

// BOTÃO QUE REPRODUZ UMA MÚSICA

const musica = new Audio('sons/give.mp3');
musica.loop = true;
let musicaTocando = false;

document.querySelector('.botaoMusica').addEventListener('click', function () {
    if (!musicaTocando) {
        musica.play();
        musicaTocando = true;
        document.querySelector('.esquerdo').style.visibility = 'visible';
        document.querySelector('.direito').style.visibility = 'visible';
        document.querySelector('.botaoMusica').textContent = "⏸️";
    } else {
        musica.pause();
        musicaTocando = false;
        document.querySelector('.esquerdo').style.visibility = 'hidden';
        document.querySelector('.direito').style.visibility = 'hidden';
        document.querySelector('.botaoMusica').textContent = "▶️";
    }
    document.querySelector('.botaoMusica').classList.toggle('botaoExtraVerde');
})