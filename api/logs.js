var http = require("../utils/http")
var commons = require("../utils/commons")

function logs(context){
	this.ctx = context;
}

/*
* Apps Logs
*/
function appget(that, resolve, reject, options){	
	commons.getUrl(that.ctx.getLogsEndpoint(options.region) + "/recent?app={{app}}", that, resolve, reject, options)
}

function apps(context){
	this.ctx = context;	
}

logs.prototype.apps = function(){
	return new apps(this.ctx);
}

apps.prototype.get = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, appget, options)
	});
}

/*
* Container Logs
*/
function containerget(that, resolve, reject, options){
	commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/{{container}}/logs", that, resolve, reject, options, {"X-Auth-Project-Id": "guid", "Accept": "application/json"})
}

function containers(context){
	this.ctx = context;	
}

logs.prototype.containers = function(){
	return new containers(this.ctx);
}

containers.prototype.get = function(space){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, containerget, space)
	});
}

module.exports = logs;