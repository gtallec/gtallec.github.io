class VertexPi extends VertexMap
{
    constructor(listOfVertices)
    {
        super(listOfVertices,'pi');  
    }
    setPi(vertex,pi)
    { 
        this.set(vertex,pi);
    }
    getPi(vertex)
    {
        return this.get(vertex);
    }
}