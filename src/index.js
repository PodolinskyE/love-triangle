
class Node {
  constructor (index, target) {
    this.index = index;
    this.target = target
  }
}

class Lasso {
  
  constructor ( arrayOfNodes = []) {
    // do not affect arg passing in
    this.nodes = arrayOfNodes.map( n => n );
    // this.targets
    this.refreshTargets();
  }
  
  refreshTargets () {
    this.targets = this.nodes.map(node => node.target);
  }
  
  // returnes true if we have duplicated targets in this.nodes array
  // ( two or more Spichonees loves another one )
  hasDuplicatedTargets () {
    return this.targets.some((target, position) => {
      return this.targets.indexOf(target) !== position;
    })
  }
  
  // cuts tail of lasso and leaves only the loop
  cutTail () {
    // while we have duplicated node targets, remove not targeted node from chain one by one
    while ( this.hasDuplicatedTargets() ) {
      this.nodes = this.nodes.filter( node => {
        return ~this.targets.indexOf( node.index )
      });
      this.refreshTargets();
    }
  }
  
  length () {
    return this.nodes.length;
  }
}





class Solution {
  
  constructor ( src ) {
    this.hash = src.map( (v, i) => new Node(i + 1, v));
    this.loops = [];
  }
  
  findNodeByIndex ( idx ) {
    return this.hash.filter( node => node.index === idx)[0];
  }
  
  
  scan () {
    
    while ( this.hash.length ) {
      let node = this.hash[0];
      
      // pull together nodes creating a chain
      // while chain is looped or next target is absent
      let chain = [];
      while ( node && !~chain.indexOf(node) ) {
        chain.push( node );
        node = this.findNodeByIndex(node.target);
      };
      
      
      // if node != undefined, we have a loop
      // otherwise - its just a single node or not-looped chain
      if ( node ) {
        const chainWithLoop = new Lasso ( chain );
        chainWithLoop.cutTail();
        this.loops.push( chainWithLoop );
      }
      
      
      // cleaning hash
      // remove nodes we've passed
      chain.forEach(node => {
        const nodeToRemove = this.findNodeByIndex(node.index);
        let hashIdx = this.hash.indexOf( nodeToRemove );
        this.hash.splice( hashIdx, 1 );
      });
    }
    
    return this;
  }
  
  
}

// debugger
// const src = [3,1,2];
// const sol = new Solution(src).scan();
// sol.loops.filter(loop => loop.length() === 3).length;





/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
module.exports = function getLoveTrianglesCount(preferences = []) {
  const sol = new Solution(preferences).scan();
  return sol.loops.filter(loop => loop.length() === 3).length;
};



