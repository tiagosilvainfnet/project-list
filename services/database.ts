import * as SQLite from 'expo-sqlite';
import * as Network from 'expo-network';
import {tableItemImageQuery, tableItemQuery, tableUserQuery} from "@/constants/tables";
import {updateData} from "@/services/realtime";

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

const update = async  (table, data, uid, enable_sync): Promise<String> => {
    try {
        if (enable_sync) {
            const sync = await syncFirebase(table, data, data.uid);
            data.sync = sync ? 1 : 0;
        }

        const db = await getDb();

        const keys = Object.keys(data);
        const values = Object.values(data).filter((v) => v !== "");
        const columns = keys.filter((v) => v !== "").map((v, index) => `${v} = ?`).join(", ").toLowerCase();

        const query = `UPDATE ${table} SET ${columns.substring(0, columns.length)} WHERE uid = '${uid}'`;
        await db.runAsync(query, values);
    } catch (err) {
        console.error(`[database.ts | insert] >> Database error: ${err.toString()}`);
        throw err;
    }
}

const verifyConnection = async () => {
    const airplane = await Network.isAirplaneModeEnabledAsync();
    const network = await Network.getNetworkStateAsync();
    const result =  network.isConnected && network.isInternetReachable && !airplane;

    return result;
}

const syncFirebase = async (table, data, uid) => {
    const statusConnection = await verifyConnection();
    if (statusConnection) {
        if (Object.keys(data).includes("images")) {
            // TODO: Aqui salvar no storage
            updateData(table, {
                ...data,
                sync: 1
            }, uid);
        } else {
            updateData(table, {
                ...data,
                sync: 1
            }, uid);
        }
    }
}

const insert = async (table, data, enable_sync): Promise<String> => {
    try {
        const db = await getDb();

        if (data.uid === undefined || data.uid === null){
            data.uid = generateUid(28);
        }

        if (enable_sync) {
            const sync = await syncFirebase(table, data, data.uid);
            data.sync = sync ? 1 : 0;
        }

        const keys = Object.keys(data);
        const values = Object.values(data).filter((v) => v !== "");

        const columns = keys.filter((k) => data[k] !== "").join(", ");
        const interrogations = values.filter((v) => v !== "").map(() => '?').join(", ");

        const query = `INSERT INTO ${table} (${columns}) VALUES (${interrogations})`;

        await db.runAsync(query, values);
        return data.uid;
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
        const query = `SELECT ${columnStrin} FROM ${table} ${whereString};`;

        if (many){
            return await db.getAllAsync(query);
        }

        return await db.getFirstAsync(query);
    } catch (err) {
        console.error(`[database.ts | select] >> Database error: ${err.toString()}`);
        throw err;
    }
}

const syncBothDatabase = async () => {

}

const drop = async (table: string, where: string) => {
    const db = await getDb();
    const query = `DELETE FROM ${table} WHERE ${where};`
    await db.runAsync(query);
}

export {
    drop,
    syncBothDatabase,
    createTables,
    dropTables,
    insert,
    select,
    update
}