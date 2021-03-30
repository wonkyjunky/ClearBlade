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
const collection = cb.Collection(collectionID);

function initCallback() {
  fetching();
}

/**
 * update item propertiy done to false or true when checkbox clicked.
 * @param done
 * @param task
 */
function updateItem(done: boolean, task: string) {
  let query = cb.Query().equalTo("task", task);
  if (done === false) {
    collection.update(
      query,
      { done: true, task: task },
      (err: boolean, response: any) => {
        if (err) {
          console.log("error in update");
          return;
        }
        console.log("updated");
      }
    );
  } else {
    collection.update(
      query,
      { done: false, task: task },
      (err: boolean, response: any) => {
        if (err) {
          console.log("error in update");
          return;
        }
        console.log("updated");
      }
    );
  }
}

/**
 * Delete selected item
 * @param task
 */
function deleteItem(task: string) {
  let query = cb.Query().equalTo("task", task);

  collection.remove(query, async (err: boolean, response: any) => {
    if (err) {
      console.log("error in deleting item");
      return;
    }
    await console.log("delete succeed");
    fetching();
  });
}

/**
 * adding item the the collection
 */

function addItem(task: any) {
  collection.create(
    { done: false, task: task },
    async (err: boolean, response: any) => {
      if (err) {
        console.log("error in adding item");
      }
      await console.log("adding succeed");
      fetching();
    }
  );
}

/**
 * Fetching the collection data
 */
function fetching() {
  $("#hello").html("");
  let query = cb.Query();
  collection.fetch(query, async (err: boolean, response: any) => {
    if (err) {
      console.log("Error in Fetching");
    }
    for (let i = 0; i < response.length; i++) {
      if (response[i].data.done === true) {
        $("#hello").append(
          `<input type="checkbox" checked/> <span><del>${response[i].data.task}</del></span>  
          <button type="button" >delete</button><br /><br />`
        );
      } else {
        $("#hello").append(
          `<input type="checkbox"/> <span>${response[i].data.task}</span>  
          <button type="button">delete</button><br /><br />`
        );
      }
    }
  });
}

function App() {
  return (
    <div>
      <h1 style={{ backgroundColor: "skyblue" }}>Todo List</h1>
      <h3>Welcome to to-do list.</h3>
      <br />
      <span id="hello"></span>
      <br /> <br />
      <form>
        {" "}
        <input id="addInput" type="text"></input>{" "}
        <button
          id="addbtn"
          type="button"
          onClick={() => {
            addItem($("#addInput").val());
          }}
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default App;
