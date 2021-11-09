const express = require("express")

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const db = require('./models')
// Files
const usePosts = require("./routes/Posts")
const useComments = require("./routes/Comments")
const useUsers = require("./routes/Users")
// Routers
app.use("/posts",usePosts)
app.use("/comments",useComments)
app.use("/auth",useUsers)


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Using port 3001!")
    });
});

