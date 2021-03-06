function createCollection(db, collectionName, schema) {
    console.log(`in create collection:${collectionName} schema:${schema}`);
    db.createCollection(collectionName, {
            validator: {
                $jsonSchema: schema
            },
            validationAction: "warn"
        }).then(() => console.log("created"))
        .catch(() => console.log("already exists"))
}

function deleteCollection(db, colName) {
    db.collection(colName).drop((err, delOK) => {
        if (err)
            throw err;
        if (delOK)
            console.log("Collection deleted");
    });
}
module.exports = {
    createCollection,
    deleteCollection
}
