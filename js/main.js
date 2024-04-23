// Función para consultar información de una IP utilizando la API de ipinfo.io
async function consultarInformacionIP(ip) {
  const token = 'fc48bc6a2d44ef'; 
  const url = `https://ipinfo.io/${ip}?token=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la IP');
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error al consultar información de la IP:', error);
    return null;
  }
}

document.getElementById("ipForm").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  // Capturamos la IP ingresada
  const direccionIP = document.getElementById("ipInput").value.trim(); 
  const validar = validarIP(direccionIP); 
  if (validar) { 
    console.log("La dirección IP es válida");
    console.log("Clase de IP:", obtenerClaseIP(direccionIP)); 
    console.log("Estado de la IP:", bloquearIP(direccionIP)); 
    
    try {
      // Consultar información de la IP utilizando la función consultarInformacionIP
      const ipInfo = await consultarInformacionIP(direccionIP);
      console.log("Información de la IP:", ipInfo);

      // Agregar la IP al array de IPs guardadas junto con otros datos
      ipsGuardadas.push({
        ip: direccionIP,
        claseIP: obtenerClaseIP(direccionIP),
        estado: bloquearIP(direccionIP),
        responsable: ipInfo.hostname, 
        pais: ipInfo.country,
        region: ipInfo.region, 
        ciudad: ipInfo.city, 
        organizacion: ipInfo.org,
        postal: ipInfo.postal
      });

      // Actualizar el archivo JavaScript con las IPs guardadas
      actualizarIPsJavaScript();
    } catch (error) {
      console.error('Error al consultar información de la IP:', error);
    }
  } else {
    console.log("La dirección IP no es válida");
  }
});

let ipsGuardadas = []; 

 // Funcion validar IP

function validarIP(direccionIP) {
  const octetos = direccionIP.split(".");
  if (octetos.length !== 4) {
    return false;
  }
  for (let i = 0; i < octetos.length; i++) {
    const octeto = octetos[i];
    if (isNaN(octeto)) {
      return false;
    }
    const numero = parseInt(octeto);
    if (numero < 0 || numero > 255) {
      return false;
    }
  }
  return true;
}

// Funcion mostrar las ip guardadas en el array

function mostrarIPsGuardadas() {
  const table = document.getElementById("tablaIps").querySelector("tbody");
table.innerHTML = "";
let contador = 1;
ipsGuardadas.forEach(ip => {
  const row = table.insertRow(-1);

  const cellContador = row.insertCell(0);
  cellContador.textContent = contador++;

  const cellIp = row.insertCell(1);
  cellIp.textContent = ip.ip;

  const cellClase = row.insertCell(2);
  cellClase.textContent = ip.claseIP;


  const cellEstado = row.insertCell(3);
  cellEstado.textContent = ip.estado;

  const cellOrganizacion = row.insertCell(4);
  cellOrganizacion.textContent =  ip.organizacion;

  const cellPais = row.insertCell(5);
  cellPais.textContent = ip.pais;


  const cellCiudad = row.insertCell(6);
  cellCiudad.textContent = ip.ciudad;

  const cellPostal = row.insertCell(7);
  cellPostal.textContent = ip.postal;


  const cellRegion = row.insertCell(8);
  cellRegion.textContent = ip.region;
});    
  }


document.getElementById("ipForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  // Capturamos la IP ingresada
  const direccionIP = document.getElementById("ipInput").value.trim(); 
  const validar = validarIP(direccionIP); 
  if (validar) { 
    console.log("La dirección IP es válida");
    console.log("Clase de IP:", obtenerClaseIP(direccionIP)); 
    console.log("Estado de la IP:", bloquearIP(direccionIP)); 
    
    // Agregar la IP al array de IPs guardadas junto con otros datos
    /*ipsGuardadas.push({
      ip: direccionIP,
      claseIP: obtenerClaseIP(direccionIP),
      responsable: obtenerResponsableAleatorio(),
      estado: obtenerE(),
      pais: obtenerPais()
    });
*/
    // Actualizar el archivo JavaScript con las IPs guardadas
    actualizarIPsJavaScript();
  } else {
    console.log("La dirección IP no es válida");
  }
});

/*function obtenerResponsableAleatorio() {
  const responsables = ["Juan", "María", "Pedro", "Ana", "José", "Rosa", "Luis", "Camila"];
  return responsables[Math.floor(Math.random() * responsables.length)];
}

function obtenerEstadoAleatorio() {
  const estados = ["Activo", "Inactivo", "Suspendido"];
  return estados[Math.floor(Math.random() * estados.length)];
}

function obtenerPaisAleatorio() {
  const paises = ["Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "México", "Perú", "Uruguay", "Venezuela"];
  return paises[Math.floor(Math.random() * paises.length)];
}*/

function actualizarIPsJavaScript() {
  // Convertir el array de IPs guardadas a JSON 
  const contenido = `ipsGuardadas = ${JSON.stringify(ipsGuardadas)};`;

  const blob = new Blob([contenido], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  const script = document.createElement("script");
  script.src = url;

  const existingScript = document.getElementById("ipsScript");
  if (existingScript) {
    existingScript.parentNode.removeChild(existingScript);
  }

  /*script.id = "ipsScript";
  document.body.appendChild(script);*/

  mostrarIPsGuardadas();
}
   //funcion separar clases de ip
function obtenerClaseIP(direccionIP) {
  const octetos = direccionIP.split(".");
  const primerOcteto = parseInt(octetos[0]);

  if (primerOcteto >= 0 && primerOcteto <= 127) {
    return ("Clase A");
  } else if (primerOcteto >= 128 && primerOcteto <= 191) {
    return ("Clase B");
  } else if (primerOcteto >= 192 && primerOcteto <= 223) {
    return ("Clase C");
  } else if (primerOcteto >= 224 && primerOcteto <= 239) {
    return ("Clase D");
  } else {
    return ("Clase E");
  }
}

function bloquearIP(direccionIP) {
  const octetos = direccionIP.split(".");
  const primerOcteto = parseInt(octetos[0]);

  if (primerOcteto >= 112 && primerOcteto <= 127) {
    return ("Bloqueada");
  } else {
    return ("Libre");
  }
}
   
/*function mostrarResultados(resultados) {
  const resultadoDiv = document.getElementById("myTable");
  resultadoDiv.innerHTML = "";

  if (resultados.length === 0) {
    resultadoDiv.textContent = "No se encontraron resultados";
  } else {
    const lista = document.createElement("ul");
    resultados.forEach(ip => {
      
      const item = document.createElement("li");
      item.textContent = `IP: ${ip.ip}, Clase: ${ip.claseIP}, Responsable: ${ip.responsable}, Estado: ${ip.estado}, País: ${ip.pais}`;
      lista.appendChild(item);
    });
    resultadoDiv.appendChild(lista);
  }
}*/

//Funcion muestra las ip filtradas
function mostrarResultados(resultados) {
  const table = document.getElementById("tablaFil").querySelector("tbody");
  table.innerHTML = "";
  let contador = 1;
  resultados.forEach(ip => {
    const row = table.insertRow(-1);

    const cellContador = row.insertCell(0);
    cellContador.textContent = contador++;

    const cellIp = row.insertCell(1);
    cellIp.textContent = ip.ip;

    const cellClase = row.insertCell(2);
    cellClase.textContent = ip.claseIP;

    const cellEstado = row.insertCell(3);
    cellEstado.textContent = ip.estado;

    const cellOrganizacion = row.insertCell(4);
    cellOrganizacion.textContent =  ip.organizacion;

    const cellPais = row.insertCell(5);
    cellPais.textContent = ip.pais;

    const cellCiudad = row.insertCell(6);
    cellCiudad.textContent = ip.ciudad;

    const cellPostal = row.insertCell(7);
    cellPostal.textContent = ip.postal;

    const cellRegion = row.insertCell(8);
    cellRegion.textContent = ip.region;
  });
}
//capturar datos para filtrar,  y evita que el formulariorecargue la pagina cuando se envia


function filtrarIPsGuardadas(pais, responsable, clases) {
  const resultados = ipsGuardadas.filter(ip => {
    return (!pais || ip.pais.toLowerCase().includes(pais.toLowerCase())) &&
           (!responsable || ip.responsable.toLowerCase().includes(responsable.toLowerCase())) &&
           (clases.length === 0 || clases.includes(ip.claseIP));
  });
  console.log("Resultados del filtrado:", resultados);
  // Mostrar los resultados del filtrado en la interfaz de usuario
  mostrarResultados(resultados);
}

// Agregar evento de escucha para el formulario de filtrado
document.getElementById("filtroForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  // Obtener los valores de los campos de filtro
  const pais = document.getElementById("pais").value;
  const responsable = document.getElementById("responsable").value;
  const clases = Array.from(document.querySelectorAll('input[name="clase"]:checked')).map(el => el.value);

  // Filtrar las IPs guardadas con los criterios especificados
  filtrarIPsGuardadas(pais, responsable, clases);
});
 
// Limpiar la tabla de ip filtradas
document.getElementById("eliminarFiltradoBtn").addEventListener("click", function() {
  eliminarFiltrado();
});
function eliminarFiltrado() {
  const table = document.getElementById("tablaFil").querySelector("tbody");
  table.innerHTML = "";
}