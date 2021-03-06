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
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Local Server',
      },
      {
        url: 'https://jedarog-1503.uc.r.appspot.com/',
        description: 'Production Server (Google)',
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
          "operationId": "get_stats",
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
      },
      "/destroy": {
        delete: {
          "security": [{ "ApiKeyAuth": []}],
          "tags": ["mutant"],
          "summary": "Utiliza esta opción para eliminar todos los registros",
          "description": "Operación que borra todos los registros de la base de datos",
          "operationId": "delete_stats",
          "responses": {
            "200": {
              "description": "En este caso, el código de respuesta es 200 indica eliminacion de todos los registros",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseDelete200"
                  }
                }
              }
            },
            "404": {
              "description": "Error eliminacion datos"
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
        "ResponseDelete200":{
          "type": "object",
          "properties": {
            "messsage": {
              "type": "string",
              "description": "Mensaje de respuesta eliminación"
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