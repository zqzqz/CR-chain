// database schema
//
module.exports = {

  file: {
    title: {type:String, required:true},
    fid: {type:String, required:true},
    owner: {type:String, required:true},
    keyword: {type:String},
    summary: {type:String},
    uploadTimestamp : {type:String, required:true},
    hash: {type:String, required:true},
    handler : {type:String, required:true},
    _price : {type:Number, required:true}
  },
  requests: {
    sender: {type:String, required:true},
    receiver: {type:String, required:true},
    applyTimestamp: {type:String, required:true},
    resTimestamp: {type:String, required:true},
    secret: {type:String},
    stat: {type:Number},
    fid: {type:String, required:true} 
  },
};

