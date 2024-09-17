import * as SQLite from 'expo-sqlite';
import {tableItemImageQuery, tableItemQuery, tableUserQuery} from "@/constants/tables";

const getDb = async () => {
    return await SQLite.openDatabaseAsync(process.env.EXPO_PUBLIC_DATABASE_NAME, {
        useNewConnection: true
    });
}

const generateUid = (length: number) => {
    const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid: string = "";
    for(let i = 0 ; i < length ; i++) {
        const random = Math.floor(Math.random() * chars.length);
        uid +=  chars[random];
    }

    return uid;
}

const createTables = async () => {
    try {
        const db = await getDb();

        db.execSync(tableUserQuery);
        db.execSync(tableItemQuery);
        db.execSync(tableItemImageQuery);
        console.log('Tabelas criadas com sucesso.');
    } catch (err) {
        console.error(`[database.ts | createTables] >> Database error: ${err.toString()}`);
    }
}

const dropTables = async () => {
    try {
        const db = await getDb();

        db.execSync("DROP TABLE user;");
        db.execSync("DROP TABLE item;");
        db.execSync("DROP TABLE item_image;");
        console.log('Tabelas deletada com sucesso.');
    } catch (err) {
        console.error(`[database.ts | dropTables] >> Database error: ${err.toString()}`);
    }
}

const insert = async (table, data): Promise<String> => {
    try {
        const db = await getDb();

        if (data.uid === undefined || data.uid === null){
            data.uid = generateUid(28);
        }

        const keys = Object.keys(data);
        const values = Object.values(data).filter((v) => v !== "");

        const columns = keys.filter((k) => data[k] !== "").join(", ");
        const interrogations = values.filter((v) => v !== "").map(() => '?').join(", ");

        const query = `INSERT INTO ${table} (${columns}) VALUES (${interrogations})`;

        await db.runAsync(query, values);
        return "";
    } catch (err) {
        console.error(`[database.ts | insert] >> Database error: ${err.toString()}`);
        throw err;
    }
}

const select = async (table: string, columns: string[], where: string, many: boolean) => {
    try {
        const columnStrin = columns.join(", ");
        const whereString = where !== "" ? `where ${where}` : "";

        const db = await getDb();
        const query = `SELECT ${columnStrin} FROM ${table} ${where};`;

        if (many){
            return await db.getAllAsync(query);
        }

        return await db.getFirstAsync(query);
    } catch (err) {
        console.error(`[database.ts | select] >> Database error: ${err.toString()}`);
        throw err;
    }
}

export {
    createTables,
    dropTables,
    insert,
    select
}