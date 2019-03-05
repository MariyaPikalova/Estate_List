let startButton = document.getElementById("start-search-button");
let currentPage = 1;

startButton.addEventListener("click", startHandler);

function startHandler() {
  let city = document.getElementById("city-input");
  let script = document.createElement("SCRIPT");
  script.src =
    "https://api.nestoria.it" + "/api?action=search_listings&encoding=json&listing_type=" +
    "buy" + "&place_name=" + city.value + "&callback=callbackResult";
  document.getElementsByTagName("head")[0].appendChild(script);
}

function callbackResult(result) {
  if (result.response != null && result.response != undefined) {
    let containerForStartPage = document.getElementById("container-page");
    containerForStartPage.className = "container d-none";

    let containerForGalleryPage = document.getElementById("garbage");
    containerForGalleryPage.className = "grid";

    currentPage = result.response.page;
    totalPages = result.response.total_pages;
    containerForGalleryPage.addEventListener("mouseover", hoverOnPhoto);
    containerForGalleryPage.addEventListener("mouseout", hoverOnPhoto);

    console.log(result.response);

    for (let i = 0; i < result.response.listings.length; i++) {
      house = result.response.listings[i];
      renderImages(house, i, "item", containerForGalleryPage);
    }
  }
}

function renderImages(house, number, className, mainDiv) {
  let childDiv = document.createElement('div');
  childDiv.className = className;
  childDiv.id = number;
  childDiv.style.backgroundImage = "url(" + house.img_url + ")";

  let shadowDiv = document.createElement('div');
  shadowDiv.className = 'shadow';
  shadowDiv.innerHTML = house.price_formatted + '<br>';
  shadowDiv.innerHTML += house.title + '<br>';
  shadowDiv.innerHTML += house.summary + '<br>';
  shadowDiv.innerHTML += house.updated_in_days_formatted + '<br>';

  childDiv.appendChild(shadowDiv);
  mainDiv.appendChild(childDiv);
}

function hoverOnPhoto(event) {
  if (event.target.className === "item") {
    if (event.type == "mouseover") {
      event.target.childNodes[0].style.display = "block";
      for (let i = 0; i < event.target.parentElement.childNodes.length; i++) {
        if (event.target != event.target.parentElement.childNodes[i]) {
          event.target.parentElement.childNodes[i].childNodes[0].style.display = "none";
        }
      }
    }
  }
  if (event.target.className === "shadow") {
    if (event.type == "mouseout") {
      event.target.style.display = "none";
    }
  }
}