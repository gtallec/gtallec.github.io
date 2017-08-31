class VertexArray extends Array
{
    constructor()
    {
        super();
    }
    includes(vertex)
    {
        var currentVertex;
        var isInTheList = false;
        var i = 0;
        while ((i < this.length)&&(!isInTheList))
        {
            currentVertex = this[i];
            isInTheList = isInTheList||(currentVertex.isEqualVertex(vertex));
            i++;
        }
        if(isInTheList)
        {
            this[i-1].mergeEdges(vertex);
        }
        return isInTheList;
    }
}