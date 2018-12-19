
const serializeJson = (jsonData) => {
  let serializedFormData = [];

  for (let property in jsonData) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(jsonData[property]);
    serializedFormData.push(encodedKey + "=" + encodedValue);
  }
  serializedFormData = serializedFormData.join("&");

  return serializedFormData;
}

export default serializeJson;