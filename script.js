menu = document.querySelector('.menu i');
navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
}

document.getElementById('contact').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageBox = document.getElementById('formMessage');

    messageBox.classList.add('hidden');
    messageBox.textContent = '';

    try {
        const response = await fetch('https://formspree.io/f/mrblkvez', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            form.reset();
            messageBox.textContent = '✅ Message sent successfully!';
            messageBox.className = 'mt-6 text-green-700 bg-green-100 border border-green-300 px-4 py-3 rounded text-center w-full';
        } else {
            const data = await response.json();
            messageBox.textContent = data.error || '❌ Something went wrong!';
            messageBox.className = 'mt-6 text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded text-center w-full';
        }
    } catch (error) {
        messageBox.textContent = '❌ Network error: ' + error.message;
        messageBox.className = 'mt-6 text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded text-center w-full';
    }

    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('fade-out');
    }, 4000);
});

