const observableModule = require("tns-core-modules/data/observable");

function ViewerViewModel() {
  return observableModule.fromObject({

    onNavBtnTap: function (args) {
      args.object.page.frame.goBack();
    },

    onReload: function (args) {
      args.object.page.getViewById("webview").reload();
    },

    onNavBtnTap: function (args) {
      args.object.page.frame.goBack();
    },

  });
}

module.exports = ViewerViewModel;
