// AWS Configuration
        const REGION = 'eu-west-2';
        const IDENTITY_POOL_ID = 'eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275';

        // Configure the AWS SDK
        AWS.config.region = REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IDENTITY_POOL_ID
        });

        // Initialize DynamoDB
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        // Fetch codes from DynamoDB
        function fetchCodes() {
            const params = {
                TableName: 'StoreCodes'
            };

            dynamodb.scan(params, (err, data) => {
                if (err) {
                    console.error('Error fetching codes:', err);
                    return;
                }

                // Separate codes by type
                const currentCodes = data.Items.filter(item => item.CodeType === 'temp');
                const prideCodes = data.Items.filter(item => item.CodeType === 'pride');

                // Populate current codes list
                const currentCodesList = document.getElementById('current-codes-list');
                currentCodes.forEach(code => {
                    const li = document.createElement('li');
                    li.className = 'code-item';
                    li.innerHTML = `
                        <span class="code">${code.CodeID}</span>
                        <button class="copy-button" onclick="copyToClipboard('${code.CodeID}')">Copy</button>
                        <span class="code-description">${code.CodeDescription}</span>
                    `;
                    currentCodesList.appendChild(li);
                });

                // Populate pride codes list
                const prideCodesList = document.getElementById('pride-codes-list');
                prideCodes.forEach(code => {
                    const li = document.createElement('li');
                    li.className = 'code-item';
                    li.innerHTML = `
                        <span class="code">${code.CodeID}</span>
                        <button class="copy-button" onclick="copyToClipboard('${code.CodeID}')">Copy</button>
                        <span class="code-description">${code.CodeDescription}</span>
                    `;
                    prideCodesList.appendChild(li);
                });
            });
        }

        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            var backToTop = document.querySelector('.back-to-top');
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        // Smooth scroll to top
        document.querySelector('.back-to-top').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Copy code to clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
                var message = document.getElementById('copied-message');
                message.style.display = 'block';
                setTimeout(function() {
                    message.style.display = 'none';
                }, 2000);
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        }

        // Fetch codes when page loads
        window.onload = fetchCodes;
