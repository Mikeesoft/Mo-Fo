document.addEventListener("DOMContentLoaded", function() {

    // =================================================
    // 0. ⏳ شاشة التحميل (Preloader)
    // =================================================
    const loader = document.querySelector('.loader-wrapper');
    
    // ننتظر 2.8 ثانية (وقت كافي للأنيميشن) ثم نخفي الشاشة
    setTimeout(() => {
        if(loader) {
            loader.classList.add('hidden');
            // السماح بالسكرول بعد اختفاء الشاشة
            document.body.style.overflow = 'auto'; 
        }
    }, 2800);


    // =================================================
    // 1. 📱 القائمة الجانبية للموبايل (Mobile Menu)
    // =================================================
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.main-nav');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // تغيير شكل الأيقونة بين (قائمة) و (X)
            if(nav.classList.contains('active')) {
                menuBtn.innerHTML = '<i class="fas fa-times"></i>'; 
            } else {
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>'; 
            }
        });
    }

    // دالة لإغلاق القائمة عند الضغط على أي رابط (مربوطة بـ HTML onclick)
    window.closeMenu = function() {
        if(nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    };


    // =================================================
    // 2. ⌨️ تأثير الكتابة التلقائية (Typing Effect)
    // =================================================
    const textElement = document.querySelector('.typing-text');
    // الكلمات التي سيتم كتابتها
    const words = ["واقع ملموس", "قصة مؤثرة", "عمل احترافي", "تحفة فنية"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // حذف حرف
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // كتابة حرف
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // سرعة الكتابة والحذف
        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // انتظار قبل الحذف
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // الانتقال للكلمة التالية
        }

        setTimeout(type, typeSpeed);
    }
    
    // تشغيل الدالة فقط لو العنصر موجود
    if(textElement) type();


    // =================================================
    // 3. 🔢 عداد الإنجازات (Stats Counter)
    // =================================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target'); // الرقم المستهدف
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / 100; // سرعة العد

                    if(count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + "+"; // إضافة علامة + في النهاية
                    }
                };
                updateCount();
                obs.unobserve(counter); // إيقاف المراقبة بعد العد مرة واحدة
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // =================================================
    // 4. 🖱️ الماوس المخصص (Custom Cursor)
    // =================================================
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');

    document.addEventListener('mousemove', function(e){
        // تشغيله فقط على الشاشات الكبيرة (أكبر من التابلت)
        if(window.innerWidth > 768) {
            cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
        }
    });


    // =================================================
    // 5. 🎬 ظهور العناصر عند السكرول (Scroll Animation)
    // =================================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(sec => scrollObserver.observe(sec));


    // =================================================
    // 6. 🔍 البحث في معرض الأعمال (Search)
    // =================================================
    const searchInput = document.querySelector('.search-input');
    const projectCards = document.querySelectorAll('.project-card');

    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const val = searchInput.value.trim().toLowerCase();

            projectCards.forEach(card => {
                // البحث في العنوان والوصف
                const text = card.innerText.toLowerCase();
                
                if(text.includes(val)) {
                    card.style.display = 'block';
                    // أنيميشن بسيط عند الظهور
                    card.style.animation = "fadeIn 0.5s ease";
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// إضافة Keyframes للأنيميشن داخل JS (للبحث)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);
