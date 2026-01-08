// ================= HAMBURGER MENU =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ================= PRODUCT IMAGE GALLERY =================

// 1. Image sources (MATCH your HTML)
const galleryImages = [
  "./Assests/Group 1000004093.png",
  "./Assests/Image_fx (14)-Photoroom 1.png",
  "./Assests/pexels-artempodrez-6801177 1.png"
];

let currentIndex = 0;

// 2. DOM elements
const mainImage = document.getElementById("mainImage");
const arrows = document.querySelectorAll(".arrow");
const thumbs = document.querySelectorAll(".gallery-thumbs img");

// 3. Update main image + active thumb
function updateGallery(index) {
  currentIndex = index;
  mainImage.src = galleryImages[currentIndex];

  thumbs.forEach(t => t.classList.remove("active"));
  thumbs[currentIndex].classList.add("active");
}

// 4. Arrow navigation
arrows.forEach(arrow => {
  arrow.addEventListener("click", () => {
    if (arrow.dataset.dir === "next") {
      currentIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    updateGallery(currentIndex);
  });
});

// 5. Thumbnail click
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateGallery(index);
  });
});

// 6. Initial state
updateGallery(0);



// ================= ADD TO CART + PURCHASE TOGGLE =================
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const addToCartBtn = document.getElementById("addToCart");
const purchaseCards = document.querySelectorAll(".purchase-card");

function updateCartLink() {
  const fragrance = document.querySelector('input[name="fragrance"]:checked')?.value;
  const purchase = document.querySelector('input[name="purchase"]:checked')?.value;

  if (!fragrance || !purchase) return;

  addToCartBtn.href = `/cart?fragrance=${fragrance}&purchase=${purchase}`;
}

purchaseRadios.forEach(radio => {
  radio.addEventListener("change", () => {

    // Toggle subscription boxes
    purchaseCards.forEach(card => card.classList.remove("active"));

    const activeCard = document.querySelector(
      `.purchase-card[data-type="${radio.value}"]`
    );
    activeCard?.classList.add("active");

    updateCartLink();
  });
});

fragranceRadios.forEach(radio => {
  radio.addEventListener("change", updateCartLink);
});

// Initial state
updateCartLink();


// ================= COUNTER ON SCROLL =================
const counters = document.querySelectorAll(".stats span");
const statsSection = document.getElementById("statsSection");

let counterStarted = false;

const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counterStarted) {
    counterStarted = true;

    counters.forEach(counter => {
      const target = +counter.dataset.count;
      let count = 0;
      const increment = target / 60;

      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    });
  }
}, { threshold: 0.4 });

counterObserver.observe(statsSection);


// ================= ACCORDION =================
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    accordionItems.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".icon").textContent = "+";
    });

    item.classList.add("active");
    item.querySelector(".icon").textContent = "−";
  });
});
