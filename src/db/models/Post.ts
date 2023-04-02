import DB from "../DB";
import Base from "./Base.js";
import Promise from "bluebird";

export type post = {
    id?: string;
    head: string;
    body: string;
};

export default class Post extends Base {
    constructor(db: DB, name: string = "posts") {
        super(db, name);
    }

    createTable(): Promise<any> {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            head TEXT NOT NULL DEFAULT 'Head is Empty',
            body TEXT NOT NULL DEFAULT 'Body is Empty'
            )`;
        return this.db.run(sql);
    }

    create(post: post): Promise<any> {
        const sql = `
        INSERT INTO ${this.name} (body, head) values(?,?)
        `;
        return this.db.run(sql, [post.head, post.body]);
    }

    update(post: post): Promise<any> {
        const sql = `
        UPDATE ${this.name}
        SET head = ?, body =?
        WHERE (id = ?)
        `;
        return this.db.run(sql, [post.head, post.body, post.id]);
    }
}
