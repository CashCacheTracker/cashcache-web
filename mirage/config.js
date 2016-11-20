import config from '../config/environment';

export default function() {
  this.passthrough();

  this.urlPrefix = config.apiUrl; // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';         // make this `api`, for example, if your API is namespaced
  // this.timing = 400;           // delay for each request, automatically set to 0 during testing

  this.get('/transactions');
  this.get('/transactions/:id');
  this.patch('/transactions/:id');
  this.post('/transactions');
}
