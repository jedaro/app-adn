const apiDocument = {
    openapi: '3.0.1',
    info: {
      version: '1.3.0',
      title: 'REST API - Check mutants',
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
        url: 'https://api.mysite.com',
        description: 'Production Server',
      },
    ],
    tags: [
      {
        name: 'Mutant',
      }
    ],
  };
  
  export { apiDocument };