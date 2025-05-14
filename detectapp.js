document.addEventListener('DOMContentLoaded', function() {
        // Detect if the site is running in the app's WebView
        function isRunningInApp() {
            // Common ways to detect Android WebView
            const userAgent = navigator.userAgent.toLowerCase();
            
            // Check for app-specific strings you might have added to the WebView's user agent
            if (userAgent.includes('unwrittenrulebook-app')) {
                return true;
            }
            
            // Generic WebView detection (less reliable)
            if (userAgent.includes('wv') || 
                (userAgent.includes('android') && !userAgent.includes('chrome'))) {
                return true;
            }
            
            return false;
        }

        // Show the Play Store link only if NOT running in the app
        const playStoreLink = document.getElementById('playStoreLink');
        if (!isRunningInApp()) {
            playStoreLink.style.display = 'block';
        }
})
