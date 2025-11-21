document.addEventListener("DOMContentLoaded", function() {

    // ============================
    // 1. تأثير الكتابة (Typing) ⌨️
    // ============================
    const textElement = document.querySelector('.typing-text');
    const words = ["واقع ملموس", "قصة مؤثرة", "عمل احترافي"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

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
            typeSpeed = 2000; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, typeSpeed);
    }
    if(textElement) type();

    // ============================
    // 2. عداد الإنجازات (Stats) 🔢
    // ============================
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / 100; // سرعة العد
                    if(count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // ============================
    // 3. ماوس مخصص (Cursor) 🖱️
    // ============================
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');
    document.addEventListener('mousemove', function(e){
        if(window.innerWidth > 768) {
            cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
        }
    });

    // ============================
    // 4. ظهور عند السكرول (Scroll) 🎬
    // ============================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(sec => scrollObserver.observe(sec));

    // ============================
    // 5. البحث في الأعمال 🔍
    // ============================
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
