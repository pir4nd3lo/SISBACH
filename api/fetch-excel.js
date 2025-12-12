// api/fetch-excel.js
export default async function handler(req, res) {
    // Solo permitir método GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const excelUrl = "https://github.com/pir4nd3lo/SISBACH/raw/main/202601_admision.xlsx";

    try {
        console.log('Intentando obtener archivo desde:', excelUrl);
        
        const response = await fetch(excelUrl);
        
        if (!response.ok) {
            console.error(`Error HTTP: ${response.status} - ${response.statusText}`);
            return res.status(response.status).json({ 
                error: `Error al obtener el archivo desde GitHub. Código de estado: ${response.status}`,
                details: response.statusText
            });
        }
        
        // Verificar el tipo de contenido
        const contentType = response.headers.get('content-type');
        console.log('Tipo de contenido:', contentType);
        
        // Obtener el ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();
        console.log('Tamaño del archivo:', arrayBuffer.byteLength, 'bytes');
        
        // Verificar que el archivo no esté vacío
        if (arrayBuffer.byteLength === 0) {
            return res.status(404).json({ 
                error: "El archivo está vacío o no se pudo descargar correctamente" 
            });
        }
        
        // Establecer headers apropiados
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Length', arrayBuffer.byteLength);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache por 1 hora
        
        // Enviar el buffer
        return res.status(200).send(Buffer.from(arrayBuffer));

    } catch (error) {
        console.error("Error detallado:", error);
        return res.status(500).json({ 
            error: "Error interno del servidor",
            message: error.message,
            details: "Verifica que la URL del archivo sea accesible y que el archivo exista"
        });
    }
}
