class ModelPacman extends ModelMovingActor
{
    constructor(x,y,speed,numberOfSubdivisions,model)
    {
        super(x,y,speed,numberOfSubdivisions,model);
    }
    setDirection(direction)
    {
        this.direction = direction;
    }
}