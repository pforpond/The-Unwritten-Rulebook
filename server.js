// server.js
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const app = express();
const port = 3000;

// Configure AWS
AWS.config.update({
  region: 'eu-west-2', // e.g., 'us-east-1'
  // Use IAM role if on EC2, or environment variables for credentials
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// API endpoint to get rules by type (killer or survivor)
app.get('/api/rules/:type', async (req, res) => {
  const ruleType = req.params.type.toLowerCase();
  
  if (ruleType !== 'killer' && ruleType !== 'survivor') {
    return res.status(400).json({ error: 'Invalid rule type. Must be "killer" or "survivor".' });
  }
  
  const params = {
    TableName: 'UnwrittenRules',
    FilterExpression: 'RuleType = :ruleType',
    ExpressionAttributeValues: {
      ':ruleType': ruleType
    }
  };
  
  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(500).json({ error: 'Failed to fetch rules' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
