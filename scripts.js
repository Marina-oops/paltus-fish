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
