// 💾 Cache

let calculation_cache = {
    numb1: '',
    numb2: '',
    calculation_method: null
};

// 🔢 Number input

function enter_integer(int) {

    if (calculation_cache.calculation_method == null) {
        calculation_cache.numb1 += int;
    } else {
        calculation_cache.numb2 += int;
    }

    display_status();

}

// ➗ Set Operator

function set_operator(operator) {

    calculation_cache.calculation_method = operator;
    display_status();

}

// 🎥 Live View

function live_view() {

    let mode = 'progress';

    if (calculation_cache.calculation_method != null && calculation_cache.numb2.length > 0) {
        mode = 'result';
    }

    let txt_display;

    if (mode == 'progress') {
        txt_display = `${calculation_cache.numb1}`;
        if (calculation_cache.calculation_method != null) {

            let calculation_method_ui = null;

            if (calculation_cache.calculation_method == '+') { calculation_method_ui = '&plus;'; }
            if (calculation_cache.calculation_method == '-') { calculation_method_ui = '&minus;'; }
            if (calculation_cache.calculation_method == '*') { calculation_method_ui = '&times;'; }
            if (calculation_cache.calculation_method == '/') { calculation_method_ui = '&divide;'; }
            txt_display += calculation_method_ui;
        }

    }

    if (mode == 'result') {

        if (calculation_cache.calculation_method == '+') {
            txt_display = parseInt(calculation_cache.numb1) + parseInt(calculation_cache.numb2);
        }

        if (calculation_cache.calculation_method == '-') {
            txt_display = parseInt(calculation_cache.numb1) - parseInt(calculation_cache.numb2);
        }

        if (calculation_cache.calculation_method == '*') {
            txt_display = parseInt(calculation_cache.numb1) * parseInt(calculation_cache.numb2);
        }

        if (calculation_cache.calculation_method == '/') {
            txt_display = parseInt(calculation_cache.numb1) / parseInt(calculation_cache.numb2);
        }

        txt_display = parseFloat(txt_display.toFixed(3));
    }

    document.querySelector('#result > .live-result > span').innerHTML = txt_display;

}

// ♻️ Reload Display

function display_status() {

    let calculation_status = ``;

    calculation_status += `<span>${calculation_cache.numb1}</span>`;

    if (calculation_cache.calculation_method != null) {

        let calculation_method_ui = null;

        if (calculation_cache.calculation_method == '+') { calculation_method_ui = '&plus;'; }
        if (calculation_cache.calculation_method == '-') { calculation_method_ui = '&minus;'; }
        if (calculation_cache.calculation_method == '*') { calculation_method_ui = '&times;'; }
        if (calculation_cache.calculation_method == '/') { calculation_method_ui = '&divide;'; }

        calculation_status += `<span class="sys">${calculation_method_ui}</span>`;

    }

    calculation_status += `<span>${calculation_cache.numb2}</span>`;

    document.querySelector(`#result > .command`).innerHTML = calculation_status;

    live_view();
}

// 🗑️ Backspace

function backspace() {

    if (calculation_cache.numb2.length > 0) {
        calculation_cache.numb2 = calculation_cache.numb2.slice(0, -1);
    } else if (calculation_cache.calculation_method != null) {
        calculation_cache.calculation_method = null;
    } else if (calculation_cache.numb1.length > 0) {
        calculation_cache.numb1 = calculation_cache.numb1.slice(0, -1);
    }

    display_status();

}

// 🧑‍💻 Calculate

function calculate() {

    let verify = false;

    if (calculation_cache.numb1 != '' && calculation_cache.numb2 != '' && calculation_cache.calculation_method != null) {
        verify = true;
    }

    if (verify) {

        calculation_cache.numb1 = parseInt(calculation_cache.numb1);
        calculation_cache.numb2 = parseInt(calculation_cache.numb2);

        let result;

        if (calculation_cache.calculation_method == '+') {
            result = calculation_cache.numb1 + calculation_cache.numb2;
        }

        if (calculation_cache.calculation_method == '-') {
            result = calculation_cache.numb1 - calculation_cache.numb2;
        }

        if (calculation_cache.calculation_method == '*') {
            result = calculation_cache.numb1 * calculation_cache.numb2;
        }

        if (calculation_cache.calculation_method == '/') {
            result = calculation_cache.numb1 / calculation_cache.numb2;
        }

        result = parseFloat(result.toFixed(3));

        document.querySelector('#result > .command').innerHTML = `<span>${result}</span>`;

        calculation_cache.numb1 = result.toString();
        calculation_cache.numb2 = '';
        calculation_cache.calculation_method = null;

    }

}

// 🧼 Clean & Reset

function reset() {

    calculation_cache.numb1 = '';
    calculation_cache.numb2 = '';
    calculation_cache.calculation_method = null;

    display_status();

}