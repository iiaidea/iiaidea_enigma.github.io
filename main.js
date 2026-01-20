document.addEventListener('DOMContentLoaded', () => {
    // --- UTILITIES ---
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date();
        // Simple time string
        clockElement.textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    }

    setInterval(updateClock, 1000);
    updateClock();

    function showStage(stageId) {
        // Hide all stages
        document.querySelectorAll('.stage').forEach(el => el.classList.add('hidden'));
        // Show target stage
        const target = document.getElementById(stageId);
        if (target) {
            target.classList.remove('hidden');
        }
    }

    function showError(elementId, show) {
        const el = document.getElementById(elementId);
        if (show) {
            el.classList.remove('hidden');
            // Play error sound effect (optional/conceptual)
        } else {
            el.classList.add('hidden');
        }
    }

    // --- GAME STATE ---

    // STAGE 0: START
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            showStage('stage-1');
        });
    }

    // STAGE 1: SOURCE CODE
    // Password is in HTML comment: GHOST_IN_THE_SHELL
    const input1 = document.getElementById('input-1');
    const btn1 = document.getElementById('btn-1');

    btn1.addEventListener('click', () => {
        const val = input1.value.trim();
        if (val === "GHOST_IN_THE_SHELL") {
            showError('error-1', false);
            showStage('stage-2');
        } else {
            showError('error-1', true);
            input1.value = '';
        }
    });

    // STAGE 2: BASE64
    // "TmVvVG9reW8yMDI1" -> "NeoTokyo2025"
    const input2 = document.getElementById('input-2');
    const btn2 = document.getElementById('btn-2');

    btn2.addEventListener('click', () => {
        const val = input2.value.trim();
        // Allow NeoTokyo2025
        if (val === "NeoTokyo2025") {
            showError('error-2', false);
            showStage('stage-3');

            // PREPARE STAGE 3 HINT
            console.clear();
            console.log("%c>> SYSTEM LOG ENTRY #2049", "color: #00ff41; font-weight: bold; background: black; padding: 5px;");
            console.log(">> ERROR: Debug mode required.");
            console.log(">> HINT: The debug bypass code is 'DEBUG_MASTER'.");
        } else {
            showError('error-2', true);
        }
    });

    // STAGE 3: CONSOLE
    // Hint is in console log after Stage 2 clears
    const input3 = document.getElementById('input-3');
    const btn3 = document.getElementById('btn-3');

    btn3.addEventListener('click', () => {
        const val = input3.value.trim();
        if (val === "DEBUG_MASTER") {
            showError('error-3', false);
            showStage('stage-4');
        } else {
            showError('error-3', true);
        }
    });

    // STAGE 4: SQL INJECTION
    // Accepts ' OR '1'='1   or similar variations
    const input4 = document.getElementById('input-4');
    const btn4 = document.getElementById('btn-4');

    btn4.addEventListener('click', () => {
        const val = input4.value.trim();
        // Simple check for classic SQLi pattern
        const isSQLi = val.includes("' OR '1'='1") || val.includes("' OR 1=1") || val.includes('" OR "1"="1');

        if (isSQLi) {
            showError('error-4', false);
            showStage('stage-final');
        } else {
            showError('error-4', true);
        }
    });

    // Global ENTER key support
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Check which stage is active and trigger button click
            if (!document.getElementById('stage-1').classList.contains('hidden')) btn1.click();
            else if (!document.getElementById('stage-2').classList.contains('hidden')) btn2.click();
            else if (!document.getElementById('stage-3').classList.contains('hidden')) btn3.click();
            else if (!document.getElementById('stage-4').classList.contains('hidden')) btn4.click();
        }
    });

    // Developer Easter Egg
    console.log("%c ENIGMA SYSTEM ONLINE ", "background: #222; color: #bada55; font-size: 20px");
});
