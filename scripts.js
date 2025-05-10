document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    // Простая валидация
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = '#aaa';
      }
    });

    if (!isValid) return;

    // Имитация отправки данных
    setTimeout(() => {
      showThankYouModal();
      form.reset();
    }, 500);
  });
});

// Создание и отображение модального окна
function showThankYouModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <h2>ВАША ЗАЯВКА ОТПРАВЛЕНА!</h2>
      <p>Спасибо за обращение! Если заявка отправлена в будни с 9:00 до 18:00 — мы свяжемся с вами в течение 30 минут</p>
	  <p>В другое время ответим утром следующего рабочего дня</p>
      <button class="close-btn">Закрыть</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
}

// Открыть закрыть меню

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector(".menu-mob");
  const burgerButton = document.querySelector("#hamburger-button");
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';

  if (burgerButton && menu) {

    document.body.appendChild(overlay);

    const toggleMenu = () => {
      menu.classList.toggle("active");
      document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "visible";
    };

    burgerButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    overlay.addEventListener('click', toggleMenu);
    
    menu.querySelectorAll('.button_nav').forEach(item => {
      item.addEventListener('click', toggleMenu);
    });

  }
});
