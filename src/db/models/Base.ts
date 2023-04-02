import DB from "../DB";
import Promise from "bluebird";

/**базовые функции для модели */
interface IModel {
    /**Объект базы */
    db: DB;
    /**Объект с моделями */
    models: any;
    /**название таблицы в бд для обращения к ней */
    name: string;

    setDB(db: DB, models: any, name: string): DB;
    /**Присвоение имени*/
    setName(name: string): void;
    /** функция создания таблицы */
    createTable(): Promise<any>;

    /**Вернуть все значения из модели */
    getAll(): Promise<any>;
    /** Удалить в таблице строку по ее id*/
    deleteById(id: string): Promise<any>;
    /**Вернуть объект по id из бд */
    getById(id: string): Promise<any>;
}

export default class Base implements IModel {
    db: DB;
    models: any;
    name: string;

    constructor(db: DB, name: string) {
        this.db = db;
        this.name = "";
        this.setDB(db);
        this.setName(name);
    }

    setDB(db: DB): DB {
        if (!db) {
            throw Error("DB is" + db);
        }
        this.db = db;
        return db;
    }

    setName(name: string): void {
        if (!name) {
            throw Error("Имя пустое");
        }
        this.name = name;
    }

    createTable(): Promise<any> {
        throw new Error("Требуется релизация");
    }

    getAll() {
        return this.db.all(`SELECT * FROM ${this.name}`, []);
    }

    deleteById(id: string): Promise<any> {
        const sql = `
        DELETE FROM ${this.name} WHERE (id = ?)
        `;
        return this.db.run(sql, [id]);
    }

    getById(id: string): Promise<any> {
        const sql = `
        SELECT * FROM ${this.name} WHERE (id = ?)
        `;
        return this.db.get(sql, [id]);
    }
}
