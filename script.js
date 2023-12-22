const images = document.querySelectorAll(".image");
const navCircles = document.querySelectorAll(".circle");
const prvBtn = document.querySelector(".prv-btn>button");
const nextBtn = document.querySelector(".next-btn>button");

let currentImageIndex = 0;
let timeOutID;

function showImage(index) {
  // set display
  images[index].style.display = "block";

  // update navigation circle
  updateNavCircle(index);
}

function slideShow() {
  // set display none for each image
  images.forEach((image) => {
    image.style.display = "none";
  });

  // If currentImageIndex points to last image set it to start before showing image
  if (currentImageIndex == images.length) {
    currentImageIndex = 0;
  }

  // show image
  showImage(currentImageIndex);

  // set currentImageIndex to points to next image
  currentImageIndex++;

  // set time out of 5s before next slide show
  timeOutID = setTimeout(slideShow, 5000);
}

function updateNavCircle(index) {
  // Reset every nav circle class
  navCircles.forEach((circle) => {
    circle.classList = "circle";
  });
  // update class of nav circle corresponding to current image
  navCircles[index].classList = "circle active";
}

function navButtons() {
  prvBtn.addEventListener("click", showPrvSlide);
  nextBtn.addEventListener("click", showNextSlide);

  navCircles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      currentImageIndex = index;

      // Clear time out
      clearTimeout(timeOutID);

      slideShow();
    });
  });
}

function showNextSlide() {
  // Clear time out
  clearTimeout(timeOutID);

  // Decrease to get original slide (currentImageIndex was updated before timeout in slideShow())
  currentImageIndex--;

  // Update currentImageIndex to point to next image index
  if (currentImageIndex == images.length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }

  // Continue slide show with updated currentImageIndex
  slideShow();
}

function showPrvSlide() {
  // Clear time out
  clearTimeout(timeOutID);

  // Decrease one to get original slide (currentImageIndex was updated before timeout in slideShow())
  currentImageIndex--;

  // Update currentImageIndex to point to previous image index
  if (currentImageIndex == 0) {
    currentImageIndex = images.length - 1;
  } else {
    currentImageIndex--;
  }

  // Continue slide show with updated currentImageIndex
  slideShow();
}

slideShow();
navButtons();
