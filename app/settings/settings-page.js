var SettingsViewModel = require("./settings-view-model");
var settingsViewModel = new SettingsViewModel();

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = settingsViewModel;
}

exports.pageLoaded = pageLoaded;
