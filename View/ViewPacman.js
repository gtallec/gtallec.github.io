class ViewPacman extends ViewMovingActor
{
    constructor(modelPacman,caseLength)
    {
        super(modelPacman,caseLength);
    }
    selectMovingActor()
    {
        var xPacman = this.modelMovingActor.getX();
        var yPacman = this.modelMovingActor.getY();
        var pacman = document.getElementsByClassName('pacman');
        return pacman[0].childNodes[0];
    }
    createMovingActor(pacmanElement)
    {
        var caseLength = this.caseLength;
        var xMovingActor = this.modelMovingActor.getX();
        var yMovingActor = this.modelMovingActor.getY();
        var movingActor = document.createElement('div');
        movingActor.style.top = caseLength * xMovingActor + 'px';
        movingActor.style.left = caseLength * yMovingActor + 'px';
        movingActor.style.width = caseLength + 'px';
        movingActor.style.height = caseLength + 'px';
        movingActor.style.backgroundColor = 'yellow';
        movingActor.style.position = 'relative';
        pacmanElement.appendChild(movingActor);
    }
}
    