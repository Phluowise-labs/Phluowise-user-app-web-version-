// Schedule History Notification System
// Prevent redeclaration
if (typeof window.ScheduleNotificationManager !== 'undefined') {
    console.log('🔔 Notification system already loaded, skipping initialization...');
} else {

class ScheduleNotificationManager {
    constructor() {
        this.orders = [];
        this.notificationContainers = []; // Support multiple containers
        this.init();
    }

    init() {
        console.log('🚀 Initializing notification manager...');
        // Load orders from localStorage
        this.loadOrders();
        
        // Initialize notification container when DOM is ready
        if (document.readyState === 'loading') {
            console.log('📄 DOM still loading, waiting for DOMContentLoaded...');
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOMContentLoaded fired, setting up notifications...');
                this.setupNotifications();
            });
        } else {
            console.log('📄 DOM already loaded, setting up notifications immediately...');
            this.setupNotifications();
        }
        
        // Listen for storage changes (cross-tab synchronization)
        window.addEventListener('storage', (e) => {
            console.log('🔄 Storage event detected:', e.key);
            if (e.key === 'phluowiseOrders') {
                console.log('📦 Orders updated in storage, reloading...');
                this.loadOrders();
                this.updateNotifications();
            }
        });
        
        // Check for order updates periodically
        setInterval(() => {
            console.log('⏰ Periodic check for order updates...');
            this.loadOrders();
            this.updateNotifications();
        }, 2000);
        
        console.log('✅ Notification manager initialization complete');
    }

    loadOrders() {
        console.log('📥 Loading orders from localStorage...');
        try {
            const savedOrders = localStorage.getItem('phluowiseOrders');
            console.log('📦 Raw localStorage data:', savedOrders);
            
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
                console.log('✅ Successfully parsed orders:', this.orders.length, 'orders loaded');
                console.log('📋 Order details:', this.orders.map(o => ({
                    id: o.orderId,
                    company: o.company,
                    status: o.status,
                    statusText: o.statusText
                })));
            } else {
                console.log('⚠️ No orders found in localStorage');
                this.orders = [];
            }
        } catch (error) {
            console.error('❌ Error loading orders:', error);
            this.orders = [];
        }
    }

    setupNotifications() {
        console.log('🔧 Setting up notifications...');
        
        // Clear existing containers
        this.notificationContainers = [];
        
        // Debug: Show ALL links on the page
        const allLinks = document.querySelectorAll('a');
        console.log('🔍 Total links found on page:', allLinks.length);
        
        // Show all links that contain "schedule" in any form
        const scheduleLinks = Array.from(allLinks).filter(link => 
            link.href.includes('schedule') || 
            link.textContent.toLowerCase().includes('schedule')
        );
        console.log('🔍 Schedule-related links found:', scheduleLinks.length);
        scheduleLinks.forEach((link, index) => {
            console.log(`  Link ${index}: href="${link.href}" text="${link.textContent.trim()}"`);
        });
        
        // Find ALL schedule history links (both menu and bottom navigation)
        const selectors = [
            'a[href="schedule-history.html"]', // Direct match
            '.tab-bar a[href*="schedule-history"]', // Bottom navigation specific
            'a[href*="schedule-history"]', // Contains schedule-history
            'a[href="./schedule-history.html"]', // Relative path
            'a[href="../schedule-history.html"]', // Parent relative path
            'a[href*="schedule"]' // Last resort: any schedule link
        ];
        
        const allScheduleLinks = new Set(); // Use Set to avoid duplicates
        
        for (const selector of selectors) {
            const links = document.querySelectorAll(selector);
            console.log(`🔍 Trying selector "${selector}": found ${links.length} links`);
            
            links.forEach(link => {
                allScheduleLinks.add(link);
            });
        }
        
        console.log(`🔍 Total unique schedule links found: ${allScheduleLinks.size}`);
        
        // Setup notification containers for all found links
        let containerIndex = 0;
        allScheduleLinks.forEach(link => {
            const location = link.closest('.tab-bar') ? 'Bottom Navigation' : 
                           link.closest('.sliding-menu') ? 'Menu' : 'Other';
            
            console.log(`🔍 Setting up container ${containerIndex} for: ${location}`);
            console.log(`🔍 Link href: ${link.href}`);
            console.log(`🔍 Link text: ${link.textContent.trim()}`);
            
            // Wrap the SVG in a notification container
            const svg = link.querySelector('svg');
            console.log(`🔍 SVG found: ${!!svg}`);
            
            if (svg && !svg.parentElement.classList.contains('nav-notification-container')) {
                const container = document.createElement('div');
                container.className = 'nav-notification-container';
                container.setAttribute('data-location', location);
                svg.parentNode.insertBefore(container, svg);
                container.appendChild(svg);
                this.notificationContainers.push(container);
                console.log(`✅ Created notification container for ${location}`);
            } else if (svg && svg.parentElement.classList.contains('nav-notification-container')) {
                const existingContainer = svg.parentElement;
                existingContainer.setAttribute('data-location', location);
                this.notificationContainers.push(existingContainer);
                console.log(`✅ Using existing notification container for ${location}`);
            } else {
                console.log(`❌ No SVG found for ${location} link`);
            }
            
            containerIndex++;
        });
        
        console.log(`🔔 Total notification containers setup: ${this.notificationContainers.length}`);
        
        // Initial notification update
        console.log('🚀 Running initial notification update...');
        this.updateNotifications();
    }

    getOrderStatusCounts() {
        const counts = {
            pending: 0,
            accepted: 0,
            completed: 0
        };

        this.orders.forEach(order => {
            const status = (order.status || '').toLowerCase();
            if (counts.hasOwnProperty(status)) {
                counts[status]++;
            }
        });

        console.log('📊 Order Status Counts:', {
            totalOrders: this.orders.length,
            pending: counts.pending,
            accepted: counts.accepted,
            completed: counts.completed,
            orders: this.orders.map(o => ({ id: o.orderId, status: o.status }))
        });

        return counts;
    }

    updateNotifications() {
        console.log('🔄 Starting notification update...');
        console.log('🔍 Current notification containers:', this.notificationContainers.length);
        
        if (this.notificationContainers.length === 0) {
            console.log('⚠️ No notification containers found, setting up...');
            this.setupNotifications();
            return;
        }

        // Remove existing notifications from all containers
        this.notificationContainers.forEach((container, index) => {
            const existingNotifications = container.querySelectorAll('.nav-notification-dot, .nav-notification-multiple');
            console.log(`🧹 Container ${index} (${container.getAttribute('data-location')}): Found ${existingNotifications.length} existing notifications to remove`);
            existingNotifications.forEach(notification => notification.remove());
        });
        console.log('🧹 Cleared existing notifications from all containers');

        const counts = this.getOrderStatusCounts();
        
        // Determine which notifications to show
        const notificationsToShow = [];
        
        console.log('🎯 Determining notifications to show...');
        console.log('📋 Counts:', counts);
        
        if (counts.pending > 0) {
            notificationsToShow.push('pending');
            console.log('✅ Added pending notification (Yellow dot)');
        }
        if (counts.accepted > 0) {
            notificationsToShow.push('accepted');
            console.log('✅ Added accepted notification (Green dot)');
        }
        if (counts.completed > 0 && counts.pending === 0 && counts.accepted === 0) {
            notificationsToShow.push('completed');
            console.log('✅ Added completed notification (Grey dot)');
        }

        console.log('🎨 Final notifications to show:', notificationsToShow);

        // Create notification elements for all containers
        if (notificationsToShow.length === 0) {
            console.log('❌ No notifications to display');
            return;
        }

        // Add notifications to all containers
        this.notificationContainers.forEach((container, index) => {
            const location = container.getAttribute('data-location');
            console.log(`🎨 Adding notifications to container ${index} (${location})`);
            
            if (notificationsToShow.length === 1) {
                const dot = document.createElement('div');
                dot.className = `nav-notification-dot ${notificationsToShow[0]} new`;
                container.appendChild(dot);
                console.log(`🟡 Created single ${notificationsToShow[0]} notification for ${location}`);
                console.log(`🔍 Container ${index} children count:`, container.children.length);
            } else {
                const multipleContainer = document.createElement('div');
                multipleContainer.className = 'nav-notification-multiple';
                
                notificationsToShow.forEach(status => {
                    const dot = document.createElement('div');
                    dot.className = `nav-notification-dot ${status} new`;
                    multipleContainer.appendChild(dot);
                    console.log(`🟢 Created ${status} notification in multiple container for ${location}`);
                });
                
                container.appendChild(multipleContainer);
                console.log(`🔵 Created multiple notifications container for ${location}`);
                console.log(`🔍 Container ${index} children count:`, container.children.length);
            }
        });

        // Final verification for all containers
        console.log('🔍 Final DOM verification:');
        this.notificationContainers.forEach((container, index) => {
            const location = container.getAttribute('data-location');
            console.log(`🔍 Container ${index} (${location}):`);
            console.log(`  - Exists: ${!!container}`);
            console.log(`  - Children: ${container.children.length}`);
            console.log(`  - InnerHTML: ${container.innerHTML.substring(0, 100)}...`);
        });

        console.log('🔔 Notifications updated:', {
            counts,
            notificationsToShow,
            containersUpdated: this.notificationContainers.length,
            expectedBehavior: this.getExpectedBehavior(counts)
        });
    }

    getExpectedBehavior(counts) {
        if (counts.pending > 0 && counts.accepted > 0) {
            return 'Both yellow and green dots should appear';
        } else if (counts.pending > 0) {
            return 'Yellow dot should appear';
        } else if (counts.accepted > 0) {
            return 'Green dot should appear';
        } else if (counts.completed > 0 && counts.pending === 0 && counts.accepted === 0) {
            return 'Grey dot should appear';
        } else {
            return 'No notification dot should appear';
        }
    }

    // Method to manually trigger notification update (for testing)
    forceUpdate() {
        this.loadOrders();
        this.updateNotifications();
    }

    // Method to add test orders (for development)
    addTestOrder(status = 'pending') {
        const testOrder = {
            orderId: 'TEST' + Date.now(),
            company: 'Test Company',
            location: 'Test Location',
            payment: 'Test Payment',
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            price: 'GH₵25.00',
            quantity: 1,
            subtotal: 20.00,
            serviceFee: 5.00,
            total: 25.00,
            status: status,
            statusText: status.charAt(0).toUpperCase() + status.slice(1),
            statusColor: status === 'pending' ? '#F2A78C' : status === 'accepted' ? '#2C9043' : '#2CAA48',
            product: 'Test Product',
            recipient: { name: 'Test User', phone: '0000000000', email: 'test@example.com' },
            timestamp: new Date().toISOString()
        };

        this.orders.push(testOrder);
        localStorage.setItem('phluowiseOrders', JSON.stringify(this.orders));
        this.updateNotifications();
    }
}

// Initialize the notification system
let notificationManager;

// Global function to access the notification manager
window.getNotificationManager = function() {
    if (!notificationManager) {
        notificationManager = new ScheduleNotificationManager();
    }
    return notificationManager;
};

// Auto-initialize when script loads
if (typeof window !== 'undefined' && typeof window.ScheduleNotificationManager === 'undefined') {
    notificationManager = new ScheduleNotificationManager();
}

// Close the guard block
}
