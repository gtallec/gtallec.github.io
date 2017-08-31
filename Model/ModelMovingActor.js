class ModelMovingActor
{
    constructor(x, y, speed, numberOfSubdivisions, model)
    {
        this.model = model;
        this.x = x;
        this.y = y;
        this.speed = speed;// en subdivision par pulse

        this.numberOfSubdivisions = numberOfSubdivisions;
        this.xSubdivision = 0;
        this.ySubdivision = 0;
        this.direction = null;
    }
    getNumberOfSubdivisions()
    {
        return this.numberOfSubdivisions;
    }
    getSubdivisions()
    {
        return {x : this.xSubdivision, y : this.ySubdivision};
    }
    followDirection()
    {
        var direction = this.direction;
        var x = this.x;
        var y = this.y;
        var newX = this.x;
        var newY = this.y;
        var permission;
        if((x!=-1)&&(y!=-1))
        {
            var distance = this.speed;
            var numberOfSubdivisions = this.numberOfSubdivisions;
            switch(direction)
            {
                case 'down':
                {
                    if(this.ySubdivision === 0)
                    {
                        permission = true;
                        if(this.xSubdivision === 0)
                        {
                            permission = this.askModelForPermission(newX + 1,y);
                        }
                        var distanceInXSubdivision = this.xSubdivision + distance;
                        var newXSubdivision = distanceInXSubdivision%numberOfSubdivisions;
                        if(permission)
                        {
                            this.xSubdivision = newXSubdivision;
                        }
                        var boxesToBeCrossed = Math.floor(distanceInXSubdivision/numberOfSubdivisions);
                        while((boxesToBeCrossed !== 0)&&(permission))
                        {
                            permission = this.askModelForPermission(newX+1,y);
                            if(permission)
                            {
                                newX = newX + 1;
                            }
                            boxesToBeCrossed = boxesToBeCrossed - 1;
                        }
                        this.x = newX;
                    }
                    break;
                }
                case 'up':
                {
                    if(this.ySubdivision === 0)
                    {
                        permission = true;
                        if(this.xSubdivision === 0)
                        {
                            permission = this.askModelForPermission(newX - 1,y);
                        }
                        var distanceInXSubdivision = this.xSubdivision - distance;
                        var newXSubdivision = distanceInXSubdivision%numberOfSubdivisions;
                        if(permission)
                        {
                            this.xSubdivision = newXSubdivision;
                        }
                        var boxesToBeCrossed = Math.floor(Math.abs(distanceInXSubdivision/numberOfSubdivisions));
                        while((boxesToBeCrossed !== 0)&&(permission))
                        {
                            permission = this.askModelForPermission(newX-1,y);
                            if(permission)
                            {
                                newX = newX - 1;
                            }
                            boxesToBeCrossed = boxesToBeCrossed - 1;
                        }
                        this.x = newX;
                    }
                    break;

                }
                case 'left':
                {
                    if(this.xSubdivision === 0)
                    {
                        permission = true;
                        if(this.ySubdivision === 0)
                        {
                            permission = this.askModelForPermission(x,newY - 1);
                        }
                        var distanceInYSubdivision = this.ySubdivision - distance;
                        var newYSubdivision = distanceInYSubdivision%numberOfSubdivisions;
                        if(permission)
                        {
                            this.ySubdivision = newYSubdivision;
                        }
                        var boxesToBeCrossed = Math.floor(Math.abs(distanceInYSubdivision/numberOfSubdivisions));
                        while((boxesToBeCrossed !== 0)&&(permission))
                        {
                            permission = this.askModelForPermission(x,newY - 1);
                            if(permission)
                            {
                                newY = newY - 1;
                            }
                            boxesToBeCrossed = boxesToBeCrossed - 1;
                        }
                        this.y = newY;
                    }
                    break;
                }
                case 'right':
                {
                    if(this.xSubdivision === 0)
                    {
                        permission = true;
                        if(this.ySubdivision === 0)
                        {
                            permission = this.askModelForPermission(x,newY + 1);
                        }
                        var distanceInYSubdivision = this.ySubdivision + distance;
                        var newYSubdivision = distanceInYSubdivision%numberOfSubdivisions;
                        if(permission)
                        {
                            this.ySubdivision = newYSubdivision;
                        }
                        var boxesToBeCrossed = Math.floor(distanceInYSubdivision/numberOfSubdivisions);
                        while((boxesToBeCrossed !== 0)&&(permission))
                        {
                            permission = this.askModelForPermission(x,newY + 1);
                            if(permission)
                            {
                                newY = newY + 1;
                            }
                            boxesToBeCrossed = boxesToBeCrossed - 1;
                        }
                        this.y = newY;
                    }
                    break;
                }
            }
        }
    }
    askModelForPermission(x,y)
    {
       return this.model.askModelMazeForPermission(x,y);
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    disable()
    {
        this.x = -1;
        this.y = -1;
    }
}