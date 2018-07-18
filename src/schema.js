const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const db = require('./db');

const post = new GraphQLObjectType({
  name: 'post',
  description: 'Blog post',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(post) {
          return post.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve(content) {
          return content.content;
        }
      },
      user: {
        type: user,
        resolve(post) {
          return post.getUser();
        }
      }
    };
  }
});

const pet = new GraphQLObjectType({
  name: 'pet',
  description: 'This presents a pet',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(pet) {
          return pet.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(pet) {
          return pet.name;
        }
      },
      age: {
        type: GraphQLInt,
        resolve(pet) {
          return pet.age;
        }
      },
      user: {
        type: user,
        resolve(pet) {
          return pet.getUser();
        }
      }
    };
  }
});

const user = new GraphQLObjectType({
  name: 'user',
  description: 'This represents a user',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        }
      },
      post: {
        type: GraphQLList(post),
        resolve(user) {
          return user.getPosts();
        }
      },
      pet: {
        type: GraphQLList(pet),
        resolve(user) {
          return user.getPets();
        }
      }
    };
  }
});

const query = new GraphQLObjectType({
  name: 'query',
  description: 'Root query object',
  fields: () => {
    return {
      user: {
        type: new GraphQLList(user),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return db.models.user.findAll({ where: args });
        }
      },
      post: {
        type: new GraphQLList(post),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return db.models.post.findAll({ where: args });
        }
      },
      pet: {
        type: new GraphQLList(pet),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return db.models.pet.findAll({ where: args });
        }
      }
    };
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Functions to set stuff',
  fields: () => {
    return {
      addUser: {
        type: user,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(source, args) {
          return db.models.user.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase()
          });
        }
      },
      addPost: {
        type: post,
        args: {
          userId: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          content: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(source, args) {
          return db.models.user.findById(args.userId).then(user => {
            return user.createPost({
              title: args.title,
              content: args.content
            });
          })
        }
      },
      updateUser: {
        type: user,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(source, args) {
          return db.models.user.findById(args.id).then(user => {
            return user.update({
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email.toLowerCase()
            });
          })
        }
      },
    };
  }
});

const schema = new GraphQLSchema({
  query,
  mutation
});

module.exports = schema;
