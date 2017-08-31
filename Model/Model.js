class Model
{
    constructor(level)
    {
        this.gameIsOver = false;
        //var intelFromDB = this.getIntelFromDB(level);
        //About the maze
        this.modelMaze = new ModelMaze(this,null);
        this.normalMode = true;
        //null is to be replaced by intelfromDB.maze
        //var listOfGhosts = intelFromDB.listOfGhosts;
        var listOfGhosts = [0];
        //About the ghosts
        var ghost;
        var xGhost;
        var yGhost;
        var ghostSpeed;
        var trollingProbability;
        var modelGhost;
        var numberOfSubdivisions = 1000;
        this.listOfModelGhosts = new Array();
        for(var i = 0 ; i < listOfGhosts.length ; i++)
        {
           /* ghost = listOfGhosts[i];
            xGhost = ghost.x;
            yGhost = ghost.y;
            ghostSpeed = ghost.speed;
            trollingProbability = ghost.trollingProbability;*/
            xGhost = 5;
            yGhost = 3;
            ghostSpeed = 10;
            trollingProbability = 0.5;
            modelGhost = new ModelGhost(xGhost,yGhost,ghostSpeed,numberOfSubdivisions,this,trollingProbability,i);
            this.listOfModelGhosts.push(modelGhost);
        }
        //About PACMAN
        //var pacman = intelFromDB.pacman;
        var xPacman = 1; //pacman.x;
        var yPacman = 1; //pacman.y;
        var pacmanSpeed = 10; //pacman.speed;
        this.modelPacman = new ModelPacman(xPacman,yPacman,pacmanSpeed,numberOfSubdivisions,this);
        //Initialise the view
        this.view = new View(this);
    }
    changePacmanPosition(direction)
    {
        this.modelPacman.setDirection(direction);
        this.modelPacman.followDirection();
    }
    changeGhostPosition()
    {
        var listOfModelGhosts = this.listOfModelGhosts;
        for (var i = 0 ; i < listOfModelGhosts.length ; i++)
        {
            listOfModelGhosts[i].updateGhostPosition();
        }
    }
    askModelMazeForPermission(x,y)
    {
        return this.modelMaze.askPermission(x,y);
    }
    getBestPath(xGhost,yGhost)
    {
        var xPacman = this.modelPacman.getX();
        var yPacman = this.modelPacman.getY();
        return this.modelMaze.findBestPath(xGhost,yGhost,xPacman,yPacman);
    }
    getModelMaze()
    {
        return this.modelMaze;
    }
    getListOfModelGhosts()
    {
        return this.listOfModelGhosts;
    }
    getModelPacman()
    {
        return this.modelPacman;
    }
    getView()
    {
        return this.view;
    }
    askModelMazeIfOnVertex(x,y)
    {
        return this.modelMaze.askGraphIfOnVertex(x,y);
    }
    checkForCollisionWithPacman(xGhost,yGhost)
    {
        var xPacman = this.modelPacman.getX();
        var yPacman = this.modelPacman.getY();
        if((xGhost===xPacman)&&(yGhost===yPacman))
        {
            if(this.normalMode)
            {
                this.modelPacman.disable();
                this.gameIsOver = true;
                return null;
            }
            else
            {
                return 'disable';
            }
        }
    }
    getGameStatus()
    {
        return this.gameIsOver;
    }
    getLengthOfMaze()
    {
        console.log('coucou c est moi');
        return this.modelMaze.getLength();
    }
}