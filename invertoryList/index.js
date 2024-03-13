/*
#Task is to implement a function inventoryList such that:

#- it maintains the collection of all item names existing in an inventory, where each item is uniquely identified by a name.
#- returns a new object, with three methods:
#    - add(name): the string name parameter is passed, and it is added to the collection. It is guaranteed that at any time, if an item is in  the collection, then no longer item with the same name will be added to the collection.
#    - remove(name): the string name parameter is passed, and this item is removed from the collection if it exists. If it does not exist, nothing happens.
#   - getList(): this returns an array of names of items added so far. The names are returned in the order the corresponding items were added.

#    Sample Case(s):

#    1) Input                Output

#        5                   Pineapple,Apple
#        add Pineapple       Apple
#        add Apple
#        getList
#        remove Pineapple
#        getList

#    2) Input                Output

#        3                   Pineapple
#        add Pineapple
#        remove Apple
#        getList
*/
function inventoryList() {
  // write your code here
  const list = [];
  
  function add (name) {
    if(list.length < 10){
        list.push(name);
    }
  }
  
  function remove(name) {
    const i = list.indexOf(name);
    if(i !== -1){
        list.splice(i, 1);
    }
  }
  
  function getList(){
    return list;
  }
  
  return { add, remove, getList };
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const obj = inventoryList();
    const operationCount = parseInt(readLine().trim());
    
    for(let i = 1; i <= operationCount; i++) {
        const operationInfo = readLine().trim().split(' ');
        if (operationInfo[0] === 'add') {
            obj.add(operationInfo[1]);
        } else if (operationInfo[0] === 'remove') {
            obj.remove(operationInfo[1]);
        } else if (operationInfo[0] === 'getList') {
            const res = obj.getList();
            if (res.length === 0) {
                ws.write('No Items\n');
            } else {
                ws.write(`${res.join(',')}\n`);
            }
        }
    }
    ws.end();
}
