import {createHash} from 'node:crypto'

const apiKey = "551b712366610f1d249ed090565efffa";
const privateKey = "cc2ae25763b6fa37037c297f4d184a8b86675d54";
const ts = new Date().getTime();

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const response = await fetch(url + "?" + new URLSearchParams({
        apikey: apiKey,
        hash: await getHash(apiKey, privateKey, ts),
        ts: ts,
        limit: 100
    }));

    const responseJson = await response.json();
    const responseResults = responseJson.data.results;
    let responseWithThumbnail = []

    responseResults.forEach((element) => {
        if(element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
            responseWithThumbnail.push(element);
        }
    });

    return responseWithThumbnail.map((character) => {
        const newCharacter = { ...character };
        newCharacter.imageUrl = character.thumbnail.path + "/portrait_xlarge." + character.thumbnail.extension
        return newCharacter;
    });
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    return createHash('md5').update(timestamp + privateKey + publicKey).digest("hex")
}