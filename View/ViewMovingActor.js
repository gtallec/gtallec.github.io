class ViewMovingActor
{
    constructor(modelMovingActor,caseLength,name)
    {
        this.modelMovingActor = modelMovingActor;
        this.caseLength = caseLength;
        //la longueur d'une case en pixel
    }
    updateMovingActorPosition()
    {
        var xMovingActor = this.modelMovingActor.getX();
        var yMovingActor = this.modelMovingActor.getY();
        var numberOfSubdivisions = this.modelMovingActor.getNumberOfSubdivisions();
        var step = this.caseLength/numberOfSubdivisions;
        var subdivision = this.modelMovingActor.getSubdivisions();
        var movingActor = this.selectMovingActor();
        var caseLength = this.caseLength;
        if((xMovingActor != -1)&&(yMovingActor != -1))
        {
            movingActor.style.top = (caseLength * xMovingActor + step * subdivision.x) + 'px';
            movingActor.style.left = (caseLength * yMovingActor + step * subdivision.y) + 'px';
        }
        else
        {
            movingActor.style.backgroundColor = 'white';
        }
    }
    selectMovingActor()
    {
        
    }
    createMovingActor()
    {

        
    }
}