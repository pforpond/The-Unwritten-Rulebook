// Load AWS SDK from CDN if running in the browser
if (typeof window !== "undefined") {
    const script = document.createElement("script");
    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.814.0.min.js";
    script.onload = () => initializeAWS();
    document.head.appendChild(script);
} else {
    import AWS from 'aws-sdk';
    initializeAWS();
}

function initializeAWS() {
    AWS.config.update({
        region: 'eu-west-2', // e.g., us-east-1
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275'
        })
    });

    document.addEventListener("DOMContentLoaded", async () => {
        const { survivorPerks, killerPerks } = await fetchPerks();
        setupUI(survivorPerks, killerPerks);
    });
}

async function fetchPerks() {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = { TableName: 'GamePerks' };

    try {
        const data = await dynamodb.scan(params).promise();
        console.log("Fetched data from DynamoDB:", data.Items);

        const survivorPerks = [];
        const killerPerks = [];

        data.Items.forEach(perk => {
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

        return { survivorPerks, killerPerks };
    } catch (error) {
        console.error('Error fetching perks:', error);
        return { survivorPerks: [], killerPerks: [] };
    }
}

function setupUI(survivorPerks, killerPerks) {
    const shuffleButton = document.getElementById("shuffle-button");
    const perksContainer = document.getElementById("perks-container");
    let currentRole = "survivor";

    document.querySelectorAll(".role-button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".role-button").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            currentRole = this.getAttribute("data-role");
        });
    });

    shuffleButton.addEventListener("click", () => {
        const selectedPerks = (currentRole === "survivor" ? survivorPerks : killerPerks)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        const perkCards = perksContainer.querySelectorAll(".perk-card");
        perkCards.forEach((card, index) => {
            if (selectedPerks[index]) {
                card.querySelector(".perk-image").src = selectedPerks[index].file;
                card.querySelector(".perk-name").textContent = selectedPerks[index].name;
            }
        });
    });
}
