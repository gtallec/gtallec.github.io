class ViewGhost extends ViewMovingActor
{
    constructor(modelGhost,caseLength)
    {
        super(modelGhost,caseLength)
    }
    selectMovingActor()
    {
        var number = this.modelMovingActor.getNumber();
        var xGhost = this.modelMovingActor.getX();
        var yGhost = this.modelMovingActor.getY();
        var ghosts = document.getElementsByClassName('ghost')[0];
        var number = this.modelMovingActor.getNumber();
        var ghost = ghosts.childNodes[number];
        return ghost;  
    }
    createMovingActor(ghostElement)
    {
        var caseLength = this.caseLength;
        var xMovingActor = this.modelMovingActor.getX();
        var yMovingActor = this.modelMovingActor.getY();
        var movingActor = document.createElement('div');
        movingActor.style.top = caseLength * xMovingActor + 'px';
        movingActor.style.left = caseLength * yMovingActor + 'px';
        movingActor.style.width = caseLength + 'px';
        movingActor.style.height = caseLength + 'px';
        movingActor.style.backgroundColor = 'red';
        movingActor.style.position = 'absolute';
        ghostElement.appendChild(movingActor); 
    }
    
}