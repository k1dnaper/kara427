const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

function inputRemover() {
  for (let i = 0; i < 5; i++) {
    findedUserCounter--;
    document.querySelector(".findedUser").remove();
    document.querySelector(".addedUser").remove();
  }
}

let findedUserCounter = 0;
let x = 0;
async function findedUsers(result) {
  if (findedUserCounter >= 5) {
    inputRemover();
  }
  for (let i = 0; i < 5; i++) {
    findedUserCounter++;
    inputer.insertAdjacentHTML("afterend", '<div class="findedUser" ></div>');
    document.querySelector(".findedUser").innerText = `${result.items[i].name}`;
    document.querySelector(".findedUser").classList.add(`${i}`);
    document
      .querySelector(".findedUser")
      .addEventListener("click", addUserToList);
    inputer.insertAdjacentHTML("afterend", '<div class="addedUser"> </div>');
    document.querySelector(".addedUser").classList.add(`${i}`);
    document.querySelector(
      ".addedUser"
    ).innerText = `Name: ${result.items[i].name}\n Owner: ${result.items[i].owner.login} \n Stars: ${result.items[i].stargazers_count} `;
  }

  function addUserToList() {
    document
      .querySelector(".addedUser")
      .classList.replace("addedUser", "addedUserVision");
    document.querySelector(".addedUserVision").style.display = "flex";
    document
      .querySelector(".addedUserVision")
      .insertAdjacentHTML("beforeend", '<div class="button"></div>');
    document.querySelector(".button").innerText = "+";
    document.querySelector(".button").addEventListener("click", removeEl);
    inputer.value = "";
    inputRemover();
    x++;
  }
}

function removeEl() {
  document.querySelector(".addedUserVision").remove();
}

async function findUsers() {
   return await fetch(
      `https://api.github.com/search/repositories?q=${inputer.value}`
    ).then((result) => {
      if (result.ok) {
        result.json().then((result) => {
          findedUsers(result);
        });
      }
    });
  }

const inputer = document.querySelector(".inputWindow");
const clickDiv = document.querySelectorAll(".findedUser");

runFind = debounce(findUsers, 300);

inputer.addEventListener("keyup", runFind);

