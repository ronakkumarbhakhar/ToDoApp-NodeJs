const {app} =require('./router');
const mongoose = require('mongoose');
const dotenv =require('dotenv');

dotenv.config();
const port = process.env.PORT;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rk8875636542:ronakmongodb@cluster0.djgm2ef.mongodb.net/todolist');
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
