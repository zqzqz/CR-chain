// database schema
//
module.exports = {

  file: {
    title: {type:String, required:true},
    fid: {type:String, required:true},
    owner: {type:String, required:true},
    keyword: {type:String},
    summary: {type:String},
    uploadTimestamp : {type:String},
    hash: {type:String, required:true},
    handler : {type:String},
    _price : {type:Number}
  },
  request: {
    from: {type:String, required:true},
    applyTimestamp: {type:String, required:true},
    resTimestamp: {type:String, required:true},
    secret: {type:String},
    handler: {type:String, required:true},
    message: {type:String},
    stat: {type:Number}
  }
};

