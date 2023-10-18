const mongoose = require("mongoose");

const connection = mongoose
  .connect(
    "mongodb+srv://patcharapongnamc:zmEvFLeDRfzrYygS@cluster0.skn5stu.mongodb.net/Info",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("เชื่อต่อ DB สำเร็จ"))
  .catch((err) => console.log(`เชื่อต่อ DB ไม่สำเร็จ ${err} `));

module.exports = connection;
