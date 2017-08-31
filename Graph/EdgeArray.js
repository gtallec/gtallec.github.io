class EdgeArray extends Array
{
    constructor()
    {
        super();
    }
    includes(edge)
    {
        var currentEdge;
        var isInTheList;
        var i = 0;
        while((i < this.length)&&(!isInTheList))
        {
            currentEdge = this[i];
            isInTheList = isInTheList||(currentEdge.isEqualEdge(edge));
            i++;
        }
        return (isInTheList);

    }
}
