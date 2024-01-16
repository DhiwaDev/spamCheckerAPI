const faker = require("faker");
const { User } = require("../models"); // assuming index.js is in the models directory

async function populateDatabase() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  await User.bulkCreate(users);

  console.log("Database populated with random data");
}

populateDatabase().catch(console.error);
