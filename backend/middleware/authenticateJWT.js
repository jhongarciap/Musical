const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;  // Aquí debe contener { id, username, key }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
