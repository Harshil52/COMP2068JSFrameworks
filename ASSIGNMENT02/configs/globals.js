// setting up required dotenv to load environment variables
require("dotenv").config();

const configurations = {

    // Connection String for MongoDb
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },

    Authentication: {
            // Github Connection info containing required clientId, ClientSecret and Callback Url
        GitHub: {
            ClientId: process.env.GITHUB_CLIENT_ID,
            ClientSecret: process.env.GITHUB_CLIENT_SECRET,
            CallbackUrl: process.env.GITHUB_CALLBACK_URL 
        }
    } 
}

module.exports = configurations;
