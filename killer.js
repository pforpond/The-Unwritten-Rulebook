        // Configure AWS SDK
        AWS.config.update({
            region: 'eu-west-2', // Your AWS region
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275' // Replace with your actual Identity Pool ID
            })
        });

        // Create DynamoDB client
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        // Function to fetch killer rules
        async function fetchKillerRules() {
            const params = {
                TableName: 'UnwrittenRules', // Your table name
                FilterExpression: 'RuleType = :ruleType',
                ExpressionAttributeValues: {
                    ':ruleType': 'killer'
                }
            };

            try {
                // Log raw parameters
                console.log('DynamoDB Scan Parameters:', params);

                const data = await dynamodb.scan(params).promise();
                
                // Log entire response
                console.log('Full DynamoDB Response:', data);
                
                // Log items directly
                console.log('Raw Items:', data.Items);

                const rulesContainer = document.getElementById('rules-container');
                
                // Clear loading message
                rulesContainer.innerHTML = '';

                // Comprehensive error checking
                if (!data.Items || !Array.isArray(data.Items)) {
                    throw new Error('Invalid data structure: Items is not an array');
                }

                // Detailed logging and processing
                const processedRules = data.Items.map((rule, index) => {
                    console.log(`Rule ${index} raw data:`, rule);
                    
                    // Comprehensive property checking
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
                console.error('Complete error details:', error);
                const rulesContainer = document.getElementById('rules-container');
                rulesContainer.innerHTML = `
                    <p class="error">
                        Unable to load rules. Detailed Error: ${error.message}
                        Please check the console for more information.
                    </p>
                `;
            }
        }

        // Fetch rules when page loads
        fetchKillerRules();
