// Galeri fonksiyonları
document.addEventListener('DOMContentLoaded', function () {
    // Burger menü fonksiyonları
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Menü linklerine tıklandığında menüyü kapat
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Galeri elementlerini seç
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.gallery-thumbs-full .thumb');
    const galleryMain = document.querySelector('.gallery-main');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const closeBtn = document.querySelector('.gallery-close');

    // Eğer galeri elementleri bulunamazsa işlemi sonlandır
    if (!mainImage || !galleryMain) {
        return;
    }

    let currentIndex = 0;
    const totalImages = thumbs.length;

    // Galeri fonksiyonları
    function updateGallery(index) {
        // Sınırları kontrol et
        if (index >= totalImages) index = 0;
        if (index < 0) index = totalImages - 1;
        currentIndex = index;

        // Aktif sınıfını güncelle
        thumbs.forEach(t => t.classList.remove('active'));
        thumbs[currentIndex].classList.add('active');

        // Ana resmi güncelle
        const newImage = thumbs[currentIndex].getAttribute('data-image');
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = newImage;
            mainImage.style.opacity = '1';
        }, 200);
    }

    // Küçük resimlere tıklama olayı
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function () {
            updateGallery(index);
        });
    });

    // İleri/geri butonları
    if (prevBtn) {
        prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));
    }

    // Kapatma butonu
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            galleryMain.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Ana resme tıklama olayı
    galleryMain.addEventListener('click', function (e) {
        if (e.target === mainImage || e.target === galleryMain) {
            galleryMain.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Klavye kontrolleri
    document.addEventListener('keydown', function (e) {
        if (galleryMain.classList.contains('active')) {
            switch (e.key) {
                case 'ArrowLeft':
                    updateGallery(currentIndex - 1);
                    break;
                case 'ArrowRight':
                    updateGallery(currentIndex + 1);
                    break;
                case 'Escape':
                    galleryMain.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    break;
            }
        }
    });

    // Dokunmatik ekran desteği
    let touchStartX = 0;
    let touchEndX = 0;

    galleryMain.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryMain.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Sola kaydırma
                updateGallery(currentIndex + 1);
            } else {
                // Sağa kaydırma
                updateGallery(currentIndex - 1);
            }
        }
    }

    // Lazy loading için Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Tüm resimleri gözlemle
    document.querySelectorAll('.gallery-main img, .gallery-thumbs-full img').forEach(img => {
        observer.observe(img);
    });

    // Ana sayfadaki galeri için
    const projectThumbs = document.querySelectorAll('.gallery-thumbs .thumb');
    const projectMainImage = document.querySelector('.project-gallery .main-image');

    if (projectThumbs.length > 0 && projectMainImage) {
        projectThumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Aktif sınıfını güncelle
                projectThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Ana resmi güncelle
                projectMainImage.src = this.src;
            });
        });
    }
}); 