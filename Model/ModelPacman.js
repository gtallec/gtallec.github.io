class ModelPacman extends ModelMovingActor
{
    constructor(pacman,numberOfSubdivisions,model)
    {
        super(pacman,numberOfSubdivisions,model);
    }
    setDirection(direction)
    {
        this.direction = direction;
    }
}