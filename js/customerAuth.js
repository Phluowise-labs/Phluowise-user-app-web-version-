// Customer Authentication Helper
// This file provides utilities for customer authentication across the app

// Check if customer is logged in
async function isCustomerLoggedIn() {
    try {
        const user = await account.get();
        const customerData = await databases.listDocuments(
            appwriteConfig.DATABASE_ID,
            appwriteConfig.CUSTOMER_TABLE,
            [Query.equal('uid', user.$id)]
        );
        return customerData.documents.length > 0;
    } catch (error) {
        return false;
    }
}

// Protect customer routes - redirect to signin if not logged in
async function protectCustomerRoute() {
    const loggedIn = await isCustomerLoggedIn();
    if (!loggedIn) {
        window.location.href = 'signin.html';
        return false;
    }
    return true;
}

// Get customer display name
function getCustomerDisplayName() {
    const customerData = getCurrentCustomer();
    return customerData ? customerData.name : 'Customer';
}

// Display customer info in UI
function displayCustomerInfo(elementId) {
    const customerData = getCurrentCustomer();
    const element = document.getElementById(elementId);
    
    if (element && customerData) {
        element.textContent = customerData.name || customerData.email;
    }
}

// Initialize customer authentication on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Add customer authentication to protected pages
    const protectedPages = ['profile.html', 'home.html', 'schedule.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        await protectCustomerRoute();
    }
    
    // Display customer info in elements with class 'customer-name'
    const customerNameElements = document.querySelectorAll('.customer-name');
    customerNameElements.forEach(element => {
        displayCustomerInfo(element.id || 'customer-' + Math.random());
    });
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isCustomerLoggedIn,
        protectCustomerRoute,
        getCustomerDisplayName,
        displayCustomerInfo,
        getCurrentCustomer
    };
}
