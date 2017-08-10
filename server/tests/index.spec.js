import request from 'supertest';
import app from '../../app';

require('dotenv').config();

// Test for API home route and invalid routes
describe('GET: /api/v1', () => {
  it('Should return status code 404 when user accesses non-existent route', (done) => {
    request(app)
      .get('/api/v1/xytszdhhj')
      .expect(404)
      .end(done);
  });
  it('Should return status code 200 when API index route is accessed', (done) => {
    request(app)
      .get('/api/v1')
      .expect(200)
      .end(done);
  });
});
