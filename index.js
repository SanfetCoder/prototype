// Variable
const slider = $(".slider");
const allSliderItemsTag = $(".slider-item");
var sliderItems = [];
var imageIndex = 0;
var imageSources = [];

// Implementation
// Add html content of each tag of all tag with .slider-item to sliderItems
allSliderItemsTag.each(function(){
  sliderItems.push($(this).html());
});

// Add images to imageSources
for (var i = 1; i < 3; i++){
  let prefix = 'testimonial-';
  let suffix = i.toString();
  let concatenated = prefix + suffix;
  let source = `images/${concatenated}.jpg`;
  imageSources.push(source);
}

// Slider Controller
$(".slider-arrow-left").on("click", onControlClickBack);
$(".slider-arrow-right").on("click", onControlClickNext);


// Functions
function onControlClickNext(){
  // It imageIndex does not exceed the last index, increase index and update the source of the image
  if (imageIndex < imageSources.length - 1) {
    imageIndex++;
    $(".slider-image").attr('src', `${imageSources[imageIndex]}`)
    console.log(imageIndex);
  }
}

function onControlClickBack(){
  // if the image index is more than zero, decrease the index, and also update the source of the image
  if (imageIndex > 0){
    imageIndex--;
  }
  $(".slider-image").attr('src', `${imageSources[imageIndex]}`);
  console.log(imageIndex);
  
}





