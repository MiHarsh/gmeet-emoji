let emojis;

var URL = chrome.extension.getURL("scripts/emojis.json");
var request = new XMLHttpRequest();

request.open("GET", URL, true);

// only start when emojis are loaded successfully
request.onreadystatechange = function () {
  // In local files, status is 0 upon success in Mozilla Firefox
  if (request.readyState === XMLHttpRequest.DONE) {
    var status = request.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // The request has been completed successfully
      emojis = JSON.parse(request.responseText);

      const intCheck = setInterval(() => {
        let messageIcon = document.getElementsByClassName("r6xAKc");
        // available only when we enter the meet

        if (messageIcon.length !== 0) {
          clearInterval(intCheck);
          // add the icon to open emoji on click btn

          messageIcon[2].addEventListener("click", () => {
            let isEmoziRendered =
              document.getElementsByClassName("open-chat")[0];

            if (isEmoziRendered === undefined) {
              // there is a delay in class being added, need to check till it gets defined

              let rendInterval = setInterval(() => {
                let box = document.getElementsByClassName("BC4V9b")[0];

                if (box !== undefined) {
                  clearInterval(rendInterval);

                  let newItem = document.createElement("div");
                  let container = createContainer();
                  newItem.className = "open-chat";
                  newItem.innerText = "😄";
                  box.insertBefore(newItem, box.childNodes[0]);
                  box.insertBefore(container, box.childNodes[0]);

                  document
                    .getElementsByClassName(
                      "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd"
                    )[0]
                    .addEventListener("click", () => {
                      document.getElementById("emoji-container").style.display =
                        "none";
                    });

                  createGrid();

                  // close the emoji-pallet when enter key is pressed
                  document
                    .getElementsByClassName("KHxj8b tL9Q4c")[0]
                    .addEventListener("keyup", function (event) {
                      // Number 13 is the "Enter" key on the keyboard
                      if (event.keyCode === 13) {
                        // Cancel the default action, if needed
                        event.preventDefault();
                        // Trigger the button element with a click
                        document.getElementById(
                          "emoji-container"
                        ).style.display = "none";
                      }
                    });
                }
              }, 1000);
            }
          });
        }
      }, 1000);
    } else {
      console.log("Error in loading emojis");
    }
  }
};

request.send(null);

// if (request.status === 200) {
//   emojis = JSON.parse(request.responseText);
// }

function createContainer() {
  let container = document.createElement("div");
  container.className = "emoji-container";
  container.style.display = "none";
  container.id = "emoji-container";

  let navbar = document.createElement("ul");
  navbar.id = "navbar";

  let emoziDiv = document.createElement("div");
  emoziDiv.id = "emoticon-div";
  emoziDiv.className = "emoticon-div";

  container.appendChild(navbar);
  container.appendChild(emoziDiv);

  return container;
}

function createGrid() {
  document
    .getElementsByClassName("open-chat")[0]
    .addEventListener("click", () => {
      let cont = document.getElementById("emoji-container");

      if (cont.style.display !== "none") {
        cont.style.display = "none";
        document
          .getElementsByClassName("BC4V9b")[0]
          .children[2].classList.remove("CDELXb"); // to add the placeholder back
      } else {
        cont.style.display = "flex";

        document
          .getElementsByClassName("BC4V9b")[0]
          .children[2].classList.add("CDELXb"); // to remove the placeholder
      }
    });

  for (let i = 0; i < emojis[Object.keys(emojis)[0]].length; i++) {
    let newElement = document.createElement("div");
    newElement.className = "grid";
    newElement.innerHTML = emojis[Object.keys(emojis)[0]][i];
    document.getElementById("emoticon-div").appendChild(newElement);

    newElement.addEventListener("click", () => {
      let btn = document.getElementsByClassName(
        "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd"
      )[0];

      document.getElementsByClassName("KHxj8b")[0].value +=
        newElement.innerHTML;

      btn.disabled = false;
    });
  }

  for (let i = 0; i < Object.keys(emojis).length; i++) {
    let newElement = document.createElement("li");
    newElement.innerHTML = emojis[Object.keys(emojis)[i]][0];
    newElement.id = Object.keys(emojis)[i];
    newElement.className = "em-nav";

    document.getElementById("navbar").appendChild(newElement);

    // re render with new emozi
    newElement.addEventListener("click", (e) => {
      document.getElementById("emoticon-div").innerHTML = "";

      for (let i = 0; i < emojis[e.target.id].length; i++) {
        let newEl = document.createElement("div");
        newEl.className = "grid";
        newEl.innerHTML = emojis[e.target.id][i];

        document.getElementById("emoticon-div").appendChild(newEl);

        newEl.addEventListener("click", () => {
          // btn => send button
          let btn = document.getElementsByClassName(
            "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd"
          )[0];

          document.getElementsByClassName("KHxj8b")[0].value += newEl.innerHTML;

          btn.disabled = false;
        });
      }
    });
  }
}
