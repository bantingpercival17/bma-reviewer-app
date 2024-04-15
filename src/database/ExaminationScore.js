import {
    alertController
} from '@ionic/vue';
class ExaminationScore {
    constructor() {
        this.table = "examination_scores";
        this.id = 'id';
        this.score = 'score';
        this.examination = 'examination_id';
        this.category = 'category_id'
        this.user = 'user_id'
        this.sync = 'sync_score_id';
        this.created = 'created_at';
        this.updated = 'updated_at'
        this.createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${this.score} INTEGER,
            ${this.examination} INTEGER,
            ${this.category} INTEGER,
            ${this.user} INTEGER,
            ${this.sync} INTEGER NULL,
            ${this.created} DATETIME DEFAULT CURRENT_TIMESTAMP,
            ${this.updated} DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.insertData = `INSERT INTO ${this.table} (${this.score}, ${this.examination},${this.category}, ${this.user}) VALUES (?, ?, ?, ?)`;
    }
    insertData(data) {
        /*  const data = [user_email, password, name, token, sync_user_id]
         this.customAlert('User Model', data);
         this.customAlert('Insert Query', this.insertData); */
        try {

            this.$root.database.run(this.insertData, data)
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

export default ExaminationScore