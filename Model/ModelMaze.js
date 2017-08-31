class ModelMaze
{
    constructor(model,logicMaze)
    {
        //this.logicMaze = logicMaze;
        this.logicMaze = [
                            [false,false,false,false,false,false,false,false],
                            [false,true,true,true,true,true,true,false],
                            [false,false,false,false,false,false,true,false],
                            [false,true,true,true,true,false,true,false],
                            [false,true,false,false,true,false,true,false],
                            [false,true,false,true,true,false,true,false],
                            [false,true,false,false,false,false,true,false],
                            [false,true,true,true,true,true,true,false],
                            [false,false,false,false,false,false,false,false],
                        ];
        this.graphOfIntersections = this.createIntersectionFromMaze();
        console.log(this.graphOfIntersections)
        /*just for test
        var listOfVertices = this.graphOfIntersections.listOfVertices;
        //console.log(this.locateClosestVertex(0,3));
        for (var i = 0 ; i < listOfVertices.length ; i++)
        {
            console.log(listOfVertices[i]);
            var listOfEdges = listOfVertices[i].listOfEdges;
            for (var j = 0 ; j < listOfEdges.length ; j++)
            {
                console.log(listOfEdges[j]);
            }
            
        }*/
    }
    getLogicMaze()
    {
        return this.logicMaze;
    }
    getLength()
    {
        return {height : this.logicMaze.length, width : this.logicMaze[0].length};
    }
    //Crée le graph des intersections a partir du labyrinthe.Check.
    createIntersectionFromMaze()
    {
        var graphOfIntersections = new Graph();
        var alreadySeen = new VertexArray();
        var toBeTreated = new Array();
        var edgeAlreadySeen = new EdgeArray();
        var maze = this.logicMaze;
        var size = maze.length;
        var index = 1;
        var intersectionX = 0;
        var intersectionY = 0;
        var firstintersection = false;
        var box = this.isIntersection(intersectionX,intersectionY);
        //on commence par chercher la première intersection.
        while((box === null)&&(index<maze.length * maze[0].length))
        {
            intersectionY = index%size;
            intersectionX = (index - index%size)/size;
            if(maze[intersectionX][intersectionY])
            {
                box = this.isIntersection(intersectionX,intersectionY);
            }
            index++;
        }
        //si il n'y a pas 
        if (box === null)
        {
            return graphOfIntersections;
        }
        //box contient ainsi la première intersection et intersectionX et instersectionY contiennenent respectivement l'abscisse et l'ordonnée de la dite intersection.
        var vertex = new Vertex(intersectionX,intersectionY);
        toBeTreated.push(vertex);
        alreadySeen.push(vertex);
        while (toBeTreated.length !== 0)
        {
            vertex = toBeTreated.pop();
            intersectionX = vertex.getX();
            intersectionY = vertex.getY();
            box = this.isIntersection(intersectionX,intersectionY);
            var snitch = 1;
            var newBox = null;
            if (box.right)
            {
                while ((intersectionY + snitch < maze[intersectionX].length)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX, intersectionY + snitch)
                    snitch ++;
                }
                snitch = snitch - 1;
                if (intersectionY + snitch < maze[intersectionX].length)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à droite
                    var rightVertex = new Vertex(intersectionX,intersectionY + snitch);
                    //On ajoute alors l'arête au sommet correspondant.
                    var rightEdge = new Edge(vertex,rightVertex,'right');
                    var leftEdge = new Edge(rightVertex,vertex,'left');
                    if(!edgeAlreadySeen.includes(rightEdge))
                    {
                        vertex.addEdge(rightEdge);
                        edgeAlreadySeen.push(rightEdge);
                    }
                    if(!edgeAlreadySeen.includes(leftEdge))
                    {
                        rightVertex.addEdge(leftEdge);
                        edgeAlreadySeen.push(leftEdge);
                    }
                    if(!alreadySeen.includes(rightVertex))
                    {
                        alreadySeen.push(rightVertex);
                        toBeTreated.push(rightVertex);
                    }
                    
                }
            }
            snitch = 1;
            newBox = null;
            if (box.left)
            {
                while ((intersectionY - snitch >= 0)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX, intersectionY - snitch);
                    snitch++;
                }
                snitch = snitch - 1;
                if (intersectionY - snitch >= 0)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à gauche
                    var leftVertex = new Vertex(intersectionX,intersectionY - snitch);
                    //On ajoute alors l'arête au sommet correspondant.
                    var leftEdge = new Edge(vertex,leftVertex,'left');
                    var rightEdge = new Edge(leftVertex,vertex,'right');
                    if(!edgeAlreadySeen.includes(leftEdge))
                    {
                        vertex.addEdge(leftEdge);
                        edgeAlreadySeen.push(leftEdge);    
                    }
                    if(!edgeAlreadySeen.includes(rightEdge))
                    {
                        leftVertex.addEdge(rightEdge);
                        edgeAlreadySeen.push(rightEdge);
                    }
                    if(!alreadySeen.includes(leftVertex))
                    {
                        alreadySeen.push(leftVertex);
                        toBeTreated.push(leftVertex);
                    }  
                }
            }
            snitch = 1;
            newBox = null;
            if (box.down)
            {
                while ((intersectionX + snitch < maze.length)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX + snitch, intersectionY);
                    snitch ++;
                }
                snitch = snitch - 1;
                if (intersectionX + snitch < maze.length)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à gauche
                    var downVertex = new Vertex(intersectionX + snitch,intersectionY);
                    //On ajoute alors l'arête au sommet correspondant.
                    var downEdge = new Edge(vertex,downVertex,'down');
                    var upEdge = new Edge(downVertex,vertex,'up');
                    if(!edgeAlreadySeen.includes(downEdge))
                    {
                        vertex.addEdge(downEdge);
                        edgeAlreadySeen.push(downEdge);
                    }
                    if(!edgeAlreadySeen.includes(upEdge))
                    {
                        downVertex.addEdge(upEdge);
                        edgeAlreadySeen.push(upEdge);
                    }
                    if(!alreadySeen.includes(downVertex))
                    {
                        alreadySeen.push(downVertex);
                        toBeTreated.push(downVertex);
                    }
                }
            }
            snitch = 1;
            newBox = null;
            if (box.up)
            {
                while ((intersectionX - snitch >= 0)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX - snitch, intersectionY);
                    snitch ++;
                }
                snitch = snitch - 1;
                if (intersectionX - snitch >= 0)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à gauche

                    var upVertex = new Vertex(intersectionX - snitch,intersectionY);
                    //On ajoute alors l'arête au sommet correspondant.
                    var upEdge = new Edge(vertex,upVertex,'up');
                    var downEdge = new Edge(upVertex,vertex,'down');
                    if(!edgeAlreadySeen.includes(upEdge))
                    {
                        vertex.addEdge(upEdge);
                        edgeAlreadySeen.push(upEdge);
                    }
                    if(!edgeAlreadySeen.includes(downEdge))
                    {
                            upVertex.addEdge(downEdge);
                            edgeAlreadySeen.push(downEdge);
                    }
                    if(!alreadySeen.includes(upVertex))
                    {
                        console.log(upVertex.listOfEdges);
                        alreadySeen.push(upVertex);
                        toBeTreated.push(upVertex);
                    }    
                }
            }
            graphOfIntersections.addVertex(vertex);   
        }
        return graphOfIntersections;
    }
    //vérifie si une case est une intersection ou non.Check
    isIntersection(x,y)
    {
        var maze = this.logicMaze;
        var up = false;
        var down = false;
        var left = false;
        var right = false;
        
        if (x-1>=0)
        {
            up = maze[x-1][y];
        }
        if (x+1<maze.length)
        {
            down = maze[x+1][y];
        }
        if (y-1>=0)
        {
            left = maze[x][y-1];
        }
        if (y+1<maze[x].length)
        {
            right = maze[x][y+1];
        }
        var numberOfIntersections = 0;
        if (right)
        {
            numberOfIntersections++;
        }
        if (up)
        {
            numberOfIntersections++;
        }
        if (left)
        {
            numberOfIntersections++;
        }
        if (down)
        {
            numberOfIntersections++;
        }
        if ((right&&down)||(down&&left)||(left&&up)||(up&&right)||(numberOfIntersections > 2)||(numberOfIntersections === 1))
        {
            var intersections = {right : right, left : left, up : up, down : down};
            return intersections;
        }
        else
        {
            return null;
        }
        
    }
    vertexIsInArray(arrayToBeTested, vertex)
    {
        var found = false;
        for(var i = 0 ; i < arrayToBeTested.length ; i++)
        {
            found = found || arrayToBeTested[i].isEqualVertex(vertex);
        }
        return found;
    }
    locateClosestVertex(x,y)
    {
        if((x===-1)&&(y===-1))
        {
            return null;
        }
        var maze = this.logicMaze;
        var box = {down : (x+1<maze.length)&&(maze[x+1][y]), up : (x-1>=0)&&(maze[x-1][y]), left : (y-1>=0)&&(maze[x][y-1]), right : (y+1<maze[x].length)&&(maze[x][y+1])};
        var newBox = null;
        var score = 10000000;
        var currentScore = 1;
        var closestVertex = null;
        var direction;
        if (this.isIntersection(x,y)!=null)
        {
            direction = null;
            closestVertex = new Vertex(x,y);
            score = 0;
            //console.log("dessus," + score);
        }
        if(box.down)
        {
            while((newBox === null)&&(x+currentScore<maze.length))
            {
                newBox = this.isIntersection(x+currentScore,y);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'up';
                closestVertex = new Vertex(x+currentScore,y);
                //console.log("down," + score);
                
                
            }
        }
        newBox = null;
        currentScore = 1;
        if(box.up)
        {
            while((newBox === null)&&(x-currentScore>=0))
            {
                newBox = this.isIntersection(x-currentScore,y);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'down';
                closestVertex = new Vertex(x-currentScore,y);
                //console.log("up," + score);
            }
        }
        newBox = null;
        currentScore = 1;
        if(box.right)
        {
            while((newBox === null)&&(y+currentScore<maze[x].length))
            {
                newBox = this.isIntersection(x,y+currentScore);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'left';
                closestVertex = new Vertex(x,y+currentScore);
                //console.log("right," + score);
            }
        }
        newBox = null;
        currentScore = 1;
        if(box.left)
        {
            while((newBox === null)&&(y-currentScore>=0))
            {
                newBox = this.isIntersection(x,y-currentScore);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'right';
                closestVertex = new Vertex(x,y-currentScore);
                //console.log("left," + score);
            }
        }
        return {vertex : closestVertex, direction : direction};
    }
    askPermission(x,y)
    {
        var logicMaze = this.logicMaze;
        return (x>=0)&&(x<logicMaze.length)&&(y>=0)&&(y<logicMaze[x].length)&&(logicMaze[x][y]);
    }
    findBestPath(xGhost,yGhost,xPacman,yPacman)
    {
        var vertexOfGhost = new Vertex(xGhost,yGhost);
        var path = this.locateClosestVertex(xPacman,yPacman);
        if(path === null)
        {
            return null;
        }
        var vertexOfPacman = path.vertex;
        var direction;
        if (vertexOfGhost.isEqualVertex(vertexOfPacman))
        {
            //console.log('coucou');
            direction = path.direction;
        }
        else
        {
            //console.log(vertexOfGhost);
            //console.log(vertexOfPacman);
            direction = this.graphOfIntersections.dijkstra(vertexOfGhost,vertexOfPacman);
        }
        return direction;
    }
    askGraphIfOnVertex(x,y)
    {
        var ghostVertex = new Vertex(x,y);
        return (this.graphOfIntersections.findMatchingVertex(ghostVertex) != null);
    }
}