const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const sendMail = require('./nodemailer');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake =  async (req,res)  => {
    // console.log(__dirname);
    
    const imagePath = path.join(__dirname, '../../../../../divyesh/project/ecommerce/public/assets/Beets.jpeg');
    const docDefinition = {
        content: [
            {
                image: imagePath,
                width: 100,
            },
            { text: 'Invoice', style: 'subheader', alignment: 'center', margin: [0, 0, 0, 20], fontSize: 30 },
            { text: 'Name:divesh bhakhar', margin: [0, 0, 0, 10] },
            { text: 'Address:surat', margin: [0, 0, 0, 10] },
            { text: 'Email:divyesh@gmail.com', margin: [0, 0, 0, 10] },
            { text: 'Phone Number:3468924254', margin: [0, 0, 0, 20] },

            {
                style: 'tableExample',
                table: {
                    body: [
                        [{ text: 'Sr No', bold: true }, { text: 'Item', bold: true }, { text: 'Quantity', bold: true }, { text: 'Price', bold: true }, { text: 'Total Price', bold: true },],
                        ['1', 'samsung s23', '1', '50000', '50000'],
                        ['2', 'cover', '2', '1000', '2000'],
                        [{ text: 'Total Amount', colSpan: 4, bold: true }, '', '', '', '52000'],
                    ]
                }
            },
        ]
    };
    const outputPath = path.join(__dirname, "../../../../../divyesh/project/ecommerce/document.pdf");

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
    await sendMail()
}

module.exports = exportpdfmake;


