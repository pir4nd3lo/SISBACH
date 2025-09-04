const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const excelUrl = "https://github.com/pir4nd3lo/SISBACH/raw/main/TABLA_C_LAGRGO.xlsx";

    try {
        const response = await fetch(excelUrl);
        if (!response.ok) {
            // Envía un mensaje de error más específico
            return res.status(response.status).json({ 
                error: `Error al obtener el archivo desde GitHub. Código de estado: ${response.status}`
            });
        }

        const arrayBuffer = await response.arrayBuffer();
        
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="TABLA_C_LAGRGO.xlsx"');
        res.status(200).send(Buffer.from(arrayBuffer));

    } catch (error) {
        console.error("Error del servidor:", error);
        res.status(500).json({ 
            error: "Error interno del servidor. Intenta de nuevo más tarde." 
        });
    }
};
