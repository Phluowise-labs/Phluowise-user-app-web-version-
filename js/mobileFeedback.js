// Mobile UI Feedback System
// Provides toast notifications and loading states for better mobile UX

class MobileFeedback {
    constructor() {
        this.createToastContainer();
        this.createLoadingOverlay();
    }

    // Create toast container for notifications
    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    // Create loading overlay
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(6, 6, 6, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9998;
            backdrop-filter: blur(4px);
        `;
        
        overlay.innerHTML = `
            <div style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 24px;
                border-radius: 16px;
                text-align: center;
                min-width: 200px;
            ">
                <div class="spinner" style="
                    border: 3px solid rgba(255, 255, 255, 0.2);
                    border-top: 3px solid rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 16px;
                "></div>
                <p style="color: white; margin: 0; font-size: 16px;" id="loading-text">Loading...</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.appendChild(overlay);
    }

    // Show toast notification
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        const colors = {
            success: '#2C9043',
            error: '#FF3D00',
            warning: '#FFC107',
            info: '#007ACC'
        };
        
        toast.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 16px 24px;
            border-radius: 16px;
            margin-bottom: 12px;
            font-size: 16px;
            font-weight: 500;
            transform: translateY(-100px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 90vw;
            text-align: center;
            pointer-events: auto;
        `;
        
        toast.textContent = message;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            toast.style.transform = 'translateY(-100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // Show loading overlay
    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loading-overlay');
        const text = document.getElementById('loading-text');
        text.textContent = message;
        overlay.style.display = 'flex';
    }

    // Hide loading overlay
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        overlay.style.display = 'none';
    }

    // Success message
    success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }

    // Error message
    error(message, duration = 4000) {
        this.show(message, 'error', duration);
    }

    // Warning message
    warning(message, duration = 3000) {
        this.show(message, 'warning', duration);
    }

    // Info message
    info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }

    // Form validation feedback
    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        // Remove existing error
        this.removeFieldError(fieldId);
        
        // Add error styling
        field.style.borderColor = 'rgba(255, 61, 0, 0.5)';
        field.style.background = 'rgba(255, 61, 0, 0.05)';
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.id = `error-${fieldId}`;
        errorDiv.style.cssText = `
            color: #FF3D00;
            font-size: 14px;
            margin-top: 8px;
            font-weight: 500;
            background: rgba(255, 61, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 61, 0, 0.2);
            padding: 8px 12px;
            border-radius: 8px;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    // Remove field error
    removeFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        // Remove error styling
        field.style.borderColor = '';
        field.style.background = '';
        
        // Remove error message
        const errorDiv = document.getElementById(`error-${fieldId}`);
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Clear all field errors
    clearFieldErrors() {
        const errorElements = document.querySelectorAll('[id^="error-"]');
        errorElements.forEach(el => el.remove());
        
        // Reset field styles
        const fields = document.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.style.borderColor = '';
            field.style.background = '';
        });
    }

    // Button loading state
    setButtonLoading(buttonId, loading = true, originalText = '') {
        const button = document.getElementById(buttonId) || document.querySelector(`button[onclick*="${buttonId}"]`);
        if (!button) return;
        
        if (loading) {
            button.dataset.originalText = button.textContent;
            button.disabled = true;
            button.style.opacity = '0.7';
            button.style.background = 'rgba(255, 255, 255, 0.1)';
            button.style.backdropFilter = 'blur(5px)';
            button.style.webkitBackdropFilter = 'blur(5px)';
            button.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            button.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <div class="spinner" style="
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        border-top: 2px solid rgba(255, 255, 255, 0.8);
                        border-radius: 50%;
                        width: 16px;
                        height: 16px;
                        animation: spin 1s linear infinite;
                    "></div>
                    <span>Loading...</span>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
        } else {
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = '';
            button.style.backdropFilter = '';
            button.style.webkitBackdropFilter = '';
            button.style.border = '';
            button.textContent = button.dataset.originalText || originalText;
        }
    }

    // Shake animation for errors
    shake(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
        
        // Add shake animation
        if (!document.getElementById('shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Create global instance
const feedback = new MobileFeedback();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileFeedback;
}
