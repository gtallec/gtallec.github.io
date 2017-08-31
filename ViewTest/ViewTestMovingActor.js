class ViewTestMovingActor
{
    constructor(modelMovingActor)
    {
        this.modelMovingActor = modelMovingActor;
    }
    updateMovingActorPosition(matrixOfDisplay,name)
    {
        var xMovingActor = this.modelMovingActor.getX();
        var yMovingActor = this.modelMovingActor.getY();
        if((xMovingActor != -1)&&(yMovingActor != -1))
        {
            matrixOfDisplay[xMovingActor][yMovingActor] = name;
        }
        return matrixOfDisplay;
    }
}