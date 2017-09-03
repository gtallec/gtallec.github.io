class ViewMaze
{
    constructor(modelMaze,caseLength)
    {
        this.modelMaze = modelMaze;
        this.caseLength = caseLength
    }
    createMaze(mazeElement)
    {
        var caseLength = this.caseLength;
        var modelMaze = this.modelMaze;
        var logicMaze = modelMaze.getLogicMaze();
        var box;
        for(var i = 0 ; i < logicMaze.length ; i++)
        {
            for(var j = 0 ; j < logicMaze[i].length ; j++)
            {
                box = document.createElement('div');
                box.id = i + ',' +j;
                box.style.position = 'absolute';
                box.style.width = caseLength + 'px';
                box.style.height = caseLength + 'px';
                box.style.top = i * caseLength + 'px';
                box.style.left = j* caseLength + 'px';
                if(logicMaze[i][j])
                {
                    box.style.backgroundColor= "white";
                }
                else
                {
                   box.style.backgroundColor = "black"; 
                }
                mazeElement.appendChild(box);
            }
        } 
    }
    updateOneBox(i,j)
    {
        var mazeElement = document.getElementById(i + ',' + j);
        var logicMaze = this.modelMaze.getLogicMaze();
        if(logicMaze[i][j])
        {
            mazeElement.style.backgroundColor = "white";
        }
        else
        {
            mazeElement.style.backgroundColor = "black";
        }
    }
    updateMaze()
    {
        var logicMaze = this.modelMaze.getLogicMaze();
        for (var i = 0 ; i < logicMaze.length ; i++ )
        {
            for (var j =  0 ; j < logicMaze[i].length ; j++)
            {
                this.updateOneBox(i,j);
            }
        }
    }
}