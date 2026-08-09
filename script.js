const button = document.getElementById('surpriseButton');
const message = document.getElementById('surpriseMessage')
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