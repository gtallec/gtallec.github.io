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
                console.log(box.style.top);
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
        var mazeElement = document.getElementsByClassName('maze');
        mazeElement = mazeElement[0].childNodes;
        var logicMaze = this.modelMaze.getLogicMaze();
        
        var oneBox = mazeElement[i*(logicMaze.length - 1) + j];
        if(logicMaze[i][j])
        {
            oneBox.style.backgroundColor = "white";
        }
        else
        {
            oneBox.style.backgroundColor = "black";
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