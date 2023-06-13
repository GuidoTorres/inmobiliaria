const jwt = require("jsonwebtoken")


const tokenSign = async(user) => {


    return jwt.sign(
        {
            _id:user.cod_usuario,
            role: user.cod_rol
        },
        process.env.JWT_SECRET,
        {expiresIn: "12h"}
    )

}
const refreshSign = async (user) => {
    return jwt.sign(
        {
            _id: user.cod_usuario,
            role: user.cod_rol
        },
        process.env.REFRESH_TOKEN_SECRET, // Necesitarás otra clave secreta para los refresh tokens
        { expiresIn: "7d" } // Duración del refresh token (puede ser más que esto)
    );
}

const verifyToken = async (token) =>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
        
    }
}
const verifyRefreshToken = async (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports ={tokenSign, verifyToken, refreshSign, verifyRefreshToken}