const fs = require('fs');

// Read configuration.json
const config = require('../src/amplifyconfiguration.json');

// Inject environment variables
config.aws_project_region = process.env.AWS_PROJECT_REGION;
config.aws_cognito_identity_pool_id = process.env.AWS_COGNITO_IDENTITY_POOL_ID;
config.aws_cognito_region = process.env.AWS_COGNITO_REGION;
config.aws_user_pools_id = process.env.AWS_USER_POOLS_ID;
config.aws_user_pools_web_client_id = process.env.AWS_USER_POOLS_WEB_CLIENT_ID;
// Add more variables as needed

// Write the modified configuration back to configuration.json
fs.writeFileSync('../src/amplifyconfiguration.json', JSON.stringify(config, null, 2));
