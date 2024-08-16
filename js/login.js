async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://lock-face-backend.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailUser: email, passwordUser: password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);

            // Guardar token en localStorage o cookies
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user._id);
            localStorage.setItem('roleUser', data.user.roleUser);
            localStorage.setItem('nameUser', data.user.nameUser);
            localStorage.setItem('emailUser', data.user.emailUser);
            localStorage.setItem('numberUser', data.user.numberUser);

            if (data.user.roleUser == 'admin') {
                // Redireccionar a la página de dashboard
                window.location.href = 'admin/add-door.html';
            } else {
                // Redireccionar a la página de dashboard
                window.location.href = 'user/historico-u.html';
            }
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.message);
            alert('Error: ' + errorData.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again.');
    }
}
