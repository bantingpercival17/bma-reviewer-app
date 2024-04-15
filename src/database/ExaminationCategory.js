import SQLiteService from './sqlite.service.js';
class ExaminationCategory {
    constructor() {
        this.table = "examination_categories";
        this.id = 'id';
        this.category = 'category_name';
        this.examination = 'examination_id';
        this.sync = 'sync_id';
        this.removed = 'is_removed';
        this.created = 'created_at';
        this.updated = 'updated_at'
        this.createExaminationTableQuery = `
            CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${this.category} TEXT,
            ${this.examination} INTEGER,
            ${this.sync} INTEGER,
            ${this.removed} BOOLEAN,
            ${this.created} DATETIME DEFAULT CURRENT_TIMESTAMP,
            ${this.updated} DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.insertExaminationData = `INSERT INTO ${this.table} (${this.category}, ${this.examination}, ${this.sync}, ${this.removed}) VALUES (?, ?, ?, ?)`;
    }
    async insertCategory(data) {
        const query = `INSERT INTO ${this.table} (${this.category}, ${this.examination}, ${this.sync}, ${this.created}, ${this.updated}) VALUES (?, ?, ?, ?, ?)`;
        const params = [data.category, data.examination, data.sync, data.created, data.updated];
        try {
            const result = await SQLiteService.executeQuery(query, params);
            if (result) {
                console.log('Category inserted successfully');
                return {
                    message: 'Failed to insert category',
                    data: result.insertId,
                    responseStatus: 200
                };
            } else {
                console.error('Failed to insert category');
                return {
                    message: 'Failed to insert category',
                    responseStatus: 417
                };
            }
        } catch (error) {
            console.error('Error inserting category:', error);
            return {
                message: 'Error inserting category: ' + error,
                responseStatus: 403
            };
        }
    }
    async insertCategoryV2(data) {
        const query = `INSERT INTO ${this.table} (${this.category}, ${this.examination}, ${this.sync}) VALUES (?, ?, ?, ?, ?)`;
        const params = [data.category, data.examination, data.sync];
        return {
            query,
            params
        }
    }



}

export default ExaminationCategory