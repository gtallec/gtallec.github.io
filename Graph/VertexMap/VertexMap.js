class VertexMap extends Map
{
    constructor(listOfVertices,type)
    {
        super();
        this.type = type;
        this.listOfVertices = listOfVertices;
        var key = null;
        if(type === 'pi')
        {
            key = 100000;
        }
        for(var i = 0 ; i < listOfVertices.length ; i++)
        {
            this.set(listOfVertices[i],key);
        }
    }
}