const observableModule = require("tns-core-modules/data/observable");
const Https = require("nativescript-https");
const httpModule = require("tns-core-modules/http");
const fileSystemModule = require("tns-core-modules/file-system");

const pigallBaseURL = "http://192.168.16.100/";

function sendRequest(query, method, data) {
  httpModule.request({
      url: pigallBaseURL + query,
      method: method
  }).then((response) => {
      alert(response);
  }, (e) => {
      alert(e);
  });
/**
  let dir = fileSystemModule.knownFolders.currentApp().getFolder('assets');
  let certificate = dir.getFile('cert.pem').path;
  Https.enableSSLPinning({ host: '192.168.0.18', certificate: certificate, allowInvalidCertificates: true, validatesDomainName: true});

  Https.request({
    url: pigallBaseURL + query,
    method: method
  }).then((response) => {
    alert(response);
  }, (e) => {
    alert(e);
  });

  Https.disableSSLPinning();*/
}



function HomeViewModel() {
  return observableModule.fromObject({

    onNavBtnTap: function (args) {
      args.object.page.frame.goBack();
    },

    saveImage: function (args) {
      sendRequest("save_image", "POST", {});
    },

    saveClip: function (args) {
      sendRequest("save_clip", "POST", {});
    },

  });
}

module.exports = HomeViewModel;
