// Отображение максимального количества символов
const textarea = document.querySelector('.comment-input') as HTMLTextAreaElement;
const charLimitSpan = document.querySelector('.character-limit') as HTMLSpanElement;
const errorMessage = document.createElement('span');

textarea.addEventListener('input', updateCharacterCount);

function updateCharacterCount() {
    const currentCount = textarea.value.length;
    charLimitSpan.textContent = `${currentCount}/1000 символов`;

    if (currentCount > 1000) {
        charLimitSpan.style.color = 'red';
        errorMessage.textContent = 'Слишком длинное сообщение';
        errorMessage.style.color = 'red';
        errorMessage.style.marginLeft = '20px';
        charLimitSpan.parentNode?.insertBefore(errorMessage, charLimitSpan.nextSibling);
    } else {
        charLimitSpan.style.color = '';
        if (errorMessage.parentNode) {
            charLimitSpan.parentNode.removeChild(errorMessage);
        }
    }
}

// Кнопка Отправить
class CommentSender {
    private textarea: HTMLTextAreaElement;
    private sendButton: HTMLButtonElement;
    private commentContainer: HTMLElement;

    constructor(
        textareaSelector: string,
        sendButtonSelector: string,
        commentContainerSelector: string
    ) {
        this.textarea = document.querySelector(textareaSelector) as HTMLTextAreaElement;
        this.sendButton = document.querySelector(sendButtonSelector) as HTMLButtonElement;
        this.commentContainer = document.querySelector(commentContainerSelector) as HTMLElement;
        this.attachEvents();
        this.getAndSetRandomAvatar();
    }

    private attachEvents() {
        this.sendButton.addEventListener('click', this.sendComment.bind(this));
    }

    private sendComment() {
        const commentText = this.textarea.value.trim();
        if (commentText) {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-container';
            commentElement.innerHTML = `
                <div class="user-avatar"></div>
                <div class="comment-write">
                    <div class="user-details-post">
                        <span class="user-nickname">Никнейм пользователя</span>
                        <span class="comment-time">${this.getCurrentTime()}</span>
                    </div>
                    <p class="comment-text">${commentText}</p>
                    <div class="comment-actions">
                        <span class="reply-button">
                            <button class="reply-btn"><img src="./images/answer btn.svg" width="22" height="22" alt="reply-button"></button>
                            <button class="reply-text"><p>Ответить</p></button>
                        </span>
                        <span class="favorite-button">
                            <button class="favorite-btn"><img src="./images/like.svg" width="24" height="24" alt="favorite-button"></button>
                            <button class="favorite-text"><p>В избранном</p></button>
                        </span>
                        <span class="like-button">
                            <button id="like-decrease">-</button>
                            <span id="like-count">0</span>
                            <button id="like-increase">+</button>
                        </span>
                    </div>
                </div>
            `;
            this.commentContainer.appendChild(commentElement);
            this.textarea.value = '';
        }
    }

    private getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    private async getAndSetRandomAvatar() {
        try {
            const response = await fetch('https://picsum.photo/61', {
                method: 'HEAD', // Использование HEAD-запроса для получения случайного изображения размером 61x61
            });

            if (response.ok) {
                const imageUrl = response.url;
                const userAvatars = document.querySelectorAll('.user-avatar');
                userAvatars.forEach((avatar: HTMLElement) => {
                    avatar.style.backgroundImage = `url("${imageUrl}")`;
                });
            }
        } catch (error) {
            console.error('Ошибка при загрузке аватара: ', error);
        }
    }
}

const sender = new CommentSender('.comment-input', '.send-button', '.comment-container');
