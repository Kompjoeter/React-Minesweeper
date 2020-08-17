export function initializeNestedArray(width, height, callback) 
{
    let nestedArray = [];
    for (var y = 0; y < height; y++) 
    {
        nestedArray.push([]);
        for (var x = 0; x < width; x++) 
        {
            nestedArray[y][x] = callback(x,y);
        }
        
    }
    return nestedArray;
}

export function populateNestedArray(nestedArray,condition,value,count) 
{
  let rows = nestedArray.length;
  let cols = nestedArray[0].length;
  while (count) {
    let y = floorRand(rows);
    let x = floorRand(cols);
    if (!condition(nestedArray[y][x])) {
      nestedArray[y][x] = value(nestedArray[y][x]);
      count--;
    }
  }
  return nestedArray;
}

function floorRand(range) 
{
  return Math.floor(Math.random() * range);
}

export function iterizeNestedArrayDoThingIf(nestedArray,callback)
{
  let rows = nestedArray.length;
  let cols = nestedArray[0].length;
  for(let y = 0; y < rows; y++)
  {
    for(let x = 0; x < cols; x++)
    {
      nestedArray[y][x] = callback(nestedArray,x,y);
    }
  }
  return nestedArray;
}

export function getNeighboursOfNestedArrayIndex(nestedArray,x,y) 
{
  let height  = nestedArray.length;
  let width = nestedArray[0].length;
  let neighbours = [];
  
  for (let yy = y-1; yy <= y+1; yy++) 
  {
    for (let xx = x-1; xx <= x+1; xx++) 
    {
      //Skip original cell
      if (xx == x && yy == y) continue;

      //Skip if out of bounds
      if (xx < 0 || xx > width-1 || yy < 0 || yy > height-1) continue;

      //Add neighbor cell
      neighbours.push(nestedArray[yy][xx]);
    }
  }
  return neighbours;
}