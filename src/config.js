export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: "pk_test_tf70Za50An9W8hrBBbP1THRk00NejMtHti",
    s3: {
        REGION: "eu-west-1",
        BUCKET: "sweet-treats-product-images"
    },
    apiGateway: {
        REGION: "eu-west-1",
        URL: "https://3a2vynj1r2.execute-api.eu-west-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_1pLOrbDvt",
        APP_CLIENT_ID: "7lsol15pt5ndctc4q1nou86cb9",
        IDENTITY_POOL_ID: "eu-west-1:73d8209c-4f8d-4cff-8d8a-f12c030b547f"
    }
};