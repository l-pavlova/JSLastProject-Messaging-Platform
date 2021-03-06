const groupSchema = {
    bsonType: "object",
    required: ["members"],
    properties: {
        groupName: {
            bsonType: "string",
            description: "must be a string"
        },
        members: {
            bsonType: "array",
            description: "must be an array of user ids"
        },
        messages: {
            bsonType: ["array"],
            description: "if there are any there should be ids of messages"
        }
    }
}

module.exports = groupSchema;