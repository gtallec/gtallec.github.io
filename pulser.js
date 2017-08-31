
function sendPulse()
{
    postMessage('');
}
var onmessage = function(e)
{
    var pulseUpdate = setInterval(function(){sendPulse()},10);  
}