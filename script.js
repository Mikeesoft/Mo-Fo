document.addEventListener("DOMContentLoaded", function() {

    // 1. تأثير الكتابة التلقائية (Typing Effect) ⌨️
    const textElement = document.querySelector('.typing-text');
    const words = ["واقع ملموس", "قصة مؤثرة", "عمل احترافي"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // انتظار قبل الحذف
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, typeSpeed);
    }
    if(textElement) type();

    // 2. ماوس مخصص (Custom Cursor) 🖱️
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');

    document.addEventListener('mousemove', function(e){
        if(window.innerWidth > 768) { // تشغيله فقط في الكمبيوتر
            cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
        }
    });

    // 3. تأثير الظهور عند السكرول (Scroll Animation) 🎬
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // 4. البحث في الأعمال 🔍
    const searchInput = document.querySelector('.search-input');
    const projectCards = document.querySelectorAll('.project-card');

    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const val = searchInput.value.trim().toLowerCase();
            projectCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(val) ? 'block' : 'none';
            });
        });
    }
});
