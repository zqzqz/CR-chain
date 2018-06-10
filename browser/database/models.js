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
    hash: {type:String, required:true}
  },

  handler: {
    owner: {type:String, required:true},
    fid: {type:String, required:true},
    hid: {type:String, required:true},
    price: {type:Number}
  },

  request: {
    from: {type:String, required:true},
    applyTimestamp: {type:String},
    resTimestamp: {type:String},
    secret: {type:String},
    hid: {type:String, required:true},
    message: {type:String},
    stat: {type:Number}
  }
};

