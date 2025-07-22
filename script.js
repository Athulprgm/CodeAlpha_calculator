 const display = document.getElementById("display");
        const preview = document.getElementById("preview");
        
        function appendToDisplay(input) {
            display.value += input;
            updatePreview();
        }
        
        function clearDisplay() {
            display.value = "";
            preview.textContent = "";
        }
        
        function deleteLast() {
            display.value = display.value.slice(0, -1);
            updatePreview();
        }
        
        function calculate() {
            try {
                // Replace × with * for evaluation
                const expression = display.value.replace(/×/g, '*');
                const result = eval(expression);
                display.value = result;
                preview.textContent = "";
            } catch (error) {
                display.value = "Error";
                preview.textContent = "";
            }
        }
        
        function updatePreview() {
            if (display.value === "") {
                preview.textContent = "";
                return;
            }
            
            try {
                // Replace × with * for evaluation
                const expression = display.value.replace(/×/g, '*');
                
                // Check if the expression is complete (not ending with an operator)
                if (!/[+\-*/]$/.test(expression)) {
                    const result = eval(expression);
                    if (result !== undefined && !isNaN(result)) {
                        preview.textContent = `= ${result}`;
                    } else {
                        preview.textContent = "";
                    }
                } else {
                    preview.textContent = "";
                }
            } catch (error) {
                preview.textContent = "";
            }
        }
        
        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (['+', '-', '/', '*', '(', ')', '.'].includes(key)) {
                appendToDisplay(key === '*' ? '×' : key);
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            }
        });