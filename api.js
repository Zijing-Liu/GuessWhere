// note: security is not a concern in this mini project
const client_id = "kRHLvzHPEmLKc2govhklsOZTBBYGVHxaJYGhmeT5hfs";
//Creating class for destination quiz
class DestinationQuizAPI {
  constructor() {
    this.client_id = client_id;
    this.baseurl = "https://api.unsplash.com";
  }

  async getOnePhoto(destination) {
    try {
      const response = await axios.get(
        `${this.baseurl}/search/photos?client_id=${this.client_id}&query=${destination}&page=1&per_page=1`
      );

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const api = new DestinationQuizAPI();

export default api;
