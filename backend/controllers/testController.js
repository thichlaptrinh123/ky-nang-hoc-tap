const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const testModel = require('../model/testModel')
const getAll = async(id) => {
    try {
        const test = await testModel
                        .findById(id)
        return test;
    }catch(error){
        console.log(' getAll error:' + error);
        throw new Error('lỗi lấy dữ liệu');
    }
}
module.exports = {getAll};