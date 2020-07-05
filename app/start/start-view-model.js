const observableModule = require("tns-core-modules/data/observable");
const utilsModule = require("tns-core-modules/utils/utils");
const connectivity = require("tns-core-modules/connectivity");
const application = require("tns-core-modules/application");
const permissions = require("nativescript-permissions");

function StartViewModel() {
    return observableModule.fromObject({

        onButtonTap: function (args) {

            let options;
            switch (connectivity.getConnectionType()) {
                case connectivity.connectionType.wifi:
                    let ssid = getNetworkSsid();
                    let pigallSsid = "Pigall";
                    if (ssid === pigallSsid) {
                        bindToNetworkK(args);
                    } else if (ssid !== '') {
                        options = {
                            title: "Not connected to the '" + pigallSsid + "' wifi network.",
                            message: "Right now you are connected to the '" + ssid +"' wifi network.",
                            okButtonText: "OK"
                        };
                        alert(options);
                    }
                    break;
                case connectivity.connectionType.mobile:
                case connectivity.connectionType.bluetooth:
                case connectivity.connectionType.ethernet:
                case connectivity.connectionType.none:
                    options = {
                        title: "Not wifi connection found",
                        message: "Make sure the wifi is enabled and you are connected to the Pigall network. None",
                        okButtonText: "OK"
                    };
                    alert(options);
                    break;
                default:
                    options = {
                        title: "Not wifi connection found",
                        message: "Make sure the wifi is enabled and you are connected to the Pigall network. Default",
                        okButtonText: "OK"
                    };
                    alert(options);
                    break;
            }
        },

    });
}

function hasPermission(permissionName, message) {
    if (permissions.hasPermission(permissionName)) {
        return true;
    } else {
        let granted = false;
        permissions.requestPermission(permissionName, message)
            .then(() => {
                granted = true;
            })
            .catch(() => {
                granted = false;
            });
        return granted;
    }
}

function getNetworkSsid() {
    // WiFiManager must use application context (not activity context) otherwise a memory leak can occur
    let context = utilsModule.ad.getApplicationContext();


    let message = "We need that permission in order to check the wifi network state.";
    let options;
    if (!hasPermission(android.Manifest.permission.ACCESS_WIFI_STATE, message)) {
        options = {
            title: "Permission 'ACCESS_WIFI_STATE' not given error",
            message: message,
            okButtonText: "OK"
        };
        alert(options);
        return '';
    }
    if (!hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, message)) {
        options = {
            title: "Permission 'ACCESS_FINE_LOCATION' not given error",
            message: message,
            okButtonText: "OK"
        };
        alert(options);
        return '';
    }
    if (!hasPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION, message)) {
        options = {
            title: "Permission 'ACCESS_COARSE_LOCATION' not given error",
            message: message,
            okButtonText: "OK"
        };
        alert(options);
        return '';
    }

    let wifiManager = context.getSystemService(android.content.Context.WIFI_SERVICE);
    let wifiConnectionInfo = wifiManager.getConnectionInfo()

    if (wifiConnectionInfo.getSupplicantState() === android.net.wifi.SupplicantState.COMPLETED) {
        return wifiConnectionInfo.getSSID().replace(/"([^"]+(?="))"/g, '$1');
    }
    options = {
        title: "Not wifi SSID found",
        message: "Make sure the wifi is enabled and you are connected to the Pigall network.",
        okButtonText: "OK"
    };
    alert(options);
    return '';
}

/**function bindToNetwork(networkSSID, listener) {
    if (SDK_INT < LOLLIPOP) {
        logger.i("SDK version is below Lollipop. No need to bind process to network. Skipping...");
        return;
    }
    logger.i("Currently active network is not " + networkSSID + ", would bind the app to use this when available");

    NetworkRequest request = new NetworkRequest.Builder()
            .addTransportType(NetworkCapabilities.TRANSPORT_WIFI).build();
    networkCallback = networkCallback(networkSSID, listener);
    manager.registerNetworkCallback(request, networkCallback);
}*/

function bindToNetworkK(args) {
    // WiFiManager must use application context (not activity context) otherwise a memory leak can occur
    /*let context = utilsModule.ad.getApplicationContext();
    let wifiManager = context.getSystemService(android.content.Context.WIFI_SERVICE);

    if (!hasPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION, message)) {
        options = {
            title: "Permission 'ACCESS_COARSE_LOCATION' not given error",
            message: message,
            okButtonText: "OK"
        };
        alert(options);
        return '';
    }
    let wifiLock = wifiManager.createWifiLock(wifiManager.WIFI_MODE_FULL_HIGH_PERF, "PigallWifiLock");

    let callback = new wifiManager.LocalOnlyHotspotCallback();*/

    const connectivityManager = application.android.foregroundActivity.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
    let builder;

    let options;
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
        builder = new android.net.NetworkRequest.Builder();
        //set the transport type do WIFI
        builder.addTransportType(android.net.NetworkCapabilities.TRANSPORT_WIFI);
        // Test
        let activeNetwork = connectivityManager.getActiveNetwork();

        let networkInfo = connectivityManager.getNetworkInfo(activeNetwork);
        let networkSsid = networkInfo.extraInfo;
        alert(networkSsid);

        connectivityManager.bindProcessToNetwork(activeNetwork);
        args.object.page.frame.navigate("tabs/tabs-page");

        // End test
        /*try {
            let networkCallback
            connectivityManager.requestNetwork(
                builder.build(),
                android.net.ConnectivityManager.NetworkCallback.extend({
                    onAvailable: function (network) {
                        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                            try {
                                connectivityManager.bindProcessToNetwork(network);
                                args.object.page.frame.navigate("home/home-page");
                            } catch (e) {
                                alert(JSON.stringify(e));
                            }
                        } else {
                            options = {
                                title: "Upgrade Android",
                                message: "1. You need at least the version 6.0.",
                                okButtonText: "OK"
                            };
                            alert(options);
                        }
                        connectivityManager.unregisterNetworkCallback(this);
                    }
                })
            );
        } catch (e) {
            alert(JSON.stringify(e));
        }*/
    } else {
        options = {
            title: "Upgrade Android",
            message: "2. You need at least the version 6.0.",
            okButtonText: "OK"
        };
        alert(options);
    }
}

module.exports = StartViewModel;