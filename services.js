const megData = [
    { category: "Meg", name: "Bokaap", description: "Gheema steak, coriander & green pepper", prices: { MINI: 255, MEG: 305 }, notes: "All megs have nachos", visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Parkwood", description: "Smokey BBQ steak & Avo", prices: { MINI: 255, MEG: 305 }, notes: "Avo seasonal", visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Wynberg", description: "Pepper steak, mushrooms, red onion & green pepper", prices: { MINI: 255, MEG: 305 }, visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Manenberg", description: "Spicy steak, kaapse beans, peppers, chillies & nachos", prices: { MINI: 255, MEG: 305 }, visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Newlands", description: "Caramelized BBQ steak, mushrooms, feta & rocket", prices: { MINI: 255, MEG: 305 }, notes: "New", visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Rondebosch&nbsp;East", description: "Pastrami, salami, pineapple, green pepper & avo", prices: { MINI: 255, MEG: 305 }, notes: "Avo seasonal", visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Southfield", description: "Pepperoni Mozzarella Cheese on Napolitana base", prices: { MINI: 255, MEG: 305 }, visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Lavender&nbsp;Hill", description: "Ground beef, jalapeño, fresh chillies and pepperdews", prices: { MINI: 255, MEG: 305 }, notes: "New", visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Chilli&nbsp;Blaster", description: "Mushrooms, peri-pineapple, chillies & pepperdews", prices: { MEG: 140 }, visuals: "img/the-meg.jpg" },
    { category: "Meg", name: "Heathfield", description: "Butternut, mushroom, baby marrow, caramelized onion & pepperdews", prices: { MEG: 140 }, visuals: "img/the-meg.jpg" },
];

const menuData = [
    { category: "Steak", name: "Bokaap", description: "Gheema steak, coriander & green pepper", prices: { S: 130, M: 150, L:  180 }, notes:  "All megs have nachos", visuals:  "img/pizza_bokaap.webp" },
    { category: "Steak", name: "Parkwood", description:  "Smokey BBQ steak & Avo", prices:  { S:  150, M:  180, L:  220 }, notes:  "Avo seasonal", visuals:  "img/pizza_parkwood.webp" },
    { category: "Steak", name: "Wynberg", description:  "Pepper steak, mushrooms, red onion & green pepper", prices:  { S:  130, M:  150, L:  180 }, visuals:  "img/pizza_wynberg.webp" },
    { category: "Steak", name: "Manenberg", description: "Spicy steak, kaapse beans, peppers, chillies & nachos", prices: { S: 150, M: 180, L: 220 }, visuals: "img/pizza_manenberg.webp" },
    { category: "Steak", name: "Newlands", description: "Caramelized BBQ steak, mushrooms, feta & rocket", prices: { S: 150, M: 180, L: 220 }, notes: "New", visuals: "img/pizza_newlands.webp" },

    { category: "Chicken", name: "Plumstead", description: "BBQ chicken, feta & red onion", prices: { S: 110, M: 130, L: 170 }, visuals: "img/pizza_plumstead.webp" },
    { category: "Chicken", name: "Rylands", description: "Spicy chicken, peri-pineapple, & coriander", prices: { S: 110, M: 130, L: 170 }, visuals: "img/pizza_rylands.webp" },
    { category: "Chicken", name: "Moezna", description: "Recco chicken, mushrooms, red onion & peppers", prices: { S: 110, M: 130, L: 170 }, visuals: "img/pizza_moezna.webp" },

    { category: "Meat", name: "Rondebosch&nbsp;East", description: "Pastrami, salami, pineapple, green pepper & avo", prices: { S: 150, M: 180, L: 220 }, notes: "Avo seasonal", visuals: "img/pizza_rondebosch_east.webp" },
    { category: "Meat", name: "Mitchells&nbsp;Plain", description: "Smokey BBQ sausage, banana, caramelized onion, rocket & balsamic glaze", prices: { S: 190, M: 235, L: 275 }, visuals: "img/pizza_mitchells_plain.webp" },
    { category: "Meat", name: "Ottery", description: "Salami, char-grilled beef patty, home-made jalapeño sauce, pineapple, caramelized onion & fresh coriander", prices: { S: 180, M: 220, L: 275 }, visuals: "img/pizza_ottery.webp" },
    { category: "Meat", name: "Southfield", description: "Pepperoni Mozzarella Cheese on Napolitana base", prices: { S: 150, M: 180, L: 220 }, visuals:  "img/pizza_southfield.webp" },
    { category: "Meat", name: "Lavender&nbsp;Hill", description: "Ground beef, jalapeño, fresh chillies and pepperdews", prices: { S: 150, M: 180, L: 220 }, notes: "New", visuals: "img/pizza_lavender_hill.webp" },

    { category: "Seafood", name: "Kalk Bay", description: "Braai snoek, prawns, mixed peppers, onions & pepperdews", prices: { L: 220 }, notes: "Seasonal", visuals: "img/pizza_kalkbay.webp" },
    { category: "Seafood", name: "Hout Bay", description: "Braai snoek, onions, peri-pineapple, chillies, yoghurt sauce, peppadews & 3 cheeses", prices: { L: 200 }, notes: "Seasonal", visuals: "img/pizza_hout_bay.webp" },
    { category: "Seafood", name: "Saldanha Bay", description: "Creamy lemon butter mussels with tikka prawns on a cream cheese truffle garlic and herb base, red onion, green pepper, mushrooms", prices: { L: 240 }, notes: "Seasonal", visuals: "img/pizza_saldanha_bay.webp" },

    { category: "Gourmet", name: "Claremont", description: "Deboned ribs, butternut, baby marrow, red onion, mushrooms, feta, cream cheese & peppadews", prices: { L: 220 }, visuals: "img/pizza_claremont.webp" },
    { category: "Gourmet", name: "Hanover&nbsp;Park", description: "Flame grilled chicken in Manies Secret sauce, coriander & avo", prices: { L: 220 }, notes: "Avo seasonal", visuals: "img/pizza_hanover_park.webp" },
    { category: "Gourmet", name: "District&nbsp;Six", description: "Grilled chops, mushroom, red onion & feta topped with Manies Secret sauce", prices: { L: 220 }, visuals: "img/pizza_districtsix.webp" },
    { category: "Gourmet", name: "Waterfront", description: "Crayfish, prawns, pineapple, pepperdews & olives", prices: { L: 270 }, notes: "Seasonal", visuals: "img/pizza_waterfront.webp" },

    { category: "Vegetarian", name: "Cheesy&nbsp;Trio", description: "Feta, mozzarella & cheddar", prices: { S: 85, M: 90, L: 110 }, visuals: "img/pizza_cheesy_trio.webp" },
    { category: "Vegetarian", name: "Garlic&nbsp;Chita", description: "Garlic base, mozzarella & seasoning", prices: { S: 75, M: 90, L: 110 }, visuals: "img/pizza_garlic_chita_slice.webp" },
    { category: "Vegetarian", name: "Margherita", description: "Napolitano base, mozzarella & seasoning", prices: { S: 75, M: 90, L: 110 }, visuals: "img/pizza_margherita.webp" },
    { category: "Vegetarian", name: "Chilli&nbsp;Blaster", description: "Mushrooms, peri-pineapple, chillies & pepperdews", prices: { M: 120, L: 160 }, visuals: "img/pizza_chilli_blaster.webp" },
    { category: "Vegetarian", name: "Heathfield", description: "Butternut, mushroom, baby marrow, caramelized onion & pepperdews", prices: { M: 120, L: 160 }, visuals: "img/pizza_heathfield.webp" },

    { category: "Burgers", name: "Wagyu&nbsp;Beef", description: "Wagyu beef patty, garnish, cheese, and fries with choice of sauce", prices: { Double: 120 }, visuals: "img/burger_wagyu_chips.webp" },
    { category: "Burgers", name: "Chicken", description: "Grilled chicken fillet, garnish, cheese, and fries with choice of sauce", prices: { Single: 79, Double: 99 }, visuals: "img/burger_chicken_chips.webp" },
    { category: "Burgers", name: "Beef", description: "Beef patty, garnish, cheese, and fries with choice of sauce", prices: { Single: 79, Double: 99 }, visuals: "img/burger_beef_chips.webp" },

    { category: "Pastas", name: "Durbanville", description: "Recco linguine / penne pasta with chicken & mushroom", prices: { L: 165 }, visuals: "img/pasta_durbanville_1.webp" },
    { category: "Pastas", name: "Plattekloof", description: "Linguini pasta chicken salami sausage mushrooms & parmesan cheese", prices: { L: 185 }, visuals: "img/pasta_plattekloof.webp" },
    { category: "Pastas", name: "Table View", description: "Chopped baby tomatoes mushrooms basil & Mozzarella cheese", prices: { L: 125 }, visuals: "img/pasta_table_view.webp" },
    { category: "Pastas", name: "Blouberg", description: "Linguini pasta prawns cherry tomatoes & rockets", prices: { L: 155 }, visuals: "img/pasta_blouberg.webp" },

    // { category: "Grills", name: "Boerewors", description: "2 pieces of Dhanya Sausage served with cheese sauce", prices: { L: 120 }, visuals: "img/grills_boere_wors.webp" },
    { category: "Grills", name: "Chicken Kebabs", description: "Chicken kebab with choice of Lemon herb smokey BBQ Peri-Peri or Tikka", prices: { L: 125 }, visuals: "img/grills_chicken_kebabs.webp" },
    { category: "Grills", name: "Ribs", description: "Full or Half portion with choice of mushroom or cheese sauce", prices: { L: 185, XL: 285 }, visuals: "img/grills_ribs_2.webp" },
    { category: "Grills", name: "Chicken Wings", description: "Five whole chicken wings with choice of Lemon herb smokey BBQ Peri-Peri or Tikka", prices: { L: 110 }, visuals: "img/grills_chicken_wings.webp" },
    // { category: "Grills", name: "Manierito", description: "Flamed Grilled chicken or Fried Beef egg hot chips and cheese sauce", prices: { L: 99 }, visuals: "img/placeholder.jpg" },
    // { category: "Grills", name: "Half Tikka Chicken", description: "Half portion with choice of mushroom or cheese sauce", prices: { L: 145 }, visuals: "img/placeholder.jpg" },

    { category: "Milkshakes", name: "Chocolate", description: "Classic double thick milkshake", prices: { Regular: 45, Large: 55 }, visuals: "img/shake-chocolate.webp" },
    { category: "Milkshakes", name: "Strawberry", description: "Classic double thick milkshake", prices: { Regular: 45, Large: 55 }, visuals: "img/shake_strawberry.webp" },
    { category: "Milkshakes", name: "Vanilla", description: "Classic double thick milkshake", prices: { Regular: 45, Large: 55 }, visuals: "img/shake_all_flavours.webp" },
    { category: "Milkshakes", name: "Oreo", description: "Classic double thick milkshake", prices: { Regular: 45, Large: 55 }, visuals: "img/shake_all_flavours.webp" },

    { category: "Desserts", name: "Woodfired&nbsp;Waffle", description: "Freshly baked wood-fired waffle topped with ice cream and sauce", prices: { Regular: 55 }, visuals: "img/waffles_1.webp" },
    { category: "Desserts", name: "Woodfired&nbsp;Waffle Cup", description: "Warm wood-fired waffle cubes, ice cream & choice of sauce", prices: { Regular: 55 }, visuals: "img/waffles_banner.webp" },
    { category: "Desserts", name: "Oreo Ice Cream Pudding", description: "Chocolate cake, ice cream, sauce, whipped cream &amp; candy toppings - 350ml", prices: { Regular: 55 }, visuals: "img/cup_chocolate.webp" },
    { category: "Desserts", name: "Strawberry Ice Cream Pudding", description: "Mint cake, ice cream, sauce, whipped cream &amp; candy toppings - 350ml", prices: { Regular: 55 }, visuals: "img/cup_marshmallow.webp" },
    { category: "Desserts", name: "Peppermint Ice Cream Pudding", description: "Vanilla cake, ice cream, sauce, whipped cream &amp; candy toppings - 350ml", prices: { Regular: 55 }, visuals: "img/cup_mint.webp" },

];

let cart = [];
let currentCategory = null;
let cartVisible = false;
let scrollListenerAttached = false;

function getCategories() {
    const cats = [...new Set(menuData.map(item => item.category))];
    if (megData.length > 0) cats.unshift("Meg");
    return cats;
}

function renderCategories() {
    const container = document.getElementById('categories');
    const stickyContainer = document.getElementById('sticky-categories');
    const categories = getCategories();

    const categoryHTML = categories.map(category =>
        `<button class="category-btn" data-category="${category}" onclick="showCategory('${category}')">${category}</button>`
    ).join('');

    if (container) container.innerHTML = categoryHTML;
    if (stickyContainer) stickyContainer.innerHTML = categoryHTML;
}

function centerActiveButton(activeButton, container) {
    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const scrollOffset = buttonCenter - containerCenter;

    container.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
    });
}

function scrollToOptimalPosition() {
    const stickyHeader = document.getElementById('sticky-header');
    if (!stickyHeader) return;
    const isSticky = stickyHeader.classList.contains('visible');

    if (isSticky) {
        window.scrollTo({
            behavior: 'smooth',
            top: 222
        });
    }
}

function showCategory(category) {
    currentCategory = category;

    const servicesEl = document.getElementById('services');
    if (servicesEl) servicesEl.dataset.category = category;

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');

            const regularContainer = btn.closest('.categories');
            const stickyContainer = btn.closest('.sticky-categories');

            if (regularContainer) centerActiveButton(btn, regularContainer);
            if (stickyContainer) centerActiveButton(btn, stickyContainer);
        }
    });

    const container = document.getElementById('items-container');
    const dataSource = category === "Meg" ? megData : menuData;
    const items = dataSource.filter(item => item.category === category);

    if (container) {
        container.innerHTML = `
            <div class="items active">
                ${items.map(item => renderItem(item)).join('')}
            </div>
        `;
    }

    const servicesView = document.getElementById('services');
    if (servicesView) servicesView.scrollTop = 0;

    setTimeout(() => scrollToOptimalPosition(), 100);
}


function getSizeClass(size) {
    if (size === 'S') return 'pizza-s';
    if (size === 'M') return 'pizza-m';
    if (size === 'L') return 'pizza-l';
    if (size === 'MINI') return 'bread-mini';
    if (size === 'MEG') return 'bread-meg';
    return 'size-standard';
}

function renderItem(item) {
    const prices = Object.entries(item.prices).map(([size, price]) => {
        const sizeClass = getSizeClass(size);
        const isVisualSize = ['pizza-s', 'pizza-m', 'pizza-l', 'bread-mini', 'bread-meg'].includes(sizeClass);

        if (isVisualSize) {
            return `<button class="price-btn ${sizeClass}" onclick="selectPrice(this, '${item.name}', '${size}', ${price})">
                <div>
                    <span class="size-label">${size}</span>
                    <span class="price-label">${price}</span>
                </div>
            </button>`;
        } else {
            return `<button class="price-btn ${sizeClass}" onclick="selectPrice(this, '${item.name}', '${size}', ${price})">${size} ${price}</button>`;
        }
    }).join('');

    return `
        <div class="item" data-category="${item.category}" style="background-image: url('${item.visuals || ''}'); background-size: cover; background-position: center;">
            <div class="item-name">${item.name}</div>
            <div class="item-desc"><span class="highlight">${item.description}</span></div>
            ${item.notes ? `<div class="notes">${item.notes}</div>` : ''}
            <div class="item-prices">${prices}</div>
            <div class="add-btn" onclick="addToCart('${item.name}', this.parentElement)" style="display: none;"><img src="img/add.svg" alt="Add to cart" class="add-icon" width="24" height="24" /></div>
            <svg class="price-connector"><path class="connector-path-bg" d=""/><path class="connector-path" d=""/></svg>
        </div>  
    `;
}

function selectPrice(button, itemName, size, price) {
    const item = button.closest('.item');
    item.querySelectorAll('.price-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    item.querySelector('.add-btn').style.display = 'block';
    requestAnimationFrame(() => updateConnectors());
    item.querySelector('.add-btn').setAttribute('data-item', itemName);
    item.querySelector('.add-btn').setAttribute('data-size', size);
    item.querySelector('.add-btn').setAttribute('data-price', price);
}

function toggleCart() {
    const cart = document.getElementById('cart');
    const cartStore = document.querySelector('.cart-store');
    const cartBottom = document.getElementById('cart-bottom');

    cartVisible = !cartVisible;

    if (cartVisible) {
        cart.classList.add('show-items');
        cartStore.style.display = 'flex';
        cartBottom.style.display = 'flex';
    } else {
        cart.classList.remove('show-items');    
        cartStore.style.display = 'none';
        cartBottom.style.display = 'none';
    }
}

function showAddedFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'cart-added-feedback';
    feedback.textContent = 'Added to cart!';
    document.body.appendChild(feedback);

    setTimeout(() => feedback.classList.add('show'), 100);
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 1500);
}

function isGrassyParkSelected() {
    const selectedStore = document.querySelector('input[name="store"]:checked');
    return !!selectedStore && selectedStore.id === 'store1';
}

function showGrillBlockedFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'cart-added-feedback';
    feedback.style.background = '#e74c3c';
    feedback.textContent = message || 'Grills only available at Grassy Park';
    document.body.appendChild(feedback);

    setTimeout(() => feedback.classList.add('show'), 100);
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

function addToCart(itemName, itemElement) {
    const isGrill = itemElement.dataset.category === 'Grills';
    if (isGrill && !isGrassyParkSelected()) {
        showGrillBlockedFeedback();
        return;
    }

    const size = itemElement.querySelector('.add-btn').getAttribute('data-size');
    const price = parseInt(itemElement.querySelector('.add-btn').getAttribute('data-price'));

    const existing = cart.find(i => i.name === itemName && i.size === size);
    if (existing) {
        existing.count = (existing.count || 1) + 1;
    } else {
        cart.push({ name: itemName, size: size, price: price, count: 1, isGrill: isGrill });
    }

    updateCart();
    showAddedFeedback();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartBottom = document.getElementById('cart-bottom');
    const cartStore = document.querySelector('.cart-store');

    if (cart.length === 0) {
        if (cartElement) cartElement.classList.remove('has-items');
        if (cartItems) cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        if (cartBottom) cartBottom.style.display = 'none';
        cartVisible = false;
        cartStore.style.display = 'none';
        return;
    }

    if (cartElement) {
        cartElement.classList.add('has-items');
        cartElement.classList.add('show-items');
        cartStore.style.display = 'block';
        cartVisible = true;
    }

    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + (item.count || 1), 0);

    const total = cart.reduce((sum, item) => sum + item.price * (item.count || 1), 0);

    if (cartItems) {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${item.name} (${item.size}) x${item.count || 1}</span>
                <span>R${item.price * (item.count || 1)} <button onclick="removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; border-radius: 20px; padding: 2px 6px; margin-left: 10px; cursor: pointer;">×</button></span>
            </div>
        `).join('');
    }

    if (cartTotal) document.getElementById('total-amount').textContent = total;

    if (cartBottom && cart.length > 0) {
        cartBottom.style.display = 'flex';
    } else if (cartBottom) {
        cartBottom.style.display = 'none';
    }
}

function removeFromCart(index) {
    cart[index].count--;
    if (cart[index].count <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    if (cart.some(item => item.isGrill) && !isGrassyParkSelected()) {
        showGrillBlockedFeedback();
        return;
    }

    const orderItems = cart.map(item => `${item.name} (${item.size}) x${item.count || 1} - R${item.price * (item.count || 1)}`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * (item.count || 1), 0);

    const selectedStore = document.querySelector('input[name="store"]:checked');
    const storePhone = selectedStore.value;
    const storeName = selectedStore.nextElementSibling.textContent;

    const message = `Hi Manies Pizza! I'd like to place an order for *${storeName}*:\n\n${orderItems}\n\nTotal: R${total}\n\nFor delivery add an address or share your location with us. For pick-up just bring a smile!`;

    const whatsappUrl = `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function updateConnectors() {
    document.querySelectorAll('.item').forEach(item => {
        const selected = item.querySelector('.price-btn.selected');
        const addBtn = item.querySelector('.add-btn');
        const svg = item.querySelector('.price-connector');
        if (!svg || !selected || !addBtn || addBtn.style.display === 'none') return;

        const r = item.getBoundingClientRect();
        const px = selected.getBoundingClientRect();
        const ax = addBtn.getBoundingClientRect();

        const x1 = px.left + px.width / 2 - r.left;
        const y1 = px.bottom - r.top;
        const x2 = ax.left + ax.width / 2 - r.left;
        const y2 = ax.top - r.top;

        const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
        svg.querySelector('.connector-path-bg').setAttribute('d', d);
        svg.querySelector('.connector-path').setAttribute('d', d);
    });
}

function handleStickyScroll() {
    const stickyHeader = document.getElementById('sticky-header');
    const menuSection = document.getElementById('menu-section');
    const servicesView = document.getElementById('services');
    
    if (!stickyHeader || !menuSection || !servicesView) return;

    if (servicesView.style.display === 'none') return;

    const scrollTop = servicesView.scrollTop;

    if (scrollTop > 200) {
        stickyHeader.classList.add('visible');
        menuSection.classList.add('sticky-active');
    } else {
        stickyHeader.classList.remove('visible');
        menuSection.classList.remove('sticky-active');
    }

    // handleCategoriesScrollEnd(); // ADD THIS LINE
}

function initServices() {
    if (document.getElementById('categories')) {
        renderCategories();
        currentCategory = "Meg";
        showCategory(currentCategory);
        
        // Attach scroll listener to the services view, not window
        const servicesView = document.getElementById('services');
        if (servicesView && !scrollListenerAttached) {
            servicesView.addEventListener('scroll', handleStickyScroll);
            scrollListenerAttached = true;
        }
        
        window.addEventListener('resize', updateConnectors);
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', sendWhatsAppOrder);
        }
    }
}

function destroyServices() {
    if (scrollListenerAttached) {
        const servicesView = document.getElementById('services');
        if (servicesView) {
            servicesView.removeEventListener('scroll', handleStickyScroll);
        }
        scrollListenerAttached = false;
    }
}

function initMenu() {
    var menuEl = document.querySelector('#menu .mn-menu');
    if (!menuEl) return;

    menuEl.addEventListener('click', function(e) {
        var cell = e.target.closest('.mn-price-cell');
        if (!cell || cell.classList.contains('mn-empty')) return;

        var isGrill = !!cell.closest('#grills');
        if (isGrill && !isGrassyParkSelected()) {
            showGrillBlockedFeedback();
            return;
        }

        var price = parseInt(cell.textContent.trim());
        if (isNaN(price)) return;

        var item = cell.closest('.mn-item');
        var name = item.querySelector('.mn-item-name').textContent.trim();

        var prices = Array.from(cell.parentElement.querySelectorAll('.mn-price-cell'));
        var colIndex = prices.indexOf(cell);
        var legend = cell.closest('.mn-section').querySelectorAll('.mn-size-legend span');
        var size = legend[colIndex] ? legend[colIndex].textContent.trim() : 'One size';

        var existing = cart.find(function(i) { return i.name === name && i.size === size; });
        if (existing) {
            existing.count = (existing.count || 1) + 1;
        } else {
            cart.push({ name: name, size: size, price: price, count: 1, isGrill: isGrill });
        }

        updateCart();
        showAddedFeedback();

        cell.style.transition = 'color 0.15s';
        cell.style.color = '#c0392b';
        setTimeout(function() { cell.style.color = ''; }, 600);
    });
}

function handleStoreChange() {
    if (isGrassyParkSelected() || !cart.some(item => item.isGrill)) return;

    for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i].isGrill) cart.splice(i, 1);
    }

    updateCart();
    showGrillBlockedFeedback('Grill removed — only available at Grassy Park');
}

document.querySelectorAll('input[name="store"]').forEach(function (radio) {
    radio.addEventListener('change', handleStoreChange);
});