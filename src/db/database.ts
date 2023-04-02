import DB from "./DB.js";
import Post from "./models/Post";
import User from "./models/User";
import dataModels from "./models/index.js";

export type Models = {
    post: Post;
    user: User;
};

export default function connectDB(path: string) {
    const db = new DB(path);

    const models: Models = {
        post: new dataModels.Post(db),
        user: new dataModels.User(db),
    };
    models.post.createTable();
    models.user.createTable();

    return { DB, db, models };
}
