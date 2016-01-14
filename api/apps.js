var http = require("../utils/http")
var commons = require("../utils/commons")

/**
 * This is the object constructor for Bluemix Managing Apps
 * @constructor
 */
function apps(context) {
    this.ctx = context;
}

/**
 * Get Apps in Space
 * @param  {Object} options [options.region, options.space]
 * @return {JSON}
 */
apps.prototype.getAll = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces/" + options.space_guid + "/apps", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}


/**
 * Get App Summary
 * @param  {Object} options [options.region, options.app]
 * @return {JSON}
 */
apps.prototype.get = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/apps/" + options.app_guid + "/summary", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/**
 * POST Stops App
 * @param  {Object} options [options.region, options.guid]
 * @return {JSON}
 */
apps.prototype.stop = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v3/apps/" + options.app_guid + "/stop", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "PUT", resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = apps;