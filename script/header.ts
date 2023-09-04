// Счетчик отображения количества написанных комментариев
class CommentCounter {
    private commentCount: number;

    constructor() {
        this.commentCount = 2;

        const sendButton = document.querySelector('.send-button') as HTMLButtonElement | null;
        if (sendButton) {
            sendButton.addEventListener('click', this.incrementCommentCount.bind(this));
        }
    }

    private incrementCommentCount() {
        this.commentCount++;
        this.updateCommentCountDisplay();
    }

    private updateCommentCountDisplay() {
        const commentCountElement = document.querySelector('.comment-count') as HTMLElement | null;
        if (commentCountElement) {
            commentCountElement.textContent = `Комментарии (${this.commentCount})`;
        }
    }
}

const CommentCount = new CommentCounter(); 

// Поворот стрелки в выпадающем списке
class DropdownArrowRotator {
    private selectElement: HTMLSelectElement | null;
    private selectIcon: HTMLElement | null;

    constructor() {
        this.selectElement = document.getElementById('sort-select') as HTMLSelectElement | null;
        this.selectIcon = document.querySelector('.select-icon') as HTMLElement | null;

        if (this.selectElement && this.selectIcon) {
            this.selectElement.addEventListener('change', this.rotateArrow.bind(this));
        }
    }

    private rotateArrow() {
        if (this.selectElement && this.selectIcon) {
            const selectedIndex = this.selectElement.selectedIndex;
            this.selectIcon.style.transform = `rotate(${selectedIndex * 180}deg)`;
        }
    }
}

const arrowRotator = new DropdownArrowRotator(); 

