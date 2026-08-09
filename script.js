const button = document.getElementById('surpriseButton');
const message = document.getElementById('surpriseMessage');

button.addEventListener('click', function() {
  message.style.display = 'block';
  button.textContent = '❤️ Ты нажала спасибо!';
  button.style.background = '#ec7171';
  button.display = true;
});

const startDate = new Date(2021,11, 18, 22, 30, 0).getTime();

function updateTogetherTimer() {
    const now = new Date().getTime();
    const diff = now - startDate;

    if (diff < 0) {
        document.getElementById('together-countdown').innerHTML = '<h2 style="color: #ff6b6b;">Скоро начнётся! 🥰</h2>';
        return;
    }

    // Вычисляем разницу в секундах
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30.44); // средняя длина месяца
    let years = Math.floor(months / 12);
    
    // Остатки
    months = months % 12;
    days = days % 30.44;
    hours = hours % 24;
    minutes = minutes % 60;
    seconds = seconds % 60;

    // Обновляем элементы на странице
    document.getElementById('together-years').textContent = String(years).padStart(2, '0');
    document.getElementById('together-months').textContent = String(Math.floor(months)).padStart(2, '0');
    document.getElementById('together-days').textContent = String(Math.floor(days)).padStart(2, '0');
    document.getElementById('together-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('together-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('together-seconds').textContent = String(seconds).padStart(2, '0');
}

// Обновляем каждую секунду
setInterval(updateTogetherTimer, 1000);
updateTogetherTimer();

// === ПАДАЮЩИЕ СЕРДЕЧКИ ===
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    // Случайно выбираем одну из картинок Hello Kitty
const kittyImages = ['images/helkitty1.png', 'images/hellokitty2.png'];
const randomImage = kittyImages[Math.floor(Math.random() * kittyImages.length)];
heart.innerHTML = `<img src="${randomImage}" style="width: 40px; height: auto;">`;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // от 2 до 5 секунд
    heart.style.fontSize = Math.random() * 20 + 15 + 'px'; // от 15 до 35px
    document.getElementById('hearts-container').appendChild(heart);

    // Удаляем сердечко после окончания анимации, чтобы не засорять DOM
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Создаём новое сердечко каждые 300-600 мс
setInterval(createHeart, 400);

// Функция создания фейерверка в точке (x, y)
function createFirework(x, y) {
    const particleCount = 50; // количество частиц
    const colors = [
        '#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', 
        '#5f27cd', '#ff9a9e', '#fad0c4', '#ffd93d',
        '#6c5ce7', '#00b894', '#fd79a8', '#0984e3',
        '#fdcb6e', '#e17055', '#a29bfe', '#ff7675'
    ];

    for (let i = 0; i < particleCount; i++) {
        // Создаём элемент частицы
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');

        // Случайный размер (от 5 до 15 пикселей)
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Случайный цвет из массива
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.innerHTML = '✨';
particle.style.background = 'none';
particle.style.fontSize = size + 'px';
particle.style.width = 'auto';
particle.style.height = 'auto';

        // Начальная позиция — центр взрыва
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Случайное направление и дальность
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 500 + 50; // от 50 до 250 пикселей
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        // Случайная длительность анимации (от 0.6 до 1.2 секунды)
        const duration = Math.random() * 0.9 + 0.6;

        // Добавляем частицу в DOM
        document.body.appendChild(particle);

        // Анимация с помощью requestAnimationFrame
        const startTime = performance.now();

        function animateParticle(time) {
            const elapsed = (time - startTime) / 1000; // в секундах
            const progress = elapsed / duration;

            if (progress >= 1) {
                // Удаляем частицу, когда анимация закончена
                particle.remove();
                return;
            }

            // Эффект затухания и уменьшения размера
            const opacity = 1 - progress;
            const scale = 1 - progress * 0.6;
            const currentX = x + dx * progress;
            const currentY = y + dy * progress - 50 * progress * progress; // небольшой подъем вверх

            particle.style.transform = `translate(${currentX - x}px, ${currentY - y}px) scale(${scale})`;
            particle.style.opacity = opacity;

            // Продолжаем анимацию
            requestAnimationFrame(animateParticle);
        }

        requestAnimationFrame(animateParticle);
    }
}

// Обработчик клика по кнопке
const fireworkButton = document.getElementById('fireworkButton');
if (fireworkButton) {
    fireworkButton.addEventListener('click', function(e) {
        // Координаты центра кнопки (или место клика)
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createFirework(x, y);
    });
}

// Альтернатива: фейерверк при клике в любом месте страницы (закомментировано, если не нужно)

//document.addEventListener('click', function(e) {
  //  createFirework(e.clientX, e.clientY);
//});

// === АНИМИРОВАННЫЙ КОНВЕРТ ===
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', function() {
            this.querySelector('.envelope').classList.toggle('open');
        });
    }
});