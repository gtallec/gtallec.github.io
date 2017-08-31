class ViewTestPacman extends ViewTestMovingActor
{
    constructor(modelPacman)
    {
        super(modelPacman);
    }
    updatePacmanPosition(matrixOfDisplay)
    {
        return this.updateMovingActorPosition(matrixOfDisplay,'pacman');
    }

}