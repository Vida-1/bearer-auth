const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const { User } = require('./model');
const { signin } = require('./route');

describe('Auth Routes', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

  it('returns a web token for a sign in route', () => {
    User.createWithHashed('David', "pip1");

    const req = {
      header: jest.fn().mockImplementation((header) => {
        if (header === "Authorization") {
          return "Basic"; 
        }
        return "";
    }) };
    const res = {send: jest.fn()};
    signin({ req, res });

    const token = res.send.mock.lastCall(0);
    console.log(token);
    expect(token).toBe('');
  });
});