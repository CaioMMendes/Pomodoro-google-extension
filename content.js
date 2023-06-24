let tempo;
let minutos;
let segundos;
let starterDate;

// Função para criar a notificação
function createNotification() {
    const options = {
        type: 'basic',
        iconUrl: '../icons/clock-48.png',
        title: 'Timer Finalizado',
        message: 'O tempo acabou!'
    };
    chrome.notifications.create(options);
}

// Listener para receber mensagens do popup.html
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startTimer') {
        // Inicia o cronômetro
        starterDate = Date.now();
        minutos = Math.floor(+message.pomodoro) || 30;
        segundos = Math.floor(+(message.pomodoro.toString().split('.')[1]) * 60 * 10) / 100 || 0;

        tempo = setInterval(atualizarCronometro, 1000); // Chama a função atualizarCronometro a cada segundo (1000 milis
    }
})