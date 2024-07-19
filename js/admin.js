document.addEventListener('DOMContentLoaded', function() {
    const alertasCheckbox = document.getElementById('alertasCheckbox');
    const alertasConfig = document.getElementById('alertasConfig');

    alertasCheckbox.addEventListener('change', function() {
        if (alertasCheckbox.checked) {
            alertasConfig.classList.remove('hidden');
        } else {
            alertasConfig.classList.add('hidden');
        }
    });

    function setupDropdown(dropdown, menu) {
        dropdown.addEventListener('click', function() {
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });

        menu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                dropdown.textContent = item.textContent;
                menu.style.display = 'none';
            });
        });
    }

    const nombreDropdown = document.getElementById('nombreDropdown');
    const nombreDropdownMenu = document.getElementById('nombreDropdownMenu');
    setupDropdown(nombreDropdown, nombreDropdownMenu);

    const alertTypeDropdown = document.getElementById('alertTypeDropdown');
    const alertTypeDropdownMenu = document.getElementById('alertTypeDropdownMenu');
    setupDropdown(alertTypeDropdown, alertTypeDropdownMenu);

    const updateTimeDropdown = document.getElementById('updateTimeDropdown');
    const updateTimeDropdownMenu = document.getElementById('updateTimeDropdownMenu');
    setupDropdown(updateTimeDropdown, updateTimeDropdownMenu);
});