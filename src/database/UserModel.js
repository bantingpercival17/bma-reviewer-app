import {
    alertController
} from '@ionic/vue';
import SQLiteService from './SQLiteService';
class User {
    constructor() {
        this.table = "users";
        this.id = 'id';
        this.email = 'email';
        this.password = 'password'
        this.name = 'name';
        this.token = 'token'
        this.sync = 'sync_user_id';
        this.removed = 'is_removed';
        this.created = 'created_at';
        this.updated = 'updated_at'
        this.createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${this.email} TEXT,
            ${this.password} TEXT,
            ${this.name} TEXT,
            ${this.token} TEXT,
            ${this.sync} INTEGER,
            ${this.removed} BOOLEAN DEFAULT TRUE,
            ${this.created} DATETIME DEFAULT CURRENT_TIMESTAMP,
            ${this.updated} DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.insertData = `INSERT INTO ${this.table} (${this.email}, ${this.password},${this.name}, ${this.token},${this.sync}) VALUES (?, ?, ?, ?, ?)`;
    }
    insertUser(sync_user_id, name, user_email, password, token) {
        const data = [user_email, password, name, token, sync_user_id]
        const sQLiteService = new SQLiteService()
        //this.customAlert('User Model', data);
        //this.customAlert('Insert Query', this.insertData);
        try {
            sQLiteService.execute(this.insertData, data)
            this.customAlert('User Model', 'Save Saved');
        } catch (error) {
            this.customAlert('User Model', 'Error message: ' + error);
        }

    }
    async customAlert(header, message) {
        const alert = await alertController.create({
            header: header,
            subHeader: 'System Message',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}

export default User