document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCallbackForms();
  initFeedbackForm();
  initMenu();
  initAccordion();
  initStars();
  initClip();
  initSliders();
  initProductCatalog();
});

// Функция для формы "contact-form"
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = 'black';
      }
    });

    if (!isValid) return;

    setTimeout(() => {
      showThankYouModal();
      form.reset();
    }, 500);
  });
}

// Функция для callback-форм (callback-form, callback-form_2)
function initCallbackForms() {
  const callbackForms = ['callback-form', 'callback-form_2'];
  callbackForms.forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const phoneInput = this.querySelector('input[type="tel"]');
      if (!phoneInput) return;

      let isValid = true;
      if (!phoneInput.value.trim()) {
        phoneInput.style.borderColor = 'red';
        isValid = false;
      } else {
        phoneInput.style.borderColor = 'black';
      }
      if (!isValid) return;

      setTimeout(() => {
        showThankYouModal();
        this.reset();
      }, 500);
    });
  });
}

// Функция для формы "feedback-form"
function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = 'black';
      }
    });

    if (!isValid) return;

    setTimeout(() => {
      showThankYouFeedbackModal();
      form.reset();
    }, 500);
  });
}

// Функция для меню мобильного
function initMenu() {
  const menu = document.querySelector('.menu-mob');
  const burgerButton = document.querySelector('#hamburger-button');

  if (!menu || !burgerButton) return;

  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'visible';
  };

  burgerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener('click', toggleMenu);

  menu.querySelectorAll('.button_nav').forEach(item => {
    item.addEventListener('click', toggleMenu);
  });
}

// Функция для аккордеона вопросов
function initAccordion() {
  const buttons = document.querySelectorAll('.button_quest');
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const currentContent = button.nextElementSibling;

      document.querySelectorAll('.accordion-content').forEach(content => {
        if (content !== currentContent) {
          content.classList.remove('open');
          content.previousElementSibling.classList.remove('open');
        }
      });

      currentContent.classList.toggle('open');
      button.classList.toggle('open');
    });
  });
}

// Функция для рейтинга звездочек
function initStars() {
  const stars = document.querySelectorAll('.star-img');
  const ratingInput = document.getElementById('ratingValue');
  if (!stars.length || !ratingInput) return;

  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => {
        s.src = i <= index ? 'images/star-full.svg' : 'images/star-empty.svg';
      });
    });

    star.addEventListener('mouseout', () => {
      stars.forEach((s, i) => {
        s.src = i < currentRating ? 'images/star-full.svg' : 'images/star-empty.svg';
      });
    });

    star.addEventListener('click', () => {
      currentRating = index + 1;
      ratingInput.value = currentRating;
    });
  });
}

// Функция для клика по скрепке и загрузки файла
function initClip() {
  const clip = document.querySelector('.clip');
  const fileInput = document.getElementById('fileInput');
  const photoButton = document.querySelector('.button_photo');

  if (!clip || !fileInput || !photoButton) return;

  clip.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      photoButton.innerHTML = file.name;
    }
  });
}

// Функция для слайдеров
function initSliders() {
  initSlider('.slider-track', '.dot', '.slide');
  initSlider('.slider-track-2', '.dot-2', '.slide-2');
}

function initSlider(trackSelector, dotsSelector, slidesSelector) {
  const track = document.querySelector(trackSelector);
  const dots = document.querySelectorAll(dotsSelector);
  const slides = document.querySelectorAll(slidesSelector);

  if (!track || !dots.length || !slides.length) return;

  let currentSlide = 0;

  function updateSliderPosition() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSliderPosition();
    });
  });

  let startX = 0;
  let isDragging = false;

  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
  });

  track.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  track.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    handleSwipe(delta);
    isDragging = false;
  });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    const delta = e.changedTouches[0].clientX - startX;
    handleSwipe(delta);
    isDragging = false;
  });

  function handleSwipe(delta) {
    if (delta > 50 && currentSlide > 0) {
      currentSlide--;
    } else if (delta < -50 && currentSlide < slides.length - 1) {
      currentSlide++;
    }
    updateSliderPosition();
  }
}

// Функция для товаров

function initProductCatalog() {
  const products = [
    {
      id: 1,
      name: "Удилище Komandor штекерное JuniorCarp, 390см",
      price: 3905,
      image: "images/udilishe/udilishe-1.jpg",
      category: "УДИЛИЩА",
      subcategory: "На горбушу"
    },
    {
      id: 2,
      name: "Удилище фидерное NAMAZU Tatsujin, 3.6м, до 180гр, IM6-7",
      price: 1999,
      image: "images/udilishe/udilishe-2.jpg",
      category: "УДИЛИЩА",
      subcategory: "Фидерные"
    },
    {
      id: 3,
      name: "Удилище матчевое телескопическое Dayo Crossfire Match, 3.9м, 20-80гр",
      price: 2915,
      image: "images/udilishe/udilishe-3.jpg",
      category: "УДИЛИЩА",
      subcategory: "Матчевые телескопические"
    },
    {
      id: 4,
      name: "Удилище маховое б/к NAMAZU EXPANSE Pole, 7м, 15-40гр, IM7",
      price: 2317,
      image: "images/udilishe/udilishe-4.jpg",
      category: "УДИЛИЩА",
      subcategory: "Маховые"
    },
    {
      id: 5,
      name: "Удилище DY COMPETITION (с кольцами, карповое, 3.6м)",
      price: 4333,
      image: "images/udilishe/udilishe-5.jpg",
      category: "УДИЛИЩА",
      subcategory: "Карповые"
    },
    {
      id: 6,
      name: "Карповое удилище 390см JUNIOR CARP",
      price: 1925,
      image: "images/udilishe/udilishe-6.png",
      category: "УДИЛИЩА",
      subcategory: "Карповые"
    },
    {
      id: 7,
      name: "Карповое удилище RAIDЕR DOSTO CARP 3.9м, 3.25 lb. до 150гр",
      price: 4915,
      image: "images/udilishe/udilishe-7.jpg",
      category: "УДИЛИЩА",
      subcategory: "Карповые"
    },
    {
      id: 8,
      name: "Удилище штекерное карповое YINTAI Lightning Carp 3.3м, 120гр",
      price: 3925,
      image: "images/udilishe/udilishe-8.jpg",
      category: "УДИЛИЩА",
      subcategory: "Карповые"
    },
    {
      id: 9,
      name: "Спиннинг ультралайт MAXIMUS",
      price: 2500,
      image: "images/category-1.png",
      category: "СПИННИНГИ",
      subcategory: "Троллинговые"
    },
    {
      id: 10,
      name: "Спиннинг медиум Shimano Catana",
      price: 5300,
      image: "images/category-1.png",
      category: "СПИННИНГИ",
      subcategory: "Морские"
    }
  ];

  let cartCount = 0;
  let currentCategory = "УДИЛИЩА";
  let selectedSubcategories = new Set();
  let sortAsc = true;

  const cartCounter = document.getElementById('cart-button');
  const productContainer = document.querySelector('.details-grid-catalog');
  const categoryElements = document.querySelectorAll('.category-names');
  const filterButton = document.querySelector('.filter');
  const sortButton = document.querySelector('.sort');

  const subcategories = {
    "УДИЛИЩА": ["Нахлыстовые", "Фидерные", "Матчевые штекерные", "Матчевые телескопические", "Карповые", "На горбушу"],
    "СПИННИНГИ": ["Морские", "Троллинговые", "Штекерные", "Телескопические", "Джерковые и кастинговые (курковые)"],
    "УДОЧКИ": ["С кольцами", "Без колец"],
    "КАТУШКИ": ["Для удочек", "Для нахлыста", "Для спиннингов", "Фидерные катушки"],
    "ЛЕСКИ И ШНУРЫ": ["Лески", "Шнуры"]
  };

  function renderProducts() {
    if (!productContainer) return;

    let filtered = products.filter(p => p.category === currentCategory);

    if (selectedSubcategories.size > 0) {
      filtered = filtered.filter(p => selectedSubcategories.has(p.subcategory));
    }

    filtered.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

    productContainer.innerHTML = '';
    filtered.forEach(product => {
      productContainer.innerHTML += `
        <div class="product">
          <div class="block-review">
            <img src="${product.image}" alt="Категория">
          </div>
          <div class="line-product"></div>
          <div class="name_product">${product.name}</div>
          <div class="cost">${product.price} руб.</div>
          <div class="buttons_products">
            <button type="button" data-id="${product.id}">Добавить в корзину</button>
            <div class="share" role="button"></div>
          </div>
        </div>
      `;
    });

    productContainer.querySelectorAll('button[data-id]').forEach(button => {
      button.addEventListener('click', () => {
        addToCart();
      });
    });
  }

  function addToCart() {
    cartCount++;
    if (cartCounter) {
      cartCounter.textContent = cartCount;
    }
  }

  if (categoryElements.length) {
    categoryElements.forEach(cat => {
      cat.addEventListener('click', () => {
        categoryElements.forEach(el => el.classList.remove('active'));
        cat.classList.add('active');

        const catTextElem = cat.querySelector('.category-names-text');
        if (catTextElem) {
          currentCategory = catTextElem.textContent;
        }
        selectedSubcategories.clear();
        renderProducts();
        removeSubFilter();
      });
    });

    categoryElements.forEach(cat => {
      const catTextElem = cat.querySelector('.category-names-text');
      if (catTextElem && catTextElem.textContent === currentCategory) {
        cat.classList.add('active');
      }
    });
  }

  if (sortButton) {
    sortButton.addEventListener('click', () => {
      sortAsc = !sortAsc;
      renderProducts();
    });
  }

  if (filterButton) {
    filterButton.addEventListener('click', () => {
      const filters = document.querySelector('.subfilters');
      if (filters) {
        filters.remove();
      } else {
        showSubFilter();
      }
    });
  }

  function showSubFilter() {
    const subs = subcategories[currentCategory] || [];
    const filterDiv = document.createElement('div');
    filterDiv.className = 'subfilters';

    subs.forEach(sub => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = sub;
      checkbox.checked = selectedSubcategories.has(sub);

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          selectedSubcategories.add(sub);
        } else {
          selectedSubcategories.delete(sub);
        }
        renderProducts();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(sub));
      filterDiv.appendChild(label);
    });

    const container = document.querySelector('.categories-with-filters');
    if (container) {
      container.appendChild(filterDiv);
    }
  }

  function removeSubFilter() {
    const filters = document.querySelector('.subfilters');
    if (filters) filters.remove();
  }

  renderProducts();
}

// Модальные окна
function showThankYouModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <div class="close-btn"><img src="images/close.png" alt="Закрыть "></div>
      <h2>ВАША ЗАЯВКА ОТПРАВЛЕНА!</h2>
      <p style="font-weight: 700;">Спасибо за обращение!</p>
      <p style="font-weight: 700;">Если заявка отправлена в&nbsp;будни с&nbsp;9:00 до&nbsp;18:00 —&nbsp;мы&nbsp;свяжемся с&nbsp;вами в&nbsp;течение&nbsp;30&nbsp;минут</p>
      <p style="color: white;">Д</p>
      <p>В другое время ответим утром следующего рабочего дня</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
}

function showThankYouFeedbackModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <div class="close-btn"><img src="images/close.png" alt="Закрыть "></div>
      <h2>СПАСИБО ЗА ВАШ ОТЗЫВ!</h2>
      <p style="font-weight: 700;">Мы признательны вам за&nbsp;вашу&nbsp;оценку! Она&nbsp;будет полезна другим пользователям</p>
      <p style="color: white;">Д</p>
      <p>После проверки отзыва на&nbsp;соответствие требованиям, он&nbsp;будет опубликован на&nbsp;сайте! Мы сообщим вам об&nbsp;этом по&nbsp;электронной почте</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
}
