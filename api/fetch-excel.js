const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const excelUrl = "https://github.com/pir4nd3lo/SISBACH/raw/main/TABLA_C_LAGRGO.xlsx";

    try {
        const response = await fetch(excelUrl);
        if (!response.ok) {
            return res.status(response.status).json({ 
                error: `Error al obtener el archivo desde GitHub. Código de estado: ${response.status}`
            });
        }
        
        // El contenido será un ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();
        
        // Envía el buffer sin cabeceras adicionales
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.status(200).send(Buffer.from(arrayBuffer));

    } catch (error) {
        console.error("Error del servidor:", error);
        res.status(500).json({ 
            error: "Error interno del servidor. Intenta de nuevo más tarde." 
        });
    }
};
