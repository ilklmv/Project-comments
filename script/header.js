// Счетчик отображения количества написанных комментариев
var CommentCounter = /** @class */ (function () {
    function CommentCounter() {
        this.commentCount = 2;
        var sendButton = document.querySelector('.send-button');
        if (sendButton) {
            sendButton.addEventListener('click', this.incrementCommentCount.bind(this));
        }
    }
    CommentCounter.prototype.incrementCommentCount = function () {
        this.commentCount++;
        this.updateCommentCountDisplay();
    };
    CommentCounter.prototype.updateCommentCountDisplay = function () {
        var commentCountElement = document.querySelector('.comment-count');
        if (commentCountElement) {
            commentCountElement.textContent = "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 (".concat(this.commentCount, ")");
        }
    };
    return CommentCounter;
}());
var CommentCount = new CommentCounter();
// Поворот стрелки в выпадающем списке
var DropdownArrowRotator = /** @class */ (function () {
    function DropdownArrowRotator() {
        this.selectElement = document.getElementById('sort-select');
        this.selectIcon = document.querySelector('.select-icon');
        if (this.selectElement && this.selectIcon) {
            this.selectElement.addEventListener('change', this.rotateArrow.bind(this));
        }
    }
    DropdownArrowRotator.prototype.rotateArrow = function () {
        if (this.selectElement && this.selectIcon) {
            var selectedIndex = this.selectElement.selectedIndex;
            this.selectIcon.style.transform = "rotate(".concat(selectedIndex * 180, "deg)");
        }
    };
    return DropdownArrowRotator;
}());
var arrowRotator = new DropdownArrowRotator();
