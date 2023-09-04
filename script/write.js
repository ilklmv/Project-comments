var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Отображение максимального количества символов
var textarea = document.querySelector('.comment-input');
var charLimitSpan = document.querySelector('.character-limit');
var errorMessage = document.createElement('span');
textarea.addEventListener('input', updateCharacterCount);
function updateCharacterCount() {
    var _a;
    var currentCount = textarea.value.length;
    charLimitSpan.textContent = "".concat(currentCount, "/1000 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
    if (currentCount > 1000) {
        charLimitSpan.style.color = 'red';
        errorMessage.textContent = 'Слишком длинное сообщение';
        errorMessage.style.color = 'red';
        errorMessage.style.marginLeft = '20px';
        (_a = charLimitSpan.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(errorMessage, charLimitSpan.nextSibling);
    }
    else {
        charLimitSpan.style.color = '';
        if (errorMessage.parentNode) {
            charLimitSpan.parentNode.removeChild(errorMessage);
        }
    }
}
// Кнопка Отправить
var CommentSender = /** @class */ (function () {
    function CommentSender(textareaSelector, sendButtonSelector, commentContainerSelector) {
        this.textarea = document.querySelector(textareaSelector);
        this.sendButton = document.querySelector(sendButtonSelector);
        this.commentContainer = document.querySelector(commentContainerSelector);
        this.attachEvents();
        this.getAndSetRandomAvatar();
    }
    CommentSender.prototype.attachEvents = function () {
        this.sendButton.addEventListener('click', this.sendComment.bind(this));
    };
    CommentSender.prototype.sendComment = function () {
        var commentText = this.textarea.value.trim();
        if (commentText) {
            var commentElement = document.createElement('div');
            commentElement.className = 'comment-container';
            commentElement.innerHTML = "\n                <div class=\"user-avatar\"></div>\n                <div class=\"comment-write\">\n                    <div class=\"user-details-post\">\n                        <span class=\"user-nickname\">\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span>\n                        <span class=\"comment-time\">".concat(this.getCurrentTime(), "</span>\n                    </div>\n                    <p class=\"comment-text\">").concat(commentText, "</p>\n                    <div class=\"comment-actions\">\n                        <span class=\"reply-button\">\n                            <button class=\"reply-btn\"><img src=\"./images/answer btn.svg\" width=\"22\" height=\"22\" alt=\"reply-button\"></button>\n                            <button class=\"reply-text\"><p>\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</p></button>\n                        </span>\n                        <span class=\"favorite-button\">\n                            <button class=\"favorite-btn\"><img src=\"./images/like.svg\" width=\"24\" height=\"24\" alt=\"favorite-button\"></button>\n                            <button class=\"favorite-text\"><p>\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C</p></button>\n                        </span>\n                        <span class=\"like-button\">\n                            <button id=\"like-decrease\">-</button>\n                            <span id=\"like-count\">0</span>\n                            <button id=\"like-increase\">+</button>\n                        </span>\n                    </div>\n                </div>\n            ");
            this.commentContainer.appendChild(commentElement);
            this.textarea.value = '';
        }
    };
    CommentSender.prototype.getCurrentTime = function () {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        return "".concat(hours, ":").concat(minutes);
    };
    CommentSender.prototype.getAndSetRandomAvatar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, imageUrl_1, userAvatars, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch('https://picsum.photo/61', {
                                method: 'HEAD', // Использование HEAD-запроса для получения случайного изображения размером 61x61
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.ok) {
                            imageUrl_1 = response.url;
                            userAvatars = document.querySelectorAll('.user-avatar');
                            userAvatars.forEach(function (avatar) {
                                avatar.style.backgroundImage = "url(\"".concat(imageUrl_1, "\")");
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Ошибка при загрузке аватара: ', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CommentSender;
}());
var sender = new CommentSender('.comment-input', '.send-button', '.comment-container');
