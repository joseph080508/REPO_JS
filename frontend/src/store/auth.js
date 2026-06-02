 
const auth = {
    url:import.meta.env.VITE_URLAUTH,

    async onLogin(){
        const res = await fetch(`${this.url}/users?email=`)
    }
}
