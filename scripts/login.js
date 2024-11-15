export async function login(email,password){
    const request = { email, password}
    const response = await fetch('http://192.168.18.28:3030/login',{
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    console.log(data);
}