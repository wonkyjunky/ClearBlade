import React from "react";
import "clearblade-js-client/lib/mqttws31";
import { ClearBlade } from "clearblade-js-client";
import $ from "jquery";
import { cbCredentials, collectionID } from "./credentials";

const cb = new ClearBlade();

cb.init({
  URI: cbCredentials.URI, // e.g., 'https://platform.clearblade.com'
  systemKey: cbCredentials.systemKey,
  systemSecret: cbCredentials.systemSecret,
  callback: initCallback,
});

function initCallback() {
  var collection = cb.Collection(collectionID);
  var query = cb.Query();
}

function App() {
  return <div></div>;
}

export default App;
