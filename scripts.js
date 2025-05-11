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
        input.style.borderColor = 'black';
      }
    });

    if (!isValid) return;

    // Имитация отправки данных
    setTimeout(() => {
      showThankYouModal();
      form.reset();
    }, 500);
  });

    const callbackForms = ['callback-form', 'callback-form_2'];
    callbackForms.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const phoneInput = this.querySelector('input[type="tel"]');
        let isValid = true;

        // Валидация номера телефона
        if (!phoneInput.value.trim()) {
          phoneInput.style.borderColor = 'red';
          isValid = false;
        } else {
          phoneInput.style.borderColor = 'black';
        }

        if (!isValid) return;

        // Имитация отправки и показ модалки
        setTimeout(() => {
          showThankYouModal();
          this.reset();
        }, 500);
      });
    }
  }); 
});

// Создание и отображение модального окна
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

 // Открытие и закрытие блоков с вопросами

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button_quest');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.querySelector('.accordion-content');
      const isOpen = content.classList.contains('open');

      document.querySelectorAll('.accordion-content').forEach(otherContent => {
        if (otherContent !== content) {
          otherContent.classList.remove('open');
          otherContent.style.maxHeight = null;
          otherContent.parentElement.classList.remove('open');
        }
      });

      if (!isOpen) {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + "px";
        button.classList.add('open');
      } else {
        content.classList.remove('open');
        content.style.maxHeight = null;
        button.classList.remove('open');
      }
    });
  });
});
