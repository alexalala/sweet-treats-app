const dev = {
    STRIPE_KEY: "pk_test_tf70Za50An9W8hrBBbP1THRk00NejMtHti",
    s3: {
        REGION: "eu-west-1",
        BUCKET: "sweet-treats-2-api-dev-attachmentsbucket"
    },
    apiGateway: {
        REGION: "eu-west-1",
        URL: "https://j3p4mjadu6.execute-api.eu-west-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_pzOVAxM3X",
        APP_CLIENT_ID: "6hkk6787o8lnraarm0l09epmm0",
        IDENTITY_POOL_ID: "eu-west-1:0c694478-75ca-4190-89c0-151bd4d0b789"
    }
};

const prod = {
    STRIPE_KEY: "pk_test_tf70Za50An9W8hrBBbP1THRk00NejMtHti",
    s3: {
        REGION: "eu-west-1",
        BUCKET: "sweet-treats-2-api-prod-attachmentsbucket"
    },
    apiGateway: {
        REGION: "eu-west-1",
        URL: "https://xenskcxemh.execute-api.eu-west-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_XUVp1tvD9",
        APP_CLIENT_ID: "4dbk52ufel50gukjrvujt7jqgn",
        IDENTITY_POOL_ID: "eu-west-1:a95b82c2-2d48-4276-8127-581cf013333f"
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};