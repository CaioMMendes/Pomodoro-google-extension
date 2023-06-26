import { background } from './service_worker.js'
document.addEventListener('DOMContentLoaded', function () {
    let pomodoro = document.getElementById('pomodoro')
    let pausa = document.getElementById('pausa')
    let serie = document.getElementById('serie')
    let soundCheckbox = document.getElementById('soundCheckbox')
    let iniciar = document.getElementById('iniciar')
    let tempoRestante = document.getElementById('tempoRestante')
    let tempoTotal = document.getElementById('tempoTotal')
    let form = document.getElementById('form')

    pausa.value = localStorage.getItem('pausa')
    serie.value = localStorage.getItem('serie')
    pomodoro.value = localStorage.getItem('pomodoro')

    soundCheckbox.checked = localStorage.getItem('soundCheckbox') === 'true' ? true : false
    let startDate = localStorage.getItem('startDate')


    let tempo;
    let minutos = Math.floor(+pomodoro.value);
    let segundos = Math.floor(+(`0.${(((pomodoro.value)).split('.')[1])}`) * 60 * 100) / 100
    if (!segundos) {
        segundos = '00'
    } else if (segundos < 10) {
        segundos = "0" + segundos
    }
    tempoRestante.innerHTML = `${minutos}:${String(segundos).slice(0, 2)}`
    form.addEventListener('input', function () {

        localStorage.setItem('pomodoro', pomodoro.value)
        localStorage.setItem('pausa', pausa.value)
        localStorage.setItem('serie', serie.value)
        localStorage.setItem('soundCheckbox', soundCheckbox.checked)
        console.log(segundos)
        segundos = Math.floor(+(`0.${(((pomodoro.value)).split('.')[1])}`) * 60 * 100) / 100
        minutos = Math.floor(+pomodoro.value)
        if (!segundos) {
            segundos = '00'
        } else if (+segundos < 10) {
            segundos = "0" + segundos
        }
        tempoRestante.innerHTML = `${minutos}:${String(segundos).slice(0, 2)}`
    })
    // pomodoro.addEventListener('input', function () {
    //     localStorage.setItem('pomodoro', pomodoro.value)
    //     tempoRestante.innerHTML = pomodoro.value
    // })

    // pausa.addEventListener('input', function () {
    //     localStorage.setItem('pausa', pausa.value)
    // })

    // serie.addEventListener('input', function () {
    //     localStorage.setItem('serie', serie.value)
    // })

    // soundCheckbox.addEventListener('input', function () {
    //     localStorage.setItem('soundCheckbox', soundCheckbox.checked)
    // })


    iniciar.addEventListener('click', function () {
        localStorage.setItem('startDate', Date.now())
        console.log('first')
        // Cria um alarme para o tempo definido
        background(+pomodoro.value, Boolean(soundCheckbox.checked))
        // chrome.alarms.create('timer', { delayInMinutes: +pomodoro.value });

        setInterval(atualizarCronometro, 1000);
    })






    // Função para atualizar o cronômetro
    function atualizarCronometro() {
        // Atualiza o cronômetro
        segundos--;
        if (segundos <= -1) {
            segundos = 59;
            minutos--;
        }

        const tempoFormatado = pad(minutos) + ":" + pad(segundos);
        document.getElementById("tempoRestante").textContent = tempoFormatado;

        if (minutos <= 0 && segundos <= 0) {

            // createNotification();
        }
    }

    // Função para adicionar um zero à esquerda, se necessário
    function pad(valor) {
        return valor < 10 ? "0" + valor : valor;
    }





})

// chrome.alarms.create('timer', { delayInMinutes: 0.1 });

// Listener para quando o alarme dispara
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'timer') {
        createNotification();
    }
})

// Função para criar a notificação
function createNotification() {
    const options = {
        type: 'basic',
        iconUrl: '../icons/clock-48.png',
        title: 'Timer Finalizado',
        message: 'O tempo acabou!',
        silent: !soundCheckbox.checked
    };
    chrome.notifications.create(options);
}
