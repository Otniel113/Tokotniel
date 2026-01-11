import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null
        });
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null
    });
  }
};

export default authMiddleware;
