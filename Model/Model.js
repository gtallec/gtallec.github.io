class Model
{
    constructor(level,controller)
    {
        this.state = "initializing";
        this.randomizeLabyrinthe = true;
        this.controller = controller;
        this.level = level;
        this.gameIsOver = null;
        this.modelMaze = null;
        this.normalMode = null;
        this.listOfModelGhosts = null;
        this.modelPacman = null;
        this.view = null;
        this.dataBaseReader = new DataBaseReader(this);
    }
    sendRequestToDB()
    {
        if(this.randomizeLabyrinthe)
        {
            this.getRandomIntel(5,5);
        }
        else
        {
            this.dataBaseReader.loadLevel(this.level);
        }
    }
    initialize(intelFromDB)
    {
        if(this.state === "initializing")
        {
            this.gameIsOver = false;
            var numberOfSubdivisions = 10;
            //About the maze
            var maze = intelFromDB.maze;
            this.modelMaze = new ModelMaze(this,maze);
            this.normalMode = true;
            //About the ghosts
            var listOfGhosts = intelFromDB.listOfGhosts;
            var ghost;
            var modelGhost;
            this.listOfModelGhosts = new Array(listOfGhosts.length);
            for(var i = 0 ; i < listOfGhosts.length ; i++)
            {
                ghost = listOfGhosts[i];
                modelGhost = new ModelGhost(ghost,numberOfSubdivisions,this);
                this.listOfModelGhosts[i] = modelGhost;
            }
            //About PACMAN
            var pacman = intelFromDB.pacman;
            this.modelPacman = new ModelPacman(pacman,numberOfSubdivisions,this);
            //Initialise the view
            this.view = new View(this);
            this.controller.startLevel();
        }
        this.state = 'update';
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
        return this.modelMaze.getLength();
    }
    getRandomIntel(height,width)
    {
        var levelGenerator = new LevelGenerator();
        var intel = levelGenerator.generateLevel(height,width);
        this.initialize(intel);
    }
}