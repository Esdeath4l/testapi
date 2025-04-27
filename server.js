const http = require ("http");

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');
const dbURI = "mongodb+srv://RitikaS:Satoru2624@cuffcomfort.jr0kpke.mongodb.net/"; 

mongoose.connect(dbURI)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
