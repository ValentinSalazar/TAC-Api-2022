function crearDataBase(name) {
    MongoClient.connect(process.env.MONGO_URI, function (err, name) {
        if (err) throw err;
        console.log("Database creada!");
        Institucionales.close();
    });
}

function crearColeccion(name) {
    MongoClient.connect(process.env.MONGO_URI, function (err, Institucionales) {
        if (err) throw err;
        var dbo = Institucionales.db("Institucionales");
        dbo.createCollection(name, function (err, res) {
            if (err) throw err;
            console.log("Colección creada!");
            Institucionales.close();
        });
    });
}

function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}
module.exports = {isObjEmpty}
