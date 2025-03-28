import AWS from 'aws-sdk';

// AWS Configuration
AWS.config.update({
    region: 'eu-west-2', // e.g., us-east-1
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275'
    })
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function fetchPerks() {
    const params = {
        TableName: 'GamePerks'
    };

    try {
        const data = await dynamodb.scan(params).promise();
        const perks = data.Items;

        const survivorPerks = [];
        const killerPerks = [];

        perks.forEach(perk => {
            const perkData = {
                name: perk.PerkName,
                file: `${perk.Folder}/${perk.Filename}`
            };
            
            if (perk.PerkType.toLowerCase() === 'survivor') {
                survivorPerks.push(perkData);
            } else if (perk.PerkType.toLowerCase() === 'killer') {
                killerPerks.push(perkData);
            }
        });

        console.log('Survivor Perks:', survivorPerks);
        console.log('Killer Perks:', killerPerks);
        return { survivorPerks, killerPerks };
    } catch (error) {
        console.error('Error fetching perks:', error);
        return { survivorPerks: [], killerPerks: [] };
    }
}

// Example usage
fetchPerks().then(perks => {
    console.log('Fetched perks:', perks);
});
