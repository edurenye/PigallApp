const observableModule = require("tns-core-modules/data/observable");

function SettingsViewModel() {
  return observableModule.fromObject({

    onNavBtnTap: function (args) {
      args.object.page.frame.goBack();
    },

  });
}

module.exports = SettingsViewModel;
