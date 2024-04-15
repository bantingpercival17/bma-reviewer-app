// sqlite.service.js
import {
    Plugins
} from '@capacitor/core';
const {
    CapacitorSQLite
} = Plugins;
import {
    SQLiteConnection
} from '@capacitor-community/sqlite';
import {
    alertController
} from '@ionic/vue';
import axios from 'axios'
import ExaminationCategory from './ExaminationCategory';
import User from './UserModel';
import ExaminationScore from './ExaminationScore';
export default {
    data() {
        return {
            database: null,
            examinationCategory: new ExaminationCategory(),
            userModel: new User(),
            examinationScoreModel: new ExaminationScore()
        };
    },
    methods: {
        async initDB() {
            try {
                this.customAlert("BMA Reviewer", axios.defaults.baseURL);
                const sqlite = new SQLiteConnection(CapacitorSQLite);
                const database = await sqlite.createConnection("ionic-vue-db",
                    false, "no-encryption");
                await database.open();
                this.$root.databse = database;
                this.database = database
                await this.createExaminationCategoryTable();
                await this.createUserTable()
                await this.insertData()
            } catch (e) {
                // this.customAlert('Database Request: Error', 'Error creating tables: ' + e);
                console.error('Error opening database: ', e);
            }
        },
        async createExaminationCategoryTable() {
            const createUserTableQuery = this.examinationCategory.createExaminationTableQuery
            try {
                await this.database.run(createUserTableQuery)
                //this.customAlert('Database Request: Success', 'Insert Data: ' + insertData);
            } catch (e) {
                this.customAlert('Create Table Request: Error', 'Error creating tables: ' + e);
            }
        },
        async executeQuery(sql, params = []) {
            try {
                if (!this.database) {
                    throw new Error('Database not initialized');
                }
                return await this.database.run(sql, params);
                //return await this.database.executeSql(sql, params);
            } catch (e) {
                console.error('Error executing query: ', e);
                return false;
            }
        },
        async createUserTable() {
            const createTable = this.userModel.createTableQuery
            const createTableTwo = this.examinationScoreModel
            try {
                await this.database.run(createTable)
                await this.database.run(createTableTwo)
            } catch (error) {

            }
        },
        async insertData() {
            try {
                const data = ["CONTAINER", 4, 21, false]
                const query = this.examinationCategory.insertExaminationData
                const insertData = await this.$root.database.run(query, data)
                //this.customAlert('Database Request: Success', 'Insert Data: ' + insertData);
            } catch (e) {
                this.customAlert('Insert: Error', 'Error adding values: ' + e);
            }

        },
        async insertCategory() {
            //this.customAlert("Server Hosting", axios.defaults.baseURL);
            axios.post('/examination-review')
                .then((response) => {
                    response = response.data.examination.category_lists
                        /* response.forEach(async element => {
                            const data = {
                                category: element.category_name,
                                examination: element.examination_id,
                                sync: element.id
                            }
                             const query = this.examinationCategory.insertCategoryV2(data)
                             const resp = await database.run(query[0], query[1])
                            this.customAlert('Database Request: Success', 'Insert Data: ' + data);
                        }); */
                        /
                        this.customAlert('Database Request: Success', 'Call Data Done');
                }).catch((error) => {
                    //this.customAlert('Database Request: Error', 'Error Insert Data: ' + error);
                    console.log(error)

                })
        },
        async customAlert(header, message) {
            const alert = await alertController.create({
                header: header,
                subHeader: 'System Message',
                message: message,
                buttons: ['OK'],
            });

            await alert.present();
        },
    }
};