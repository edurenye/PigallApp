var StartViewModel = require("./start-view-model");
var startViewModel = new StartViewModel();

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = startViewModel;
}

exports.pageLoaded = pageLoaded;