export const background = (tempo, som) => {

    console.log(som)
    console.log(typeof som)
    chrome.alarms.create('timer', { delayInMinutes: tempo });

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
            silent: !som
        };
        chrome.notifications.create(options);
    }

}