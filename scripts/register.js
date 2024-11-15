export async function register(email,password,username){
    const request = { email, password, username}
    const response = await fetch('http://192.168.18.28:3030/register',{
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data;
}