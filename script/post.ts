// Функция для обработки нажатия на кнопку "Ответить"
function handleReplyButtonClick(event: MouseEvent): void {
    const commentWriteDiv = (event.target as HTMLElement).closest('.comment-write');

    if (commentWriteDiv) {
        const replyContainer = document.createElement('div');
        replyContainer.classList.add('comment-reply-container');

        const userDetailsDiv = document.createElement('div');
        userDetailsDiv.classList.add('user-details');
        userDetailsDiv.innerHTML = `
            <span class="user-nickname">Никнейм пользователя</span>
            <span class="character-limit">Макс. 1000 символов</span>
            <span class="character-hint" style="display: none; color: red; margin-left: 20px;">Слишком длинное сообщение</span>
        `;

        const userTextDiv = document.createElement('div');
        userTextDiv.classList.add('user-text');

        const replyTextarea = document.createElement('textarea');
        replyTextarea.classList.add('comment-input');
        replyTextarea.placeholder = 'Введите ответ...';

        const sendButton = document.createElement('button');
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
function updateCharacterCounter(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const characterLimitSpan = textarea.parentElement?.parentElement?.querySelector('.character-limit') as HTMLElement;
    const characterHint = textarea.parentElement?.parentElement?.querySelector('.character-hint') as HTMLElement;
        
    const currentCharacterCount = textarea.value.length;
    const maxCharacterCount = 1000;

    characterLimitSpan.textContent = `${currentCharacterCount}/${maxCharacterCount} символов`;

    // Показываем предупреждение, если превышено ограничение
    if (currentCharacterCount > maxCharacterCount) {
        characterHint.style.display = 'block';
    } else {
        characterHint.style.display = 'none';
    }
}

// Находим все текстовые поля с классом "comment-input" и добавляем обработчик события на ввод символов
const textareas = document.querySelectorAll('.comment-input');
textareas.forEach((textarea) => {
    textarea.addEventListener('input', updateCharacterCount as EventListener);
});

// Функция для обработки нажатия на кнопку "Отправить"
function handleSendButtonClick(event: MouseEvent): void {
    const sendButton = event.target as HTMLElement;
    const userTextDiv = sendButton.parentElement as HTMLElement;
    const replyText = textarea?.value || '';

    if (replyText.trim() !== '') {
        const commentReplyContainer = document.createElement('div');
        commentReplyContainer.classList.add('comment-container-reply');

        const userAvatar = document.createElement('div');
        userAvatar.classList.add('user-avatar');

        const commentWriteDiv = document.createElement('div');
        commentWriteDiv.classList.add('comment-write');

        const userDetailDiv = document.createElement('div');
        userDetailDiv.classList.add('user-details-reply');
        userDetailDiv.innerHTML = `
            <span class="user-nickname">Никнейм пользователя</span>
            <span class="comment-time">15.01</span>
        `;

        const commentText = document.createElement('p');
        commentText.classList.add('comment-text-reply');
        commentText.textContent = replyText;

        const commentActions = document.createElement('div');
        commentActions.classList.add('comment-actions');

        const favoriteButton = document.createElement('span');
        favoriteButton.classList.add('favorite-button');
        favoriteButton.innerHTML = `
            <button class="favorite-btn"><img src="./images/heart.svg" width="24" height="24" alt="favorite-button"></button>
            <button class="favorite-text"><p>В избранное</p></button>
        `;

        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = `
            <button id="like-decrease">-</button>
            <span id="like-count">0</span>
            <button id="like-increase">+</button>
        `;

        commentActions.appendChild(favoriteButton);
        commentActions.appendChild(likeButton);

        commentWriteDiv.appendChild(userDetailDiv);
        commentWriteDiv.appendChild(commentText);
        commentWriteDiv.appendChild(commentActions);

        commentReplyContainer.appendChild(userAvatar);
        commentReplyContainer.appendChild(commentWriteDiv);

        // Вставляем новый комментарий под исходным комментарием
        const originalCommentContainer = sendButton.closest('.comment-container');
        originalCommentContainer?.insertAdjacentElement('afterend', commentReplyContainer);

        const textarea = userTextDiv.querySelector('.comment-input') as HTMLTextAreaElement;
        textarea.value = '';
        updateCharacterCount();

        userTextDiv.removeChild(sendButton);
        userTextDiv.removeChild(textarea);
    }
}

// Находим все кнопки "Отправить" и добавляем обработчик события
const sendButtons = document.querySelectorAll('.send-button');
sendButtons.forEach((button) => {
    button.addEventListener('click', handleSendButtonClick);
});

// Находим все кнопки "Ответить" и добавляем обработчик события
const replyButtons = document.querySelectorAll('.reply-button .reply-btn');
replyButtons.forEach((button) => {
    button.addEventListener('click', handleReplyButtonClick);
});

// Функция для добавления комментария в избранное
function addToFavorites(event: MouseEvent): void {
    const favoriteButton = event.target as HTMLElement;
    const commentContainer = favoriteButton.closest('.comment-container') as HTMLElement;

    commentContainer.classList.add('favorite-comment');
    favoriteButton.classList.add('favorited');
    favoriteButton.removeEventListener('click', addToFavorites);
    favoriteButton.addEventListener('click', removeFromFavorites);
}

// Функция для удаления комментария из избранного
function removeFromFavorites(event: MouseEvent): void {
    const favoriteButton = event.target as HTMLElement;
    const commentContainer = favoriteButton.closest('.comment-container') as HTMLElement;

    commentContainer.classList.remove('favorite-comment'); 
    favoriteButton.classList.remove('favorited'); 
    favoriteButton.removeEventListener('click', removeFromFavorites);
    favoriteButton.addEventListener('click', addToFavorites);

    // Находим все кнопки "В избранное" и добавляем обработчик события
    const favoriteButtons = document.querySelectorAll('.favorite-button .favorite-text');
    favoriteButtons.forEach((button) => {
        button.addEventListener('click', addToFavorites);
    });

    // Функция для отображения избранных комментариев
    function showFavoriteComments() {
        const favoriteCommentContainers = document.querySelectorAll('.favorite-comment');
    
        favoriteCommentContainers.forEach((container) => {
            (container as HTMLElement).style.display = 'block';
        });
    
        // Находим кнопку "Избранное" и добавляем обработчик события
        const favoriteToggle = document.querySelector('.favorite-button button.favorite-btn');
        favoriteToggle?.addEventListener('click', showFavoriteComments);
    }    
}

// Функция для обработки нажатия кнопки лайка
function handleLikeButtonClick(event: MouseEvent): void {
    const likeButton = event.target as HTMLElement;
    const likeCount = likeButton.parentElement?.querySelector('#like-count') as HTMLElement;

    let currentLikes = parseInt(likeCount.textContent || '0');

    const userStatus = localStorage.getItem('userStatus') || '';

    if (userStatus === 'like') {
        localStorage.setItem('userStatus', '');
        currentLikes -= 1;
    } else {
        if (userStatus !== 'dislike') {
            localStorage.setItem('userStatus', 'like');
            currentLikes += 1;
        }
    }

    likeCount.textContent = currentLikes.toString();
}


// Отработка счетчика лайка и дизлайка
const likeDecreaseButton = document.getElementById('like-decrease') as HTMLElement;
const likeIncreaseButton = document.getElementById('like-increase') as HTMLElement;
const likeCount = document.getElementById('like-count') as HTMLElement;

let likes = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes') || '0') : 0;

function saveCountToLocalStorage(): void {
    localStorage.setItem('likes', likes.toString());
}

function updateCount(): void {
    likeCount.textContent = Math.abs(likes).toString();

    if (likes < 0) {
        likeCount.style.color = '#FF0000';
    } else {
        likeCount.style.color = '#8AC540';
    }

    saveCountToLocalStorage();
}

// Обработчик события для кнопки "Лайк"
likeIncreaseButton.addEventListener('click', () => {
    if (likes === 1) {
        likes = 0;
    } else {
        likes = 1;
    }
    updateCount();
    likeDecreaseButton.style.color = '#FF0000';
});

// Обработчик события для кнопки "Дизлайк"
likeDecreaseButton.addEventListener('click', () => {
    if (likes === -1) {
        likes = 0; 
    } else {
        likes = -1; 
    }
    updateCount();
    likeDecreaseButton.style.color = '#FF0000';
});

// Инициализация счетчика
updateCount();
