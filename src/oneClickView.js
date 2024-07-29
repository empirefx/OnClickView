let OneClickView = (function () {
  let config = {
    containerClassName: 'image-container',
    imageClassName: 'image-node',
    pathImage: 'images/',
    zoom: true,
    patterns: {
      thumbnail: '(_thumbnail|-thumbnail|_thumb|_small|_medium)?',
      caseInsensitive: true
    }
  };
  let images = [].slice.apply(document.images, null); //Load images

  // Create a float container & name classes
  const imageContainer = document.createElement('div');
  const imageNode = document.createElement('img');

  // Style object for the Image container and image node itself
  const imageContainerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    maxWidth: '50%',
    maxHeight: '80%',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000'
  };

  const imageNodeStyles = {
    width: 'auto',
    height: 'auto',
    alignSelf: 'start',
    overflow: 'hidden',
    objectFit: 'contain',
  };

  // Function to handle clicks outside the image container
  const handleClickOutside = (event) => {
    if (!imageContainer.contains(event.target) && imageContainer.style.display === 'flex') {
   
      toggleDisplay(imageContainer);
      imageNode.src = '';

    }else if(imageNode.contains(event.target)){
  
      if (!config.zoom) return;
      
      toggleZoom(imageContainer);
    }
  };

  // Function do handle click in original image
  const handleClickImage = (event) => {
    const image = event.target; // Get the image element that was clicked

    if (imageContainer.style.display === 'flex') return;

    toggleDisplay(imageContainer);
    toggleZoom(imageContainer, true); //Reset zoom
    
    imageNode.src = imageUrlReconstruction(image.src);

    event.stopPropagation();
  };

  function initialize() {
    imageContainer.className = config.containerClassName;
    imageNode.className = config.imageClassName;

    // Apply styles
    Object.assign(imageContainer.style, imageContainerStyles);
    Object.assign(imageNode.style, imageNodeStyles);

    // Append float container
    document.body.appendChild(imageContainer);
    imageContainer.appendChild(imageNode);

    // Listen to event listeners
    document.addEventListener('click', handleClickOutside);
    images.forEach(image => {
      image.addEventListener('click', handleClickImage);
    });
  }

  function setConfig(newConfig = {}) {
    config = { ...config, ...newConfig };
  }

  function imageUrlReconstruction(src) {
    return config.pathImage + getOriginalImageName(getFilenameFromSrc(src));
  }

  function getFilenameFromSrc(src) {
    const url = new URL(src);
    return url.pathname.split('/').pop();
  }

  function getOriginalImageName(thumbnail) {
    // Construct the regex pattern
    const pattern = `${config.patterns.thumbnail}(\\.\\w+)$`;
    const regexFlags = config.patterns.caseInsensitive ? 'i' : '';
    const regex = new RegExp(pattern, regexFlags);

    return thumbnail.replace(regex, '$2');
  }

  function toggleZoom(div, reset = false) {
    const currentOverflow = window.getComputedStyle(div).maxWidth;

    if (currentOverflow === '100%' || reset) {
      imageContainer.style.maxWidth = '50%';
      imageContainer.style.maxHeight = '80%';
      imageContainer.style.alignItems = 'center';
      imageContainer.style.justifyContent = 'center';

      imageNode.style.cursor = "zoom-in";
    } else {
      imageContainer.style.maxWidth = '100%';
      imageContainer.style.maxHeight = '100%';
      imageContainer.style.alignItems = 'start';
      imageContainer.style.justifyContent = 'start';

      imageNode.style.cursor = "zoom-out";
    }
  }

  function toggleDisplay(div) {
    const currentDisplay = window.getComputedStyle(div).display;

    div.style.display = (currentDisplay === 'none') ? 'flex' : 'none';
  }

  // Return functions and variables that are accessible externally
  return {initialize, setConfig};
})();


export default OneClickView;