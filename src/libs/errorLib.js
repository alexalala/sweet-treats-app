import * as Sentry from "@sentry/browser";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
    if (isLocal) {
        return;
    }
    Sentry.init({ dsn: "https://00f18868492a4ffbb57584da9c66db0e@o397741.ingest.sentry.io/5252536" });
}

export function logError(error, errorInfo = null) {
    if (isLocal) {
        return;
    }
    Sentry.withScope((scope) => {
        errorInfo && scope.setExtras(errorInfo);
        Sentry.captureException(error);
    });
}

export function onError(error) {
    let errorInfo = {};
    let message = error.toString();
    // Auth errors
    if (!(error instanceof Error) && error.message) {
        errorInfo = error;
        message = error.message;
        error = new Error(message);
    // API errors
    } else if (error.config && error.config.url) {
        errorInfo.url = error.config.url;
    }
    logError(error, errorInfo);
    alert(message);
}