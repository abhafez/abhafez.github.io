// Menus

// ###################################
// Slider
// ##################################

// $(document).ready(init);
//
// var slideDuration = 3000;
// var transitionDuration = 1000;
//
// var id_slider = "#slider";
// var class_sliderContainer = ".js-slider__container";
// var class_slide = ".js-slider__item";
// var class_slideLastChild = ".js-slider__item:last-child";
// var class_slideFirstChild = ".js-slider__item:first-child";
// var id_checkbox = "#checkbox";
// var class_controlNext = ".js-control--next";
// var class_controlPrev = ".js-control--prev";
//
// var slideCount = $(class_slide).length;
// var sliderWidth;
// var slideWidth;
// var slideHeight = $(class_slide).height();
// var sliderUlWidth;
// var autoplay;
//
// function init() {
//   itemWidth();
//   eventClickPrev();
//   eventClickNext();
//   autoplayer();
//   prependToSlide();
//   assignSizeSliderContainer();
//   windowResize();
// }
//
// function windowResize() {
//   $(window).on("resize", function () {
//     itemWidth();
//     assignSizeSliderContainer();
//   });
// }
//
// function itemWidth() {
//   var sliderWidth = $(id_slider).width();
//   $(class_slide).css("width", sliderWidth + "px");
//   slideWidth = $(class_slide).width();
//   sliderUlWidth = slideCount * slideWidth;
// }
//
// function autoplayer() {
//   autoplay = setInterval(moveRight, slideDuration);
// }
//
// function prependToSlide() {
//   $(class_slideLastChild).prependTo(class_sliderContainer);
// }
//
// function assignSizeSliderContainer() {
//   $(class_sliderContainer).css({
//     width: sliderUlWidth,
//     marginLeft: -slideWidth,
//   });
// }
//
// function moveLeft() {
//   $(class_sliderContainer).animate(
//     {
//       left: +slideWidth,
//     },
//     transitionDuration,
//     function () {
//       $(class_slideLastChild).prependTo(class_sliderContainer);
//       $(class_sliderContainer).css("left", "");
//     }
//   );
// }
//
// function moveRight() {
//   $(class_sliderContainer).animate(
//     {
//       left: -slideWidth,
//     },
//     transitionDuration,
//     function () {
//       $(class_slideFirstChild).appendTo(class_sliderContainer);
//       $(class_sliderContainer).css("left", "");
//     }
//   );
// }
//
// function eventClickPrev() {
//   $(class_controlPrev).click(moveLeft);
// }
//
// function eventClickNext() {
//   $(class_controlNext).click(moveRight);
// }

$(document).ready(init);

var slideDuration = 3000;
var transitionDuration = 1000;

var id_slider = "#slider";
var class_sliderContainer = ".js-slider__container";
var class_slide = ".js-slider__item";
var class_slideLastChild = ".js-slider__item:last-child";
var class_slideFirstChild = ".js-slider__item:first-child";
var class_dots = ".slider__dot";

var class_controlNext = ".js-control--next";
var class_controlPrev = ".js-control--prev";

var slideCount = $(class_slide).length;
var sliderWidth;
var slideWidth;
var slideHeight = $(class_slide).height();
var sliderUlWidth;
var autoplay;

var currentIndex = 0;

function init() {
  itemWidth();
  eventClickPrev();
  eventClickNext();
  autoplayer();
  prependToSlide();
  assignSizeSliderContainer();
  windowResize();
  eventClickDot(); // optional, if you want dots clickable
}

function windowResize() {
  $(window).on("resize", function () {
    itemWidth();
    assignSizeSliderContainer();
  });
}

function itemWidth() {
  var sliderWidth = $(id_slider).width();
  $(class_slide).css("width", sliderWidth + "px");
  slideWidth = $(class_slide).width();
  sliderUlWidth = slideCount * slideWidth;
}

function autoplayer() {
  autoplay = setInterval(moveRight, slideDuration);
}

function prependToSlide() {
  $(class_slideLastChild).prependTo(class_sliderContainer);
}

function assignSizeSliderContainer() {
  $(class_sliderContainer).css({
    width: sliderUlWidth,
    marginLeft: -slideWidth,
  });
}

function moveLeft() {
  $(class_sliderContainer).animate(
    {
      left: +slideWidth,
    },
    transitionDuration,
    function () {
      $(class_slideLastChild).prependTo(class_sliderContainer);
      $(class_sliderContainer).css("left", "");
      updateDotIndex(-1);
    }
  );
}

function moveRight() {
  $(class_sliderContainer).animate(
    {
      left: -slideWidth,
    },
    transitionDuration,
    function () {
      $(class_slideFirstChild).appendTo(class_sliderContainer);
      $(class_sliderContainer).css("left", "");
      updateDotIndex(1);
    }
  );
}

function updateDotIndex(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = slideCount - 1;
  } else if (currentIndex >= slideCount) {
    currentIndex = 0;
  }

  $(class_dots).removeClass("active");
  $(class_dots + `[data-index="${currentIndex}"]`).addClass("active");
}

function eventClickPrev() {
  $(class_controlPrev).click(function () {
    clearInterval(autoplay);
    moveLeft();
    autoplay = setInterval(moveRight, slideDuration);
  });
}

function eventClickNext() {
  $(class_controlNext).click(function () {
    clearInterval(autoplay);
    moveRight();
    autoplay = setInterval(moveRight, slideDuration);
  });
}

function eventClickDot() {
  $(class_dots).click(function () {
    clearInterval(autoplay);

    var targetIndex = $(this).data("index");

    if (targetIndex === currentIndex) return;

    var diff = targetIndex - currentIndex;

    if (diff > 0) {
      for (var i = 0; i < diff; i++) {
        moveRight();
      }
    } else {
      for (var i = 0; i < Math.abs(diff); i++) {
        moveLeft();
      }
    }

    autoplay = setInterval(moveRight, slideDuration);
  });
}
