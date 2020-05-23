import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    // When more usage, think about changing it from Date.now maybe to uuid.
    const filename = `${Date.now()}-${file.name}`;

    // Storage.vault.put adds it to the user's unique folder in s3.
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type,
    });

    // Return stored object key.
    return stored.key;
}