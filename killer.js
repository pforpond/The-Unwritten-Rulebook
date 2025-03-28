// Configure AWS SDK
AWS.config.update({
    region: 'eu-west-2',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275'
    })
});

// Create DynamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Function to fetch killer rules
async function fetchKillerRules() {
    const params = {
        TableName: 'UnwrittenRules',
        FilterExpression: 'RuleType = :ruleType',
        ExpressionAttributeValues: {
            ':ruleType': 'killer'
        }
    };

    try {
        const data = await dynamodb.scan(params).promise();
        const rulesContainer = document.getElementById('rules-container');
        
        // Clear loading message
        rulesContainer.innerHTML = '';

        // Comprehensive error checking
        if (!data.Items || !Array.isArray(data.Items)) {
            throw new Error('Invalid data structure: Items is not an array');
        }

        // Process rules
        const processedRules = data.Items.map((rule, index) => {
            const ruleId = rule.RuleID !== undefined ? rule.RuleID : `fallback-${index}`;
            const title = rule.Title || 'Untitled Rule';
            const description = rule.Description || 'No description available';

            return {
                id: ruleId,
                title: title,
                description: description
            };
        });

        // Sort rules, using a safe comparison
        const sortedRules = processedRules.sort((a, b) => 
            (a.id || '').toString().localeCompare((b.id || '').toString())
        );

        // Create rule elements
        sortedRules.forEach(rule => {
            const ruleDiv = document.createElement('div');
            ruleDiv.className = 'rule';
            ruleDiv.id = rule.id;

            ruleDiv.innerHTML = `
                <h3>${rule.title}</h3>
                <p>${rule.description}</p>
            `;

            rulesContainer.appendChild(ruleDiv);
        });

        // Final check
        if (rulesContainer.children.length === 0) {
            throw new Error('No rules could be processed');
        }

    } catch (error) {
        const rulesContainer = document.getElementById('rules-container');
        rulesContainer.innerHTML = `
            <p class="error">
                Unable to load rules. Please try again later.
            </p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Fetch rules when page loads
fetchKillerRules();
