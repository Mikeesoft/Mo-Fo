// ====== تأثير الظهور التدريجي (Animate on Scroll) ======
// هذا الكود يجعل الأقسام تظهر بحركة سلسة عند التمرير إليها.

document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.1 
    };

    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إذا أصبح العنصر مرئياً، أضف كلاس 'visible' ليظهر
                entry.target.classList.add('visible');
                // توقف عن المراقبة بعد الظهور لمرة واحدة
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    
    // ====== 🔍 وظيفة البحث في معرض الأعمال ======
    const searchInput = document.querySelector('.search-input');
    const projectCards = document.querySelectorAll('.portfolio-grid .project-card');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        projectCards.forEach(card => {
            // الحصول على عنوان المشروع والوصف
            const title = card.querySelector('.project-info h4').textContent.toLowerCase();
            const description = card.querySelector('.project-info p').textContent.toLowerCase();

            // التحقق إذا كان مصطلح البحث موجوداً في العنوان أو الوصف
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                // إذا تطابقت، أظهر البطاقة
                card.style.display = 'block'; 
            } else {
                // إذا لم تتطابق، أخفِ البطاقة
                card.style.display = 'none';
            }
        });
    });
});
