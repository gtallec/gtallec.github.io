
class Graph
{
    constructor()
    {
        this.listOfVertices = new Array();
        this.numberOfVertices = 0;
    }
    //Renvoie la direction que le fantome doit prendre à l'intersection
    dijkstra(root, end)
    {

        //réinitialise tous les sommets avant d'appliquer dijkstra
        var alreadySeen = new Array();
        var vertexPi = new VertexPi(this.listOfVertices);
        var vertexPere = new VertexPere(this.listOfVertices);
        var root = this.findMatchingVertex(root);
        var end = this.findMatchingVertex(end);
        var vertex = root;
        var pivot = root;
        var piPivot = 0;
        vertexPi.setPi(pivot,0);
        alreadySeen.push(pivot);
        while((pivot !== end)&&(alreadySeen.length !== this.listOfVertices.length))
        {
            //Relache les voisins.
            var neighbourHood = pivot.getNeighbourHood();
            for(var i = 0 ; i < neighbourHood.length ; i++)
            {
                var neighbour = neighbourHood[i];
                var weight = neighbour.edge.getDistance();
                var pi = vertexPi.getPi(neighbour.vertex);
                if(piPivot + weight <= pi)
                {
                    vertexPi.setPi(neighbour.vertex,piPivot + weight);
                    vertexPere.setPere(neighbour.vertex,neighbour.edge);
                }   
            }
            //trouve le nouveau pivot.
            var vertex = null;
            var i = 0;
            var found = false;
            while((i < this.listOfVertices.length)&&(!found))
            {
                found = !alreadySeen.includes(this.listOfVertices[i]);
                vertex = this.listOfVertices[i];
                i++;
            }
            pi = vertexPi.getPi(vertex);
            piPivot = pi;
            pivot = vertex;
            for(var i = 0 ; i < this.listOfVertices.length ; i++)
            {
                vertex = this.listOfVertices[i];
                if (!alreadySeen.includes(vertex))
                {
                    pi = vertexPi.getPi(vertex);
                    if (pi < piPivot)
                    {
                        piPivot = pi;
                        pivot = vertex;
                    }
                }
            }
            alreadySeen.push(pivot);
        }
        //depile le chemin de manière à faire choisir la bonne direction
        return vertexPere.getDirection(root,end);

    }  
    addVertex(vertex)
    {
        this.listOfVertices.push(vertex);
        this.numberOfVertices++;
    }
    findMatchingVertex(vertex)
    {
        var xVertex = vertex.getX();
        var yVertex = vertex.getY();
        var listOfVertices = this.listOfVertices;
        var i = 0;
        var found = false;
        var vertex;
        while((i<listOfVertices.length)&&(!found))
        {
            vertex = listOfVertices[i];   
            found = (xVertex === vertex.getX())&&(yVertex === vertex.getY());
            i++;
        }
        if(found)
        {
            return listOfVertices[i-1];
        }
        return null;
    }
}