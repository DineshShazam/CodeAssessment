const crypto = require('crypto');

exports.hash = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString('hex');
        
        crypto.scrypt(password, salt, 64, (err, derivedkey) => {
            if (err) reject(new Error(`Password encryption failed, ${err}`));
            
            resolve({saltkey: salt, encryptedData: derivedkey.toString('hex')});
        });
    });
};

exports.verify = async (password, salt, pswdHash) => {
    try {
        return new Promise((resolve, reject) => {
            crypto.scrypt(password, salt, 64, (err, derivedkey) => {
                if (err) reject(new Error(`Password decryption failed, ${err}`));
                resolve(pswdHash == derivedkey.toString('hex'));
            });
        });
    } catch (error) {
        reject(new Error(`Password verification failed, ${error}`));
    }
};
