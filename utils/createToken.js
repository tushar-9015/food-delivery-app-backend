import jwt from 'jsonwebtoken'

export const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
};
