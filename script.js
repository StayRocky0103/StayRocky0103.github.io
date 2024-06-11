document.addEventListener('devtoolschange', event => {
    if (event.detail.isOpen && event.detail.orientation) {
        if (localStorage.getItem('devToolsPasswordVerified') === 'true') {
            secureAllContent();
        }
    }
});

function secureAllContent() {
    const elements = document.querySelectorAll('script, link, style');
    for (let element of elements) {
        if (element.tagName.toLowerCase() === 'script' && element.src) {
            fetchAndEncode(element, 'src');
        } else if (element.tagName.toLowerCase() === 'link' && element.href) {
            fetchAndEncode(element, 'href');
        } else {
            const encodedContent = btoa(element.textContent);
            element.textContent = encodedContent;
        }
    }
}

function fetchAndEncode(element, attribute) {
    const url = element[attribute];
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const encodedData = btoa(data);
            element.textContent = encodedData;
            element[attribute] = '';
        })
        .catch(error => console.error(`Error encoding ${attribute} content:`, error));
}

// This function is called when the correct password is entered
function onCorrectPassword() {
    localStorage.setItem('devToolsPasswordVerified', 'true');
}

