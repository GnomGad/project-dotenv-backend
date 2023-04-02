import Promise from "bluebird";
import sqlite3, { Database } from "sqlite3";

/**
 * Интерфейс базы данных
 */
export interface IDB {
    /**Путь к файлу базы данных */
    path: string;
    /**Объект базы данных */
    db: Database;
    /**Функция для запуска sql кода, функционал для INSERT, UPDATE И DELETE */
    run(sql: string, params: any[]): Promise<any>;
    /**функционал для SELECT запроса с вофзвратом только одной строки */
    get(sql: string, params: any[]): Promise<any>;
    /**Функицонал для Select с возвратом множества строк */
    all(sql: string, params: any[]): Promise<any>;
}

export default class DB implements IDB {
    path: string;
    db: Database;

    constructor(path: string) {
        if (!path) {
            throw new Error("Не указан путь к базе " + path);
        }
        this.path = path;
        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.log("Нет коннекта к базе", err);
            } else {
                console.log("Успешный коннект c бд ", path);
            }
        });
    }

    run(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log(`Error DB.run ${sql}\n${err}`);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    get(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log(`Error DB.get ${sql}\n${err}`);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    all(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(`Error DB.all ${sql}\n${err}`);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
