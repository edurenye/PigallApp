var TabsViewModel = require("./tabs-view-model");
var tabsViewModel = new TabsViewModel();

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = tabsViewModel;
}

exports.pageLoaded = pageLoaded;
