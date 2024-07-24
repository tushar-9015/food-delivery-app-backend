import jwt from 'jsonwebtoken';

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
};

export default createToken;