document.addEventListener('DOMContentLoaded', () => {

    /* ================= MODAL GALERIA ================= */
    const modal = document.getElementById('imagemModal');

    if (modal) {
        const modalImg = document.getElementById('imagemModalConteudo');
        const fechar = modal.querySelector('.fechar');
        const btnPrev = modal.querySelector('.modal-prev');
        const btnNext = modal.querySelector('.modal-next');
        const images = Array.from(document.querySelectorAll('.brands-list img'));
        let currentIndex = 0;

        function showModal(index) {
            currentIndex = index;
            modal.style.display = 'flex';
            modalImg.src = images[currentIndex].src;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            modalImg.src = images[currentIndex].src;
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentIndex].src;
        }

        images.forEach((img, index) => {
            img.addEventListener('click', () => showModal(index));
        });

        fechar.addEventListener('click', closeModal);
        btnNext.addEventListener('click', showNext);
        btnPrev.addEventListener('click', showPrev);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    /* ================= CARROSSEL ================= */
    const carousel = document.querySelector('.carousel-loja');

    if (carousel) {
        const images = carousel.querySelectorAll('.carousel-image');
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');

        let index = 0;

        function showImage(i) {
            images.forEach(img => img.classList.remove('active'));
            index = (i + images.length) % images.length;
            images[index].classList.add('active');
        }

        prev.addEventListener('click', () => showImage(index - 1));
        next.addEventListener('click', () => showImage(index + 1));

        setInterval(() => showImage(index + 1), 4000);

        showImage(0);
    }

    /* ================= FORMULÁRIO ================= */
    const form = document.getElementById('formContato');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                const response = await fetch('https://formspree.io/f/xanjwbbl', {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    window.location.href = '/obrigado.html';
                } else {
                    alert('Erro ao enviar formulário.');
                }
            } catch {
                alert('Erro de conexão.');
            }
        });
    }

    // ===== DARK MODE =====
    const toggleTheme = document.getElementById('toggleTheme');

    if (toggleTheme) {
        // carrega preferência salva
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            toggleTheme.textContent = '☀️';
        }

        toggleTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark');

            const isDark = document.body.classList.contains('dark');
            toggleTheme.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


});
