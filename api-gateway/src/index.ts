import dotenv from "dotenv";
import http from "http";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const main = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
