import { createTree } from "./createTreeByObj";

const API_KEY: string = "AIzaSyCofOM8sRo0bZRPxjnZxabuOtjuK6xN48o";
const CLIENT_ID: string =
  // "843806706192-trsuvvlpi50vohsul3imgjl20o7fnbuo.apps.googleusercontent.com";
  "843806706192-kpt14amq2llnmsrl596l7ilajh7ciq9t.apps.googleusercontent.com";
const DISCOVERY_DOCS: string[] = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];
const SCOPES: string = "https://www.googleapis.com/auth/drive";

let googleAuth: gapi.auth2.GoogleAuth;
let signInBtn = document.querySelector(".signin__btn") as HTMLButtonElement;
let signOutBtn = document.querySelector(".signout__btn") as HTMLButtonElement;
let listFilesBtn = document.querySelector(".list-file") as HTMLButtonElement;
let addFolderBtn = document.querySelector(
  ".add-folder__btn"
) as HTMLButtonElement;
let fileBtn = document.querySelector(".file") as HTMLButtonElement;

const MIME_TYPE_FOLDER = "application/vnd.google-apps.folder";

export function clientLoad() {
  console.log("loading...");
  gapi.load("client:auth2", initClient);
}

export function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(
      () => {
        console.log("INIT CLIENT");

        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        signInBtn.onclick = signIn;
        signOutBtn.onclick = signOut;
        listFilesBtn.onclick = listFiles;
        addFolderBtn.onclick = function() {
          addFolder();
        };

        fileBtn.onclick = function() {
          file();
        };
      },
      err => {
        msgLog(JSON.stringify(err, null, 2));
      }
    );
}

export function msgLog(msg: any) {
  let pre = document.createElement("pre");
  pre.textContent = msg;
  pre.style.textAlign = "left";
  signOutBtn.after(pre);
}

export function updateSigninStatus(isSigninStatus: boolean) {
  if (isSigninStatus) {
    signOutBtn.style.display = "inline-block ";
    signInBtn.style.display = "none";
  } else {
    signOutBtn.style.display = "none";
    signInBtn.style.display = "inline-block";
  }
}

export function signIn() {
  gapi.auth2
    .getAuthInstance()
    .signIn({
      prompt: "select_account"
      // prompt: "consent"
    })
    .then((googleUser: gapi.auth2.GoogleUser) => {
      listFiles();
    });
}
export function isSignedIn(): boolean {
  return gapi.auth2.getAuthInstance().isSignedIn.get();
}

export function signOut(): void {
  gapi.auth2.getAuthInstance().signOut();
}
//
function listFiles() {
  gapi.client.drive.files
    .list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
      // q: "name contains '.db'",
      spaces: "drive"
    })
    .then(
      function(response: gapi.client.Response<gapi.client.drive.FileList>) {
        msgLog("Files:");
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            msgLog(file.name + " (" + file.id + ")");
          }
        } else {
          msgLog("No files found.");
        }
      },
      err => {
        msgLog(JSON.stringify(err, null, 2));
      }
    );
}

function addFolder(
  parentId: string = "1M2S_OvIrTR9rXX1YdLL1CIUVDNCtoshJ",
  folderName: string = "test name inner folder"
) {
  let folder = {
    name: folderName,
    mimeType: MIME_TYPE_FOLDER,
    parents: [parentId]
  };

  gapi.client.drive.files
    .create({
      resource: folder,
      fields: "id, name, mimeType, size"
    })
    .then(
      res => msgLog(JSON.stringify(res, null, 2)),
      err => msgLog(JSON.stringify(err, null, 2))
    );
}

function file(id: string = "1_K6xMleGXyF1qVwQvryEMoUVtSR3IbWJ") {
  gapi.client.drive.files
    .get({
      fileId: id,
      alt: "media",
      fields: "body"
    })
    .then(res => msgLog(JSON.stringify(res, null, 2)));
}
