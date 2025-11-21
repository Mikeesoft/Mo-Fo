document.addEventListener("DOMContentLoaded", function() {
    
    // ============================================
    // 1. تأثير الظهور التدريجي (Animate on Scroll)
    // ============================================
    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.1 
    };

    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // 2. 🔍 وظيفة البحث في معرض الأعمال (مطور)
    // ============================================
    const searchInput = document.querySelector('.search-input');
    const projectCards = document.querySelectorAll('.portfolio-grid .project-card');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // إنشاء رسالة "لا توجد نتائج" وإخفاؤها مبدئياً
    const noResultsMsg = document.createElement('p');
    noResultsMsg.textContent = "عذراً، لا توجد أعمال تطابق بحثك.";
    noResultsMsg.style.cssText = "text-align:center; color:#777; font-size:1.2rem; width:100%; display:none; padding:20px;";
    portfolioGrid.appendChild(noResultsMsg);

    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            let hasResults = false; // متغير لتتبع هل وجدنا نتائج أم لا

            projectCards.forEach(card => {
                const title = card.querySelector('.project-info h4').textContent.toLowerCase();
                const description = card.querySelector('.project-info p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block'; 
                    // إضافة أنيميشن بسيط عند الظهور مرة أخرى
                    card.style.animation = "fadeIn 0.5s ease";
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // إظهار رسالة الخطأ لو مفيش نتائج
            if (!hasResults) {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }
        });
    }
});

// إضافة Keyframes للأنيميشن داخل JS عشان ميبقاش فيه ملفات كتير
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);
