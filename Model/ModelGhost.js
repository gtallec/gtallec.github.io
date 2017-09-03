class ModelGhost extends ModelMovingActor
{
    // dans la pratique le fantome est soit relié à la view soit relié au game pour l'instant on le relie à a view
    constructor(ghost, numberOfSubdivisions, model)
    {
        super(ghost,numberOfSubdivisions,model);
        this.number = ghost.number;
        this.trollingProbability = ghost.trollingProbability;
        this.moving = false;
    }
    generateRandomPath()
    {
        var random = Math.random();
        if (random < 0.25)
        {
            return 'right';
        }
        else if (random < 0.5)
        {
            return 'left';
        }
        else if (random < 0.75)
        {
            return 'up';
        }
        else
        {
            return 'down';
        }
    }
    checkIfPacmanCaught()
    {
        var modelAnswer = this.model.checkForCollisionWithPacman(this.x,this.y);
        if(modelAnswer === 'disable')
        {
            this.disable();
        }
    }
    takeDecision()
    {
        var random = Math.random();
        if(random < this.trollingProbability)
        {
            this.direction = this.generateRandomPath();
        }
        else
        {
            this.direction = this.askModelForDirection();
        }
        this.followDirection();
    }
    updateGhostPosition()
    {
        this.moving = (!this.checkIfOnVertex());
        this.checkIfPacmanCaught();
        if(!this.moving)
        {
            this.takeDecision();
        }
        else
        {
            this.followDirection();
        }
    }
    checkIfOnVertex()
    {
        var direction = this.direction;
        var permission = true
        switch(direction)
        {
            case 'up':
            case 'down':
            {
                permission = (this.xSubdivision === 0);
                break;
            }
            case 'left':
            case 'right':
            {
                permission = (this.ySubdivision === 0);
                break;
            }
        }
        console.log(this.model);
        return permission&&this.model.askModelMazeIfOnVertex(this.x,this.y);
    }
    askModelForDirection()
    {
        return this.model.getBestPath(this.x,this.y);
    }
    getNumber()
    {
        return this.number;
    }
}