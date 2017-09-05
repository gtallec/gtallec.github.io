class Box
{
    constructor(connexePart)
    {
        this.connexePart = connexePart;
        this.rightWall = false;
        this.leftWall = false;
        this.upWall = false;
        this.downWall = false;
    }
    openRandomWall(allowedWall)
    {
        var numberOfOpenableWalls = allowedWall.length;
        var alea = Math.random();
        var i = 0;
        while(i < numberOfOpenableWalls)
        {
            if(alea < (i+1)/numberOfOpenableWalls)
            {
                return allowedWall[i];
            }
            i++;
        }
    }
    setConnexePart(connexePart)
    {
        this.connexePart = connexePart;
    }
    getConnexePart()
    {
        return this.connexePart;
    }
    openWall(wall)
    {
        switch(wall)
        {
            case 'up':
            {
                this.upWall = true;
                break;
            }
            case 'down':
            {
                this.downWall = true;
                break;
            }
            case 'left':
            {
                this.leftWall = true;
                break;
            }
            case 'right':
            {
                this.rightWall = true;
                break;
            }
                
        }
        
    }
    getLeftWall()
    {
        return this.leftWall;
    }
    getRightWall()
    {
        return this.rightWall;
    }
    getUpWall()
    {
        return this.upWall;
    }
    getDownWall()
    {
        return this.downWall;
    }
}
        

        


    

    
