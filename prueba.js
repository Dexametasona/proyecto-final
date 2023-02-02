let recordar=[-1];
let listDestacado=[];
while(listDestacado.length<4){
    let random=Math.floor(Math.random()*11)
    let verificar=false
    for(let i of recordar){
        if(random===i){
            verificar=false
            break
        }else{
            verificar=true
        }
    }
    if(verificar){
        recordar.push(random)
        listDestacado.push(random)
    }
}
console.log(listDestacado)