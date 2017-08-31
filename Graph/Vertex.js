class Vertex
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.listOfEdges = new Array();
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    addEdge(edge)
    {
        if (!this.listOfEdges.includes(edge))
        {
            this.listOfEdges.push(edge);
        }
    }
    isEqualVertex(vertex)
    {
        return (this.x === vertex.getX())&&(this.y === vertex.getY());
    }
    getNeighbourHood()
    {
        var listOfEdges = this.listOfEdges;
        var listOfNeighbour = new Array();
        var neighbour;
        var edge;
        var oppositeVertex;
        for (var i = 0 ; i < listOfEdges.length ; i++)
        {
            edge = listOfEdges[i];
            oppositeVertex = edge.getOppositeVertex(this);
            neighbour = {vertex : oppositeVertex , edge : edge};
            listOfNeighbour.push(neighbour);
        }
        return listOfNeighbour;
    }
    mergeEdges(vertex)
    {
        var listOfMyEdges = this.listOfEdges;
        var listOfHisEdges = vertex.getListOfEdges();
        for(var i = 0 ; i < listOfHisEdges.length ; i++)
        {
            var hisEdge = listOfHisEdges[i];
            var heIsInTheList = false;
            var j = 0;
            while((j < listOfMyEdges.length)&&(!heIsInTheList))
            {
                var myEdge = listOfMyEdges[j];
                heIsInTheList = heIsInTheList||(myEdge.isEqualEdge(hisEdge));
                j++;
            }
            if(!heIsInTheList)
            {
                this.addEdge(hisEdge);
            }
        }
        
    }
    getListOfEdges()
    {
        return this.listOfEdges;
    }
    
}