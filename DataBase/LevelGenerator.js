class LevelGenerator
{
    constructor(maze)
    {
        this.maze = null;
    }
    generateMaze(height,width)
    {
        var mazeCreator = new MazeCreator(height,width);
        mazeCreator.createMaze();
        var maze = mazeCreator.getMaze();
        var height = 2*maze.length + 1;
        var width;
        var aLine;
        var box;
        var finalMaze = new Array(height);
        for(var i = 0 ; i < height ; i++)
        {
            console.log(maze[i]);
            width = 2*maze[0].length + 1;
            // we assume that labyrinthe are rectangles
            aLine = new Array(width);
            for(var j = 0 ; j < width ; j++)
            {
                aLine[j] = false;
            }
            finalMaze[i] = aLine;   
        }
        for (var i = 0 ; i < maze.length ; i++)
        {
            for(var j = 0 ; j < maze[i].length ; j++)
            {
                box = maze[i][j];
                finalMaze[2*i + 1][2*j + 1] = true;
                if(box.getLeftWall())
                {
                    finalMaze[2*i + 1][2*j] = true;
                }
                if(box.getRightWall())
                {
                    finalMaze[2*i + 1][2*(j+1)] = true;
                }
                if(box.getUpWall())
                {
                    finalMaze[2*i][2*j + 1] = true;
                }
                if(box.getDownWall())
                {
                    finalMaze[2*(i+1)][2*j + 1] = true;
                }
            }
        }
        console.log(finalMaze);
        this.maze = finalMaze;
        return finalMaze;
    }
    generatePacman()
    {
        var maze = this.maze;
        var found = false;
        var i = 0;
        var j;
        while((i < this.maze.length)&&(!found))
        {
            j = 0;
            while((j < this.maze[i].length)&&(!found))
            {
                found = maze[i][j];
                j++;
            }
            i++;
        }
        var xPacman = i - 1;
        var yPacman = j - 1;
        var speedPacman = 1;
        return {x : xPacman, y : yPacman, speed : speedPacman};  
    }
    generateGhosts()
    {
        var maze = this.maze;
        var numberOfGhosts = 1;
        var height = maze.length
        //dans l'idéal le nombre de fantome est fonction des dimensions de mon labyrinthe
        var listOfGhosts = new Array(numberOfGhosts);
        var alreadyTaken = new Array();
        for(var i  = 0 ; i < numberOfGhosts ; i++)
        {
            var found = false;
            var j = height - 1;
            var k;
            while((j >= 0)&&(!found))
            {
                k = maze[j].length - 1;
                while((k >= 0)&&(!found))
                {
                    found = maze[j][k]&&(!alreadyTaken.includes(j*height + k));
                    k--;
                }
                j--;
            }
            var xGhost = j + 1;
            var yGhost = k + 1;
            var speedGhost = 1;
            var trollingProbability = 0.5;
            var number = i;
            var ghost = {x : xGhost, y : yGhost, speed : speedGhost, trollingProbability : trollingProbability, number : number};
            listOfGhosts[i] = ghost;
            alreadyTaken.push(xGhost * height + yGhost); 
        }
        return listOfGhosts; 
    }
    generateLevel(height,width)
    {
        var maze = this.generateMaze(height,width);
        var pacman = this.generatePacman();
        var listOfGhosts = this.generateGhosts();
        return {maze : maze, pacman : pacman, listOfGhosts : listOfGhosts};
    }
}