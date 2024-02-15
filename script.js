import api from "./api.js";

let currentQuestionIndex = 0; // return the page number

// a hashmap with key being the destination of the image, and the values is a list of options for players to choose from
const travelDestinations = {
  "Kyoto, Japan": [
    "Kyoto, Japan",
    "Santorini, Greece",
    "Cape Town, South Africa",
    "Amalfi Coast, Italy",
  ],
  "Santorini, Greece": [
    "Santorini, Greece",
    "Kyoto, Japan",
    "Dubai, United Arab Emirates",
    "Reykjavik, Iceland",
  ],
  "Machu Picchu, Peru": [
    "Machu Picchu, Peru",
    "Banff National Park, Canada",
    "Galápagos Islands, Ecuador",
    "Rio de Janeiro, Brazil",
  ],
  "Banff National Park, Canada": [
    "Banff National Park, Canada",
    "Machu Picchu, Peru",
    "Maui, Hawaii, USA",
    "Taj Mahal, India",
  ],
  "Dubai, United Arab Emirates": [
    "Dubai, United Arab Emirates",
    "Reykjavik, Iceland",
    "Santorini, Greece",
    "Great Barrier Reef, Australia",
  ],
  "Reykjavik, Iceland": [
    "Reykjavik, Iceland",
    "Dubai, United Arab Emirates",
    "Cape Town, South Africa",
    "New Zealand",
  ],
  "Maui, Hawaii, USA": [
    "Maui, Hawaii, USA",
    "Banff National Park, Canada",
    "Rio de Janeiro, Brazil",
    "Amalfi Coast, Italy",
  ],
  "Cape Town, South Africa": [
    "Cape Town, South Africa",
    "Reykjavik, Iceland",
    "Kyoto, Japan",
    "Great Barrier Reef, Australia",
  ],
  "Amalfi Coast, Italy": [
    "Amalfi Coast, Italy",
    "Maui, Hawaii, USA",
    "Taj Mahal, India",
    "Rio de Janeiro, Brazil",
  ],
  "Galápagos Islands, Ecuador": [
    "Galápagos Islands, Ecuador",
    "Machu Picchu, Peru",
    "Great Barrier Reef, Australia",
    "Taj Mahal, India",
  ],
};

//get the key list of the travel destinations
const destinations = Object.keys(travelDestinations);

function loadQuestion(currentQuestionIndex) {
  // display new question
  displayImage(currentQuestionIndex);
  displayOptions(currentQuestionIndex);
  // increment the question index by 1
}

// display one image on the page passing the its position in the travelDestinations array
async function displayImage(num) {
  const dest = destinations[num];

  try {
    // for one image of the dest by calling the unsplash api
    const response = await api.getOnePhoto(dest);
    console.log("printing the response");
    console.log(response);
    const imageUrl = response.results[0].urls.regular;
    console.log(imageUrl);
    // get the image container of the html element
    const imageContainer = document.querySelector(".question__image");
    // display this image on html
    const destImage = document.createElement("img");
    destImage.src = imageUrl;
    destImage.classList.add("question__image-fetched");
    imageContainer.appendChild(destImage);
  } catch (error) {
    console.log(error);
  }
}

//display the list of options
function displayOptions(num) {
  const dest = destinations[num];

  try {
    const options = travelDestinations[dest];
    console.log(options);
    // get the list container;
    const listContainer = document.querySelector(".question__options");
    console.log(listContainer);

    options.forEach((option_text) => {
      // create a li for each element
      const optionElement = document.createElement("button");
      optionElement.innerText = option_text;
      // add class name to the option
      optionElement.classList.add("question__option--default"); // selected correct wrong
      listContainer.appendChild(optionElement);
    });

    // add event listener to the current option buttons
    const curr_options = document.querySelectorAll(
      ".question__option--default"
    );

    for (let i = 0; i < curr_options.length; i++) {
      curr_options[i].addEventListener("click", () => {
        console.log(currentQuestionIndex);
        displayButton(currentQuestionIndex, curr_options[i], curr_options);
      });
      //break;
    }
  } catch (error) {
    console.log(error);
  }
}

// display the next-page button when a user choose an option
function displayButton(index, element, curr_options) {
  //check answer and change button styles
  if (element.innerText === destinations[index]) {
    // display the selected button as green;
    element.classList.add("question__option--corrected");
  } else {
    // display the selected button as red
    element.classList.add("question__option--wrong");
    // find the correct element and add a class of correct--unselected
    for (let i = 0; i < curr_options.length; i++) {
      if (curr_options[i].innerText == destinations[index]) {
        curr_options[i].classList.add("question__option--corrected");
      }
    }
  }

  // clear the next-question button if it ever exists
  //   document.querySelector(".question__button").innerHTML = "";
  // adding the next question button
  const buttonContainer = document.querySelector(".question__button");
  const button = document.createElement("button");
  button.innerText = "Next Question";
  button.classList.add("question__button-next"); // Remove the dot before class name
  buttonContainer.appendChild(button);

  // if the button exists, add the eventlistener to the button
  if (button != null) {
    button.addEventListener("click", () => {
      // clear current content in the container
      console.log("running here");
      document.querySelector(".question__image").innerHTML = "";
      document.querySelector(".question__options").innerHTML = "";
      document.querySelector(".question__button").innerHTML = "";
      // load the next question
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    });
  }
}

// initialize the game
loadQuestion(currentQuestionIndex);
