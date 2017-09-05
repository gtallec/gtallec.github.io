class ConnexePart
{
    constructor(color,totalNumberOfBoxes)
    {
        this.color = color;
        this.listOfBoxes = new Array();
        this.numberOfBoxes = 0;
        this.totalNumberOfBoxes = totalNumberOfBoxes;
    }
    addBox(box)
    {
        this.listOfBoxes.push(box);
        this.numberOfBoxes++;
    }
    mergeWithOtherConnexePart(newConnexePart)
    {
        var listOfBoxes = this.listOfBoxes;
        for(var i = 0 ; i < listOfBoxes.length ; i++)
        {
            listOfBoxes[i].setConnexePart(newConnexePart);
            newConnexePart.addBox(listOfBoxes[i]);
        }
    }
    connexePartEqualsOmega()
    {
        return (this.numberOfBoxes === this.totalNumberOfBoxes)
    }
    getColor()
    {
        return this.color;
    }
    
}