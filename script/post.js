// Функция для обработки нажатия на кнопку "Ответить"
function handleReplyButtonClick(event) {
    var commentWriteDiv = event.target.closest('.comment-write');
    if (commentWriteDiv) {
        var replyContainer = document.createElement('div');
        replyContainer.classList.add('comment-reply-container');
        var userDetailsDiv = document.createElement('div');
        userDetailsDiv.classList.add('user-details');
        userDetailsDiv.innerHTML = "\n            <span class=\"user-nickname\">\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span>\n            <span class=\"character-limit\">\u041C\u0430\u043A\u0441. 1000 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432</span>\n            <span class=\"character-hint\" style=\"display: none; color: red; margin-left: 20px;\">\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</span>\n        ";
        var userTextDiv = document.createElement('div');
        userTextDiv.classList.add('user-text');
        var replyTextarea = document.createElement('textarea');
        replyTextarea.classList.add('comment-input');
        replyTextarea.placeholder = 'Введите ответ...';
        var sendButton = document.createElement('button');
        sendButton.classList.add('send-button');
        sendButton.textContent = 'Отправить';
        userTextDiv.appendChild(replyTextarea);
        userTextDiv.appendChild(sendButton);
        replyContainer.appendChild(userDetailsDiv);
        replyContainer.appendChild(userTextDiv);
        commentWriteDiv.appendChild(replyContainer);
        // Убираем обработчик с кнопки "Ответить"
        event.target.removeEventListener('click', handleReplyButtonClick);
    }
}
// Функция для обновления счетчика символов
function updateCharacterCounter(event) {
    var _a, _b, _c, _d;
    var textarea = event.target;
    var characterLimitSpan = (_b = (_a = textarea.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('.character-limit');
    var characterHint = (_d = (_c = textarea.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector('.character-hint');
    var currentCharacterCount = textarea.value.length;
    var maxCharacterCount = 1000;
    characterLimitSpan.textContent = "".concat(currentCharacterCount, "/").concat(maxCharacterCount, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
    // Показываем предупреждение, если превышено ограничение
    if (currentCharacterCount > maxCharacterCount) {
        characterHint.style.display = 'block';
    }
    else {
        characterHint.style.display = 'none';
    }
}
// Находим все текстовые поля с классом "comment-input" и добавляем обработчик события на ввод символов
var textareas = document.querySelectorAll('.comment-input');
textareas.forEach(function (textarea) {
    textarea.addEventListener('input', updateCharacterCount);
});
// Функция для обработки нажатия на кнопку "Отправить"
function handleSendButtonClick(event) {
    var sendButton = event.target;
    var userTextDiv = sendButton.parentElement;
    var replyText = (textarea === null || textarea === void 0 ? void 0 : textarea.value) || '';
    if (replyText.trim() !== '') {
        var commentReplyContainer = document.createElement('div');
        commentReplyContainer.classList.add('comment-container-reply');
        var userAvatar = document.createElement('div');
        userAvatar.classList.add('user-avatar');
        var commentWriteDiv = document.createElement('div');
        commentWriteDiv.classList.add('comment-write');
        var userDetailDiv = document.createElement('div');
        userDetailDiv.classList.add('user-details-reply');
        userDetailDiv.innerHTML = "\n            <span class=\"user-nickname\">\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span>\n            <span class=\"comment-time\">15.01</span>\n        ";
        var commentText = document.createElement('p');
        commentText.classList.add('comment-text-reply');
        commentText.textContent = replyText;
        var commentActions = document.createElement('div');
        commentActions.classList.add('comment-actions');
        var favoriteButton = document.createElement('span');
        favoriteButton.classList.add('favorite-button');
        favoriteButton.innerHTML = "\n            <button class=\"favorite-btn\"><img src=\"./images/heart.svg\" width=\"24\" height=\"24\" alt=\"favorite-button\"></button>\n            <button class=\"favorite-text\"><p>\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</p></button>\n        ";
        var likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = "\n            <button id=\"like-decrease\">-</button>\n            <span id=\"like-count\">0</span>\n            <button id=\"like-increase\">+</button>\n        ";
        commentActions.appendChild(favoriteButton);
        commentActions.appendChild(likeButton);
        commentWriteDiv.appendChild(userDetailDiv);
        commentWriteDiv.appendChild(commentText);
        commentWriteDiv.appendChild(commentActions);
        commentReplyContainer.appendChild(userAvatar);
        commentReplyContainer.appendChild(commentWriteDiv);
        // Вставляем новый комментарий под исходным комментарием
        var originalCommentContainer = sendButton.closest('.comment-container');
        originalCommentContainer === null || originalCommentContainer === void 0 ? void 0 : originalCommentContainer.insertAdjacentElement('afterend', commentReplyContainer);
        var textarea = userTextDiv.querySelector('.comment-input');
        textarea.value = '';
        updateCharacterCount();
        userTextDiv.removeChild(sendButton);
        userTextDiv.removeChild(textarea);
    }
}
// Находим все кнопки "Отправить" и добавляем обработчик события
var sendButtons = document.querySelectorAll('.send-button');
sendButtons.forEach(function (button) {
    button.addEventListener('click', handleSendButtonClick);
});
// Находим все кнопки "Ответить" и добавляем обработчик события
var replyButtons = document.querySelectorAll('.reply-button .reply-btn');
replyButtons.forEach(function (button) {
    button.addEventListener('click', handleReplyButtonClick);
});
// Функция для добавления комментария в избранное
function addToFavorites(event) {
    var favoriteButton = event.target;
    var commentContainer = favoriteButton.closest('.comment-container');
    commentContainer.classList.add('favorite-comment');
    favoriteButton.classList.add('favorited');
    favoriteButton.removeEventListener('click', addToFavorites);
    favoriteButton.addEventListener('click', removeFromFavorites);
}
// Функция для удаления комментария из избранного
function removeFromFavorites(event) {
    var favoriteButton = event.target;
    var commentContainer = favoriteButton.closest('.comment-container');
    commentContainer.classList.remove('favorite-comment');
    favoriteButton.classList.remove('favorited');
    favoriteButton.removeEventListener('click', removeFromFavorites);
    favoriteButton.addEventListener('click', addToFavorites);
    // Находим все кнопки "В избранное" и добавляем обработчик события
    var favoriteButtons = document.querySelectorAll('.favorite-button .favorite-text');
    favoriteButtons.forEach(function (button) {
        button.addEventListener('click', addToFavorites);
    });
    // Функция для отображения избранных комментариев
    function showFavoriteComments() {
        var favoriteCommentContainers = document.querySelectorAll('.favorite-comment');
        favoriteCommentContainers.forEach(function (container) {
            container.style.display = 'block';
        });
        // Находим кнопку "Избранное" и добавляем обработчик события
        var favoriteToggle = document.querySelector('.favorite-button button.favorite-btn');
        favoriteToggle === null || favoriteToggle === void 0 ? void 0 : favoriteToggle.addEventListener('click', showFavoriteComments);
    }
}
// Функция для обработки нажатия кнопки лайка
function handleLikeButtonClick(event) {
    var _a;
    var likeButton = event.target;
    var likeCount = (_a = likeButton.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('#like-count');
    var currentLikes = parseInt(likeCount.textContent || '0');
    var userStatus = localStorage.getItem('userStatus') || '';
    if (userStatus === 'like') {
        localStorage.setItem('userStatus', '');
        currentLikes -= 1;
    }
    else {
        if (userStatus !== 'dislike') {
            localStorage.setItem('userStatus', 'like');
            currentLikes += 1;
        }
    }
    likeCount.textContent = currentLikes.toString();
}
// Отработка счетчика лайка и дизлайка
var likeDecreaseButton = document.getElementById('like-decrease');
var likeIncreaseButton = document.getElementById('like-increase');
var likeCount = document.getElementById('like-count');
var likes = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes') || '0') : 0;
function saveCountToLocalStorage() {
    localStorage.setItem('likes', likes.toString());
}
function updateCount() {
    likeCount.textContent = Math.abs(likes).toString();
    if (likes < 0) {
        likeCount.style.color = '#FF0000';
    }
    else {
        likeCount.style.color = '#8AC540';
    }
    saveCountToLocalStorage();
}
// Обработчик события для кнопки "Лайк"
likeIncreaseButton.addEventListener('click', function () {
    if (likes === 1) {
        likes = 0;
    }
    else {
        likes = 1;
    }
    updateCount();
    likeDecreaseButton.style.color = '#FF0000';
});
// Обработчик события для кнопки "Дизлайк"
likeDecreaseButton.addEventListener('click', function () {
    if (likes === -1) {
        likes = 0;
    }
    else {
        likes = -1;
    }
    updateCount();
    likeDecreaseButton.style.color = '#FF0000';
});
// Инициализация счетчика
updateCount();
