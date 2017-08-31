class ViewTestGhost extends ViewTestMovingActor
{
    constructor(modelGhost)
    {
        super(modelGhost);
    }
    updateGhostPosition(matrixOfDisplay)
    {
        return this.updateMovingActorPosition(matrixOfDisplay,'ghost');
    } 
}