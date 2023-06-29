// VARIÁVEIS

const cores = ['verde', 'vermelho', 'azul', 'amarelo'];
let listaDeCoresDoJogo = [];
let listaDeCoresDoJogador = [];
let jogoComecou = false;
let nivel = 0;

// EVENTOS DOS BOTÕES DO TECLADO

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !jogoComecou) {
        iniciarJogo();
    }
    switch (event.key) {
        case 'a':
            cliqueDoBotao('verde', 'jogador');
            break;
        case 's':
            cliqueDoBotao('vermelho', 'jogador');
            break;
        case 'z':
            cliqueDoBotao('amarelo', 'jogador');
            break;
        case 'x':
            cliqueDoBotao('azul', 'jogador');
            break;
    }
});

// EVENTOS DO CLIQUE DO MOUSE (OU DO TOQUE NA TELA DO CELULAR)

document.querySelectorAll('.botao').forEach(function (botao) {
    botao.addEventListener('click', function () {
        const corDoBotaoClicado = this.getAttribute('id');
        cliqueDoBotao(corDoBotaoClicado, 'jogador');
    })
});

document.getElementById('cliqueAqui').addEventListener('click', function () {
    iniciarJogo();
});

document.querySelector('.botaoGirar').addEventListener('click', function () {
    document.querySelector('.circuloPreto').classList.toggle('animacaoGiro');
    document.querySelector('.botaoGirar').classList.toggle('verde');
})

document.querySelector('.botaoBalada').addEventListener('click', function () {
    document.querySelector('.fundoRosa').classList.toggle('baladinha');
    document.querySelector('.botaoBalada').classList.toggle('verde');
})

const musica = new Audio('sons/give.mp3');
let musicaTocando = false;

document.querySelector('.botaoMusica').addEventListener('click', function () {
    if (!musicaTocando) {
        musica.play();
        musicaTocando = true;
        document.querySelector('.rick').style.visibility = 'visible';
        document.querySelector('.rick2').style.visibility = 'visible';
        document.querySelector('.fundoRosa').style.opacity = '0.9';
        document.querySelector('.botaoMusica').textContent = "⏸️";
    } else {
        musica.pause();
        musicaTocando = false;
        document.querySelector('.rick').style.visibility = 'hidden';
        document.querySelector('.rick2').style.visibility = 'hidden';
        document.querySelector('.botaoMusica').textContent = "▶️";
    }
    document.querySelector('.botaoMusica').classList.toggle('verde');
})

// FUNÇÃO PARA INICIAR O JOGO

function iniciarJogo() {
    jogoComecou = true;
    nivel = 0;
    document.getElementById('nivel').textContent = 'Nível ' + nivel;
    document.getElementById('cliqueAqui').classList.add('esconder');

    proximaCorDoJogo();

}

function proximaCorDoJogo() {
    nivel++;
    document.getElementById('nivel').textContent = 'Nível ' + nivel;
    listaDeCoresDoJogador = [];
    let numeroAleatorio = Math.floor(Math.random() * 4);
    let corAleatoria = cores[numeroAleatorio];
    listaDeCoresDoJogo.push(corAleatoria);

    setTimeout(function () {
        for (let i = 0; i < listaDeCoresDoJogo.length; i++) {
            (function (i) {
                setTimeout(function () {
                    document.getElementById(listaDeCoresDoJogo[i]).classList.add('botaoAnimado');
                    setTimeout(function () {
                        document.getElementById(listaDeCoresDoJogo[i]).classList.remove('botaoAnimado');
                    }, 100);
                    const audio = new Audio('sons/' + listaDeCoresDoJogo[i] + '.mp3');
                    audio.play();
                }, 500 * i);
            })(i);
        };
    }, 250);

    // setTimeout(function () { cliqueDoBotao(corAleatoria) }, 500);
}

// FUNÇÃO DO JOGADOR

function cliqueDoBotao(corDoBotaoClicado, quemEnviou) {
    if (jogoComecou) {
        tocarSom(corDoBotaoClicado);
        animarBotao(corDoBotaoClicado);
        if (quemEnviou === 'jogador') {
            listaDeCoresDoJogador.push(corDoBotaoClicado);
            checarResposta(listaDeCoresDoJogador.length - 1);
        }
    }
}

function checarResposta(posicaoAtual) {
    if (listaDeCoresDoJogo[posicaoAtual] === listaDeCoresDoJogador[posicaoAtual]) {
        if (listaDeCoresDoJogo.length === listaDeCoresDoJogador.length) {
            setTimeout(function () {
                proximaCorDoJogo();
            }, 1000);
        };
    }
    else {
        tocarSom('errado');
        fundoVermelho();
        finalizarJogo();
    }
}

function fundoVermelho() {
    document.querySelector('.fundoRosa').classList.add("vermelho");
    setTimeout(function () {
        document.querySelector('.fundoRosa').classList.remove("vermelho");
    }, 300);
}

function finalizarJogo() {
    listaDeCoresDoJogo = [];
    jogoComecou = false;
    document.getElementById('nivel').textContent = 'Aperte ENTER para começar';
    document.getElementById('cliqueAqui').classList.remove('esconder');
}

// ANIMAÇÕES

function tocarSom(cor) {
    const audio = new Audio('sons/' + cor + '.mp3');
    audio.play();
}

function animarBotao(corDoBotaoClicado) {
    document.getElementById(corDoBotaoClicado).classList.add('botaoAnimado');
    setTimeout(function () {
        document.getElementById(corDoBotaoClicado).classList.remove('botaoAnimado');
    }, 100);
};

