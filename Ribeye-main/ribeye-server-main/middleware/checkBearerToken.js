const checkBearerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        // No Authorization header found
        return res.status(401).json({ msg: "Auth Token is missing", data: null })
    };

    // Check if the header starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format' });
    };

    // Get the token from the header (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    req.token = token;
    next()
    
};

export default checkBearerToken;