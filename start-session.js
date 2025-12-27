document.addEventListener('DOMContentLoaded', function() {
    const userIdInput = document.getElementById('user-id');
    const startButton = document.getElementById('start-button');
    const validationMessage = document.getElementById('validation-message'); 
    
    const errorModal = document.getElementById('error-modal');
    const modalCloseButton = document.getElementById('modal-close-button');

    // ==========================================================
    // 🎯 المكان الذي يجب أن تعدله لإضافة IDs جديدة 🎯
    // ==========================================================
    
    // دالة قراءة IDs الصالحة
    function getValidIds() {
        
        // 🚨 IDs الجديدة يجب أن تُضاف هنا.
        // يجب أن تكون كل ID بين علامات تنصيص ("") ومفصولة بفاصلة (,) عن الـ ID الذي يليه.
        const validIdsList = [ 
            "1502917719",
            "1508032745",
            "1508083323",
            "1506155031",
            "1508040699",
            "1508127441",
            "1506222201",
            "1508007419",
            "1507947543",
            "1507241115",
            "1507593369",
            "1507741353",
            "1507861539",
            "1507821193",
            "1507927695",
            "1507682643",
            "1507617477",
            "1507893653",
            "1507721203",
            "1507639953",
            "1507588427",
            "1507690043",

        ];

        // بما أنك لا تريد استخدام التخزين المحلي (localStorage)، سنقوم بتجاهله.
        // إذا كنت تستخدم الكود القديم جداً الذي كان يحتوي على localStorage، فستتجاهله الآن.
        
        return validIdsList;
    }
    
    // ** تم تغيير هذا ليتوافق مع صفحة النتائج (محاكاة اللعبة) **
    const LOADING_PAGE_URL = 'results.html'; 
    
    
    // 1. منطق تفعيل الزر بناءً على الطول فقط
    userIdInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');

        const idLength = this.value.length;
        
        // إزالة فئات التحقق السابقة والتأثير المرئي
        userIdInput.classList.remove('valid', 'invalid');
        validationMessage.style.display = 'none'; // إخفاء رسالة التحقق الفورية

        // تفعيل زر START إذا كان الطول صحيحاً (9-11)
        if (idLength >= 9 && idLength <= 11) {
            startButton.disabled = false;
        } else {
            startButton.disabled = true;
        }
    });

    // 2. منطق التحقق بعد الضغط على زر START
    startButton.addEventListener('click', function() {
        if (this.disabled) return;
        
        const currentId = userIdInput.value.trim();
        const validIds = getValidIds(); // قراءة IDs من الكود مباشرة

        if (validIds.includes(currentId)) {
            // ID صالح: توجيه لصفحة النتائج
            userIdInput.classList.add('valid');
            
            // ** حفظ الـ ID ليتم عرضه في صفحة النتائج (results.html) **
            localStorage.setItem('vimonLastId', currentId); 
            
            setTimeout(() => {
                window.location.href = LOADING_PAGE_URL; 
            }, 300); // تأخير بسيط قبل التوجيه

        } else {
            // ID غير صالح 
            userIdInput.classList.add('invalid');
            showErrorModal();
        }
    });

    // منطق النافذة المنبثقة
    function showErrorModal() { 
        errorModal.classList.add('show'); 
        // إعادة تهيئة الحقل بعد الإغلاق
        modalCloseButton.onclick = function() {
            hideErrorModal();
            userIdInput.value = '';
            userIdInput.classList.remove('invalid');
            startButton.disabled = true;
        };
    }
    
    function hideErrorModal() { 
        errorModal.classList.remove('show'); 
        userIdInput.value = '';
        userIdInput.classList.remove('invalid');
        startButton.disabled = true;
    }

    errorModal.addEventListener('click', function(e) {
        if (e.target.id === 'error-modal') { hideErrorModal(); }
    });

});










































































































































































