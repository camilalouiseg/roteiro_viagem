import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  status: 'idle' | 'rendering' | 'compiling' | 'done' | 'error';
  errorMessage?: string;
}

/**
 * Generates and downloads a multi-page high-resolution PDF file directly in the browser
 */
export async function downloadItineraryPdf(
  containerSelector?: string,
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> {
  const root =
    (containerSelector ? document.querySelector(containerSelector) : null) ||
    document.querySelector('#pdf-export-source') ||
    document.querySelector('#pdf-export-source-offscreen') ||
    document.querySelector('.print-document');

  if (!root) {
    throw new Error('Container do roteiro não foi encontrado.');
  }

  // Find all individual A4 page containers
  const pageElements = Array.from(root.querySelectorAll<HTMLElement>('.a4-page-container'));
  if (pageElements.length === 0) {
    throw new Error('Nenhuma página A4 foi encontrada para exportação.');
  }

  const totalPages = pageElements.length;

  onProgress?.({
    currentPage: 0,
    totalPages,
    status: 'rendering'
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  try {
    for (let i = 0; i < pageElements.length; i++) {
      const pageEl = pageElements[i];

      onProgress?.({
        currentPage: i + 1,
        totalPages,
        status: 'rendering'
      });

      // Render the A4 page container to canvas with 2x resolution
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }

    onProgress?.({
      currentPage: totalPages,
      totalPages,
      status: 'compiling'
    });

    // Download file directly
    pdf.save('Roteiro_Europa_Central_Oficial_2026.pdf');

    onProgress?.({
      currentPage: totalPages,
      totalPages,
      status: 'done'
    });
  } catch (error: any) {
    console.error('Erro ao gerar PDF:', error);
    onProgress?.({
      currentPage: 0,
      totalPages,
      status: 'error',
      errorMessage: error?.message || 'Ocorreu um erro ao gerar o arquivo PDF.'
    });
    throw error;
  }
}
