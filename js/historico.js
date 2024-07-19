document.addEventListener("DOMContentLoaded", () => {
    let logs = [
        { acceso: "cámara", tipo: "desconocido", usuario: "Usuario 1", hora: "12:00:00", dia: "2024-05-13" },
        { acceso: "cámara", tipo: "conocido", usuario: "Usuario 2", hora: "13:00:00", dia: "2024-10-13" },
        // ... (otros registros)
    ];

    let filter = 'todos';
    let startDate = '';
    let endDate = '';
    let uniqueDates = [...new Set(logs.map(log => log.dia))];

    const logList = document.getElementById("logList");
    const filterPicker = document.getElementById("filterPicker");
    const startDatePicker = document.getElementById("startDatePicker");
    const endDatePicker = document.getElementById("endDatePicker");
    const modal = document.getElementById("logModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");

    function renderLogs() {
        logList.innerHTML = '';
        let filteredLogs = logs.filter(log => {
            if (filter === 'todos') return true;
            if (filter === 'conocido') return log.tipo === 'conocido';
            if (filter === 'desconocido') return log.tipo === 'desconocido';
            if (filter === 'rango') return isDateInRange(log.dia, startDate, endDate);
            return log.dia.startsWith(filter);
        });

        filteredLogs.forEach(log => {
            const li = document.createElement("li");
            li.textContent = `Acceso por la ${log.acceso} - ${log.tipo} - Usuario: ${log.usuario} - Hora: ${log.hora} - Día: ${log.dia}`;
            li.classList.add(log.tipo === 'conocido' ? 'conocido' : 'desconocido');
            li.addEventListener('click', () => handleLogClick(log));
            logList.appendChild(li);
        });
    }

    function isDateInRange(date, start, end) {
        return date >= start && date <= end;
    }

    function handleLogClick(log) {
        modal.style.display = "flex";
        modalImage.src = log.tipo === 'conocido' ? "./assets/images/conocido.png" : "./assets/images/desconocido.png";
    }

    function handleModalClose() {
        modal.style.display = "none";
    }

    function populateSelectOptions(select, options) {
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });
    }

    populateSelectOptions(filterPicker, uniqueDates);
    populateSelectOptions(startDatePicker, uniqueDates);
    populateSelectOptions(endDatePicker, uniqueDates);

    document.getElementById("btnMostrarTodos").addEventListener('click', () => {
        filter = 'todos';
        startDate = '';
        endDate = '';
        renderLogs();
    });

    document.getElementById("btnMostrarConocidos").addEventListener('click', () => {
        filter = 'conocido';
        startDate = '';
        endDate = '';
        renderLogs();
    });

    document.getElementById("btnMostrarDesconocidos").addEventListener('click', () => {
        filter = 'desconocido';
        startDate = '';
        endDate = '';
        renderLogs();
    });

    filterPicker.addEventListener('change', (event) => {
        filter = event.target.value;
        renderLogs();
    });

    startDatePicker.addEventListener('change', (event) => {
        startDate = event.target.value;
    });

    endDatePicker.addEventListener('change', (event) => {
        endDate = event.target.value;
    });

    document.getElementById("btnFiltrarRango").addEventListener('click', () => {
        if (startDate && endDate) {
            filter = 'rango';
        } else {
            filter = 'todos';
        }
        renderLogs();
    });

    closeModal.addEventListener('click', handleModalClose);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            handleModalClose();
        }
    });

    renderLogs();
});
