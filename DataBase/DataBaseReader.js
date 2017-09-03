class DataBaseReader
{
    constructor(model)
    {
        this.model = model;
    }
    extractJSONFromFile(file)
    {
        var JSONText = null;
        var rawFile = new XMLHttpRequest();
        var model = this.model;
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    var JSONText = JSON.parse(allText);
                    model.initialize(JSONText);
                }
            }
        }
        rawFile.send(null);
        return JSONText;
    }
    loadLevel(level)
    {
        var dataBaseRequest = 'DataBase/level' + level + '.txt';;
        this.extractJSONFromFile(dataBaseRequest);
    }
}
