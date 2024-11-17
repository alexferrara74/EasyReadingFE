export async function register(email,password,username, onRegisterSuccess){
    try{
        const request = { email, password, username}
        const response = await fetch('http://192.168.1.121:3030/register',{
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        onRegisterSuccess(data.user);
        
    }catch(e){
        console.log('Errore nella registrazione', e);
    }
}