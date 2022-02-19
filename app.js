document.getElementById('submit').addEventListener('click', ()=>{
    var idea = document.getElementById('idea').value;
    var time = new Date();
    if(idea && idea.length<=85 && time.getTime() - Number(localStorage.getItem('lastVisit')) > 86400000){
        var ws = new WebSocket('wss://milliondollaridea.glitch.me/');
        ws.onopen = e => {
            var data = new DataObj(idea, 'idea');
            ws.send(JSON.stringify(data));
            localStorage.setItem('lastVisit', time.getTime());
            getLogs();
        }
    }
    else if(!idea){
        document.getElementById('error').innerHTML = 'please enter an idea';
    }
    else if(idea.length>85){
        document.getElementById('error').innerHTML = 'try and fit your idea into 85 characters';
    }
    else if(time.getTime() - Number(localStorage.getItem('lastVisit')) < 86400000){
        document.getElementById('error').innerHTML = 'you can only enter one idea per day';
    }
});

class DataObj{
    constructor(value, type){
        this.type = type;
        this.value = value;
        this.timestamp = new Date();
    }
}

function getLogs(){
    var logs = new WebSocket('wss://milliondollaridea.glitch.me/');
    document.getElementById('output').innerHTML = '';
    logs.onopen = e => {
        var data = new DataObj(idea, 'logs');
        logs.send(JSON.stringify(data));
    }
    logs.onmessage = m => {
        m.data.split('\n').reverse().forEach(e => {
            var p = document.createElement('p');
            p.textContent = e;
            document.getElementById('output').appendChild(p);
            logs.close();
        });
    }
}

getLogs();