class VertexPere extends VertexMap
{
    constructor(listOfVertices)
    {
        super(listOfVertices,'pere');
    }
    setPere(vertex,pere)
    {
        this.set(vertex,pere);
    }
    getPere(vertex)
    {
        return this.get(vertex);
    }
    getDirection(root,end)
    {
        var vertex = end;
        var father;
        while(vertex !== root)
        {
            father = this.getPere(vertex);
            vertex = father.getOppositeVertex(vertex);
        }
        return father.getDirection();
    }
}