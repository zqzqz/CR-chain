// database schema
//
module.exports = {

  file: {
    title: {type:String, required:true},
    fid: {type:String, required:true},
    owner: {type:String, required:true},
    keyword: {type:String},
    summary: {type:String},
    hash: {type:String, required:true}
  }
};

