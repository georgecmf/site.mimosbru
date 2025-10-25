document.addEventListener('DOMContentLoaded', () => {
    const dbg = (...args) => { if (window.console) console.log('[mimos]', ...args); };

    // --- MODAL GALERIA ---
    const modal = document.getElementById('imagemModal');
    const modalImg = document.getElementById('imagemModalConteudo');
    const fechar = modal.querySelector('.fechar');
    const btnPrev = modal.querySelector('.modal-prev');
    const btnNext = modal.querySelector('.modal-next');
    const images = Array.from(document.querySelectorAll('.brands-list img'));
    let currentIndex = 0;

    function showModal(index) {
        currentIndex = index;
        modal.style.display = 'flex';
        modalImg.src = images[currentIndex].dataset.large || images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt || '';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].dataset.large || images[currentIndex].src;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].dataset.large || images[currentIndex].src;
    }

    images.forEach((img, idx) => {
        img.addEventListener('click', () => showModal(idx));
    });

    fechar.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    btnPrev.addEventListener('click', showPrev);
    btnNext.addEventListener('click', showNext);

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeModal();
        }
    });

    dbg('Modal galeria pronto');

    // --- CARROSSEL LOJA ---
    const carouselRoot = document.querySelector('.carousel-loja');
    if (!carouselRoot) {
        dbg('Carrossel não encontrado (.carousel-loja)');
        return;
    }

    const carouselImages = carouselRoot.querySelectorAll('.carousel-image');
    const prevBtn = carouselRoot.querySelector('.prev');
    const nextBtn = carouselRoot.querySelector('.next');
    if (!carouselImages.length) {
        dbg('Nenhuma imagem encontrada no carrossel.');
        return;
    }

    let currentIndexCar = 0;
    const total = carouselImages.length;
    dbg('Carrossel inicializado. imagens:', total);

    function showImage(i) {
        currentIndexCar = (i + total) % total;
        carouselImages.forEach((img, idx) => {
            img.classList.toggle('active', idx === currentIndexCar);
            img.setAttribute('aria-hidden', idx !== currentIndexCar);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndexCar - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndexCar + 1));

    let autoplayTimer = null;
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => showImage(currentIndexCar + 1), 4000);
    }
    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
    }

    carouselRoot.addEventListener('mouseenter', stopAutoplay);
    carouselRoot.addEventListener('mouseleave', startAutoplay);

    showImage(currentIndexCar);
    startAutoplay();

    document.addEventListener('keydown', (e) => {
        if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        if (e.key === 'ArrowLeft') showImage(currentIndexCar - 1);
        if (e.key === 'ArrowRight') showImage(currentIndexCar + 1);
    });

    dbg('Carrossel pronto');

    // --- FORMULÁRIO CONTATO ---
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            try {
                const response = await fetch('https://formspree.io/f/xanjwbbl', {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    window.location.href = '/obrigado.html';
                } else {
                    alert('Erro ao enviar. Tente novamente.');
                }
            } catch (err) {
                alert('Erro de conexão.');
            }
        });
    }
});
