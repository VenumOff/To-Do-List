const input_text = document.getElementById("input_text");
const input_filter = document.getElementById('input_filter');
const add_item_button = document.getElementById('add_item');
const item_list = document.getElementById('item_list');

function checkElement(event) {
    const span = event.target.closest('li').querySelector('span');

    if (span.classList.contains('completed')) {
        span.classList.remove('completed');
    } else {
        span.classList.add('completed');
    }
}

function modifElement(event) {
    const span = event.target.closest('li').querySelector('span');
    const newText = prompt("Modifier le texte :", span.textContent);
    if (newText !== null) {
        span.textContent = newText;
    }
}

function deleteElement(event) {
    const li = event.target.closest('li');
    li.remove();
}

function addElement() {
    const item_text = input_text.value.trim();
    if (item_text === '') {
        alert("Veuillez entrez quelque chose avant d'appuyer");
        return;
    }

    const span = document.createElement('span');
    span.textContent = item_text;
    span.classList.add('text-2xl');

    const li = document.createElement('li');
    li.appendChild(span);

    const check_icon = document.createElement('i');
    check_icon.classList.add('fas', 'fa-solid', 'fa-check', 'new_icon');

    const modif_icon = document.createElement('i');
    modif_icon.classList.add('fas', 'fa-solid', 'fa-pen', 'new_icon');

    const delete_icon = document.createElement('i');
    delete_icon.classList.add('fas', 'fa-solid', 'fa-trash', 'new_icon');

    const check_button = document.createElement('button');
    check_button.appendChild(check_icon);
    check_button.addEventListener('click', checkElement);

    const modif_button = document.createElement('button');
    modif_button.appendChild(modif_icon);
    modif_button.addEventListener('click', modifElement);

    const delete_button = document.createElement('button');
    delete_button.appendChild(delete_icon);
    delete_button.addEventListener('click', deleteElement);

    const icon_div = document.createElement('div');
    icon_div.appendChild(check_button);
    icon_div.appendChild(modif_button);
    icon_div.appendChild(delete_button);
    icon_div.classList.add('flex', 'gap-8');

    li.appendChild(icon_div);

    item_list.appendChild(li);

    input_text.value = '';
}

function filterItems() {
    const filterText = input_filter.value.toLowerCase().trim();

    const items = item_list.querySelectorAll('li');

    items.forEach(item => {
        const span = item.querySelector('span');
        const text = span.textContent.toLowerCase();

        if (text.includes(filterText)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

add_item_button.addEventListener('click', addElement);

input_filter.addEventListener('input', filterItems);

input_text.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addElement();
    }
});
