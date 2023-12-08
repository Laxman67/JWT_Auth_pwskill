require("dotenv").config();
const PORT = process.env.PORT || 3030;
const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server is listening at https://localhost:${PORT} -update `);
});
