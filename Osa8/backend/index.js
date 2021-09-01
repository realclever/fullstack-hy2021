require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
//const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();

const url = process.env.MONGODB_URI;

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB works!");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Token {
    value: String!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      return args.author && args.genre
        ? Book.find({
            author: author._id,
            genres: args.genre,
          }).populate("author")
        : args.author
        ? Book.find({ author: author._id }).populate("author")
        : args.genre
        ? Book.find({ genres: args.genre }).populate("author")
        : Book.find({}).populate("author");
    },
    allAuthors: async (root, args) => {
      console.log("Author.find"); //n+1 check
      return Author.find({}).populate("books");
    },
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: (root, args) => {
      console.log("Book.find"); //n+1 check
      return Book.find({ author: root._id }).countDocuments().populate("books");
    },
  },

  Book: {
    author: async (root, args) => {
      const author = await Author.findOne({ _id: root.author });
      return {
        name: author.name,
        born: author.born,
        id: author._id,
      };
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author }); //assignment to constant variable error
      //const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("ERROR: not authenticated");
      }

      try {
        if (!author) {
          author = new Author({ name: args.author });
          await author.save(); //new author is added even though adding a book might fail.
        }
      } catch (error) {
        throw new UserInputError(
          "ERROR: author length must be at least 4 characters"
        );
      }

      let newBook = await Book.findOne({ title: args.title });

      if (!newBook) {
        try {
          newBook = new Book({ ...args, author });
          await newBook.save(); //new book linked to the author.
        } catch (error) {
          throw new UserInputError(
            "ERROR: title length must be at least 2 characters"
          );
        }
      } else {
        throw new UserInputError("ERROR: title must be unique");
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    }, //works

    editAuthor: async (root, args, { currentUser }) => {
      //const currentUser = context.currentUser;
      const author = await Author.findOne({ name: args.name });

      if (!currentUser) {
        throw new AuthenticationError("ERROR: not authenticated");
      }

      try {
        return !author
          ? null
          : Author.findByIdAndUpdate(
              author._id,
              { born: args.setBornTo },
              { new: true } //findByIdAndUpdate returns a new object
            );
      } catch (error) {
        throw new UserInputError("ERROR: something went wrong");
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError("ERROR: user must be unique");
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("ERROR: wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  }, //works
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
}; //works

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
