//getCheapestNode
function getCheapestNode(costsNode) {
  let cheapestNode = ["name", infinity];
  for (const cost of costsNode) {
    if (cheapestNode[1] > cost[1]) {
      cheapestNode[0] = cost[0];
      cheapestNode[1] = cost[1];
    }
  }
  return cheapestNode;
}
//add cost to neighbors
function updateCostsValues(node, nodeCost) {
  let neighborsMap = graph.get(node);
  // console.log("old => ", neighborsMap);
  for (const ngb of Object.keys(neighborsMap)) {
    const newCost = neighborsMap[ngb] + nodeCost;
    neighborsMap[ngb] = newCost;
  }
  return neighborsMap;
}
function updateParentandCost(newCost, cheapNode) {
  let nodeUpdated = Object.keys(newCost);
  for (const iterator of nodeUpdated) {
    if (newCost[iterator] < costes.get(iterator)) {
      costes.set(iterator, newCost[iterator]);
      parents.set(iterator, cheapNode);
    }
  }
}
//
function djkstra(graph, costes, parents) {
  while (costes.size > 1) {
    let [cheapestNodeName, cheapestNodeCost] = getCheapestNode(costes);
    graph.set(
      cheapestNodeName,
      updateCostsValues(cheapestNodeName, cheapestNodeCost)
    );
    updateParentandCost(graph.get(cheapestNodeName), cheapestNodeName);
    /*
    console.log("size =>", costes.size);
    console.log("np =>", costes);
    console.log("c=>", costes);
    console.log("p=>", parents);*/
    costes.delete(cheapestNodeName);
  }
}
function findLowPath(node) {
  if (parents.get(node) === undefined) return "";
  return findLowPath(parents.get(node)) + "," + parents.get(node);
}
//MAIN//
const infinity = Math.pow(10, 1000);
//start graph set
let graph = new Map([
  ["book", { lp: 5, poster: 0 }],
  ["lp", { guitar: 15, drum: 20 }],
  ["poster", { guitar: 30, drum: 35 }],
  ["drum", { piano: 10 }],
  ["guitar", { piano: 20 }],
  ["piano", {}],
]);
//end graph set
//start cost set
let costes = new Map([
  ["lp", 5],
  ["poster", 0],
  ["drum", infinity],
  ["guitar", infinity],
  ["piano", infinity],
]);
//end cost set
//start parent set
let parents = new Map([
  ["lp", "book"],
  ["poster", "book"],
  ["drum", null],
  ["guitar", null],
  ["piano", null],
]);
//end parent set
djkstra(graph, costes, parents);
const endNode = "piano";
let resultPath = (findLowPath(endNode) + "," + endNode).split(",");
resultPath.shift();
resultPath.push(costes.get(endNode));
console.log("short path = ", resultPath);
