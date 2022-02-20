import { API_KEY, BASE_DB_URL } from ".";

/**
 * Creates a new entry in the database.
 * @param user name of the user
 * @returns username and highScore of the new user.
 */
export async function apiUserRegister(user: String) {
    try {
        const response = await fetch(`${BASE_DB_URL}`,{
            method: "POST",
            headers: {
                "X-API-KEY": API_KEY,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username : user,
                highScore: 0
            })
        })
        const {username, highScore } = await response.json();

        return [null, username, highScore];

    } catch (error : any) {
        return [error.message, null, null]
    }
}
/**
 * Retrieves a single user from database.
 * @param user name of the user.
 * @returns Array of three values : [error, username, highScore]
 */
export async function ApiGetUser(user: String) {
    try {
        const response = await fetch(`${BASE_DB_URL}?username=${user}`,{
        });
        const data = await response.json();
        // I am too dumb to do it any other way
        // Since it returns an array i am unpacking the array.
        const {username, highScore} = data[0];
        if(!response.ok){
            throw new Error("Failed to get user");
        }
        return [null, username,highScore]
    } catch (error : any) {
        return [error.message, null, null]
    }
}
// not done
export async function ApiPostUser(user: String){
    try {
        const {username, highScore} = await (await fetch(`${BASE_DB_URL}?username=${user}`)).json()
        return [null, username, highScore]
    } catch (error : any) {
        return [error.message, null, null]
    }
}