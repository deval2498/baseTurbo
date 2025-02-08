import express from "express"

const app = express()
console.log(process.env.PORT)
const PORT = process.env.PORT || 3003;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is healthy');
  });

app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
})