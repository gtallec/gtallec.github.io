function worker_function() 
{
    var pulseUpdate = setInterval(function(){postMessage('');},10);
}
// This is in case of normal worker start
// "window" is not defined in web worker
// so if you load this file directly using `new Worker`
// the worker code will still execute properly
if(window!=self)
  worker_function();