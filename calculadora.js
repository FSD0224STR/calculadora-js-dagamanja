// Screen
var screen = document.getElementById("writeScreen");

// Numbers
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");
var zero = document.getElementById("zero");
var dot = document.getElementById("dot");

// operation with 1 number
var exp = document.getElementById("exp");
var sqr = document.getElementById("sqr");

// Operations with 2 numbers
var sum = document.getElementById("sum");
var subs = document.getElementById("subs");
var mul = document.getElementById("mul");
var div = document.getElementById("div");
var per = document.getElementById("per");
var res = document.getElementById("res");
var clear = document.getElementById("clear");

// Array numbers and array operations
numArray = [one, two, three, four, five, six, seven, eight, nine, zero];
oprArray = [sum, subs, mul, div];

//Text content for numbers
var text1 = "";
var text2 = "";
var operProcess = "";
const resultStatus = undefined;
oprStatus = undefined;

//Operation selection
const operation = oprArray.filter((e) => {
  e.addEventListener("click", () => {
    if (text1 !== "") {
      oprStatus = true;
      operProcess = e.value;

      //   if (screen.children[0] !== undefined) {
      //     screen.removeChild(screen.children[0]);
      //   }
      if (operProcess === "") {
        operProcess = e.value;
      } else {
        operProcess = "";
        operProcess = e.value;
      }
    }
  });
});

//Write text numbers

const num = numArray.filter((e) => {
  e.addEventListener("click", () => {
    if (oprStatus === false && text1 !== "0") {
      text1 += e.value;
      print(text1);
      // console.log("Texto 1", text1);
    } else if (oprStatus === true && text2 !== "0") {
      text2 += e.value;
      print(text2);
      // console.log("Texto 2", text2);
    }
  });
});

//Write dots
dot.addEventListener("click", () => {
  if (oprStatus === false) {
    var found1 = text1.split("").find((e) => e === ".");
    if (found1 !== ".") {
      text1 += dot.value;
      print(text1);
      // console.log("Texto 1", text1);
    }
  } else {
    var found2 = text2.split("").find((e) => e === ".");
    if (found2 !== ".") {
      text2 += dot.value;
      print(text2);
      // console.log("Texto 2", text2);
    }
  }
});

// Print at screen
function print(valor) {
  var p = document.createElement("p");
  p.innerText = valor;
  if (screen.children[0] !== undefined) {
    screen.removeChild(screen.children[0]);
  }
  screen.append(p);
}

//Functions
res.addEventListener("click", () => {
  if (oprStatus === true) {
    var p = document.createElement("p");
    mathArray = [text1, operProcess, text2];
    p.innerText = evaluate(mathArray);
    if (screen.children[0] !== undefined) {
      screen.removeChild(screen.children[0]);
    }
    screen.append(p);
    // console.log(p);
    results_fun(text1, operProcess, text2, p.innerText);
    text1 = "";
    text2 = "";
    oprStatus = false;
  }
});

//exp function
exp.addEventListener("click", () => {
  if (oprStatus === false) {
    var p = document.createElement("p");
    p.innerText = Number(Math.pow(Number(text1), 2).toFixed(5));
    if (screen.children[0] !== undefined) {
      screen.removeChild(screen.children[0]);
    }
    screen.append(p);
    // console.log(p);
    results_fun(text1, "^2", text2, p.innerText);
    text1 = "";
    text2 = "";
    oprStatus = false;
  }
});

//sqr function
sqr.addEventListener("click", () => {
  if (oprStatus === false) {
    var p = document.createElement("p");
    p.innerText = Number(Math.sqrt(Number(text1)).toFixed(5));
    if (screen.children[0] !== undefined) {
      screen.removeChild(screen.children[0]);
    }
    screen.append(p);
    // console.log(p);
    results_fun(text1, "sqr", text2, p.innerText);
    text1 = "";
    text2 = "";
    oprStatus = false;
  }
});

//Clear content
clear.addEventListener("click", () => {
  screen.removeChild(screen.children[0]);
  text1 = "";
  text2 = "";
  oprStatus = false;
});

function evaluate(array) {
  var val = Number(array[0]) + array[1] + Number(array[2]);
  const result = new Function("return " + val)();
  return Number(result.toFixed(8));
}

//Results print

const ul = document.getElementById("results-list");

function results_fun(ele1, opr, ele2, resValue) {
  var li = document.createElement("li");
  var node_element = document.createElement("div");
  var operation_title = document.createElement("p");
  var result_value = document.createElement("p");
  // var delete_btn = document.createElement("button");

  operation_title.innerText = ele1 + opr + ele2;
  result_value.innerText = resValue;

  operation_title.className = "result-operation";
  // delete_btn.textContent = "Delete";
  // delete_btn.className = "delete";

  ul.appendChild(li);
  li.append(node_element);
  node_element.append(operation_title);
  node_element.append(result_value);
  li.append(addDeleteBtn());
}

function addDeleteBtn() {
  //Función de eliminar boton

  const deleteBtn = document.createElement("button"); //Crear un elemento tipo botón

  deleteBtn.textContent = "Delete"; //Texto que contiene el boton
  deleteBtn.className = "delete"; //Clase que es el boton

  deleteBtn.addEventListener("click", (event) => {
    //cuando se oprima el boton
    const item = event.target.parentElement; //Seleccionar el padre li para poder eliminarlo, como esta dentro de un div por eso se coloca 2 veces parentElement

    ul.removeChild(item); //Remover el elemento seleccionado en el item
  });
  return deleteBtn; //retornar los resultados para poder mostrar el boton y eliminar la nota cuando se desee
}

//Delete all
const deleteAll_btn = document.getElementById("deleteAll");

deleteAll_btn.addEventListener("click", () => {
  const items = document.querySelectorAll("li");
  // console.log(items.length);
  if (items.length !== 0) {
    for (i = 0; i < items.length; i++) {
      const item = items[i];
      ul.removeChild(item);
      // console.log(item);
    }
  }
});

// ------------------------------------------------------

//Welcome msg
const on_off = document.getElementById("switch");

var switchStatus = false;
on_off.addEventListener("click", () => {
  if (switchStatus === false) {
    switchStatus = true;
    oprStatus = false;
  } else {
    switchStatus = false;
    oprStatus = undefined;
    text1 = "";
    text2 = "";
  }
  if (switchStatus === true) {
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerText = "Welcome";
    span.className = "screeenMov";
    if (screen.children[0] !== undefined) {
      screen.removeChild(screen.children[0]);
    }
    screen.append(p);
    p.append(span);
  } else {
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerText = "Goodbye";
    span.className = "screeenMov";
    if (screen.children[0] !== undefined) {
      screen.removeChild(screen.children[0]);
    }
    screen.append(p);
    p.append(span);
  }
});
