export async function loadHTML(path) {

    try {
        console.log(path);
        
        // Carga fragmentos HTML para mantener las vistas separadas del JS.
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Error cargando HTML: ${path}`);
        }
        return await response.text();
    } catch (error) {
        console.error(error);
        return '<h2>Error cargando contenido</h2>';
    }
}
