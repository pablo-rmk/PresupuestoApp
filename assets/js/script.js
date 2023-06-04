//Captura el elemento con id="calcular"

let calcular = document.getElementById('calcular');

//Crea la clase Gasto, una lista de gastos vacía listaGastos y un acumulador de gastos sumaGastos
class Gasto {
    constructor(id, nombre, gasto){
        this.id = id;
        this.nombre = nombre;
        this.gasto = gasto;
    }
}
let listaGastos = []
let sumaGastos = 0

//Funcion para capturar el valor de elemento id="presupuesto"
//y luego mostrarlo en el elemento con id="mostrarPresupuesto"
calcular.addEventListener('click', function (event) {
    event.preventDefault();
    let presupuesto = document.getElementById('presupuesto').value;

    if (presupuesto == null || parseInt(presupuesto)<=0 || presupuesto == ''){
        alert('El monto del presupuesto debe ser superior a cero.')
    } else {
        document.getElementById('mostrarPresupuesto').innerText = presupuesto;
        document.getElementById('mostrarGasto').innerText = 0;
        document.getElementById('mostrarSaldo').innerText = presupuesto;
        document.getElementById('presupuesto').value = ''
        document.getElementById('mostrarNombre').innerHTML = ''
        listaGastos = []
        sumaGastos = 0
    }
});

//Funcion para capturar gasto e ingresarlo a nuevo objeto Gasto
//Realiza valdaciones, cálculos y muestra resultados

gastar.addEventListener('click', function(event){

    event.preventDefault();
    presupuesto = document.getElementById('mostrarPresupuesto').innerText;
    nuevoGasto = new Gasto();
    nuevoGasto.id = Math.round(Math.random() * (99999) + 1);
    nuevoGasto.gasto = document.getElementById('gasto').value;
    nuevoGasto.nombre = document.getElementById('nombreGasto').value;
    let saldo = document.getElementById('mostrarSaldo').innerText;

    if (presupuesto == 0 || presupuesto == null) {
        alert('El monto del presupuesto debe ser superior a cero.')
    } else {
        if (nuevoGasto.gasto ==  null || parseInt(nuevoGasto.gasto) <= 0 || nuevoGasto.gasto == '' || nuevoGasto.nombre == null || nuevoGasto.nombre == ''){
            alert('Por favor llenar todos los campos. El gasto debe ser mayor que cero.')    
        } else {
            if(parseInt(nuevoGasto.gasto) > parseInt(saldo)){
                alert('El saldo no es suficiente')
            } else {
                listaGastos.push(nuevoGasto)
                sumaGastos += parseInt(nuevoGasto.gasto)
                document.getElementById('mostrarGasto').innerText = sumaGastos;
                document.getElementById('mostrarSaldo').innerText = presupuesto - sumaGastos;
                document.getElementById('mostrarNombre').innerHTML += ` <tr id=${nuevoGasto.id}>
                                                                            <td>${nuevoGasto.nombre}</td>
                                                                            <td><span>$</span>${nuevoGasto.gasto}</td>
                                                                            <td><a href="#"><i class="fa-regular fa-trash-can text-primary" value="${nuevoGasto.id}"></i></a></button></td>
                                                                        </tr>`
            }  
        }
    }
})

//Funcion para boton "borrar"

mostrarNombre.addEventListener('click', (e)=>{
    
    if ((e.target && e.target.tagName === 'I')) {
        let id = e.target.getAttribute('value');

        for(let i=0; i < listaGastos.length; i++){
            if(id == listaGastos[i].id){
                let borrar = document.getElementById(id);
                borrar.remove();

                let borrarGasto = listaGastos[i].gasto;
                listaGastos.splice(i, 1);
                sumaGastos -= borrarGasto
                document.getElementById('mostrarGasto').innerText = sumaGastos;
                document.getElementById('mostrarSaldo').innerText = presupuesto - sumaGastos;
                
            }
        }     
    }
})
