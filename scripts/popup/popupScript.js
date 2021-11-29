import emojis from "../emojis.json" assert { type: "json" };

for (let i = 0; i < emojis[Object.keys(emojis)[0]].length; i++) {
  let newElement = document.createElement("div");
  newElement.className = "grid";
  newElement.innerHTML = emojis[Object.keys(emojis)[0]][i];
  document.getElementById("emoticon-div").appendChild(newElement);

  //   add eventlistner to copy on click
  newElement.addEventListener("click", () => {
    copyToClipboard(newElement.innerHTML);
  });
}

for (let i = 0; i < Object.keys(emojis).length; i++) {
  let newElement = document.createElement("li");
  newElement.innerHTML = emojis[Object.keys(emojis)[i]][0];
  newElement.id = Object.keys(emojis)[i];
  newElement.classList.add("em-nav");
  if (i === 0) {newElement.classList.add("active");}

  document.getElementById("navbar").appendChild(newElement);
  newElement.addEventListener("click", (e) => {

    const navs = [...document.getElementsByClassName("em-nav")];
    navs.forEach(nav => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
      }
      else if (nav.id === e.target.id) {
        nav.classList.add("active")
      }
    });

    document.getElementById("emoticon-div").innerHTML = "";

    for (let i = 0; i < emojis[e.target.id].length; i++) {
      let newElement = document.createElement("div");
      newElement.className = "grid";
      newElement.innerHTML = emojis[e.target.id][i];

      document.getElementById("emoticon-div").appendChild(newElement);

      //   add eventlistner to copy on click
      newElement.addEventListener("click", () => {
        copyToClipboard(newElement.innerHTML);
      });
    }
  });
}

function copyToClipboard(value) {
  const el = document.createElement("textarea");
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
