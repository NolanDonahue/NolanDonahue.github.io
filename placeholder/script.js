// Preload website images
function preloadImages(srcs) {
  if (!preloadImages.cache) {
    preloadImages.cache = [];
  }
  var img;
  for (var i = 0; i < srcs.length; i++) {
    img = new Image();
    img.src = srcs[i];
    preloadImages.cache.push(img);
  }
}

var imageSrcs = [
  "./references/antique.png",
  "./references/owen.png",
  "./references/portrait.jpg",
];

preloadImages(imageSrcs);
