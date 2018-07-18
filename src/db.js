const Sequelize = require('sequelize');
const Faker = require('faker');
const _ = require('lodash');

const sequelize = new Sequelize(
  'testDB',   // database
  'postgres', // username
  'postgres', // password
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const user = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // validate: {
    //   isEmail: true
    // }
  }
});

const post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const pet = sequelize.define('pet', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// Relations
// POST-USER
user.hasMany(post);
post.belongsTo(user);

// PET-USER
user.hasMany(pet);
pet.belongsTo(user);


sequelize.sync({ force: true })
  .then(() => {
    _.times(10, async () => {

      const newUser = await user.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email().toLowerCase()
      });

      newUser.createPet({
        name: Faker.name.firstName(),
        age: Faker.random.number(15) + 1
      });

      newUser.createPost({
        title: `Sample post by ${newUser.firstName}`,
        content: `here is some content from ${newUser.lastName}`
      });

    });
  });

module.exports = sequelize;
