
/**
 * La función "encontrarUltimoIdListado" toma una lista de objetos y devuelve el id del objeto con el
 * valor de id más alto.
 * @param {any} listado - El parámetro "listado" es una matriz de objetos. Cada objeto de la matriz
 * tiene una propiedad llamada "id" que representa el identificador único del objeto.
 * @returns el último valor de identificación de la matriz de listado dada.
 */
export function encontrarUltimoIdListado(listado: any) {
    const objMayorId = listado.reduce(
      (max, objeto) => (objeto.id > max.id ? objeto : max),
      listado[0]
    )
  
    return objMayorId.id
  }