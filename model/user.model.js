let mongoose = require('mongoose');
// connect mongodb
const username = "***";
const password = "***";
const database = "***";
const cluster = "***";
const mongodbUri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${database}?authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(mongodbUri, { useNewUrlParser: true }).then(() => {
    console.log("mongodb connceted");
}).catch((err) => {
    console.log("error: " + err);
});

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

let customerSchema = new mongoose.Schema({});

module.exports = {
    User: mongoose.model('User', userSchema),
    Customer: mongoose.model('customers', customerSchema)
};
