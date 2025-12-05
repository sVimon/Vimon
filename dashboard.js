document.addEventListener('DOMContentLoaded', function() {
    const newIdInput = document.getElementById('new-valid-id');
    const addIdButton = document.getElementById('add-id-button');
    const idList = document.getElementById('valid-id-list');
    const idMessage = document.getElementById('id-message');

    const newFeedbackTextarea = document.getElementById('new-feedback-text');
    const addFeedbackButton = document.getElementById('add-feedback-button');
    const feedbackMessage = document.getElementById('feedback-message');

    // ** الدوال الأساسية لإدارة البيانات (استخدام localStorage) **

    function getValidIds() {
        const ids = localStorage.getItem('vimonValidIds');
        // IDs افتراضية
        return ids ? JSON.parse(ids) : ["14655566677", "14588899900", "123456789"]; 
    }

    function saveValidIds(ids) {
        localStorage.setItem('vimonValidIds', JSON.stringify(ids));
    }

    function getAdminFeedbacks() {
        const feedbacks = localStorage.getItem('vimonAdminFeedbacks');
        return feedbacks ? JSON.parse(feedbacks) : [];
    }

    function saveAdminFeedbacks(feedbacks) {
        localStorage.setItem('vimonAdminFeedbacks', JSON.stringify(feedbacks));
    }


    // ** قسم إدارة IDs **

    function renderIdList() {
        idList.innerHTML = '';
        const validIds = getValidIds();
        
        validIds.forEach(id => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <button class="remove-btn" data-id="${id}"><i class="fas fa-times"></i></button>
                #${id}
            `;
            idList.appendChild(listItem);
        });
    }

    addIdButton.addEventListener('click', function() {
        const newId = newIdInput.value.trim();
        const validIds = getValidIds();
        
        // التحقق من أن الـ ID يتكون من 9 إلى 11 رقم
        if (newId.length < 9 || newId.length > 11 || isNaN(newId)) {
            idMessage.textContent = '❌ يجب أن يتكون المعرّف من 9 إلى 11 رقم.';
            idMessage.style.color = '#ff5722';
            return;
        }

        if (validIds.includes(newId)) {
            idMessage.textContent = '❌ هذا المعرّف موجود بالفعل.';
            idMessage.style.color = '#ff5722';
            return;
        }

        validIds.push(newId);
        saveValidIds(validIds);
        renderIdList();
        
        idMessage.textContent = `✅ تم إضافة المعرّف ${newId} بنجاح.`;
        idMessage.style.color = '#4CAF50';
        newIdInput.value = '';
    });

    // حذف ID
    idList.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            const idToRemove = e.target.closest('.remove-btn').getAttribute('data-id');
            let validIds = getValidIds();
            validIds = validIds.filter(id => id !== idToRemove);
            saveValidIds(validIds);
            renderIdList();
            idMessage.textContent = `✅ تم حذف المعرّف ${idToRemove} بنجاح.`;
            idMessage.style.color = '#4CAF50';
        }
    });


    // ** قسم إدارة الآراء (Feedbacks) **

    addFeedbackButton.addEventListener('click', function() {
        const newFeedback = newFeedbackTextarea.value.trim();
        
        if (newFeedback.length < 5) {
            feedbackMessage.textContent = '❌ يرجى إدخال رأي لا يقل عن 5 أحرف.';
            feedbackMessage.style.color = '#ff5722';
            return;
        }

        let adminFeedbacks = getAdminFeedbacks();
        if (adminFeedbacks.includes(newFeedback)) {
             feedbackMessage.textContent = '❌ هذا الرأي موجود بالفعل.';
             feedbackMessage.style.color = '#ff5722';
             return;
        }

        adminFeedbacks.push(newFeedback);
        saveAdminFeedbacks(adminFeedbacks);
        
        feedbackMessage.textContent = '✅ تم نشر الرأي بنجاح، سيظهر في صفحة آراء العملاء.';
        feedbackMessage.style.color = '#4CAF50';
        newFeedbackTextarea.value = '';
    });


    // التحميل الأولي
    renderIdList();
});