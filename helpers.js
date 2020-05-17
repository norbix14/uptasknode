/**
 * @param objeto toma el objeto y lo formatea a JSON para
 * ver su composicion y depurar mejor sin necesidad de 
 * ver tantas veces en la base de datos.
 * @return retorna el objeto formateado a JSON como si 
 * fuera un array asociativo en PHP.
*/
exports.vardump = objeto => JSON.stringify(objeto, null, 2)
