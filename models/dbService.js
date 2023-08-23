const conn = require('./dbConfig');
let instance = null;

class dbService {
    // to get instance of the connection
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    // to get all data from the table
    async getAllData() { 
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM crud_table";
                conn.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // to insert new record into the table
    async insertNewRecord(name, age) { 
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => { 
                const query = "INSERT INTO crud_table (name, age, date_added) VALUES (?,?,?)";
                conn.query(query, [name, age, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {id: insertId, name: name, age: age, date_added: dateAdded};
        }catch (error) {
            console.log(error);
        }
    }

    // to update a record in the table
    async updateRecord(id, name, age) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE crud_table SET name = ?, age = ? WHERE id = ?";
                conn.query(query, [name, age, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        }catch (error) {
            console.log(error);
        }
    }

    // to delete a record from the table
    async deleteRecord(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM crud_table WHERE id = ?";
                conn.query(query, [id], (err, result) => { 
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        }catch (error) {
            console.log(error);
        }
    }

    // to get a record from the table
    async getRecordById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM crud_table WHERE id = ?";
                conn.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result[0]);
                })
            });
            return response;
        }catch (error) {
            console.log(error);
        }
    }
}

module.exports = dbService;