import SQLiteService from "./SQLiteService"; // Database Connection and Fuctions
// Models
import User from "./UserModel";
import ExaminationCategory from "./ExaminationCategory";
import ExaminationScore from "./ExaminationScore";

class DatabaseSetup {
    async initDatabase() {
        const dbService = new SQLiteService()
        const userModel = new User()
        const examinationCategory = new ExaminationCategory()
        const examinationScore = new ExaminationScore()
        await dbService.open();
        await dbService.execute(userModel.createTableQuery);
        await dbService.execute(examinationCategory.createExaminationTableQuery);
        await dbService.execute(examinationScore.createTableQuery);
        await dbService.close()
    }
}

export default DatabaseSetup