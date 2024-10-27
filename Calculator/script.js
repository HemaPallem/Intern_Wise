let input = document.getElementById("inputOutput");
const allButtons = document.querySelectorAll("button");

for(let button of allButtons){
  button.addEventListener("click",(e)=>{
    let ButtonText = e.target.innerText;
    
    if(ButtonText === "X"){
      ButtonText = "x";  
    }
    
    if(ButtonText === "C"){
      input.value = ""; 
    } else if(ButtonText === "="){
      let inputs = input.value;  
      if (inputs.includes('x')) inputs = inputs.replace('x', '*')
      input.value = eval(inputs);
    } else {
      input.value += ButtonText;  
    }
  });
}
