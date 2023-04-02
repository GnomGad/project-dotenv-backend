import DB from "../DB";
import Base from "./Base.js";
import Promise from "bluebird";

export type TUser = {
    id?: string;
    email?: string;
    password?: string;
};

export default class User extends Base {
    constructor(db: DB, name: string = "users") {
        super(db, name);
    }

    createTable(): Promise<any> {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
            )`;
        return this.db.run(sql);
    }

    create(user: TUser): Promise<any> {
        const sql = `
        INSERT INTO ${this.name} (email, password) values(?,?)
        `;
        return this.db.run(sql, [user.email, user.password]);
    }

    getByEmail(user: TUser): Promise<any> {
        const sql = `
        SELECT * FROM ${this.name} WHERE (email = ?)
        `;
        return this.db.get(sql, [user.email]);
    }
    /*
    update(user: TUser): Promise<any> {
        const sql = `
        UPDATE ${this.name}
        SET email = ?, password =?
        WHERE (id = ?)
        `;
        return this.db.run(sql, [user.email, user.password, user.id]);
    }
    */
}
