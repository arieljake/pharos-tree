module.exports = function error (name, text) {
    var err = new Error(text)
    err.name = name
    return err
};
