var likeDecreaseButtonReply = document.getElementById('like-decrease-reply');
var likeIncreaseButtonReply = document.getElementById('like-increase-reply');
var likeCountReply = document.getElementById('like-count-reply');
var likesReply = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes')) : 0;
function saveCountToLocalStorage() {
    localStorage.setItem('likes', likesReply.toString());
}
function updateCount() {
    likeCountReply.textContent = Math.abs(likes).toString();
    // Проверяем, нужно ли менять цвет текста на красный
    if (likes < 0) {
        likeCount.style.color = '#FF0000';
    }
    else {
        likeCount.style.color = '#8AC540';
    }
    saveCountToLocalStorage();
}
// Обработчик события для кнопки "Лайк"
likeIncreaseButtonReply.addEventListener('click', function () {
    if (likesReply === 1) {
        likesReply = 0;
    }
    else {
        likesReply = 1;
    }
    updateCount();
    likeDecreaseButtonReply.style.color = '#FF0000';
});
// Обработчик события для кнопки "Дизлайк"
likeDecreaseButtonReply.addEventListener('click', function () {
    if (likesReply === -1) {
        likesReply = 0;
    }
    else {
        likesReply = -1;
    }
    updateCount();
    likeDecreaseButtonReply.style.color = '#FF0000';
});
updateCount();
