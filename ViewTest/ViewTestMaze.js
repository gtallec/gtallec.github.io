class ViewTestMaze
{
    constructor(modelMaze)
    {
        this.modelMaze = modelMaze;
    }
    updateMaze()
    { 
        var logicMaze = this.modelMaze.getLogicMaze();
        var oneLine;
        var matrixToDisplay = new Array(logicMaze.length);
        for (var i = 0 ; i < logicMaze.length ; i++)
        {
            oneLine = new Array(logicMaze[i].length);
            for(var j = 0 ; j < logicMaze[i].length ; j++)
            {
                if(logicMaze[i][j])
                {
                    oneLine[j] = 'vide';
                }
                else
                {
                    oneLine[j] = 'mur';
                }
            }
            matrixToDisplay[i] = oneLine;
        }
        return matrixToDisplay;
    }
}