const globalVar = "parent 1 var";
let letVar = "let global var"

function parent() {
    const parentVar = "parent var"
    
    function child1(){
        const child1Var = "child 1 var"

        function child2() {
            const child2Var = " child 2 Var"
            console.log({globalVar, parentVar, child1Var, child2Var, letVar})
        }

        child2()
    }

    child1()
}

parent();

parent = null