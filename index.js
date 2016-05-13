var anHourFromNow = require('azure-iot-common').anHourFromNow;
var ConnectionString = require('azure-iot-common').ConnectionString;
var SharedAccessSignature = require('azure-iot-common').SharedAccessSignature;

//get at portal.azure.com IotHub > Shared access policies > device > Connection string—primary key
var connectionString = "HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>";

var cn = ConnectionString.parse(connectionString); //Use it just as example. You can pass HostName, DeviceId, SharedAccessKey directly
var sas = SharedAccessSignature.create(cn.HostName, cn.DeviceId, cn.SharedAccessKey, anHourFromNow());

console.log(
    "Send data from your device via https at \n" +
    "https://" + cn.HostName + "/devices/" + cn.DeviceId + "/messages/events?api-version=2016-02-03\n" +
    "Headers: \n" +
    "Content-Type: application/octet-stream\n" +
    "Authorization: SharedAccessSignature sr=" + sas.sr + "&sig=" + sas.sig + "&se=" + sas.se + "\n" +
    "User-Agent: azure-iot-device/1.0.7\n" +
    "iothub-to: /devices/" + cn.DeviceId + "/messages/events\n" +
    "Payload:\n" +
    '{"deviceId":"' + cn.DeviceId + '","yourproperty1":"yourvalue1"}'
)