function generarCamposNotas() {
    const porcentajePractica = parseInt(document.getElementById('porcentajePractica').value);
    const porcentajeTeorica = parseInt(document.getElementById('porcentajeTeorica').value);

    if (isNaN(porcentajePractica) || isNaN(porcentajeTeorica) || porcentajePractica < 0 || porcentajeTeorica < 0) {
        alert('Por favor, ingresa valores válidos para los porcentajes.');
        return;
    }

    if (porcentajePractica + porcentajeTeorica !== 100) {
        alert('La suma de los porcentajes de práctica y teoría debe ser 100%.');
        return;
    }

    const cantidadPracticas = parseInt(document.getElementById('cantidadPracticas').value);
    const cantidadTeoricas = parseInt(document.getElementById('cantidadTeoricas').value);

    if (isNaN(cantidadPracticas) || isNaN(cantidadTeoricas) || cantidadPracticas < 0 || cantidadTeoricas < 0) {
        alert('Por favor, ingresa valores válidos para la cantidad de notas.');
        return;
    }

    const notasContainer = document.getElementById('notasContainer');
    notasContainer.innerHTML = ''; // Limpiar campos anteriores

    // Generar campos para notas prácticas
    for (let i = 1; i <= cantidadPracticas; i++) {
        agregarCampoNota('practica', i);
    }

    // Generar campos para notas teóricas
    for (let i = 1; i <= cantidadTeoricas; i++) {
        agregarCampoNota('teorica', i);
    }
}

function agregarCampoNota(tipo, indice) {
    const notasContainer = document.getElementById('notasContainer');

    const divNota = document.createElement('div');
    divNota.classList.add('nota');

    const labelNota = document.createElement('label');
    labelNota.textContent = `Nota ${tipo} ${indice}:`;
    divNota.appendChild(labelNota);

    const inputNota = document.createElement('input');
    inputNota.type = 'number';
    inputNota.placeholder = 'Nota';
    inputNota.required = true;
    divNota.appendChild(inputNota);

    const labelPorcentaje = document.createElement('label');
    divNota.appendChild(labelPorcentaje);

    const inputPorcentaje = document.createElement('input');
    inputPorcentaje.type = 'number';
    inputPorcentaje.placeholder = 'Porcentaje';
    inputPorcentaje.required = true;
    divNota.appendChild(inputPorcentaje);

    notasContainer.appendChild(divNota);
}

function calcularPromedio() {
    const porcentajePractica = parseInt(document.getElementById('porcentajePractica').value);
    const porcentajeTeorica = parseInt(document.getElementById('porcentajeTeorica').value);

    // Verificar que los porcentajes sean válidos
    if (isNaN(porcentajePractica) || isNaN(porcentajeTeorica) || porcentajePractica < 0 || porcentajeTeorica < 0) { 
        alert('Por favor, ingresa valores válidos para los porcentajes.');
        return;
    }
    if (porcentajePractica + porcentajeTeorica !== 100) {
        alert('La suma de los porcentajes de práctica y teoría debe ser 100%.');
        return;
    }

    const notas = document.querySelectorAll('.nota');
    let promedioPractica = 0;
    let promedioTeorica = 0;

    // Verificar que los porcentajes de las notas prácticas y teóricas sumen 100% en cada parte
    let sumaPorcentajePractica = 0;
    let sumaPorcentajeTeorica = 0;

    notas.forEach(nota => {
        const valorNota = parseFloat(nota.querySelector('input[type="number"]').value);
        const porcentaje = parseFloat(nota.querySelector('input[type="number"]:nth-child(4)').value);

        if (!isNaN(valorNota) && !isNaN(porcentaje)) {
            if (nota.querySelector('label').textContent.includes('practica')) {
                promedioPractica += (valorNota * porcentaje) / 100;
                sumaPorcentajePractica += porcentaje;
            } else if (nota.querySelector('label').textContent.includes('teorica')) {
                promedioTeorica += (valorNota * porcentaje) / 100;
                sumaPorcentajeTeorica += porcentaje;
            }
        }
    });

    // Verificar que los porcentajes de las notas prácticas y teóricas sumen 100% en cada parte
    if (sumaPorcentajePractica !== 100 || sumaPorcentajeTeorica !== 100) {
        alert('La suma de los porcentajes de las notas prácticas y teóricas debe ser 100% en cada parte.');
        return;
    }

    const promedioFinal = (promedioPractica * porcentajePractica / 100) + (promedioTeorica * porcentajeTeorica / 100);

    const resultado = document.getElementById('resultado');
    const select = document.querySelector('select[name="select"]').value;

    if (select === 'value1') {
        // Se aprueban juntas
        if (promedioFinal >= 4.0) {
            resultado.textContent = `Aprobaste con un promedio de: ${promedioFinal.toFixed(1)}`;
        } else {
            resultado.textContent = `Reprobaste con un promedio de: ${promedioFinal.toFixed(1)}`;
        }
    } else if (select === 'value2') {
        // Se aprueban por separado
        if (promedioPractica >= 4.0 && promedioTeorica >= 4.0) {
            resultado.textContent = `Aprobaste con un promedio de: ${promedioFinal.toFixed(1)}`;
        } else {
            resultado.textContent = `Reprobaste. Promedio de práctica: ${promedioPractica.toFixed(1)}, Promedio de teoría: ${promedioTeorica.toFixed(1)}`;
        }
    }
}