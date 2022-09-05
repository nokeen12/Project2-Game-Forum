const axios = require('axios');

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:27017'
    });
  }


  getGuide = (guideId) => {
    return this.api.get(`/guides/${guideId}`)
  }
  editGame = (gameTitle, gameInfo) => {
    return this.api.put(`/games/${gameTitle}`, gameInfo);
  }
}

module.exports = ApiService;
