let startButton = document.getElementById("start-search-button");
let marksBtn = document.getElementById("marks-btn");
let nextLoad = document.getElementById('next-load');
let exitBtn = document.getElementById('exit-btn');
let saveDiv = document.getElementById('show-marks');
let hideContainer = document.getElementById('hide-content');


startButton.addEventListener('click', startHandler);
nextLoad.addEventListener('click', nextPage);
marksBtn.addEventListener('click', showMarks);
exitBtn.addEventListener('click', function (e) {
  saveDiv.innerHTML = '';
  saveDiv.style.display = 'none';
  hideContainer.style.display = 'block';
  exitBtn.style.display = 'none';
});

function startHandler() {
  let city = document.getElementById("city-input");
  let script = document.createElement("SCRIPT");
  script.src =
    "https://api.nestoria.it/api?action=search_listings&country=it&encoding=json&listing_type=" +
    "buy" + "&place_name=" + city.value + '&page=1' + "&callback=callbackResult";
  document.getElementsByTagName("head")[0].appendChild(script);
}
function nextPage(){
  let city = document.getElementById("city-input");
  let script = document.createElement("SCRIPT");
  script.src =
    "https://api.nestoria.it/api?action=search_listings&country=it&encoding=json&listing_type=" +
    "buy" + "&place_name=" + city.value + '&page=2' + "&callback=callbackResult";
  document.getElementsByTagName("head")[0].appendChild(script);
}

function callbackResult(result) {
  if (result.response != null && result.response != undefined) {

    var containerForGalleryPage = document.getElementById("list");
    containerForGalleryPage.className = "grid";

    containerForGalleryPage.addEventListener("mouseover", hoverOnPhoto);
    containerForGalleryPage.addEventListener("mouseout", hoverOnPhoto);

    console.log(result.response);

    for (var i = 0; i < result.response.listings.length; i++) {
      house = result.response.listings[i];
      renderImages(house, i, "item", containerForGalleryPage);
    }
   nextLoad.style.display = 'block';
  }
}

function renderImages(house, number, className, mainDiv) {
  let childDiv = document.createElement('div');
  childDiv.className = className;
  childDiv.id = `item-${number}`;
  childDiv.style.backgroundImage = "url(" + house.img_url + ")";

  let link = document.createElement('button');
  link.className = 'add-marks';
  link.id = `button-${number}`;
  link.innerHTML = 'SAVE TO FAVORITES';

  let shadowDiv = document.createElement('div');
  shadowDiv.className = 'shadow';
  shadowDiv.innerHTML = house.price_formatted + '<br>';
  shadowDiv.innerHTML += house.title + '<br>';
  shadowDiv.innerHTML += house.summary + '<br>';
  shadowDiv.innerHTML += house.updated_in_days_formatted + '<br>';

  childDiv.appendChild(shadowDiv);
  childDiv.appendChild(link);
  mainDiv.appendChild(childDiv);

  link.addEventListener('click', function (e) {
    let itemId = childDiv.id.split('-');
    let butId = link.id.split('-');
    if (itemId[1]=== butId[1]){
      let key = 'key'+ Date.now() + Math.random();
      link.style.display = 'none';
      localStorage.setItem(key, childDiv.outerHTML);
    }
  })
}

function hoverOnPhoto(event) {
  if (event.target.className === "item") {
    if (event.type === "mouseover") {
      event.target.childNodes[0].style.display = "block";
      for (let i = 0; i < event.target.parentElement.childNodes.length; i++) {
        if (event.target !== event.target.parentElement.childNodes[i]) {
          event.target.parentElement.childNodes[i].childNodes[0].style.display = "none";
        }
      }
    }
  }
  if (event.target.className === "shadow") {
    if (event.type === "mouseout") {
      event.target.style.display = "none";
    }
  }
}

function showMarks() {
  hideContainer.style.display = 'none';
  saveDiv.style.display = 'block';
  exitBtn.style.display = 'inline-block';

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    // console.log(key);
    let res = localStorage.getItem(key);
    console.log(res);
    let containerForSavingPage = document.createElement('div');
    containerForSavingPage.className = 'grid col-sm-6 offset-sm-2';
    saveDiv.appendChild(containerForSavingPage);
    containerForSavingPage.innerHTML = res;
    containerForSavingPage.addEventListener("mouseover", hoverOnPhoto);
    containerForSavingPage.addEventListener("mouseout", hoverOnPhoto);
  }
}

