import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportAsImage = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const dataUrl = await toPng(element, {
            cacheBust: true,
            pixelRatio: 2, // High resolution
            backgroundColor: '#ffffff',
            style: {
                // Ensure specific elements are visible/hidden if needed, 
                // but usually better handled via CSS classes.
            }
        });

        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Export failed:', err);
    }
};

export const exportAsPDF = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Use html-to-image to generate the image first
        const imgData = await toPng(element, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#ffffff'
        });

        // Initialize PDF
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Load image to get dimensions
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        // Calculate scale to fit page
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;

        // Center the image
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2; // Center vertically as well? Or just top margin

        pdf.addImage(imgData, 'PNG', imgX, 10, imgWidth * ratio, imgHeight * ratio);

        // Add Watermark
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(20);
        pdf.text("Created with My Calendar App", pdfWidth / 2, pdfHeight - 10, {
            align: 'center',
        });

        pdf.save(`${fileName}.pdf`);
    } catch (err) {
        console.error('PDF Export failed:', err);
    }
};
