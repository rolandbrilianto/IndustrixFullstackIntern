require("dotenv").config();

// const sequelize = require("./src/config/database");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database Connected!!");
//   })
//   .catch((err) => {
//     console.error("db connection failed", err);
//   });

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen({
      port: PORT,
      host: "0.0.0.0",
    });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
