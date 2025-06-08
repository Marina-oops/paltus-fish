const PRODUCTS = [
    {
      id: 1,
      name: "Удилище Komandor штекерное JuniorCarp, 390см",
      price: 3905,
      image: "images/udilishe/udilishe-1.jpg",
      images: [
        "images/udilishe/udilishe-1.jpg",
        "images/udilishe/udilishe-2.jpg",
        "images/udilishe/udilishe-3.jpg"
      ],
      description: [
        "Разработан для ловли щуки в труднодоступных местах, эффективен в технике «‎Кавер Шэдинг». Отличается высокой отзывчивостью на малейшие подвижки вершинки спиннинга и способность к активной игре.",
        "Материал: прочный пластик с текстурированным покрытием и металлизированной окраской. Система балансировки TMB с подвижными и зафиксированными шариками обеспечивает дальний заброс, живую игру и устойчивость. ",
        "Универсален в разных стилях ловли. Бюджетная цена делает воблер привлекательным для широкого круга российских рыболовов.",
      ],
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
      name: "Спиннинг Dy nano ATARASHII XP3 Travel (1.58м, 0.2-1гр)",
      price: 2318,
      image: "images/spinnings/spin-1.jpg",
      category: "СПИННИНГИ",
      subcategory: "Морские"
    },
      {
      id: 10,
      name: "Спиннинг SFT Deep Sea Jig Traveler (2.1м, 300-1000гр)",
      price: 13500,
      image: "images/spinnings/spin-2.jpg",
      category: "СПИННИНГИ",
      subcategory: "Морские"
      },
      {
      id: 11,
      name: "Спиннинг Yin Tai APOLLO 77073 (2.10м, 5-20гр)",
      price: 1253,
      image: "images/spinnings/spin-3.jpg",
      category: "СПИННИНГИ",
      subcategory: "Штекерные"
      },
     {
      id: 12,
      name: "Спиннинг Dy PREMIER (2.70м, 100-200гр)",
      price: 1517,
      image: "images/spinnings/spin-4.jpg",
      category: "СПИННИНГИ",
      subcategory: "Штекерные"
     },
     {
      id: 13,
      name: "Спиннинг WFT Oceanic Pro TIDECUTTER Travel (2,10м, 200-700гр)",
      price: 4250,
      image: "images/spinnings/spin-5.jpg",
      category: "СПИННИНГИ",
      subcategory: "Морские"
     }
    ];

let catalogModule;

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCallbackForms();
  initFeedbackForm();
  initMenu();
  initAccordion();
  initStars();
  initClip();
  initSliders();
  initSearch();
  if (window.location.pathname.includes('about_us.html')) {
       initSpecialistsSlider();
  }
  Cart.init();
  if (window.location.pathname.includes('ropes.html')) {
      catalogModule = initProductCatalog();
      initMobileFeatures(catalogModule);
      handleResize();  
  }
  if (!window.location.pathname.includes('ropes.html')) {
      initProductCatalog();
  }
  Cart.updateUI();
  if (document.querySelector('.cart-slider')) {
    new ProductSlider(PRODUCTS);
  }
  if (window.location.pathname.includes('search.html')) {
      initSearchPage();
  }
});

if (window.location.pathname.includes('ropes.html')) {
    window.addEventListener('resize', () => {
      mobileFeaturesInitialized = false;
      initMobileFeatures(catalogModule);
      handleResize();
    });
}

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


function createModal() {
  if (!document.querySelector('#productModal')) {
    const modalHTML = `
      <div id="productModal" class="modal-2">
        <div class="modal-content">
         <div class="title-modal-box">
          <div class="close-btn"><img src="images/close.png" alt="Закрыть "></div>
          <h1 id="modalTitle"></h1>
          </div>
          <div class="modal-body">
            <div class="slider-product" id="modalSlider">
            </div>
            <div class="description-modal">
              <p id="modalDescription"></p>
              <div class="modal-price" id="modalPrice"></div>
              <div class="modal-actions">
                <button type="button">Добавить в корзину</button>
                <div class="share" type="button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.querySelector('#productModal');
     const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  
    const closeImg = closeBtn.querySelector('img');
    if (closeImg) {
      closeImg.onclick = (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
      };
    }
  
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
  }
}

function showProductModal(product) {
  createModal(); // Создаём модалку, если нет

  const modal = document.querySelector('#productModal');
  modal.style.display = 'flex';
  if (!modal) {
    console.error('Модальное окно не найдено');
    return;
  }
  modal.style.display = 'flex';

  // Заполняем данные
  modal.querySelector('#modalTitle').textContent = product.name || 'Без названия';
  modal.querySelector('#modalPrice').textContent = product.price ? `${product.price} руб.` : 'Цена не указана';

  const modalDescription = modal.querySelector('#modalDescription');
  if (Array.isArray(product.description)) {
    modalDescription.innerHTML = product.description.map(p => `<p>${p}</p>`).join('');
  } else {
    modalDescription.innerHTML = `<p>${product.description || ''}</p>`;
  }

  const modalSlider = modal.querySelector('#modalSlider');
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    modalSlider.innerHTML = `
    <div class="slider-track-3">
      ${product.images.map((src, i) => 
        `<img src="${src}" class="modal-slide${i === 0 ? ' active' : ''}" data-index="${i}">`
      ).join('')}
    </div>
    <div class="slider-dots-wrapper">
      ${product.images.map((_, i) => 
        `<span class="dot-3${i === 0 ? ' active' : ''}" data-index="${i}"></span>`
      ).join('')}
    </div>
  `;
  
  const slides = modalSlider.querySelectorAll('.modal-slide');
  const dots = modalSlider.querySelectorAll('.dot-3');
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = +dot.dataset.index;
  
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
  
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  } else {
    modalSlider.innerHTML = '<p>Изображения отсутствуют</p>';
  }

  const addToCartBtn = modal.querySelector('.modal-actions button');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      Cart.addProduct(product);
    };
  }

  const shareBtn = modal.querySelector('.modal-actions .share');
  if (shareBtn) {
    shareBtn.onclick = () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: 'Посмотрите этот товар!',
          url: shareUrl
        }).catch(err => console.error('Ошибка при попытке поделиться:', err));
      } else {
        navigator.clipboard.writeText(shareUrl)
          .then(() => alert('Ссылка на товар скопирована в буфер обмена'))
          .catch(err => console.error('Не удалось скопировать ссылку:', err));
      }
    };
  }  
    
  modal.style.display = 'flex';
}

let mobileFeaturesInitialized = false;

function initMobileFeatures(catalogModule) {
    if (window.innerWidth > 1024 || mobileFeaturesInitialized) return;
    
    initSwipeSlider();
    mobileFeaturesInitialized = true;

    const filterButton = document.querySelector('.filter');
    const filterModal = document.getElementById('filterModal');
    const closeModal = document.querySelector('.close-modal');

    const originalPriceFilterContainer = document.querySelector('.price-filter-container');
    const originalSubFiltersContainer = document.querySelector('.sub_category');

    const mobilePriceFilter = document.querySelector('.mobile-price-filter');
    const mobileSubFilters = document.querySelector('.mobile-subfilters');

    function moveFiltersToModal() {
      if (originalPriceFilterContainer && mobilePriceFilter && !mobilePriceFilter.contains(originalPriceFilterContainer)) {
        mobilePriceFilter.appendChild(originalPriceFilterContainer);
      }
      if (originalSubFiltersContainer && mobileSubFilters && !mobileSubFilters.contains(originalSubFiltersContainer)) {
        mobileSubFilters.appendChild(originalSubFiltersContainer);
      }
    }
      
    if (filterButton && filterModal) {
      filterButton.addEventListener('click', () => {
        moveFiltersToModal();
        filterModal.style.display = 'block';
        mobilePriceFilter.style.display = 'block';
        mobileSubFilters.style.display = 'block';
      });
    }

    if (closeModal) {
      closeModal.addEventListener('click', () => {
        filterModal.style.display = 'none';
        mobilePriceFilter.style.display = 'none';
        mobileSubFilters.style.display = 'none';
      });
    }

    const applyFilters = document.querySelector('.apply-filters');
    if (applyFilters) {
      applyFilters.addEventListener('click', () => {
        filterModal.style.display = 'none';
        mobilePriceFilter.style.display = 'none';
        mobileSubFilters.style.display = 'none';
        if (catalogModule && typeof catalogModule.renderProducts === 'function') {
            catalogModule.renderProducts();
        }
      });
    }
}

function initSwipeSlider() {
  if (window.innerWidth > 1024) return;

  const wrapper = document.getElementById('categoriesWrapper');
  const container = document.getElementById('categoriesContainer');
  if (!wrapper || !container) return;

  let isDragging = false;
  let startPos = 0;
  let prevTranslate = 0;
  let animationID;

  wrapper.addEventListener('touchstart', touchStart, { passive: true });
  wrapper.addEventListener('touchend', touchEnd, { passive: true });
  wrapper.addEventListener('touchmove', touchMove, { passive: false });

  wrapper.addEventListener('mousedown', touchStart);
  wrapper.addEventListener('mouseup', touchEnd);
  wrapper.addEventListener('mouseleave', touchEnd);
  wrapper.addEventListener('mousemove', touchMove);

  function touchStart(e) {
    startPos = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    wrapper.style.cursor = 'grabbing';
    wrapper.style.scrollBehavior = 'auto';
    if (e.type !== 'touchstart') e.preventDefault();
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = currentPosition - startPos;
    wrapper.scrollLeft = prevTranslate - diff;
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    wrapper.style.cursor = 'grab';

    const categories = Array.from(document.querySelectorAll('.category-names'));
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;

    let closestCategory = null;
    let minDistance = Infinity;

    categories.forEach((category) => {
      const rect = category.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(center - wrapperCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCategory = category;
      }
    });

    if (closestCategory) {
      const scrollPos = closestCategory.offsetLeft - wrapper.offsetLeft - (wrapper.offsetWidth - closestCategory.offsetWidth) / 2;
      wrapper.style.scrollBehavior = 'smooth';
      wrapper.scrollTo({ left: scrollPos, behavior: 'smooth' });

      setTimeout(() => {
        wrapper.style.scrollBehavior = 'auto';
      }, 500);
    }
  }

  function animation() {
    prevTranslate = wrapper.scrollLeft;
    animationID = requestAnimationFrame(animation);
  }

  wrapper.style.cursor = 'grab';
}

function handleResize() {
  if (window.innerWidth <= 1024) {
    initSwipeSlider();
  } else {
    const wrapper = document.getElementById('categoriesWrapper');
    if (wrapper) {
      wrapper.style.cursor = '';
      wrapper.style.scrollBehavior = '';
    }
  }
}

// Функция для товаров

function initProductCatalog() {
  let currentCategory = "УДИЛИЩА";
  let selectedSubcategories = new Set();
  let sortAsc = true;
  let minPrice = 0;
  let maxPrice = 50000;
  let isPriceFilterVisible = false;

  const productContainer = document.querySelector('.details-grid-catalog-2');
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

 function updateCategoryCounts() {
    const categories = {
      "УДИЛИЩА": 0,
      "СПИННИНГИ": 0,
      "УДОЧКИ": 0,
      "КАТУШКИ": 0,
      "ЛЕСКИ И ШНУРЫ": 0
    };

    PRODUCTS.forEach(product => {
      if (categories.hasOwnProperty(product.category)) {
        categories[product.category]++;
      }
    });

    document.querySelectorAll('.category-names').forEach(categoryElement => {
      const categoryName = categoryElement.querySelector('.category-names-text').textContent;
      const countElement = categoryElement.querySelector('.number-category-names');
      
      if (categories.hasOwnProperty(categoryName) && countElement) {
        countElement.textContent = `(${categories[categoryName]})`;
      }
    });
  }
    
  function renderProducts() {
    if (!productContainer) return;

    let filtered = PRODUCTS.filter(p => p.category === currentCategory);

    if (selectedSubcategories.size > 0) {
      filtered = filtered.filter(p => selectedSubcategories.has(p.subcategory));
    }

    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
    filtered.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

    updateCurrentCategoryCount(filtered.length);

    productContainer.innerHTML = '';
    filtered.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <div class="product">
          <div class="block-review">
            <img src="${product.image}" alt="Категория">
          </div>
          <div class="line-product"></div>
          <div class="name_product">${product.name}</div>
          <div class="cost">${product.price} руб.</div>
          <div class="buttons_products">
            <button type="button" data-id="${product.id}">Добавить в корзину</button>
            <div class="share" type="button" data-id="${product.id}"></div>
          </div>
        </div>
      `;
      productContainer.appendChild(productDiv);

    productDiv.querySelector('.block-review').addEventListener('click', () => {
      showProductModal(product);
    });

    productDiv.querySelector('button[data-id]').addEventListener('click', () => {
        Cart.addProduct(product);

        const btn = productDiv.querySelector('button[data-id]');
              btn.textContent = 'Добавлено!';
              setTimeout(() => {
                btn.textContent = 'Добавлено в корзину';
              }, 1000);
    });
      
    productDiv.querySelectorAll('.share').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.currentTarget.getAttribute('data-id');
        const shareUrl = `${window.location.origin.href}${productId}`;
    
        if (navigator.share) {
          navigator.share({
            title: 'Товар на сайте',
            text: 'Посмотрите этот товар!',
            url: shareUrl
          }).catch(err => {
            console.error('Ошибка при попытке поделиться:', err);
          });
        } else {
          // Фолбэк: копируем ссылку в буфер обмена
          navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Ссылка на товар скопирована в буфер обмена');
          }).catch(err => {
            console.error('Не удалось скопировать ссылку:', err);
          });
        }
      });
    });
  });

 }
    
  if (window.location.pathname.includes('basket.html')) {
    if (PRODUCTS && PRODUCTS.length > 0) {
      new ProductSlider(PRODUCTS);
    }
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

        const priceFilterContainer = document.querySelector('.price-filter-container');
        if (priceFilterContainer) {
          priceFilterContainer.style.display = 'none';
          isPriceFilterVisible = false;
          
          const fishElement = document.querySelector('.fish_desktop_aside_1');
          if (fishElement) {
            fishElement.classList.remove('fish-filter-active');
            fishElement.classList.add('fish-filter-inactive');
          }
        }
          
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

  if (filterButton && window.innerWidth > 1024) {
    filterButton.addEventListener('click', () => {
      
      const priceFilterContainer = document.querySelector('.price-filter-container');
      const fishElement = document.querySelector('.fish_desktop_aside_1');
      isPriceFilterVisible = !isPriceFilterVisible;
        
      if (priceFilterContainer) {
        priceFilterContainer.style.display = isPriceFilterVisible ? 'block' : 'none';
      }  

        if (fishElement) {
            if (isPriceFilterVisible) {
              fishElement.classList.remove('fish-filter-inactive');
              fishElement.classList.add('fish-filter-active');
            } else {
              fishElement.classList.remove('fish-filter-active');
              fishElement.classList.add('fish-filter-inactive');
            }
        }
        
      const filters = document.querySelector('.subfilters');
      if (filters) {
        filters.remove();
      } else {
        showSubFilter();
      }
    });
  }

 function updateCurrentCategoryCount(count) {
    const activeCategory = document.querySelector('.category-names.active');
    if (activeCategory) {
      const countElement = activeCategory.querySelector('.number-category-names');
      if (countElement) {
        countElement.textContent = `(${count})`;
      }
    }
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

    const container = document.querySelector('.sub_category');
    if (container) {
      container.appendChild(filterDiv);
    }
  }

  function removeSubFilter() {
    const filters = document.querySelector('.subfilters');
    if (filters) filters.remove();

    minPrice = 0;
    maxPrice = 50000;
    
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    if (minPriceInput) minPriceInput.value = minPrice;
    if (maxPriceInput) maxPriceInput.value = maxPrice;
  }

  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const sliderMin = document.getElementById('sliderMin');
  const sliderMax = document.getElementById('sliderMax');
  const applyPriceFilterBtn = document.querySelector('.apply-price-filter');

  function updateInputs() {
    if (minPriceInput) minPriceInput.value = minPrice;
    if (maxPriceInput) maxPriceInput.value = maxPrice;
    if (sliderMin) sliderMin.value = minPrice;
    if (sliderMax) sliderMax.value = maxPrice;
  }

  if (minPriceInput) {
    minPriceInput.addEventListener('input', function() {
      const value = Math.min(parseInt(this.value) || 0, maxPrice);
      minPrice = value;
      if (sliderMin) sliderMin.value = value;
    });
  }

  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', function() {
      const value = Math.max(parseInt(this.value) || 10000, minPrice);
      maxPrice = value;
      if (sliderMax) sliderMax.value = value;
    });
  }

  if (sliderMin) {
    sliderMin.addEventListener('input', function() {
      const value = Math.min(parseInt(this.value), maxPrice);
      minPrice = value;
      if (minPriceInput) minPriceInput.value = value;
    });
  }

  if (sliderMax) {
    sliderMax.addEventListener('input', function() {
      const value = Math.max(parseInt(this.value), minPrice);
      maxPrice = value;
      if (maxPriceInput) maxPriceInput.value = value;
    });
  }

  if (applyPriceFilterBtn) {
    applyPriceFilterBtn.addEventListener('click', function() {
      renderProducts();
    });
  }

  updateCategoryCounts();
  updateInputs();
  renderProducts();

  return {
    renderProducts
  };
}

function initSpecialistsSlider() {
    
  const slider = document.querySelector('.slider-specialists');
  const slides = document.querySelectorAll('.content-specialists');
  const prevBtn = document.querySelector('.arrow-left');
  const nextBtn = document.querySelector('.arrow-right');
  
  if (!slider || !slides.length || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  const slideCount = slides.length;

  const showSlide = (index) => {
    currentSlide = index;
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
    
    renderProductsForSpecialist(index);
  };
    
  const renderProductsForSpecialist = (specialistIndex) => {
    const container = slides[specialistIndex].querySelector('.top-specialists-products');
    
     if (!container || container.dataset.loaded === 'true') return;
    
    const productIds = [
      [2, 4, 6],
      [11, 6, 12],
      [1, 9, 10]
    ][specialistIndex] || [];
      
    const products = PRODUCTS.filter(p => productIds.includes(p.id));

    if (!products.length) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <div class="product">
        <div class="block-review">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="line-product"></div>
        <div class="name_product">${product.name}</div>
        <div class="cost">${product.price} руб.</div>
        <button type="button" data-id="${product.id}">В корзину</button>
      </div>
    `;
    container.appendChild(productDiv);

    productDiv.querySelector('.block-review').addEventListener('click', () => {
      showProductModal(product);
    });

    productDiv.querySelector('button[data-id]').addEventListener('click', () => {
      Cart.addProduct(product);
      
      const btn = productDiv.querySelector('button[data-id]');
      btn.textContent = 'Добавлено!';
      setTimeout(() => {
        btn.textContent = 'В корзину';
      }, 1000);
    });
   });
    container.dataset.loaded = 'true';
  };
    
   prevBtn.addEventListener('click', () => {
    const newIndex = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentSlide + 1) % slideCount;
    showSlide(newIndex);
  });
    
    showSlide(0);
    
    window.addEventListener('resize', () => {
    showSlide(currentSlide);
  });
}

class ProductSlider {
  
  constructor(PRODUCTS) {
    this.PRODUCTS = PRODUCTS;
    this.sliderWrapper = document.querySelector('.cart-slider');
    this.sliderContainer = document.querySelector('.slider-items');
    this.prevBtn = document.querySelector('.slider-arrow.prev');
    this.nextBtn = document.querySelector('.slider-arrow.next');
    this.currentIndex = 0;
    this.visibleItems = 5;
    this.itemWidth = 0;

    if (this.sliderWrapper && this.sliderContainer && this.prevBtn && this.nextBtn) {
      this.initSlider();
    } else {
      console.error('Не найдены необходимые элементы для слайдера');
    }
  }

  initSlider() {
    if (!this.PRODUCTS.length) return;
    this.calculateItemWidth(); 
    this.renderProducts();
    this.setupEventListeners();
    this.updateSlider();
  }

  calculateItemWidth() {
    const sliderWidth = this.sliderWrapper.offsetWidth;
    this.itemWidth = sliderWidth / this.visibleItems;
  }
  
  renderProducts() {
    this.sliderContainer.innerHTML = '';
    this.sliderContainer.style.width = `${this.PRODUCTS.length * this.itemWidth}px`;
    
    this.PRODUCTS.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.style.width = `${this.itemWidth}px`;
      productDiv.innerHTML = `
        <div class="product">
          <div class="block-review">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="line-product"></div>
          <div class="name_product">${product.name}</div>
          <div class="cost">${product.price} руб.</div>
          <div class="buttons_products">
            <button type="button" data-id="${product.id}">Добавить в корзину</button>
            <div class="share" type="button" data-id="${product.id}"></div>
          </div>
        </div>
      `;
      this.sliderContainer.appendChild(productDiv);

      // Добавляем обработчики событий
      productDiv.querySelector('.block-review').addEventListener('click', () => {
        showProductModal(product);
      });

      productDiv.querySelector('button[data-id]').addEventListener('click', () => {
        Cart.addProduct(product);

          const btn = productDiv.querySelector('button[data-id]');
              btn.textContent = 'Добавлено!';
              setTimeout(() => {
                btn.textContent = 'Добавлено в корзину';
              }, 1000);
      });

      productDiv.querySelector('.share').addEventListener('click', (e) => {
        this.handleShareClick(e, product.id);
      });
    });
  }

  handleShareClick(e, productId) {
    const shareUrl = `${window.location.origin}/${productId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Товар на сайте',
        text: 'Посмотрите этот товар!',
        url: shareUrl
      }).catch(err => {
        console.error('Ошибка при попытке поделиться:', err);
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Ссылка на товар скопирована в буфер обмена');
      }).catch(err => {
        console.error('Не удалось скопировать ссылку:', err);
      });
    }
  }

  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.move(-1));
    this.nextBtn.addEventListener('click', () => this.move(1));
    
    window.addEventListener('resize', () => {
      this.calculateItemWidth();
      this.updateSlider();
    });
  }
  
  move(direction) {
    const newIndex = this.currentIndex + direction;
    
    // Проверяем границы
    if (newIndex >= 0 && newIndex <= this.PRODUCTS.length - this.visibleItems) {
      this.currentIndex = newIndex;
      this.updateSlider();
    }
  }

  updateSlider() {
    const offset = -this.currentIndex * this.itemWidth;
    this.sliderContainer.style.transform = `translateX(${offset}px)`;
    this.updateControls();
  }

  updateControls() {
    this.prevBtn.style.display = this.currentIndex <= 0 ? 'none' : 'block';
    this.nextBtn.style.display = this.currentIndex >= this.PRODUCTS.length - this.visibleItems ? 'none' : 'block';
  }
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

function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');
  const searchForm = document.querySelector('.search-wrapper');

  if (!searchInput || !searchIcon) return;

  const handleSearch = (e) => {
   if (e) e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      localStorage.setItem('searchQuery', searchTerm);
     window.location.href = `search.html?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  searchForm.addEventListener('submit', handleSearch);
  
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSearch(e);
    }
  });

  searchIcon.addEventListener('click', handleSearch);
  }

function initSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let searchQuery = urlParams.get('query') || localStorage.getItem('searchQuery') || '';

  if (!urlParams.has('query') && searchQuery) {
    window.history.replaceState(null, null, `?query=${encodeURIComponent(searchQuery)}`);
  }
    
  const productContainer = document.querySelector('.details-grid-catalog-2');
  if (!productContainer) return;
  
  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  renderSearchResults(filteredProducts, productContainer);
  updateSearchHeader(filteredProducts.length, searchQuery);
}

function renderSearchResults(PRODUCTS, container) {
  container.innerHTML = '';

  if (PRODUCTS.length === 0) {
    container.innerHTML = '<p class="no-results">По вашему запросу ничего не найдено</p>';
    return;
  }

  PRODUCTS.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <div class="product">
        <div class="block-review">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="line-product"></div>
        <div class="name_product">${product.name}</div>
        <div class="cost">${product.price} руб.</div>
        <div class="buttons_products">
          <button type="button" data-id="${product.id}">Добавить в корзину</button>
          <div class="share" type="button" data-id="${product.id}"></div>
        </div>
      </div>
    `;
    container.appendChild(productDiv);

    productDiv.querySelector('.block-review').addEventListener('click', () => {
        showProductModal(product);
      });

      productDiv.querySelector('button[data-id]').addEventListener('click', () => {
        Cart.addProduct(product);
         const btn = productDiv.querySelector('button[data-id]');
          btn.textContent = 'Добавлено!';
          setTimeout(() => {
            btn.textContent = 'В корзину';
          }, 1000);
      });

      productDiv.querySelector('.share').addEventListener('click', (e) => {
        this.handleShareClick(e, product.id);
      });
  });
}

function updateSearchHeader(count, query) {
  const resultsHeader = document.querySelector('.search-results-header');
  if (resultsHeader) {
    resultsHeader.innerHTML = count > 0 
      ? `Найдено ${count} товаров по запросу &laquo;${query}&raquo;`
      : `По запросу &laquo;${query}&raquo; ничего не найдено`;
  }
}

const Cart = {
  items: [],
  isInitialized: false,
  // Инициализация корзины
  init() {
    if (this.isInitialized) return;
      
    this.cacheElements();
    this.bindEvents();
    this.restoreCartState();
    this.updateUI();
    this.isInitialized = true;
  },

  // Кэширование DOM-элементов
  cacheElements() {
    this.elements = {
      cartButton: document.getElementById('cart-button'),
      cartCount: document.getElementById('cart-count'),
      cartItemsContainer: document.getElementById('cart-items'),
      promoInput: document.getElementById('promo-input'),
      cartSubtotal: document.getElementById('cart-subtotal'),
      cartDiscount: document.getElementById('cart-discount'),
      cartPromo: document.getElementById('cart-promo'),
      cartTotal: document.getElementById('cart-total') 
    };
  },

  // Навешивание обработчиков событий
  bindEvents() {
    document.querySelectorAll('#cart-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToBasket();
      });
    });
    
    const promoSubmitBtn = document.querySelector('.promo-submit');
    if (promoSubmitBtn) {
        promoSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const promoInput = document.getElementById('promo-input');
            if (promoInput) {
                this.applyPromoCode(promoInput.value.trim());
            }
        });
    }

    const promoRemoveBtn = document.querySelector('.promo-remove');
    if (promoRemoveBtn) {
      promoRemoveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.removePromoCode();
      });
    }
  },

  // Переход на страницу корзины
  goToBasket() {
    this.saveCartState();
    window.location.href = 'basket.html';
  },

  // Сохранение состояния в localStorage
  saveCartState() {
    localStorage.setItem('cart', JSON.stringify({
      count: this.getTotalItemsCount(),
      items: this.items,
      discount: this.getDiscount() || null
    }));
  },

  // Восстановление состояния из localStorage
  restoreCartState() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        this.items = cartData.items || [];
        this.updateCount(cartData.count || '0');
        this.togglePromoRemoveButton(!!cartData.discount);
      } catch (e) {
        console.error('Ошибка восстановления корзины:', e);
        this.items = [];
      }
      } else {
      this.items = [];
      }
  },

  // Добавление товара в корзину
  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    this.recalculateDiscount();
    this.saveCartState();
    this.updateUI();
    this.showAddToCartAnimation();
  },

  // Расчет суммы без учета скидки
  calculateSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  // Обновление счетчика товаров
  updateCount(count) {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
    });
  },
  
  // Удаление товара из корзины
  removeProduct(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCartState();
    this.updateUI();
  },

  // Изменение количества товара
  updateQuantity(productId, newQuantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, newQuantity);
      this.saveCartState();
      this.updateUI();
    }
  },

  // Расчет общего количества товаров
  getTotalItemsCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },

  // Получение текущей скидки
  getDiscount() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || {};
    if (cartData.discount) {
      const subtotal = this.calculateSubtotal();
      return {
        code: cartData.discount.code,
        percent: cartData.discount.percent,
        amount: (subtotal * cartData.discount.percent) / 100
      };
    }
    return null;
  },

  removePromoCode() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || {};
    delete cartData.discount;
    localStorage.setItem('cart', JSON.stringify(cartData));
    
    this.showNotification('Промокод удален');
    this.updateUI();
    this.togglePromoRemoveButton(false);
  },

  // Метод для показа/скрытия кнопки удаления
  togglePromoRemoveButton(show) {
    const removeBtn = document.querySelector('.promo-remove');
    if (removeBtn) {
      removeBtn.style.display = show ? 'block' : 'none';
    }
  },
  
  recalculateDiscount() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || {};
    const discount = cartData.discount;
    
    if (discount) {
      const subtotal = this.calculateSubtotal();
      const newDiscountAmount = (subtotal * discount.percent) / 100;
      
      cartData.discount.amount = newDiscountAmount;
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  },
  
// Применение промокода
  applyPromoCode(promoCode) {
    const validPromoCodes = {
      'FISH10': 10,
      'FISH20': 20,
      'FISH50': 50
    };

    if (!promoCode) {
      this.showNotification('Введите промокод');
      return false;
    }

    const code = promoCode.toUpperCase();
    
    if (validPromoCodes.hasOwnProperty(code)) {
      const discountPercent = validPromoCodes[code];
      const subtotal = this.calculateSubtotal();
      const discountAmount = (subtotal * discountPercent) / 100;

      // Сохраняем скидку
      const cartData = JSON.parse(localStorage.getItem('cart')) || {};
      cartData.discount = {
        code: code,
        percent: discountPercent,
      };
      localStorage.setItem('cart', JSON.stringify(cartData));

      this.recalculateDiscount();

      this.showNotification(`Промокод "${code}" применен! Скидка ${discountPercent}%`);
      
      if (this.elements.promoInput) {
        this.elements.promoInput.value = '';
      }
      
      this.togglePromoRemoveButton(true);
      this.updateUI();
      return true;
    }
    
    this.showNotification('Неверный промокод');
    return false;
  },
  
  // Обновление интерфейса
  updateUI() {

    const count = this.getTotalItemsCount();
    this.updateCount(count);

    if (this.elements.cartItemsContainer) {
      this.renderCartItems();
    }
    
    const subtotal = this.calculateSubtotal();
    const discount = this.getDiscount();
    const discountAmount = discount ? discount.amount : 0;
    const total = Math.round(subtotal - discountAmount);
    
    this.togglePromoRemoveButton(!!discount);
    // Обновляем суммы в корзине
     if (this.elements.cartSubtotal) {
      this.elements.cartSubtotal.textContent = Math.round(subtotal) + ' руб.';
    }

    // Обновляем скидку
    if (this.elements.cartDiscount && this.elements.cartPromo) {
      if (discount) {
        this.elements.cartDiscount.textContent = `-${Math.round(discountAmount)} руб.`;
        this.elements.cartPromo.textContent = discount.code;
      } else {
        this.elements.cartDiscount.textContent = '0 руб.';
        this.elements.cartPromo.textContent = '0 руб.';
      }
    }

    // Обновляем итоговую сумму
    if (this.elements.cartTotal) {
      this.elements.cartTotal.textContent = total + ' руб.';
    }
  },

  showAddToCartAnimation() {
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
      cartButton.classList.add('animate-bounce');
      setTimeout(() => {
        cartButton.classList.remove('animate-bounce');
      }, 1000);
    }
  },
    
  // Метод для отображения уведомлений
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'promo-notification';
    notification.textContent = message;

    const promokodContainer = document.querySelector('.promokod');
        if (promokodContainer) {
            // Удаляем предыдущие уведомления
            const oldNotifications = promokodContainer.querySelectorAll('.promo-notification');
            oldNotifications.forEach(el => el.remove());
            
            promokodContainer.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
  },

  
  // Отрисовка товаров в корзине
  renderCartItems() {
    if (!this.elements.cartItemsContainer) return;
    
    this.elements.cartItemsContainer.innerHTML = '';
    
    this.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h2>${item.name}</h2>
          <div class="cart-item-price">${item.price} руб./шт. × ${item.quantity} шт.</div>
        </div>
        <div class="cart-item-controls">
          <div class="buttons-plus-minus">
            <div class="quantity-btn minus" data-id="${item.id}" role="button"></div>
            <span class="quantity">${item.quantity}</span>
            <div class="quantity-btn plus" data-id="${item.id}" role="button"></div>
          </div>
          <div class="cart-item-total">${item.price * item.quantity} руб.</div>
          <div class="remove-btn" data-id="${item.id}" role="button"></div>
        </div>
      `;
      
      this.elements.cartItemsContainer.appendChild(itemElement);
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const item = this.items.find(item => item.id === id);
        if (item && item.quantity > 1) {
          this.updateQuantity(id, item.quantity - 1);
        } else {
          this.removeProduct(id);
        }
      });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const item = this.items.find(item => item.id === id);
        if (item) {
          this.updateQuantity(id, item.quantity + 1);
        }
      });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.removeProduct(id);
      });
    });
  }

};
