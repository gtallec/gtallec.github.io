class MazeCreator
{
    constructor(height,width)
    {
        var maze = new Array(height);
        var connexePart;
        var box;
        for(var i = 0 ; i < height ; i++)
        {
            var aLine = new Array(width);
            for (var j = 0 ; j < width ; j++)
            {
                connexePart = new ConnexePart(i*height + j, height*width);
                aLine[j]= new Box(connexePart);
                connexePart.addBox(aLine[j]);
            }
            maze[i] = aLine;
            console.log(maze[i]);
        }
        console.log(maze);
        this.height = height;
        this.width = width;
        this.maze = maze;
    }
    checkIfEveryOneHasTheSameColor()
    {
        var maze = this.maze;
        var connexePart = maze[0][0].getConnexePart();
        return (connexePart.connexePartEqualsOmega());
    }
    createMaze()
    {
        var maze = this.maze;
        while(!this.checkIfEveryOneHasTheSameColor())
        {
            var i = this.randomIntFromInterval(0,this.height - 1);
            var j = this.randomIntFromInterval(0,this.width - 1);
            console.log(i + ',' + j);
            var allowedWall = new Array();
            if(i!=0)
            {
                allowedWall.push('up');
            }
            if(i!=this.height - 1)
            {
                allowedWall.push('down');
            }
            if(j!=0)
            {
                allowedWall.push('left');
            }
            if(j!=this.width - 1)
            {
                allowedWall.push('right');
            }
            var direction = maze[i][j].openRandomWall(allowedWall);
            var neighbourI = i;
            var neighbourJ = j;
            var oppositeDirection;
            switch(direction)
            {
                case 'right':
                {
                    neighbourJ = neighbourJ + 1;
                    oppositeDirection = 'left';
                    break;
                }
                case 'left':
                {
                    neighbourJ = neighbourJ - 1;
                    oppositeDirection = 'right';
                    break;
                }
                case 'up':
                {
                    neighbourI = neighbourI - 1;
                    oppositeDirection = 'down';
                    break;
                }
                case 'down':
                {
                    neighbourI = neighbourI + 1;
                    oppositeDirection = 'up';
                    break;
                }
            }
            var newConnexeColor = maze[i][j].getConnexePart();
            var oldConnexeColor = maze[neighbourI][neighbourJ].getConnexePart();
            var newColor = newConnexeColor.getColor();
            var oldColor = oldConnexeColor.getColor();
            if(oldColor != newColor)
            {
                maze[i][j].openWall(direction);
                maze[neighbourI][neighbourJ].openWall(oppositeDirection);
                oldConnexeColor.mergeWithOtherConnexePart(newConnexeColor);
            }
        }
        console.log(this.maze);
    }
    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    getMaze()
    {
        return this.maze;
    }
    
}