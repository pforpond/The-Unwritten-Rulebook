// AWS SDK Integration for Perk and Item Data
const REGION = "eu-west-2";
const IDENTITY_POOL_ID = "eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275";
const PERKS_TABLE_NAME = "GamePerks";
const ITEMS_TABLE_NAME = "GameSurvivorItems";

// Global variables
let survivorPerks = [];
let killerPerks = [];
let survivorItems = [];
let showItems = false; // Flag to control whether to include items in shuffle

// Initialize AWS credentials and clients
function initializeAwsClients() {
    console.log("Initializing AWS Clients");
    // Configure the credentials provider
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID
    });

    // Create DynamoDB client
    return new AWS.DynamoDB.DocumentClient();
}

// Fetch perks from DynamoDB
function fetchPerks() {
    return new Promise((resolve, reject) => {
        try {
            const dynamodbClient = initializeAwsClients();

            const params = {
                TableName: PERKS_TABLE_NAME
            };

            dynamodbClient.scan(params, (err, data) => {
                if (err) {
                    console.error("Error fetching perks (AWS Error):", err);
                    reject(err);
                    return;
                }

                // Transform DynamoDB items to our perk format
                const transformedPerks = data.Items.map(item => {
                    return {
                        name: item.PerkName,
                        file: item.Filename,
                        type: item.PerkType.charAt(0).toUpperCase() + item.PerkType.slice(1).toLowerCase(),
                        description: item.PerkDescription || "No description available",
                        owner: item.PerkOwner || "Unknown", // Add owner
                        quote: item.PerkQuote || "", // Add quote
                        isItem: false // Flag to identify this as a perk, not an item
                    };
                });

                // Separate perks by type
                survivorPerks = transformedPerks.filter(perk => perk.type === "Survivor");
                killerPerks = transformedPerks.filter(perk => perk.type === "Killer");

                resolve(transformedPerks);
            });
        } catch (error) {
            console.error("Catch block error in fetchPerks:", error);
            reject(error);
        }
    });
}

// Fetch survivor items from DynamoDB
function fetchSurvivorItems() {
    return new Promise((resolve, reject) => {
        try {
            const dynamodbClient = initializeAwsClients();

            const params = {
                TableName: ITEMS_TABLE_NAME
            };

            dynamodbClient.scan(params, (err, data) => {
                if (err) {
                    console.error("Error fetching survivor items (AWS Error):", err);
                    reject(err);
                    return;
                }

                // Transform DynamoDB items to our item format
                survivorItems = data.Items.map(item => {
                    return {
                        name: item.ItemName,
                        folder: item.Folder || "items", // Default folder if not specified
                        file: item.Filename,
                        description: item.ItemDescription || "No description available",
                        quote: item.ItemQuote || "",
                        type: "Survivor", // All items are for survivors
                        isItem: true // Flag to identify this as an item, not a perk
                    };
                });

                console.log("Fetched survivor items:", survivorItems.length);
                resolve(survivorItems);
            });
        } catch (error) {
            console.error("Catch block error in fetchSurvivorItems:", error);
            reject(error);
        }
    });
}

function updatePerkDisplay() {
    // Clear the container
    perksContainer.innerHTML = "";
    const perkDetailsContainer = document.getElementById('perk-details');
    perkDetailsContainer.innerHTML = "";
    
    currentPerks.forEach((perk, index) => {
        const perkCard = document.createElement("div");
        perkCard.className = "perk-card";
        perkCard.dataset.index = index;
        
        if (heldPerks[index]) {
            perkCard.classList.add("held");
        }
        
        const perkImage = document.createElement("img");
        perkImage.className = "perk-image";
        
        // Determine correct image path based on whether it's a perk or item
        if (perk.isItem) {
            perkImage.src = `${perk.folder}/${perk.file}`;
            perkCard.classList.add("item-card"); // Add item class for styling
        } else {
            perkImage.src = `${perk.type.toLowerCase() === 'survivor' ? 'survivorperks' : 'killerperks'}/${perk.file}`;
        }
        
        perkImage.alt = perk.name;
        
        const perkName = document.createElement("div");
        perkName.className = "perk-name";
        perkName.textContent = perk.name;
        
        // Add item indicator if it's an item
        if (perk.isItem) {
            const itemIndicator = document.createElement("div");
            itemIndicator.className = "item-indicator";
            itemIndicator.textContent = "Item";
            perkCard.appendChild(itemIndicator);
        }
        
        // click card to hold perk
        perkCard.addEventListener("click", () => {
            heldPerks[index] = !heldPerks[index];
            
            if (heldPerks[index]) {
                perkCard.classList.add("held");
            } else {
                perkCard.classList.remove("held");
            }
        });
        
        perkCard.appendChild(perkImage);
        perkCard.appendChild(perkName);
        perksContainer.appendChild(perkCard);

        // Create detail card
        const detailCard = document.createElement("div");
        detailCard.className = "perk-detail-card";

        const detailImage = document.createElement("img");
        detailImage.className = "perk-detail-image";
        
        // Determine correct image path for details view
        if (perk.isItem) {
            detailImage.src = `${perk.folder}/${perk.file}`;
            detailCard.classList.add("item-detail-card"); // Add item class for styling
        } else {
            detailImage.src = `${perk.type.toLowerCase() === 'survivor' ? 'survivorperks' : 'killerperks'}/${perk.file}`;
        }
        
        detailImage.alt = perk.name;

        const detailContent = document.createElement("div");
        detailContent.className = "perk-detail-content";

        const perkHeader = document.createElement("div");
        perkHeader.className = "perk-detail-owner";
        
        // Different header format for items vs perks
        if (perk.isItem) {
            perkHeader.textContent = `${perk.name} - Item`;
        } else {
            perkHeader.textContent = `${perk.name} - ${perk.owner}`;
        }

        const detailDescription = document.createElement("div");
        detailDescription.className = "perk-detail-description";
        detailDescription.textContent = perk.description;

        const perkQuote = document.createElement("div");
        perkQuote.className = "perk-detail-quote";
        perkQuote.textContent = perk.quote;

        detailContent.appendChild(perkHeader);
        detailContent.appendChild(detailDescription);
        detailContent.appendChild(perkQuote);

        detailCard.appendChild(detailImage);
        detailCard.appendChild(detailContent);
        perkDetailsContainer.appendChild(detailCard);
    });
}

// perk shuffle logic
const perksContainer = document.getElementById("perks-container");
const roleButtons = document.querySelectorAll(".toggle-button");
const shuffleButton = document.getElementById("shuffle-button");
const itemToggle = document.getElementById("include-items");
let currentRole = "Survivor";
let currentPerks = [];
let heldPerks = [false, false, false, false];

// Set up item toggle event listener
itemToggle.addEventListener("change", function() {
    showItems = this.checked;
    console.log("Include items:", showItems);
});

// Set up role buttons
roleButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("Button clicked:", button.dataset.role);
        roleButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentRole = button.dataset.role;
        // Reset held perks when changing roles
        heldPerks = [false, false, false, false];
        currentPerks = [];
        // Reset the display
        initializeEmptyPerkCards();
        
        // Update item toggle visibility
        const itemToggleContainer = document.querySelector('.item-toggle');
        if (itemToggleContainer) {
            itemToggleContainer.style.display = currentRole === 'Survivor' ? 'flex' : 'none';
        }
        
        console.log("Current role changed to:", currentRole);
    });
});

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initializeEmptyPerkCards() {
    perksContainer.innerHTML = "";
    const perkDetailsContainer = document.getElementById('perk-details');
    perkDetailsContainer.innerHTML = "";
    
    for (let i = 0; i < 4; i++) {
        const perkCard = document.createElement("div");
        perkCard.className = "perk-card";
        perkCard.dataset.index = i;
        
        const perkImage = document.createElement("img");
        perkImage.className = "perk-image";
        perkImage.src = "noperk.png";
        perkImage.alt = "No Perk";
        
        const perkName = document.createElement("div");
        perkName.className = "perk-name";
        perkName.textContent = "Select a role and shuffle";
        
        perkCard.appendChild(perkImage);
        perkCard.appendChild(perkName);
        perksContainer.appendChild(perkCard);
    }

    // Add placeholder for descriptions
    const descriptionPlaceholder = document.createElement("div");
    descriptionPlaceholder.className = "description-placeholder";
    descriptionPlaceholder.textContent = "Shuffle perks to see descriptions";
    perkDetailsContainer.appendChild(descriptionPlaceholder);
}

function shufflePerks() {
    console.log("Shuffle Perks called");
    console.log("Current Role:", currentRole);
    console.log("Include Items:", showItems);
    
    let availableOptions = [];
    
    if (currentRole === "Survivor") {
        availableOptions = [...survivorPerks];
        if (showItems && survivorItems.length > 0) {
            console.log("Adding items to shuffle pool");
            availableOptions = [...availableOptions, ...survivorItems];
        }
    } else {
        availableOptions = [...killerPerks];
    }
    
    console.log("Available options for shuffle:", availableOptions.length);
    
    if (availableOptions.length === 0) {
        console.error("No perks/items available for current role");
        alert("No perks/items found for the selected role. Please check your DynamoDB data.");
        return;
    }

    let availableForShuffle = [...availableOptions];
    
    // If first shuffle, initialize current perks
    if (currentPerks.length === 0) {
        currentPerks = shuffleArray(availableOptions).slice(0, 4);
        heldPerks = [false, false, false, false];
    } else {
        // Remove held perks/items from available options to avoid duplicates
        for (let i = 0; i < 4; i++) {
            if (heldPerks[i]) {
                const itemName = currentPerks[i].name;
                availableForShuffle = availableForShuffle.filter(p => p.name !== itemName);
            }
        }
        
        // Shuffle remaining options
        const shuffledOptions = shuffleArray(availableForShuffle);
        
        // Replace non-held spots
        let shuffledIndex = 0;
        for (let i = 0; i < 4; i++) {
            if (!heldPerks[i] && shuffledIndex < shuffledOptions.length) {
                currentPerks[i] = shuffledOptions[shuffledIndex];
                shuffledIndex++;
            }
        }
    }
    
    console.log("Current perks/items after shuffle:", currentPerks);
    updatePerkDisplay();
}

// Initialize the page
async function initializePage() {
    try {
        // Set initial item toggle visibility
        const itemToggleContainer = document.querySelector('.item-toggle');
        itemToggleContainer.style.display = currentRole === 'Survivor' ? 'flex' : 'none';
        
        // Fetch both perks and items
        await Promise.all([fetchPerks(), fetchSurvivorItems()]);
        initializeEmptyPerkCards();
    } catch (error) {
        console.error("Failed to initialize page:", error);
        // Show an error message to the user
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Failed to load perks and items. Please try again later.";
        errorMessage.style.color = 'red';
        perksContainer.appendChild(errorMessage);
    }
}

// Initialize when document is loaded
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
    
    // Initialize after DOM is loaded
    initializePage();
});

shuffleButton.addEventListener("click", shufflePerks);
