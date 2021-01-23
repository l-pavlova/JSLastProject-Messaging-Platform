export default class Repository {

    constructor(adapter, collectionName) {
        this.adapter = adapter;
        this._collection = adapter.getConnection().collection(collectionName);
    }

    async create(item) {
        return await this._collection.insertOne(item);
    }

    async find(query) {
        return await this._collection.find(query).toArray();
    }

    async findById(id) {
        const o_id = this.adapter.createObjectId(id);
        return await this._collection.findOne({ '_id': o_id }); //.toArray();
    }

    async updateOne(query, item) {
        return await this._collection.findOneAndUpdate(query, item);
        //console.log("1 document updated");
    }

    async update(query, item) {
        return await this._collection.updateMany(query, item);
        console.log("documents updated");
    }

    async delete(id) {
        return await this._collection.findOneAndDelete(id);
    }

    //fix
    async bulkWrite(docs) {
        const bulk = this._collection.initializeOrderedBulkOp();

        for (let doc of docs) {
            bulk.insert(doc);
        }

        try { // Execute the bulk with a journal write concern
            const result = await bulk.execute();
            return result;
        } catch (err) {
            console.log(err.stack);
            throw err;
        }
    }

    async sortByDate(query) {
        return await this._collection.find(query).sort({ datefield: -1 }).toArray();
    }
}