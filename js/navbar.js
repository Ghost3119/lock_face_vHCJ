// assets/js/navbar.js
function loadNavbar() {
    fetch('/assets/includes/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            highlightActiveLink();
        })
        .catch(error => {
            console.error('Error al cargar la barra de navegación:', error);
        });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
