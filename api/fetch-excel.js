const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const excelUrl = "https://github.com/pir4nd3lo/SISBACH/raw/main/TABLA_C_LAGRGO.xlsx";

    try {
        const response = await fetch(excelUrl);
        if (!response.ok) {
            return res.status(response.status).send('No se pudo cargar el archivo Excel desde GitHub.');
        }

        const arrayBuffer = await response.arrayBuffer();
        
        // Configurar la respuesta
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="TABLA_C_LAGRGO.xlsx"');
        res.status(200).send(Buffer.from(arrayBuffer));

    } catch (error) {
        console.error("Error al hacer fetch al archivo de GitHub:", error);
        res.status(500).send("Error del servidor al procesar la solicitud.");
    }
};
