// Flow state management
let selectedProducts = [];
let deliveryInfo = {};
let selectedPaymentMethod = null;
let currentRating = 0;

// Initialize products for purchase step
function initializeProducts() {
    const container = document.getElementById('productCards');
    container.innerHTML = '';
    
    const products = [
        { price: 10, name: 'Sachets water', type: 'Description of product', image: '../public/images/main/ProductImage1.png' },
        { price: 20, name: 'Bottle water', type: 'Description of product', image: '../public/images/main/ProductImage1.png' },
        { price: 15, name: 'Dispenser', type: 'Description of product', image: '../public/images/main/ProductImage1.png' },
        { price: 12, name: 'Sachets water', type: 'Description of product', image: '../public/images/main/ProductImage1.png' }
    ];
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'flex flex-row gap-4 p-2';
        card.style.height = '300px';
        
        card.innerHTML = `
            <div class="flex flex-col h-full rounded-[10px] w-[80%]" style="background-color: var(--input-bg);">
                <div class="flex-1 p-4 flex flex-row gap-4 items-center" style="border-bottom: 1px solid #808080;">
                    <div class="rounded-[5px] border overflow-hidden" style="width: 65px; height: 67px; border-color: #333;">
                        <img src="${product.image}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-[#808080] text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap" style="max-width: 120px;">${product.name}</span>
                        <span class="text-[#F5F5F5B2] text-xl font-bold">500ml</span>
                    </div>
                </div>
                <div class="flex-1 p-4 flex flex-row" style="border-bottom: 1px solid #808080; border-top: 1px solid #808080;">
                    <div class="flex flex-col justify-center" style="width: 48%; height: 50px;">
                        <span class="text-[#F5F5F5B2] text-lg font-[500] leading-6">1 ${product.name} of</span>
                        <span class="text-[#F5F5F5B2] text-lg font-[500] leading-6">water</span>
                    </div>
                    <div class="flex flex-col justify-center gap-2 p-2" style="width: 48%; height: 50px;">
                        <span class="text-[#808080] text-lg font-[600] leading-6">Price:</span>
                        <span class="text-[#F5F5F5B2] text-lg font-[700] leading-6">GH₵ ${product.price}</span>
                    </div>
                </div>
                <div class="flex-1 p-4" style="border-top: 1px solid #808080;">
                    <div class="border w-full rounded-2xl flex flex-row items-center px-4 py-1.5" style="background-color: #292B2F; border-color: #40444B;">
                        <input type="number" id="quantity-${index}" placeholder="Enter number of purchase" min="0" value="0"
                            class="bg-transparent text-white text-xl w-full outline-none placeholder-[#FFFFFF99]"
                            onchange="updateProductQuantity(${index}, ${product.price}, '${product.name}')">
                    </div>
                </div>
            </div>
            <div class="rounded-[10px] flex items-center justify-center" style="width: 60px; background-color: var(--input-bg);">
                <div class="bg-[#2C9043] rounded-full relative" style="width: 40px; height: 24px;">
                    <div class="bg-white rounded-full absolute right-0 top-0 shadow-sm" style="width: 24px; height: 24px;"></div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    updateTotalPrice();
}

// Update product quantity and total price
function updateProductQuantity(index, price, name) {
    const quantityInput = document.getElementById(`quantity-${index}`);
    const quantity = parseInt(quantityInput.value) || 0;
    
    // Update selected products array
    const existingProduct = selectedProducts.find(p => p.name === name);
    if (existingProduct) {
        if (quantity > 0) {
            existingProduct.quantity = quantity;
            existingProduct.total = price * quantity;
        } else {
            selectedProducts = selectedProducts.filter(p => p.name !== name);
        }
    } else if (quantity > 0) {
        selectedProducts.push({
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        });
    }
    
    updateTotalPrice();
}

// Update total price display
function updateTotalPrice() {
    const total = selectedProducts.reduce((sum, product) => sum + product.total, 0);
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = `GH₵ ${total.toFixed(2)}`;
    }
}

// Update order review
function updateOrderReview() {
    const orderSummary = document.getElementById('orderSummary');
    const reviewTotal = document.getElementById('reviewTotal');
    const deliveryInfoDiv = document.getElementById('deliveryInfo');
    
    // Update order summary
    orderSummary.innerHTML = '';
    selectedProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center';
        item.innerHTML = `
            <span class="text-white">${product.name} x ${product.quantity}</span>
            <span class="text-white">GH₵ ${product.total.toFixed(2)}</span>
        `;
        orderSummary.appendChild(item);
    });
    
    // Update total
    const total = selectedProducts.reduce((sum, product) => sum + product.total, 0);
    reviewTotal.textContent = `GH₵ ${total.toFixed(2)}`;
    
    // Update delivery information
    deliveryInfo = {
        name: document.getElementById('recipientName')?.value || '',
        phone: document.getElementById('recipientPhone')?.value || '',
        address: document.getElementById('recipientAddress')?.value || '',
        instructions: document.getElementById('specialInstructions')?.value || ''
    };
    
    deliveryInfoDiv.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="text-gray-400">Name:</span>
            <span class="text-white">${deliveryInfo.name}</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-gray-400">Phone:</span>
            <span class="text-white">${deliveryInfo.phone}</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-gray-400">Address:</span>
            <span class="text-white">${deliveryInfo.address}</span>
        </div>
        ${deliveryInfo.instructions ? `
        <div class="flex justify-between items-center">
            <span class="text-gray-400">Instructions:</span>
            <span class="text-white">${deliveryInfo.instructions}</span>
        </div>
        ` : ''}
    `;
}

// Payment method selection
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Update radio buttons
    document.querySelectorAll('.payment-option').forEach(option => {
        const radio = option.querySelector('.payment-radio');
        if (option.dataset.payment === method) {
            radio.style.backgroundColor = '#3B74FF';
        } else {
            radio.style.backgroundColor = 'transparent';
        }
    });
}

// Go to payment details
function goToPaymentDetails() {
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Update payment details based on selected method
    const cashInfo = document.getElementById('cashPaymentInfo');
    const mobileInfo = document.getElementById('mobileMoneyInfo');
    const total = selectedProducts.reduce((sum, product) => sum + product.total, 0);
    
    if (selectedPaymentMethod === 'cash') {
        cashInfo.classList.remove('hidden');
        mobileInfo.classList.add('hidden');
        document.getElementById('cashTotal').textContent = `GH₵ ${total.toFixed(2)}`;
    } else {
        cashInfo.classList.add('hidden');
        mobileInfo.classList.remove('hidden');
        document.getElementById('mobileTotal').textContent = `GH₵ ${total.toFixed(2)}`;
    }
    
    goToStep('payment-details');
}

// Simulate payment processing
function simulatePaymentProcessing() {
    setTimeout(() => {
        goToStep('payment-success');
    }, 3000);
}

// Rating functions
function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-button');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-gray-400');
            star.classList.add('text-yellow-400');
        } else {
            star.classList.add('text-gray-400');
            star.classList.remove('text-yellow-400');
        }
    });
}
