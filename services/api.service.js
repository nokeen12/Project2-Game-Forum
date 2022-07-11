const axios = require('axios');

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'localhost:3000'
    });
  }

  signUp = () => {
    return this.api.get('/signup');
  };

//   getAllCharacters = () => {
//     return this.api.get('/characters');
//   };
  
//   getOneCharacter = (characterId) => {
//     return this.api.get(`/characters/${characterId}`);
//   }
//   createCharacter = (characterInfo) => {
//     return this.api.post(`/characters`, characterInfo);
//   }

//   editCharacter = (characterId, characterInfo) => {
//     return this.api.put(`/characters/${characterId}`, characterInfo);
//   }

//   deleteCharacter = (characterId) => {
//     return this.api.delete(`/characters/${characterId}`);
//   }
  
}

module.exports = ApiService;
