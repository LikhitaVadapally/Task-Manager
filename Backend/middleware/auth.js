import jwt from 'jsonwebtoken';
import { get } from 'lodash';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateToken(req, res, next) {
  const token = get(req.headers, 'authorization', '').split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user; 
    next();
  });
}

