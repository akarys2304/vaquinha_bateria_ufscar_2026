import constants from "./utils/constants.js";

document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const btnDoar = document.getElementById('btn-doar');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const navbar = document.getElementById('navbar');

    // 1. Lógica do Menu Mobile
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (opcional, mas bom para UX)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    // 2. Lógica da Vaquinha (Botão e QR Code)
    if (btnDoar && qrcodeContainer) {
        btnDoar.addEventListener('click', () => {
            btnDoar.classList.add('hidden');
            qrcodeContainer.classList.remove('hidden');
        });
    }

    // 3. Lógica do Scroll da Navbar
    window.onscroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
});

let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.media-item');
    const totalSlides = slides.length;
    const container = document.querySelector('.carousel-slide');
    document.querySelectorAll('.media-item video').forEach(v => v.pause());
    slideIndex += n;

    // Se chegar ao fim, volta pro começo e vice-versa
    if (slideIndex >= totalSlides) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = totalSlides - 1; }

    const offset = -slideIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
}


// Sessão de slides de apresentações
let apresIndex = 0;

function changeApresSlide(n) {
    showApresSlides(apresIndex += n);
}

function currentApresSlide(n) {
    showApresSlides(apresIndex = n);
}

function showApresSlides(n) {
    const slides = document.getElementsByClassName("apresentacao-item");
    const dots = document.getElementsByClassName("dot");

    if (n >= slides.length) { apresIndex = 0; }
    if (n < 0) { apresIndex = slides.length - 1; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[apresIndex].classList.add("active");
    dots[apresIndex].classList.add("active");
}

// botão flutuante
const pixFixo = document.getElementById('pix-fixo-lateral');
const btnFecharFixo = document.getElementById('btn-fechar-flutuante');

if (btnFecharFixo && pixFixo) {
    btnFecharFixo.addEventListener('click', () => {
        pixFixo.style.display = 'none';
    });
}


// copia cola código pix
const elementosPix = document.querySelectorAll('.copiar-pix');

elementosPix.forEach(elemento => {
    elemento.addEventListener('click', function (e) {
        // Evita que clique no botão de fechar dispare a cópia
        if (e.target.classList.contains('close-btn')) return;

        const textoPix = this.getAttribute('data-pix');

        // Tenta copiar para a área de transferência
        navigator.clipboard.writeText(textoPix).then(() => {
            // Feedback visual: Muda o texto temporariamente
            const avisoOriginal = this.querySelector('small') || this.querySelector('p:nth-child(2)');
            const textoAnterior = avisoOriginal.innerText;

            avisoOriginal.innerText = "✅ CÓDIGO COPIADO!";
            avisoOriginal.style.color = "#28a745"; // Verde sucesso

            // Volta ao normal depois de 2 segundos
            setTimeout(() => {
                avisoOriginal.innerText = textoAnterior;
                avisoOriginal.style.color = "";
            }, 2000);

            console.log("PIX copiado com sucesso!");
        }).catch(err => {
            console.error("Erro ao copiar: ", err);
            alert("Não foi possível copiar automaticamente. O código é: " + textoPix);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".valor-total").forEach(element => {
        element.textContent = constants.goalValue
    })
    document.querySelectorAll(".valor-atual").forEach(element => {
        element.textContent = constants.collectedValue
    })

    // Limpa o texto para pegar apenas os números (remove R$ e pontos)
    const valorAtual = parseFloat(constants.collectedValue.replace('R$', '').replace('.', '').replace(',', '.'));
    const valorTotal = parseFloat(constants.goalValue.replace('R$', '').replace('.', '').replace(',', '.'));

    // Calcula a porcentagem
    let porcentagem = (valorAtual / valorTotal) * 100;

    // Garante que não passe de 100% e não seja menor que 5% (para aparecer um tiquinho de vermelho)
    if (porcentagem > 100) porcentagem = 100;
    if (porcentagem < 2 && valorAtual > 0) porcentagem = 2;

    // Dispara a animação após um pequeno delay para o usuário ver crescendo
    const progressBar = document.getElementById('progress-bar');
    setTimeout(() => {
        progressBar.style.width = porcentagem + '%';
    }, 300);
})

document.getElementById("slide-prev").addEventListener("click", () => {
    moveSlide(-1)
})
document.getElementById("slide-next").addEventListener("click", () => {
    moveSlide(1)
})

document.querySelectorAll("nav div ul li a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault()

        const targetId = link.dataset.target
        const section = document.getElementById(targetId)

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
})
