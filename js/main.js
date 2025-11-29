document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll Effect (Hiệu ứng khi cuộn) ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Thư viện ảnh (Gallery) ---
    const currentImg = document.getElementById('current-img');
    const thumbnails = document.querySelectorAll('.thumb');

    // Gắn sự kiện click cho từng thumbnail
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Thay đổi ảnh lớn
            currentImg.src = this.src;

            // Xử lý class active (CSS border)
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Hiệu ứng fade nhẹ cho ảnh lớn
            currentImg.style.opacity = 0;
            setTimeout(() => {
                currentImg.style.opacity = 1;
            }, 100);
        });
    });

    // --- 3. Animation khi cuộn tới (Intersection Observer) ---
    const observerOptions = {
        root: null, // viewport
        threshold: 0.2 // Kích hoạt khi thấy 20% phần tử
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Chỉ chạy 1 lần
            }
        });
    }, observerOptions);

    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        observer.observe(item);
    });
});