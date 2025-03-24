document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch rules from the API
    const fetchRules = async () => {
        try {
            const response = await fetch('/api/rules/killer');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const rules = await response.json();
            displayRules(rules);
        } catch (error) {
            console.error('Error fetching rules:', error);
            document.getElementById('rulesContainer').innerHTML = `
                <div class="error">
                    <h3>Error Loading Rules</h3>
                    <p>Sorry, we couldn't load the rules at this time. Please try again later.</p>
                </div>
            `;
        }
    };

    // Function to display rules on the page
    const displayRules = (rules) => {
        const rulesContainer = document.getElementById('rulesContainer');
        
        // Clear loading message
        rulesContainer.innerHTML = '';
        
        // Sort rules by RuleID if needed
        rules.sort((a, b) => a.RuleID.localeCompare(b.RuleID));
        
        // Add each rule to the container
        rules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'rule';
            ruleElement.id = rule.RuleID.toLowerCase();
            
            ruleElement.innerHTML = `
                <h3>${rule.Title}</h3>
                <p>${rule.Description}</p>
            `;
            
            rulesContainer.appendChild(ruleElement);
        });
        
        // If no rules found
        if (rules.length === 0) {
            rulesContainer.innerHTML = `
                <div class="no-rules">
                    <h3>No Rules Found</h3>
                    <p>There are currently no killer rules in the database.</p>
                </div>
            `;
        }
    };

    // Initialize
    fetchRules();
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
