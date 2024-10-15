const feedbackContainer = document.querySelector('.feedback');
const feedbackItems = document.querySelectorAll('.otziv');
const paginationContainer = document.querySelector('.pagination');

let currentIndex = 0;
let autoSlideInterval;

// Создаем пагинацию только для экранов меньше 320px
const createPagination = () => {
  paginationContainer.innerHTML = ''; // Очищаем старую пагинацию
  if (window.innerWidth < 320) {
    feedbackItems.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => moveToSlide(index));
      paginationContainer.appendChild(dot);
    });
    updatePagination(); // Обновляем пагинацию
  }
};

// Обновляем пагинацию
const updatePagination = () => {
  const dots = document.querySelectorAll('.pagination span');
  if (dots.length) {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
};

// Перемещение к нужному слайду
const moveToSlide = (index) => {
  currentIndex = index;

  // Показываем только два элемента в зависимости от текущего индекса
  if (currentIndex >= feedbackItems.length - 1) {
    feedbackContainer.style.transform = `translateX(-${(feedbackItems.length - 2) * 100}%)`;
  } else {
    feedbackContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  updatePagination();
};

// Автоматическое переключение слайдов
const autoSlide = () => {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % feedbackItems.length;
    moveToSlide(currentIndex);
  }, 3000); // Автопереключение каждые 3 секунды
};

// Остановка автопереключения
const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

// Переключение на следующий слайд
const nextSlide = () => {
  stopAutoSlide(); // Останавливаем автопереключение при ручном переключении
  currentIndex = (currentIndex + 1) % feedbackItems.length;
  moveToSlide(currentIndex);
  autoSlide(); // Возобновляем автопереключение
};

// Переключение на предыдущий слайд
const prevSlide = () => {
  stopAutoSlide(); // Останавливаем автопереключение при ручном переключении
  currentIndex = (currentIndex - 1 + feedbackItems.length) % feedbackItems.length; // Переключение назад с возвратом к последнему слайду
  moveToSlide(currentIndex);
  autoSlide(); // Возобновляем автопереключение
};

// Инициализация
const initSlider = () => {
  moveToSlide(0);
  createPagination();
  autoSlide(); // Запускаем автопереключение для всех экранов
};

// Обновляем слайдер при изменении размера экрана
window.addEventListener('resize', () => {
  stopAutoSlide(); // Останавливаем слайдер при изменении размера
  initSlider();    // Перезапуск слайдера для новой ширины
});

// Инициализация слайдера при загрузке страницы
initSlider();











const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');

// Создаем медиа-запрос для 320px
const mediaQuery = window.matchMedia('(max-width: 320px)');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    // Проверяем, соответствует ли экран 320px или меньше
    if (mediaQuery.matches) {
      return; // Если да, прекращаем выполнение
    }

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    tab.classList.add('active');

    var line = document.querySelector('.line');
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    all_content.forEach(content => {
      content.classList.remove('active');
    });
    all_content[index].classList.add('active');
  });
});







