function JSONStrategy(){

}

module.exports.crateStrategy = function(...args){
    return new JSONStrategy(...args);
}