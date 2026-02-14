// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Projects filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Configurator functionality
const furnitureTypes = document.querySelectorAll('.type-btn');
const woodOptions = document.querySelectorAll('.wood-btn');
const finishOptions = document.querySelectorAll('input[name="finish"]');

// Dimension controls
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const widthSlider = document.getElementById('width');
const widthValue = document.getElementById('widthValue');
const heightSlider = document.getElementById('height');
const heightValue = document.getElementById('heightValue');

// Preview elements
const furniturePreview = document.getElementById('furniturePreview');
const previewDimensions = document.getElementById('previewDimensions');
const previewPrice = document.getElementById('previewPrice');

// Configuration state
let config = {
    type: 'mesa',
    wood: 'roble',
    finish: 'natural',
    length: 200,
    width: 90,
    height: 75,
    woodPriceMultiplier: 1.2
};

// Base prices per furniture type (per square meter)
const basePrices = {
    mesa: 300,
    estanteria: 250,
    escritorio: 350
};

// Wood price multipliers
const woodPrices = {
    roble: 1.2,
    nogal: 1.5,
    cerezo: 1.4,
    pino: 1.0
};

// Furniture type selection
furnitureTypes.forEach(button => {
    button.addEventListener('click', () => {
        furnitureTypes.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        config.type = button.dataset.type;
        updatePreview();
        updatePrice();
    });
});

// Wood selection
woodOptions.forEach(button => {
    button.addEventListener('click', () => {
        woodOptions.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        config.wood = button.dataset.wood;
        config.woodPriceMultiplier = parseFloat(button.dataset.price);
        updateWoodColor();
        updatePrice();
    });
});

// Finish selection
finishOptions.forEach(radio => {
    radio.addEventListener('change', () => {
        config.finish = radio.value;
        updatePrice();
    });
});

// Dimension sliders synchronization
function syncSliderAndInput(slider, input, configKey) {
    slider.addEventListener('input', () => {
        input.value = slider.value;
        config[configKey] = parseInt(slider.value);
        updateDimensions();
        updatePrice();
    });

    input.addEventListener('input', () => {
        slider.value = input.value;
        config[configKey] = parseInt(input.value);
        updateDimensions();
        updatePrice();
    });
}

syncSliderAndInput(lengthSlider, lengthValue, 'length');
syncSliderAndInput(widthSlider, widthValue, 'width');
syncSliderAndInput(heightSlider, heightValue, 'height');

// Update furniture preview
function updatePreview() {
    const previewHTML = {
        mesa: `
            <div class="furniture-piece mesa-preview">
                <div class="furniture-top"></div>
                <div class="furniture-legs">
                    <div class="leg"></div>
                    <div class="leg"></div>
                    <div class="leg"></div>
                    <div class="leg"></div>
                </div>
            </div>
        `,
        estanteria: `
            <div class="furniture-piece estanteria-preview">
                <div class="shelf"></div>
                <div class="shelf"></div>
                <div class="shelf"></div>
                <div class="shelf"></div>
            </div>
        `,
        escritorio: `
            <div class="furniture-piece escritorio-preview">
                <div class="furniture-top"></div>
                <div class="furniture-legs">
                    <div class="leg"></div>
                    <div class="leg"></div>
                </div>
                <div class="drawer-container">
                    <div class="drawer"></div>
                    <div class="drawer"></div>
                    <div class="drawer"></div>
                </div>
            </div>
        `
    };

    furniturePreview.innerHTML = previewHTML[config.type];
    updateWoodColor();
}

// Update wood color in preview
function updateWoodColor() {
    const woodColors = {
        roble: 'linear-gradient(135deg, #D4A574 0%, #C19463 100%)',
        nogal: 'linear-gradient(135deg, #8B6F47 0%, #6E5536 100%)',
        cerezo: 'linear-gradient(135deg, #C97B63 0%, #B55A3C 100%)',
        pino: 'linear-gradient(135deg, #E8C9A1 0%, #D4B494 100%)'
    };

    const furnitureParts = furniturePreview.querySelectorAll('.furniture-top, .furniture-piece, .leg, .drawer');
    furnitureParts.forEach(part => {
        part.style.background = woodColors[config.wood];
    });
}

// Update dimensions display
function updateDimensions() {
    previewDimensions.textContent = `${config.length}cm × ${config.width}cm × ${config.height}cm`;
}

// Calculate and update price
function updatePrice() {
    // Calculate area in square meters
    const area = (config.length * config.width) / 10000;
    
    // Get base price for furniture type
    const basePrice = basePrices[config.type];
    
    // Calculate total price
    let price = basePrice * area * config.woodPriceMultiplier;
    
    // Add finish premium
    const finishPremium = {
        natural: 1.0,
        barniz: 1.15,
        lacado: 1.3
    };
    
    price *= finishPremium[config.finish];
    
    // Round to nearest 10
    price = Math.round(price / 10) * 10;
    
    // Update display
    previewPrice.textContent = `$${price.toLocaleString()}`;
}

// Reset configurator
const resetButton = document.getElementById('resetConfig');
resetButton.addEventListener('click', () => {
    // Reset to default values
    config = {
        type: 'mesa',
        wood: 'roble',
        finish: 'natural',
        length: 200,
        width: 90,
        height: 75,
        woodPriceMultiplier: 1.2
    };

    // Reset UI
    furnitureTypes.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === 'mesa') btn.classList.add('active');
    });

    woodOptions.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.wood === 'roble') btn.classList.add('active');
    });

    finishOptions.forEach(radio => {
        radio.checked = (radio.value === 'natural');
    });

    lengthSlider.value = 200;
    lengthValue.value = 200;
    widthSlider.value = 90;
    widthValue.value = 90;
    heightSlider.value = 75;
    heightValue.value = 75;

    updatePreview();
    updateDimensions();
    updatePrice();
});

// Modal functionality
const modal = document.getElementById('cartModal');
const addToCartButton = document.getElementById('addToCart');
const modalClose = document.querySelector('.modal-close');

addToCartButton.addEventListener('click', () => {
    // Update modal with current configuration
    const typeNames = {
        mesa: 'Mesa',
        estanteria: 'Estantería',
        escritorio: 'Escritorio'
    };

    const woodNames = {
        roble: 'Roble',
        nogal: 'Nogal',
        cerezo: 'Cerezo',
        pino: 'Pino'
    };

    const finishNames = {
        natural: 'Natural',
        barniz: 'Barnizado',
        lacado: 'Lacado'
    };

    document.getElementById('cartFurnitureType').textContent = typeNames[config.type];
    document.getElementById('cartDimensions').textContent = `${config.length}cm × ${config.width}cm × ${config.height}cm`;
    document.getElementById('cartWood').textContent = `Madera: ${woodNames[config.wood]}`;
    document.getElementById('cartFinish').textContent = `Acabado: ${finishNames[config.finish]}`;
    document.getElementById('cartPrice').textContent = previewPrice.textContent;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Quote form submission
const quoteForm = document.getElementById('quoteForm');
quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('quoteName').value,
        email: document.getElementById('quoteEmail').value,
        phone: document.getElementById('quotePhone').value,
        notes: document.getElementById('quoteNotes').value,
        furniture: {
            type: config.type,
            dimensions: `${config.length}cm × ${config.width}cm × ${config.height}cm`,
            wood: config.wood,
            finish: config.finish,
            price: previewPrice.textContent
        }
    };

    console.log('Quote request:', formData);

    // In a real implementation, send this to a server
    // For now, show success message
    alert('¡Gracias! Hemos recibido tu solicitud de cotización. Nos pondremos en contacto contigo pronto.');

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    quoteForm.reset();
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    console.log('Contact form:', formData);

    // In a real implementation, send this to a server
    alert('¡Gracias por contactarnos! Responderemos tu mensaje lo antes posible.');
    contactForm.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .feature, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    updateDimensions();
    updatePrice();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
