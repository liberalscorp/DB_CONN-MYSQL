const dbService = require('../models/dbService.js');

module.exports = {
    getAllData : async (req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        const data = await db.getAllData();
        res.json({data: data});

    }catch(error){
        console.log("GetAllData: " + error);
    }},

    insertNewRecord : async (req, res) => { 
    try{
        const db = dbService.getDbServiceInstance();
        const {name, age} = req.body;
        const data = await db.insertNewRecord(name, age);
        res.json({data: data});

    }catch(error){
        console.log("InsertRecord" + error);
    }},

    updateRecord : async (req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        const {id, name, age} = req.body;
        const data = await db.updateRecord(id, name, age);
        res.json({success: data});

    }catch(error){
        console.log("UpdateRecord" + error);
    }},

    deleteRecord : async (req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        const {id} = req.params;
        const data = await db.deleteRecord(id);
        res.json({success: data});

    }catch(error){
        console.log("DeleteRecord" + error);
    }},

    getRecordById : async (req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        const {id} = req.params;
        const data = await db.getRecordById(id);
        res.json({data: data});

    }catch(error){
        console.log("GetRecordById" + error);
    }}
}
