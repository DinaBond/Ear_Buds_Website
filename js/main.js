(() => {
  //burger-menu
  const burgerMenu = document.querySelector("#burger-con");
  const button = document.querySelector(".burger-icon");

  function openMenu() {
    burgerMenu.classList.toggle("open");
    button.classList.toggle("icon-animation");
  }

  button.addEventListener("click", openMenu);

  //ar-model
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {
      title: "Noise Reduction",
      text: "Advanced noise reduction for immersive listening, blocking out distractions effortlessly",
      image: "images/noise-reduction.svg",
    },
    {
      title: "Waterproof",
      text: "Reliable waterproofing for all-weather listening and sweat-resistant durability",
      image: "images/waterproof.svg",
    },
    {
      title: "Upgraded Sound Quality",
      text: "Enhanced sound with richer bass,clear mids, and sharp highs",
      image: "images/sound-quality.svg",
    },
    {
      title: "Bluetooth Connection",
      text: "Seamless Bluetooth connection for stable, lag-free, and easy pairing",
      image: "images/bluetooth.svg",
    },
  ];

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const imgHotspot = document.createElement("img");
      imgHotspot.src = infoBox.image;
      imgHotspot.style.width = "80px";

      const titleHotspot = document.createElement("h2");
      titleHotspot.textContent = infoBox.title;

      const textHotspot = document.createElement("p");
      textHotspot.textContent = infoBox.text;

      selected.appendChild(imgHotspot);
      selected.appendChild(titleHotspot);
      selected.appendChild(textHotspot);
    });
  }

  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  //animation-scrolling
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 450;

  const images = [];
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/explode_${(i + 1).toString().padStart(4, "0")}.webp`;
    images.push(img);
  }

  console.table(images);

  const buds = {
    frame: 0,
  };

  gsap.to(buds, {
    frame: 449,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      markers: false,
      start: "top top",
      end: "500% top",
    },
    onUpdate: render,
  });

  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

  //xray
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  function moveDivisor() {
    divisor.style.width = `${slider.value}%`;
  }

  slider.addEventListener("input", moveDivisor);

  //slider
  const sliderImages = document.querySelectorAll(".images");
  const nextBtn = document.querySelector(".next-button");
  const prevBtn = document.querySelector(".pre-button");
  let currentIndex = 0;

  function showImage(index) {
    const offset = -index * 100;
    const slider = document.querySelector(".slider");

    slider.style.transform = `translateX(${offset}%)`;
  }

  nextBtn.addEventListener("click", function () {
    if (currentIndex < sliderImages.length - 1) {
      currentIndex++;
    }
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
    }
    showImage(currentIndex);
  });

  showImage(currentIndex);

  //scrolling
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  const navLinks = document.querySelectorAll("#burger-con ul li a");

  function scrollLink(e) {
    e.preventDefault();
    console.log(e.currentTarget.hash);
    let selectedLink = e.currentTarget.hash;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `${selectedLink}`, offsetY: 100 },
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", scrollLink);
  });
})();
