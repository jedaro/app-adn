const apiDocument = {
    openapi: '3.0.1',
    info: {
      version: '1.3.0',
      title: 'REST API - Check Mutants',
      description: 'API Rest para determinar si una persona es mutante o no, a partir de su secuencia de dna',
      contact: {
        name: 'Jesus Daniel Rodriguez',
        email: 'jdanielrodriguezo@gmail.com',
        url: 'https://linkedin.com/in/jedaro',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Local Server',
      },
      {
        url: 'https://pivotal-sprite-326117.rj.r.appspot.com/',
        description: 'Production Server',
      },
    ],
    tags: [{ name: 'mutant'}],
    paths: {
      "/mutant": {
        post: {
          "security": [{ "ApiKeyAuth": []}],
          "tags": ["mutant"],
          "summary": "Utiliza esta opción para verificar la secuencia de DNA de un persona",
          "description": "Operación que verifica si un humano es mutante o no a partir de de DNA",
          "operationId": "check_mutant",
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorMutant400"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
            }
          },
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MutantRequest"
                }
              }
            },
            "description": "Secuencias de DNA a analizar"
          }
        }
      },
      "/stats": {
        get: {
          "security": [{ "ApiKeyAuth": []}],
          "tags": ["mutant"],
          "summary": "Utiliza esta opción para consultar estadisticas de las secuencias verificadas",
          "description": "Operación que genera un informe de las secuencias analizadas de  mutantes y humanos",
          "operationId": "check_mutant",
          "responses": {
            "200": {
              "description": "En este caso, el código de respuesta es 200 indica estadisticas de las secuencias analizadas",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseStats200"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      }
    },
    "components":{
      "securitySchemes": {
        "ApiKeyAuth": {
          "type": "apiKey",
          "name": "x-api-key",
          "in": "header"
        }
      },
      "schemas": {
        "ErrorMutant400":{
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "Código error"
            },
            "message": {
              "type": "string",
              "description": "Mensaje de error"
            }
          }
        },
        "ResponseStats200":{
          "type": "object",
          "properties": {
            "count_mutant_dna": {
              "type": "number",
              "description": "Número de secuencias correspondiente a mutante",
              "example": 40
            },
            "count_human_dna": {
              "type": "number",
              "description": "Número de secuencias correspondiente a no mutante",
              "example": 100
            },
            "ratio": {
              "type": "number",
              "description": "Ratio: count_mutant_dna / count_human_dna",
              "example": 0.4
            }
          }
  
        },
        "MutantRequest":{
          "type": "array",
          "items":{
            "type": "string",
            "description": "secuencia dna de 6 caracteres",
            "example": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
          }
  
        }
  
      }
    }
  };
  
  export { apiDocument };