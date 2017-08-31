class View
{
    constructor(model)
    {
        this.model = model;
        console.log(model);
        this.caseLength = 10;
        this.viewMaze = new ViewMaze(model.getModelMaze(),this.caseLength);
        this.viewPacman = new ViewPacman(model.getModelPacman(),this.caseLength);
        var listOfModelGhosts = model.getListOfModelGhosts();
        this.listOfViewGhosts = new Array(listOfModelGhosts.length);
        for (var i = 0 ; i < listOfModelGhosts.length ; i++)
        {
            this.listOfViewGhosts[i] = new ViewGhost(listOfModelGhosts[i],this.caseLength);
        }
        this.matrixOfDisplay = null;

    }
    createView()
    {
        var animation = document.getElementById('game');
        var lengthOfMaze = this.model.getLengthOfMaze();
        var caseLength = this.caseLength;
        animation.style.width = caseLength * lengthOfMaze.width + 'px';
        animation.style.height = caseLength * lengthOfMaze.height + 'px';
        animation.style.position = 'relative';
        animation.style.backgroundColor = 'white';
        var mazeElement = document.createElement('div');
        mazeElement.className = 'maze';
        this.viewMaze.createMaze(mazeElement);
        animation.appendChild(mazeElement);
        
        var pacmanElement = document.createElement('div');
        pacmanElement.className = 'pacman';
        this.viewPacman.createMovingActor(pacmanElement);
        animation.appendChild(pacmanElement);
        
        var ghostElement = document.createElement('div');
        ghostElement.className = 'ghost';
        for(var i = 0 ; i < this.listOfViewGhosts.length ; i++)
        {
            this.listOfViewGhosts[i].createMovingActor(ghostElement);
        }
        animation.appendChild(ghostElement);
    }
    updateAll()
    {  
        //Seulement le labyrinthe.
        this.viewMaze.updateMaze();
        //On ajoute le pacman
        this.viewPacman.updateMovingActorPosition();
        //Puis les fantomes
        var ghost;
        for(var i = 0 ; i < this.listOfViewGhosts.length ; i++)
        {
            ghost = this.listOfViewGhosts[i];
            ghost.updateMovingActorPosition();
        }
        //this.displayOnHTML()
    }
    displayPreparationContent()
    {
        document.getElementById('instruction').innerHTML = 'Press any button to start';
    }
    displayScores()
    {
        document.getElementById('instruction').innerHTML = this.getScore();
    }
    getScore()
    {
        return ' ';
    }


}