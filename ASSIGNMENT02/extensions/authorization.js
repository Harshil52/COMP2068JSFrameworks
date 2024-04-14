// Middleware function which checks whether the user is authenticated
function isLoggedIn(req, res, next){

    // if user authenticated calls the next middleware function
    if (req.isAuthenticated()) {
        return next();
    }
    // else it will take user back to login page for authentication
    else{ 
        res.redirect("/login");
    }
    
}

// Exporting the module/function
module.exports = isLoggedIn;