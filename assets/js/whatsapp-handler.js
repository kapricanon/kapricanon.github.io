/**
 * Enhanced WhatsApp Integration Handler
 * Handles mobile app detection and provides multiple fallback options
 */

class WhatsAppHandler {
  constructor(phoneNumber, defaultMessage = 'Hi there!') {
    this.phoneNumber = phoneNumber;
    this.defaultMessage = defaultMessage;
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    this.isAndroid = /Android/.test(navigator.userAgent);
    this.isMobile = this.isIOS || this.isAndroid || /Mobi|Opera Mini/i.test(navigator.userAgent);
  }

  // Enhanced mobile detection including touch devices
  isMobileDevice() {
    return this.isMobile || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  }

  // Check if WhatsApp is likely installed (iOS only)
  async checkWhatsAppInstalled() {
    if (!this.isIOS) return true; // Android and others handle this differently
    
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(false), 2500);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      iframe.src = 'whatsapp://';
      document.body.appendChild(iframe);
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3000);
    });
  }

  // Format phone number for WhatsApp (remove any non-digits)
  formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '');
  }

  // Encode message for URL
  encodeMessage(message) {
    return encodeURIComponent(message);
  }

  // Primary method to open WhatsApp
  async openWhatsApp(customMessage = null) {
    const message = customMessage || this.defaultMessage;
    const formattedPhone = this.formatPhoneNumber(this.phoneNumber);
    const encodedMessage = this.encodeMessage(message);

    if (this.isMobileDevice()) {
      await this.handleMobileWhatsApp(formattedPhone, encodedMessage);
    } else {
      this.handleDesktopWhatsApp(formattedPhone, encodedMessage);
    }
  }

  // Handle mobile WhatsApp opening
  async handleMobileWhatsApp(phone, encodedMessage) {
    const urls = [
      `whatsapp://send?phone=${phone}&text=${encodedMessage}`,
      `https://wa.me/${phone}?text=${encodedMessage}`,
      `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`
    ];

    // For iOS, check if app is installed first
    if (this.isIOS) {
      const isInstalled = await this.checkWhatsAppInstalled();
      if (!isInstalled) {
        return this.showFallbackOptions(phone);
      }
    }

    // Try opening the app
    let appOpened = false;
    const startTime = Date.now();
    
    // Method 1: Try direct protocol
    try {
      window.location.href = urls[0];
      
      // Wait to see if app opened
      setTimeout(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed < 3000 && !appOpened) {
          // App likely didn't open, try wa.me
          this.tryWaMe(phone, encodedMessage);
        }
      }, 2000);
      
    } catch (error) {
      console.log('Direct protocol failed, trying wa.me');
      this.tryWaMe(phone, encodedMessage);
    }
  }

  // Try wa.me as fallback
  tryWaMe(phone, encodedMessage) {
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    if (this.isMobileDevice()) {
      // On mobile, try to open in same window first
      window.location.href = waUrl;
      
      // If that doesn't work, try new window
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1500);
    } else {
      window.open(waUrl, '_blank');
    }
  }

  // Handle desktop WhatsApp
  handleDesktopWhatsApp(phone, encodedMessage) {
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  }

  // Show fallback options when app is not available
  showFallbackOptions(phone) {
    const formattedPhone = phone.replace(/(\d{2})(\d{4})(\d{6})/, '+$1 $2 $3');
    
    if (confirm(`WhatsApp app not found. Would you like to:\n\n✓ Copy phone number: ${formattedPhone}\n✓ Or open WhatsApp Web?`)) {
      // User chose to continue
      if (navigator.clipboard) {
        navigator.clipboard.writeText(formattedPhone).then(() => {
          alert(`Phone number copied: ${formattedPhone}\nYou can paste it in WhatsApp`);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = formattedPhone;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(`Phone number copied: ${formattedPhone}`);
      }
      
      // Also try opening WhatsApp Web
      setTimeout(() => {
        window.open('https://web.whatsapp.com/', '_blank');
      }, 1000);
    }
  }

  // Create and inject WhatsApp button
  createFloatingButton(containerId = null) {
    const button = document.createElement('div');
    button.id = 'whatsapp-float-btn';
    button.className = 'whatsapp-float';
    button.style.cssText = `
      position: fixed;
      bottom: 64px;
      right: 24px;
      z-index: 9999;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #25D366;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    `;

    button.innerHTML = `
      <div class="whatsapp-tooltip" style="
        position: absolute;
        right: 72px;
        top: 50%;
        transform: translateY(-50%);
        background: #25D366;
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      ">WhatsApp Me</div>
      <img src="/assets/images/whatsapp/whatsapp.png" alt="WhatsApp" style="width:48px; height:48px; object-fit:cover;">
    `;

    // Add hover effects
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
      button.querySelector('.whatsapp-tooltip').style.opacity = '1';
      button.querySelector('.whatsapp-tooltip').style.visibility = 'visible';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      button.querySelector('.whatsapp-tooltip').style.opacity = '0';
      button.querySelector('.whatsapp-tooltip').style.visibility = 'hidden';
    });

    // Add click handler
    button.addEventListener('click', () => this.openWhatsApp());

    // Inject into page
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) container.appendChild(button);
    } else {
      document.body.appendChild(button);
    }

    return button;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const whatsappHandler = new WhatsAppHandler('447920692082', 'Hi there!');
  
  // Look for existing button or create new one
  const existingButton = document.getElementById('whatsapp-button');
  if (existingButton) {
    existingButton.addEventListener('click', () => whatsappHandler.openWhatsApp());
  } else {
    whatsappHandler.createFloatingButton();
  }
});

// Export for global use
window.WhatsAppHandler = WhatsAppHandler;