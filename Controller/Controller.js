class Controller
{
    constructor()
    {
        this.state = 'initializing';
        this.model = null;
        this.view = null;
        this.levelEnded = 10000;
        this.gameEnded = 1;
        this.worker = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
        var controller = this;
        this.worker.onmessage = function(e)
        {
            controller.handleUpdate();
        }
    }
    preloadGame(level)
    {
        this.model = new Model(level,this);
        this.model.sendRequestToDB();
    }
    startLevel()
    {
        this.view = this.model.getView();
        this.view.displayPreparationContent();
        this.view.createView();
        this.state = 'waitingForPlayer';
    }
    tack(direction)
    {
        this.direction = direction;
        if(this.state === 'waitingForPlayer')
        {
            this.state = 'update';
            this.view.displayScores();
            this.update();
            this.askForUpdate();
        }
    }
    handleUpdate()
    {
        if (this.state === 'update')
        {
            this.update();
        }
    }
    update()
    {
        this.updateGhostPosition();
        this.updatePacmanPosition();
        this.view.updateAll();
    }
    
    askForUpdate()
    {
        this.worker.postMessage('bip');
    }
    playAGame()
    {
        this.preloadGame(0);
    }
    updatePacmanPosition()
    {
        this.model.changePacmanPosition(this.direction);
    }
    updateGhostPosition()
    {
       this.model.changeGhostPosition(); 
    }

}