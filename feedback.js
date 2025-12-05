document.addEventListener('DOMContentLoaded', function() {

    const feedbackGrid = document.getElementById('feedback-grid');
    
    // **********************************************
    // 1. منطق الآراء القديم (تم الحفاظ عليه كما هو)
    // **********************************************

    // دالة الترتيب العشوائي (Fisher-Yates Shuffle Algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
    }
    
    // وظيفة توليد ID عشوائي 
    function generateVimonId() {
        // لتوليد ID شبيه بالـ IDs الصالحة (145XXXXXXX أو 146XXXXXXX)
        const prefix = Math.random() < 0.5 ? '145' : '146';
        // طول الجزء المتبقي (ليصبح الطول الكلي بين 9 و 11)
        const remainingLength = Math.floor(Math.random() * 3) + 6; 
        
        let randomPart = '';
        for (let i = 0; i < remainingLength; i++) {
            randomPart += Math.floor(Math.random() * 10).toString();
        }
        
        return prefix + randomPart;
    }

    // قراءة الآراء المضافة من طرف المشرف
    function getAdminFeedbacks() {
        const feedbacks = localStorage.getItem('vimonAdminFeedbacks');
        return feedbacks ? JSON.parse(feedbacks) : []; 
    }
    
    // قائمة الآراء الثابتة
    let staticFeedbacks = [ 
        "خدام 100%", "شكرا خويا Vimon", "Vimon أحسن واحد", "الله إحفضك خويا Vimon", 
        "أحسن تعامل وسكربت خدام 100%", "شكرا بزاف", "مكنتش متيق ولاكن الحمد الله خدام", 
        "خدام 100000%", "الله إسهل عليك", "دراري تا انا كنت بحالكم ممتيقش ولاكن والله إلا خدام", 
        "nadi nadi 🔥", "شكرا أخويا Vimon الله إسهل عليك", "ماعمري غننساك خويا Vimon السكربت خدام", 
        "السكربت ناااضي", "والله مامتيق أخويا شكرا بزاف", "👏🏼👏🏼", "👍🏼", "🥇🥇🥇🥇", 
        "✅✅✅✅✅", "💶💴", "💸✅✅", "شحنت 1000 درهم ووصلتها ل 11580 درهم من الطرح الول",
        "مكنتش تايق فلول جربت غب ب 3 دراهم ومني لقيتو خدام لعبت بداكشي لي عندي كامل",
        "Vimon lm9wd 💸✅", "Lah ishl khoya Vimon", "A9wd wa7d howa vimon saalina 🎰", 
        "Lah ishl 3lik akhoya kima 3awntini", "Khoya nta rah maymknx akhoya", 
        "Li mazal majrb da3 lih ns mn 3mro 💸🤣", "Vimon Yarbi t7fdk akhoya", 
        "Lah ishl 3lik alkhawa", "Brooo nta maymknx . M9awd saliiina",
        "خويا والله مامتيق بلي خدم بصاح 😭", "خويا هلكوني نصابة الحمدو لله لقيتك نتا",
        "M9wd💲🔥🔥", "أحسن واحد فهاد الضومين",
        "Khoya tkhwrt xarjit 4i 20 dh 7it knt kangol rah ma4aykhdmx Kon knt 3arf 4anxarji xi 3000dh",
        "أحسن واحد هوا vimon ساااالييبنا 😍💵💵💵💵💵💵", "والله إلا خدم أخويا vimon مامتيقش",
        "شارجيت 200dh وسحبت 15700dh", "الحمد لله"
    ];

    // دمج الآراء المضافة من طرف المشرف مع الآراء الثابتة
    const adminFeedbacks = getAdminFeedbacks();
    let allFeedbacks = staticFeedbacks.concat(adminFeedbacks);

    shuffleArray(allFeedbacks); 

    // حشو الآراء في الصفحة
    allFeedbacks.forEach(feedbackText => {
        
        const randomId = generateVimonId();
        
        const card = document.createElement('div');
        card.className = 'feedback-card';

        card.innerHTML = `
            <div class="card-header">
                <span class="user-icon"><i class="fas fa-user-circle"></i></span>
                <span class="feedback-id">#${randomId}</span>
            </div>
            <div class="card-body">
                <p>${feedbackText}</p>
            </div>
            <div class="card-footer">
                <span><i class="fas fa-calendar-alt"></i> مؤكد</span> 
            </div>
        `;
        
        feedbackGrid.appendChild(card);
    });

    // **********************************************
    // 2. منطق الإضافة الجديدة (زر النشر الوهمي)
    // **********************************************
    
    const publishButton = document.getElementById('publish-button');
    const errorModal = document.getElementById('error-modal');
    const closeModalButtons = document.querySelectorAll('#close-modal-button, #confirm-modal-button');
    const feedbackInput = document.getElementById('feedback-input');


    // منطق فتح النافذة المنبثقة عند النقر على "نشر"
    if (publishButton) {
        publishButton.addEventListener('click', function(event) {
            // منع الإجراء الافتراضي
            event.preventDefault(); 
            
            // إظهار النافذة المنبثقة
            if (errorModal) {
                errorModal.style.display = 'block'; // يتم تغيير الـ display هنا
            }
            
            // مسح حقل الكتابة (كديكور)
            if (feedbackInput) {
                feedbackInput.value = '';
            }
        });
    }

    // منطق إغلاق النافذة المنبثقة
    function closeErrorModal() {
        if (errorModal) {
            errorModal.style.display = 'none'; // يتم إخفاء الـ Modal هنا
        }
    }
    
    // الإغلاق عند النقر على الأزرار الداخلية
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeErrorModal);
    });

    // الإغلاق عند النقر خارج النافذة
    window.addEventListener('click', function(event) {
        if (event.target === errorModal) {
            closeErrorModal();
        }
    });

});