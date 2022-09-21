/* eslint-disable no-undef */
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const { DB_TEST_HOST, PORT } = process.env;

const app = require("../src/app");
const { User } = require("../src/models/user");

describe("test user routes", () => {
  let server;

  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close);

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => {
      return done();
    });
  });

  // Я так розумію що він повинен чистити базу але з ним не працює(з закоментованим кодом)

  //   afterEach((done) => {
  //     mongoose.connection.db.dropCollection(() => {
  //       mongoose.connection.close(() => done());
  //     });
  //   });

  test("test login route", async () => {
    const newUser = {
      email: "ihdpa@gmail.com",
      password: "11223344",
    };

    //   не шифрує пароль відповідно не логінить
    await User.create(newUser);

    const response = await request(app).post("/api/users/login").send(newUser);
    const {
      body: { token, user },
    } = response;
    expect(response.statusCode).toBe(200);
    expect(token).toBeDefined();
    expect(user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });
});
