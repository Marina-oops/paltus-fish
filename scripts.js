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
  Cart.init();
  Cart.updateUI();
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

  modal.querySelector('#modalAddToCart').onclick = () => {
    addToCart(product.id);
  };

  modal.querySelector('#modalShare').onclick = () => {
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

  modal.style.display = 'flex';
}

// Функция для товаров

function initProductCatalog() {
  const products = [
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

  let cartCount = 0;
  let currentCategory = "УДИЛИЩА";
  let selectedSubcategories = new Set();
  let sortAsc = true;

  const cartCounter = document.getElementById('cart-count');
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
    
  function renderProducts() {
    if (!productContainer) return;

    let filtered = products.filter(p => p.category === currentCategory);

    if (selectedSubcategories.size > 0) {
      filtered = filtered.filter(p => selectedSubcategories.has(p.subcategory));
    }

    filtered.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

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

    const container = document.querySelector('.sub_category');
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

const Cart = {
  items: [],
  // Инициализация корзины
  init() {
    this.cacheElements();
    this.bindEvents();
    this.restoreCartState();
    this.updateUI();
  },

  // Кэширование DOM-элементов
  cacheElements() {
    this.elements = {
      cartButton: document.getElementById('cart-button'),
      cartCount: document.getElementById('cart-count'),
      cartTotal: document.getElementById('cart-total'),
      cartItemsContainer: document.getElementById('cart-items')
    };
  },

  // Навешивание обработчиков событий
  bindEvents() {
    if (this.elements.cartButton) {
      this.elements.cartButton.addEventListener('click', () => this.goToBasket());
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
      total: this.calculateTotal()
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
    
    this.saveCartState();
    this.updateUI();
  },

  // Обновление счетчика товаров
  updateCount(count) {
    if (this.elements.cartCount) {
      this.elements.cartCount.textContent = count;
    }
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

  // Расчет общей суммы
  calculateTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Обновление интерфейса
  updateUI() {
    const count = this.getTotalItemsCount();
    this.updateCount(count);
    
    if (this.elements.cartItemsContainer) {
      this.renderCartItems();
    }
    
    if (this.elements.cartTotal) {
      this.elements.cartTotal.textContent = this.calculateTotal() + ' руб.';
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
    
    // Навешиваем обработчики для кнопок
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
