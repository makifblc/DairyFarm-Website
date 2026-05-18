document.addEventListener('DOMContentLoaded', () => {

    let basket = [];
    const sideCart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    const cartLink = document.getElementById('cart-link');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');

    const toggleCart = () => {
        sideCart.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if(cartLink) cartLink.addEventListener('click', (e) => { e.preventDefault(); toggleCart(); });
    if(closeCart) closeCart.addEventListener('click', toggleCart);
    if(overlay) overlay.addEventListener('click', toggleCart);


    const updateCartUI = () => {
        cartItemsContainer.innerHTML = ''; 
        let total = 0;
        let totalItems = 0;

        if (basket.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg" style="text-align:center; color:#888; margin-top:20px;">Sepetiniz henüz boş.</p>';
        } else {
            basket.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #eee;";
                
                itemDiv.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:5px;">
                        <span style="font-weight:600;">${item.name}</span>
                        <span style="color:var(--gold); font-size:0.85rem;">${item.price} TL</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <button onclick="changeQty(${index}, -1)" style="padding:2px 8px; cursor:pointer; background:#eee; border:none; border-radius:3px;">-</button>
                        <span style="font-weight:700;">${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)" style="padding:2px 8px; cursor:pointer; background:#eee; border:none; border-radius:3px;">+</button>
                        <button onclick="removeItem(${index})" style="margin-left:10px; background:none; border:none; color:red; cursor:pointer; font-size:1.2rem;">&times;</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemDiv);
                total += (item.price * item.qty);
                totalItems += item.qty;
            });
        }
        
        if(cartTotal) cartTotal.innerText = total;
        if(cartCountDisplay) cartCountDisplay.innerText = totalItems;
    };


    window.changeQty = (index, delta) => {
        basket[index].qty += delta;
        if (basket[index].qty < 1) {
            removeItem(index);
        } else {
            updateCartUI();
        }
    };

    window.removeItem = (index) => {
        basket.splice(index, 1);
        updateCartUI();
    };


    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));

            // Eğer ürün zaten sepette varsa miktarını artır
            const existingItem = basket.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                basket.push({ name, price, qty: 1 });
            }
            
            updateCartUI();
            if(!sideCart.classList.contains('active')) toggleCart();
        });
    });

    const revealElements = document.querySelectorAll('.card_1, .card_2, .card_3, .cardProducts, .mid_hakkımızda, .content_us');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
    });
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    document.querySelectorAll('.cardProducts').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
});