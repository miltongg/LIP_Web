const randomHash = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    let randomHash = 0;
    for (let i = 0; i < 9; i++) {
        randomHash += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomHash
};

module.exports = randomHash;