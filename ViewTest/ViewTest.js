class ViewTest
{
    constructor(model)
    {
        this.model = model;
        this.viewTestMaze = new ViewTestMaze(model.getModelMaze());
        this.viewTestPacman = new ViewTestPacman(model.getModelPacman());
        var listOfModelGhosts = model.getListOfModelGhosts();
        this.listOfViewTestGhosts = new Array(listOfModelGhosts.length);
        for (var i = 0 ; i < listOfModelGhosts.length ; i++)
        {
            this.listOfViewTestGhosts[i] = new ViewTestGhost(listOfModelGhosts[i]);
        }
        this.matrixOfDisplay = null
    }
    updateAll()
    {  
        //Seulement le labyrinthe.
        this.matrixOfDisplay = this.viewTestMaze.updateMaze();
        //On ajoute le pacman
        this.matrixOfDisplay = this.viewTestPacman.updatePacmanPosition(this.matrixOfDisplay);
        var ghost;
        //Puis les fantomes
        for(var i = 0 ; i < this.listOfViewTestGhosts.length ; i++)
        {
            ghost = this.listOfViewTestGhosts[i];
            this.matrixOfDisplay = ghost.updateGhostPosition(this.matrixOfDisplay);
        }
        this.displayOnHTML()
    }
    displayOnHTML()
    {
        {
            var gameIsOver = this.model.getGameStatus();
            var stringToDisplay ="";
            if(gameIsOver)
            {
               stringToDisplay = 'DEFEAT';
            }
            else
            {
                var matrixOfDisplay = this.matrixOfDisplay;
                var aLine;
                for(var i = 0 ; i < matrixOfDisplay.length ; i++ )
                {
                    aLine = "";
                    for(var j = 0 ; j < matrixOfDisplay[i].length ; j++)
                    {
                        aLine = aLine + " " + matrixOfDisplay[i][j];
                    }
                    stringToDisplay = stringToDisplay + "<br/>" + aLine;  
                }
            }
            var element = document.getElementById('game');
            element.innerHTML = stringToDisplay;
        }
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