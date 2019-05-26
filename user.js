var url=require('url');

exports.add=function(req,res){
  var q=url.parse(req.url,true).query;
  var html='<h1>Action called:useradd.do</h1>';
  html+='User name:'+q.uname+'<br>';
  html+='User email:'+q.email+'<br>';
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(html);
};
exports.list=function(req,res){
  var q=url.parse(req.url,true).query;
  var html='<h1>Action called:userlist.do</h1>';
  html+='Search key: '+q.key;
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(html);
};
