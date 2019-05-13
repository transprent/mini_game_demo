require('libs/weapp-adapter/index');
window.ald = require('./sdk/ald-game.js'); //阿拉丁sdk接入
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
require('src/settings.4a85a');
var settings = window._CCSettings;
require('main.0c38e');
require(settings.debug ? 'cocos2d-js.js' : 'cocos2d-js-min.c5bd6.js');
require('./libs/weapp-adapter/engine/index.js');

wxDownloader.REMOTE_SERVER_ROOT = 'https://cdn-appspot.qfun.com/media/wxgame/skip_classes/CN_WEB_SKIP_CLASSES/102001/static/';
wxDownloader.SUBCONTEXT_ROOT = "";
var pipeBeforeDownloader = cc.loader.md5Pipe || cc.loader.assetLoader;
cc.loader.insertPipeAfter(pipeBeforeDownloader, wxDownloader);

if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
    require('./libs/sub-context-adapter');
}
else {
    // Release Image objects after uploaded gl texture
    cc.macro.CLEANUP_IMAGE_CACHE = true;
}

//qf-sdk接入
window.qfMiniSDK = require("./sdk/qf-sdk.min.js");
window.qfMiniSDK_cfg = require("./sdk/qf-sdk-conf.js");

window.boot();