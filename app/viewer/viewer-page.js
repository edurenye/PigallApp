var ViewerViewModel = require("./viewer-view-model");
var viewerViewModel = new ViewerViewModel();

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = viewerViewModel;
}

exports.pageLoaded = pageLoaded;
