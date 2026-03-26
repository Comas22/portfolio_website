document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve so it only animates once when scrolling down
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Email Modal Logic
    const openModalBtn = document.getElementById('openEmailModalBtn');
    const emailModal = document.getElementById('emailModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    
    if (openModalBtn && emailModal) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            emailModal.classList.add('show');
        });
        
        closeModalBtn.addEventListener('click', () => {
            emailModal.classList.remove('show');
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.remove('show');
            }
        });
        
        copyEmailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('carles.comas@outlook.com');
                copyFeedback.style.opacity = '1';
                setTimeout(() => {
                    copyFeedback.style.opacity = '0';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                const textArea = document.createElement("textarea");
                textArea.value = 'carles.comas@outlook.com';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyFeedback.style.opacity = '1';
                    setTimeout(() => {
                        copyFeedback.style.opacity = '0';
                    }, 2000);
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                document.body.removeChild(textArea);
            }
        });
    }
});
