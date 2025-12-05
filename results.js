document.addEventListener('DOMContentLoaded', function() {
    const gameGrid = document.getElementById('game-grid');
    const actionButton = document.getElementById('main-action-button');
    const restartButton = document.getElementById('restart-button');
    const gameStatus = document.getElementById('game-status');
    const displayId = document.getElementById('display-id');
    const multiplierColumn = document.getElementById('multiplier-column'); 

    const TOTAL_ROWS = 10;
    const COLS_PER_ROW = 5;
    let currentRow = TOTAL_ROWS - 1; // نبدأ من الصف الأخير (الأسفل)
    
    // بيانات التسلسل لـ 10 صفوف
    const SEQUENCE_COUNTS = [
        [1, 4], [2, 3], [2, 3], [3, 2], [3, 2], [3, 2], 
        [4, 1], [4, 1], [4, 1], [4, 1] 
    ];

    // قائمة المضاعفات
    const MULTIPLIERS = [
        'x349.68', 'x69.93', 'x27.97', 'x11.18', 'x6.71', 
        'x4.02', 'x2.41', 'x1.93', 'x1.54', 'x1.23' 
    ];
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeGrid() {
        gameGrid.innerHTML = '';
        multiplierColumn.innerHTML = ''; 
        
        const currentId = localStorage.getItem('vimonLastId') || '11111111111';
        displayId.textContent = currentId;

        for (let r = 0; r < TOTAL_ROWS; r++) {
            
            // 1. توليد خلايا البطاقات
            const counts = SEQUENCE_COUNTS[r]; 
            let rowValues = Array(counts[0]).fill(1).concat(Array(counts[1]).fill(0));
            rowValues = shuffleArray(rowValues);
            
            for (let c = 0; c < COLS_PER_ROW; c++) {
                const cell = document.createElement('div');
                cell.className = 'card-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.dataset.value = rowValues[c];
                
                cell.innerHTML = `
                    <div class="card-inner">
                        <div class="card-face card-back"></div>
                        <div class="card-face card-front"></div>
                    </div>
                `;
                gameGrid.appendChild(cell);
            }
            
            // 2. بناء خلايا المضاعف
            const multiplierCell = document.createElement('div');
            multiplierCell.className = 'multiplier-cell';
            multiplierCell.dataset.row = r;
            multiplierCell.textContent = MULTIPLIERS[r]; 
            multiplierColumn.appendChild(multiplierCell);
        }
        
        currentRow = TOTAL_ROWS - 1; 
        actionButton.textContent = 'ابدأ ';
        actionButton.disabled = false;
        restartButton.disabled = true;
        gameStatus.textContent = `اضغط "ابدأ" لعرض أول نتيجة`;
        gameStatus.style.color = 'var(--primary-neon)';
    }
    
    function updateMultiplierDisplay(row) {
        // تحديث حالة المضاعف باللون الأخضر وإظهار القيمة المخفية عبر CSS
        const cell = document.querySelector(`.multiplier-cell[data-row="${row}"]`);
        if (cell) {
            cell.classList.add('active');
        }
    }

    // دالة كشف الصف
    function revealRow(row) {
        const cells = document.querySelectorAll(`.card-cell[data-row="${row}"]`);
        cells.forEach(cell => {
            const front = cell.querySelector('.card-front');
            const value = cell.dataset.value;
            
            cell.classList.add('flipped'); 
            
            if (value === '1') {
                front.classList.add('safe-apple'); 
            } else {
                front.classList.add('danger-apple');
            }
        });
        
        updateMultiplierDisplay(row); 
    }

    actionButton.addEventListener('click', function() {
        if (currentRow >= 0) {
            
            revealRow(currentRow);
            
            const displayRow = TOTAL_ROWS - currentRow; 
            gameStatus.textContent = `تم كشف الصف ${displayRow} من ${TOTAL_ROWS}.`;

            currentRow--; 
            
            restartButton.disabled = false;
            
            if (currentRow >= 0) {
                const nextDisplayRow = TOTAL_ROWS - currentRow;
                actionButton.textContent = `التالي`;
                
            } else {
                actionButton.textContent = 'انتهى التسلسل!';
                actionButton.disabled = true;
                gameStatus.textContent = '✅ اكتمل التسلسل! يمكنك الآن بدأ جولة جديدة';
                gameStatus.style.color = '#4CAF50';
            }
        }
    });

    restartButton.addEventListener('click', function() {
        initializeGrid(); 
        gameStatus.textContent = 'تم المرور للجولة الجديدة اضغط "ابدا"';
    });

    initializeGrid();
});