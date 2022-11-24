/* eslint-disable no-undef */
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const { DB_TEST_HOST, PORT } = process.env;

const app = require("../src/app");
// const { User } = require("../src/models/user");

const newUser = {
  email: `${Date.now()}ihdpa@gmail.com`,
  password: "11223344",
};

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

  afterEach(async () => {
    await mongoose.connection.dropCollection();
    await mongoose.connection.close();
  });

  test("test/SingUp", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/users/signup")
      .send(newUser);

    expect(statusCode).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        password: expect.any(String),
        email: expect.any(String),
        subscription: expect.any(String),
        avatarURL: expect.any(String),
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });

  test("test/LogIn", async () => {
    const response = await request(app).post("/api/users/login").send(newUser);
    const {
      statusCode,
      body: { token, user },
    } = response;
    expect(statusCode).toBe(200);
    expect(token).toBeDefined();
    expect(user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  // test("Login test", async () => {
  //   const mReq = { body: { email: "avatar@email.com", password: "avatar" } };
  //   const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  //   await loginController(mReq, mRes);

  //   expect(mRes.status).toBeCalledWith(200);
  //   expect(mRes.token).toEqual(expect.anything());
  //   expect(mRes.user.email).toEqual(expect.not.stringContaining(expected));
  //   expect(mRes.send.user.password).toEqual(
  //     expect.not.stringContaining(expected)
  //   );
  // });
});
