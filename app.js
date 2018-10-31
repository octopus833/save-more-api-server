const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const config = require("./config/parameters");

// connect to db
mongoose.connect(`mongodb://${config.dbuser}:${config.dbpassword}@ds147073.mlab.com:47073/save-more-db`, { useNewUrlParser: true });
// once the connection is made, fire a callback to print -> connected to database
mongoose.connection.once("open", ()=>{
    console.log("connected to database");
})

const app = express();
//endpoint for graphql request
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, ()=>{
    console.log("now listening for requests on port 4000");
});

