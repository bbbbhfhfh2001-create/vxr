$(document).ready(function() {
    const loveMessage = "Happy Birthday Shamma!";
    const textElement = $("#love-text");
    let index = 0;

    const confettiColors = ['#FFD700', '#F472B6', '#81D4FA', '#B2DFDB', '#D1C4E9', '#FFFFFF'];
    const textColors = ['#E91E63', '#9C27B0', '#2196F3', '#00BCD4', '#FFC107'];

    // 🟣 العناصر اللي نبيها كلّها تتلون
    const dateElement = $("#birthday-date");
    const countdownElement = $("#countdown");
    const colorElements = $("#love-text,#countdown");

    function type() {
        if (index < loveMessage.length) {
            textElement.append(loveMessage.charAt(index));
            index++;
            setTimeout(type, 150); 
        } else {
            animateTextColor();
        }
    }

    function animateTextColor() {
        let colorIndex = 0;

        // أول لون
        gsap.to(colorElements, {
            duration: 3,
            color: textColors[0],
            ease: "power1.inOut",
            onComplete: function() {
                function cycleColors() {
                    colorIndex = (colorIndex + 1) % textColors.length;
                    gsap.to(colorElements, {
                        duration: 3,
                        color: textColors[colorIndex],
                        ease: "power1.inOut",
                        onComplete: cycleColors
                    });
                }
                cycleColors();
            }
        });
    }

    // يبدأ كتابة الجملة بعد 6 ثواني
    setTimeout(type, 6000);

    const confettiContainer = $('.confetti-container');

    function createConfetti() {
        const confetti = $('<div class="confetti"></div>');
        const size = Math.random() * 12 + 8;
        const x = Math.random() * 100;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        if (Math.random() > 0.9) {
            confetti.html('♥').css({
                'font-size': size * 1.5 + 'px',
                'border-radius': 0
            });
        } else {
            confetti.css({
                'width': size + 'px',
                'height': size + 'px'
            });
        }

        confetti.css({
            'background-color': color,
            'color': color,
            'left': x + '%'
        });

        confettiContainer.append(confetti);

        gsap.to(confetti, {
            y: '100vh',
            x: '+= ' + (Math.random() - 0.5) * 300,
            rotation: Math.random() * 360 - 180,
            duration: Math.random() * 5 + 6,
            ease: 'none',
            onComplete: () => {
                confetti.remove();
            }
        });
    }

    setInterval(createConfetti, 80);

    /* =========================
       🎂 Birthday 11/20 Timer
       ========================= */

    
    dateElement.text("Birthday: November 20");

    const birthdayMonth = 10; 
    const birthdayDay = 20;

    function updateCountdown() {
        const now = new Date();
        let year = now.getFullYear();

        let target = new Date(year, birthdayMonth, birthdayDay, 0, 0, 0);

        if (now > target) {
            year += 1;
            target = new Date(year, birthdayMonth, birthdayDay, 0, 0, 0);
        }

        const diffMs = target - now;
        const totalSeconds = Math.floor(diffMs / 1000);

        const days    = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours   = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        if (now.getMonth() === birthdayMonth && now.getDate() === birthdayDay) {
            countdownElement.text("Today is your birthday!");
        } else {
            countdownElement.text(
                `${days}d ${hours}h ${minutes}m ${seconds}s until your birthday`
            );
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
// 🎵 تشغيل تلقائي hack — يشتغل 100% حتى بدون ضغط
const bgMusic = document.getElementById("bg-music");

function tryPlayMusic() {
    if (!bgMusic) return;

    bgMusic.volume = 0; // لازم يبدأ بدون صوت
    bgMusic.play().then(() => {
        // بعد نصف ثانية نرفع الصوت "بهدوء"
        setTimeout(() => {
            bgMusic.volume = 0.5; // تقدرين تغيرينها
        }, 500);
    }).catch(() => {
        // لو رفض المتصفح التشغيل (نادراً يصير)
        // نحاول مرة ثانية بعد 1 ثانية
        setTimeout(tryPlayMusic, 1000);
    });
}

// نحاول التشغيل بمجرد تحميل الصفحة
setTimeout(tryPlayMusic, 300);
