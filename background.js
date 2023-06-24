let tempo;
let minutos;
let segundos;
let starterDate;

// Função para criar a notificação
function createNotification() {
    const options = {
        type: 'basic',
        iconUrl: './icons/clock-48.png',
        title: 'Timer Finalizado',
        message: 'O tempo acabou!'
    };
    chrome.notifications.create(options);
}

// Listener para quando o alarme dispara
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'timer') {
        createNotification();
    }
});

// Listener para receber mensagens do content.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startTimer') {
        // Inicia o cronômetro
        starterDate = Date.now();
        minutos = Math.floor(+message.pomodoro) || 30;
        segundos = Math.floor(+(message.pomodoro.toString().split('.')[1]) * 60 * 10) / 100 || 0;

        tempo = setInterval(atualizarCronometro, 1000); // Chama a função atualizarCronometro a cada segundo (1000 milissegundos)
    }
});

// Função para atualizar o cronômetro
function atualizarCronometro() {
    // Atualiza o cronômetro
    segundos--;
    if (segundos <= -1) {
        segundos = 59;
        minutos--;
    }

    const tempoFormatado = pad(minutos) + ":" + pad(segundos);
    chrome.runtime.sendMessage({ action: 'updateTimer', tempoRestante: tempoFormatado });

    if (minutos <= 0 && segundos <= 0) {
        // Cronômetro finalizado, para o intervalo e cria a notificação
        clearInterval(tempo);
        createNotification();
    }
}

// Função para adicionar um zero à esquerda, se necessário
function pad(valor) {
    return valor < 10 ? "0" + valor : valor;
}
