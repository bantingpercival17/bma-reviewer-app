import {
    Plugins
} from '@capacitor/core';


class SQLiteService {
    constructor() {
        /*    const sqlite = new SQLiteConnection(CapacitorSQLite);
           this.db = sqlite.createConnection("bma-reviewer",
               false, "no-encryption"); */
        const sqlite = Plugins.CapacitorSQLite;
        this.db = sqlite.createConnection("bma-reviewer", false, "no-encryption");
    }

    async open() {
        await this.db.open();
    }

    async close() {
        await this.db.close();
    }

    async execute(sql, params = []) {
        return await this.db.execute(sql, params);
    }

    async query(sql, params = []) {
        return await this.db.query(sql, params);
    }

    async createTable(tableName, columns) {
        const columnsStr = columns.map(col => `${col.name} ${col.type}`).join(', ');
        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsStr})`;
        return await this.execute(sql);
    }

    async insert(tableName, data) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = Array(columns.length).fill('?').join(', ');
        const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
        return await this.execute(sql, values);
    }

    async selectAll(tableName) {
        const sql = `SELECT * FROM ${tableName}`;
        return await this.query(sql);
    }
}

export default SQLiteService;