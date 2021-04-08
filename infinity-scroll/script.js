const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const photoCount = 20;
const apiKey = 'q-LT5_cjbo5MybIeEKI0aYU6szj8zxNIicchGeb0HPs'; 
const apiUrl = `http://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // reset the imagesLoaded 否则就是一个累计加载的总图片而不是当前API call要加载的数量
    imagesLoaded = 0;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  // Run function for each object 
  photosArray.forEach((photo) => {

    // js 通过调用内部方法来生成 html

     // Create <a> to link to Unplash
    const item = document.createElement('a');
    setAttributes(item, {
      'href': photo.links.html,
      'target': '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img'); 
    setAttributes(img, {
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description,
    })

    // Event Listener, check when each is loaded 
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item); 

  });
}

// Get photos from Unsplash API

/* 
Sample `photo` object
{
    "id": "TPwHjQy21O4",
    "created_at": "2021-03-12T08:32:06-05:00",
    "updated_at": "2021-04-07T15:23:01-04:00",
    "promoted_at": "2021-03-15T07:43:57-04:00",
    "width": 3648,
    "height": 5472,
    "color": "#262626",
    "blur_hash": "LNFP4.8|0dxt0K-:b0S49ZR.-oRP",
    "description": null,
    "alt_description": "woman in yellow sleeveless dress wearing gold necklace",
    "urls": {
        "raw": "https://images.unsplash.com/photo-1615555896813-401d84a0d737?ixid=MnwyMjEzNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc4NDA0NDg&ixlib=rb-1.2.1",
        "full": "https://images.unsplash.com/photo-1615555896813-401d84a0d737?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMjEzNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc4NDA0NDg&ixlib=rb-1.2.1&q=85",
        "regular": "https://images.unsplash.com/photo-1615555896813-401d84a0d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEzNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc4NDA0NDg&ixlib=rb-1.2.1&q=80&w=1080",
        "small": "https://images.unsplash.com/photo-1615555896813-401d84a0d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEzNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc4NDA0NDg&ixlib=rb-1.2.1&q=80&w=400",
        "thumb": "https://images.unsplash.com/photo-1615555896813-401d84a0d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEzNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc4NDA0NDg&ixlib=rb-1.2.1&q=80&w=200"
    },
    "links": {
        "self": "https://api.unsplash.com/photos/TPwHjQy21O4",
        "html": "https://unsplash.com/photos/TPwHjQy21O4",
        "download": "https://unsplash.com/photos/TPwHjQy21O4/download",
        "download_location": "https://api.unsplash.com/photos/TPwHjQy21O4/download?ixid=MnwyMjEzNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc4NDA0NDg"
    },
    "categories": [],
    "likes": 37,
    "liked_by_user": false,
    "current_user_collections": [],
    "sponsorship": null,
    "user": {
        "id": "-Ztqron9NHs",
        "updated_at": "2021-04-07T08:33:27-04:00",
        "username": "sabesh",
        "name": "Sabesh Photography",
        "first_name": "Sabesh",
        "last_name": "Photography",
        "twitter_username": null,
        "portfolio_url": null,
        "bio": null,
        "location": "united kingdom ",
        "links": {
            "self": "https://api.unsplash.com/users/sabesh",
            "html": "https://unsplash.com/@sabesh",
            "photos": "https://api.unsplash.com/users/sabesh/photos",
            "likes": "https://api.unsplash.com/users/sabesh/likes",
            "portfolio": "https://api.unsplash.com/users/sabesh/portfolio",
            "following": "https://api.unsplash.com/users/sabesh/following",
            "followers": "https://api.unsplash.com/users/sabesh/followers"
        },
        "profile_image": {
            "small": "https://images.unsplash.com/profile-fb-1612197474-735c83423ffe.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-fb-1612197474-735c83423ffe.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-fb-1612197474-735c83423ffe.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
        },
        "instagram_username": "https://www.instagram.com/dream_art_film/ ",
        "total_collections": 1,
        "total_likes": 22,
        "total_photos": 32,
        "accepted_tos": true,
        "for_hire": true
    },
    "exif": {
        "make": "Canon",
        "model": "Canon EOS-1D X Mark II",
        "exposure_time": "1/200",
        "aperture": "2.0",
        "focal_length": "50.0",
        "iso": 100
    },
    "location": {
        "title": "London, United Kingdom",
        "name": "London, United Kingdom",
        "city": "London",
        "country": "United Kingdom",
        "position": {
            "latitude": 51.507351,
            "longitude": -0.127758
        }
    },
    "views": 766528,
    "downloads": 1229
}
*/
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error here
  }
}

// Check to see if scrolling near bottom
// DOM 之间是分层的 window > document > body 

// scroll event: when an element's scrollbar is being scrolled
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1200 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();