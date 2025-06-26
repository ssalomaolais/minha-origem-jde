document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initHeaderAndBackToTop();
    initModalAndMessaging();
    console.log("Protótipo do consumidor 'Minha Origem JDE' carregado com interatividade total.");
});

function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initHeaderAndBackToTop() {
    const header = document.getElementById('main-header');
    const backToTopButton = document.getElementById('back-to-top');
    if (!header || !backToTopButton) return;
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            backToTopButton.classList.add('visible');
        } else {
            header.classList.remove('header-scrolled');
            backToTopButton.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initModalAndMessaging() {
    const donateButton = document.getElementById('donate-button');
    const sendMessageButton = document.getElementById('send-message-button');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');
    if (!donateButton || !sendMessageButton || !modal) return;
    const showModal = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
    };
    const closeModal = () => {
        modal.classList.add('hidden');
    };
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
         if(e.target === modal) {
            closeModal();
         }
    });
    donateButton.addEventListener('click', () => {
        showModal('PIX Copiado!', 'O código PIX para doação foi copiado para sua área de transferência. Abra seu app de banco para concluir. Obrigado pelo seu apoio!');
    });
    sendMessageButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const newMessage = document.createElement('div');
            newMessage.className = 'bg-white p-3 rounded-lg shadow-sm animate-message-in';
            newMessage.innerHTML = `
                <p class="text-gray-700">"${escapeHTML(messageText)}"</p>
                <p class="text-right text-sm text-gray-500 mt-1">- Você</p>
            `;
            messagesContainer.appendChild(newMessage);
            messageInput.value = '';
            showModal('Mensagem Enviada!', 'Sua mensagem foi enviada para a Família Alves. Eles ficarão muito felizes em ler!');
        }
    });
        const escapeHTML = (str) => {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        };
    }