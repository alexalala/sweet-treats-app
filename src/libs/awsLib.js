import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    // When more usage, think about changing it from Date.now maybe to uuid.
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.put(filename, file, {
        contentType: file.type,
    }).catch(err => console.log(err));

    // Return stored object key.
    return stored.key;
}