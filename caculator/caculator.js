{
    var Caculator = /** @class */ (function () {
        function Caculator() {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = null;
            this.keys = [
                ["Clear", "÷"],
                ["7", "8", "9", "×"],
                ["4", "5", "6", "-"],
                ["1", "2", "3", "+"],
                ["0", ".", "="]
            ];
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvents();
        }
        Caculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement("button");
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
            return button;
        };
        Caculator.prototype.createContainer = function () {
            var container = document.createElement("div");
            container.classList.add("caculator");
            document.body.appendChild(container);
            this.container = container;
        };
        Caculator.prototype.createOutput = function () {
            var output = document.createElement("div");
            output.classList.add("output");
            var span = document.createElement("span");
            span.textContent = "0";
            output.appendChild(span);
            this.container.appendChild(output);
            this.output = output;
            this.span = span;
        };
        Caculator.prototype.createButtons = function () {
            var _this = this;
            this.keys.forEach(function (textList) {
                var div = document.createElement("div");
                div.classList.add("row");
                textList.forEach(function (text) {
                    var button = _this.createButton(text, div, "button text-" + text);
                });
                _this.container.appendChild(div);
            });
        };
        Caculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener("click", function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var button = event.target;
                    var text = button.textContent;
                    _this.updateNumbersOrOperator(text);
                }
            });
        };
        Caculator.prototype.updateNumber = function (name, text) {
            if (this[name]) {
                this[name] += text;
            }
            else {
                this[name] = text;
            }
            this.span.textContent = this[name].toString();
        };
        Caculator.prototype.updateNumbers = function (text) {
            if (this.operator) {
                this.updateNumber("n2", text);
            }
            else {
                this.updateNumber("n1", text);
            }
        };
        Caculator.prototype.updateResult = function () {
            var result;
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
            if (this.operator === "+") {
                result = n1 + n2;
            }
            else if (this.operator === "-") {
                result = n1 - n2;
            }
            else if (this.operator === "*") {
                result = n1 * n2;
            }
            else if (this.operator === "÷") {
                result = n1 / n2;
            }
            result = result.toFixed(6);
            this.span.textContent = result;
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = result;
        };
        Caculator.prototype.updateOperator = function (text) {
            if (this.n1 === null) {
                this.n1 = this.result;
            }
            this.operator = text;
        };
        Caculator.prototype.updateNumbersOrOperator = function (text) {
            if ("0123456789.".indexOf(text) >= 0) {
                this.updateNumbers(text);
            }
            else if ("+-*÷".indexOf(text) >= 0) {
                this.updateOperator(text);
            }
            else if ("=".indexOf(text) >= 0) {
                this.updateResult();
            }
            console.log(this.n1, this.operator, this.n2);
        };
        return Caculator;
    }());
    new Caculator();
}
