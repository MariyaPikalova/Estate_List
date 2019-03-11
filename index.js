let startButton = document.getElementById("start-search-button");
let marksBtn = document.getElementById("marks-btn");
let nextLoad = document.getElementById('next-load');


startButton.addEventListener('click', startHandler);
nextLoad.addEventListener('click', nextPage);
marksBtn.addEventListener('click', showMarks);

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

    let addMarks = document.getElementsByClassName('add-marks');
    console.log(addMarks);
    for (let i = 0; i < addMarks.length; i++ ){
      addMarks[i].addEventListener('click', function (event) {
        for (var i = 0; i < result.response.listings.length; i++) {
          if ( event.currentTarget === event.currentTarget.parentElement.childNodes[i]) {
            var bookmarks = [];
            bookmarks.push(result.response.listings[i]);
            console.log(bookmarks);
            localStorage.setItem('marks', JSON.stringify(bookmarks));
            alert('Добавлено в закладки');
          }
        }
      });
    }
   nextLoad.style.display = 'block';
  }
}

function renderImages(house, number, className, mainDiv) {
  let childDiv = document.createElement('div');
  childDiv.className = className;
  childDiv.id = number;
  childDiv.style.backgroundImage = "url(" + house.img_url + ")";
  let shadowDiv = document.createElement('div');
  let link = document.createElement('button');
  link.className = 'add-marks';
  shadowDiv.className = 'shadow';
  link.innerHTML = 'ADD TO MARKS';
  shadowDiv.innerHTML = house.price_formatted + '<br>';
  shadowDiv.innerHTML += house.title + '<br>';
  shadowDiv.innerHTML += house.summary + '<br>';
  shadowDiv.innerHTML += house.updated_in_days_formatted + '<br>';


  childDiv.appendChild(shadowDiv);
  childDiv.appendChild(link);
  mainDiv.appendChild(childDiv);
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
  let hideContainer = document.getElementById('hide-content');
  hideContainer.style.display = 'none';
}