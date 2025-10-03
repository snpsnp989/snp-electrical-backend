// PDF Template Backup - Copy of the HTML template from pdfReports.js
// This contains the complete PDF generation template for SNP Electrical service reports

const generateReportHTML = (job, logoBase64 = '') => {
  const currentDate = new Date().toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
  
  const completedDate = job.completed_date ? 
    new Date(job.completed_date).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }) : currentDate;
  
  // Parse parts JSON if it exists
  let parts = [];
  if (job.parts_json) {
    try {
      parts = JSON.parse(job.parts_json);
    } catch (e) {
      console.error('Error parsing parts JSON:', e);
    }
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Service Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          font-size: 12px;
          line-height: 1.4;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
        }
        .company-info {
          flex: 1;
        }
        .logo-section {
          text-align: right;
          flex: 1;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
          line-height: 1.1;
        }
        .logo .snp {
          color: #ff6600;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 2px;
        }
        .logo .electrical {
          color: #333;
          font-size: 20px;
          font-weight: 300;
          position: relative;
          display: inline-block;
          letter-spacing: 1px;
        }
        .logo .electrical::before {
          content: "|";
          color: #666;
          margin-right: 8px;
          font-weight: 300;
        }
        .logo .electrical::after {
          content: "|";
          color: #666;
          margin-left: 8px;
          font-weight: 300;
        }
        .logo .electrical-underline {
          display: block;
          height: 1px;
          background: #4A90E2;
          margin-top: 3px;
          width: 100%;
        }
        .company-details {
          text-align: center;
          font-weight: bold;
          font-size: 12px;
          margin-top: 8px;
        }
        .title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          text-decoration: underline;
          margin: 30px 0;
        }
        .job-details {
          background-color: #f5f5f5;
          padding: 15px;
          margin-bottom: 20px;
        }
        .job-details table {
          width: 100%;
          border-collapse: collapse;
        }
        .job-details td {
          padding: 8px;
          border: none;
        }
        .job-details .label {
          background-color: #e0e0e0;
          font-weight: bold;
          width: 30%;
        }
        .fault-reported {
          background-color: #f5f5f5;
          padding: 15px;
          margin: 20px 0;
          border: 1px solid #ddd;
        }
        .fault-reported h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #333;
        }
        .fault-reported p {
          margin: 5px 0;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .action-taken {
          background-color: #f5f5f5;
          padding: 15px;
          margin: 20px 0;
          border: 1px solid #ddd;
        }
        .action-taken h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #333;
        }
        .action-taken p {
          margin: 5px 0;
          padding-left: 20px;
          line-height: 1.5;
        }
        .time-serviced {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
        }
        .time-serviced div {
          flex: 1;
          margin-right: 20px;
        }
        .time-serviced div:last-child {
          margin-right: 0;
        }
        .parts-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .parts-table th,
        .parts-table td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        .parts-table th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <strong>SNP Electrical</strong><br>
          18 Newell Close, Taylors Lakes 3038<br>
          Phone: 0488 038 898<br>
          Email: snpelec@gmail.com
        </div>
        <div class="logo-section">
          <div class="logo">
            ${logoBase64 ? 
              `<img src="data:image/png;base64,${logoBase64}" alt="SNP Electrical" style="max-height: 80px; max-width: 200px;" />` :
              `<div class="snp">SNP</div>
               <div class="electrical">electrical</div>
               <div class="electrical-underline"></div>`
            }
          </div>
          <div class="company-details">
            REC 16208<br>
            ABN: 22 592 137 842
          </div>
        </div>
      </div>
      
      <div class="title">Service Report</div>
      
      <div class="job-details">
        <table>
          <tr>
            <td class="label">Service Report Number:</td>
            <td>${job.snpid || job.id}</td>
            <td class="label">Date:</td>
            <td>${completedDate}</td>
          </tr>
          <tr>
            <td class="label">Customer's Name:</td>
            <td>${job.client_name || job.customer_name || '—'}</td>
            <td class="label">Site Name:</td>
            <td>${job.end_customer_name || '—'}</td>
          </tr>
          <tr>
            <td class="label">Site:</td>
            <td>${job.site_address || job.customer_address || '—'}</td>
            <td class="label">Site Contact:</td>
            <td>${job.site_contact || '—'}</td>
          </tr>
          <tr>
            <td class="label">Phone Number:</td>
            <td>${job.site_phone || job.customer_phone || '—'}</td>
            <td class="label">Order Number:</td>
            <td>${job.order_number || '—'}</td>
          </tr>
          <tr>
            <td class="label">Service Type:</td>
            <td>${job.service_type || '—'}</td>
            <td class="label">Equipment:</td>
            <td>${job.equipment || '—'}</td>
          </tr>
        </table>
      </div>
      
      <div class="fault-reported">
        <h3>Fault Reported:</h3>
        <p>${job.fault_reported || 'No fault details provided'}</p>
      </div>
      
      <div class="action-taken">
        <h3>Action Taken:</h3>
        ${job.action_taken ? 
          job.action_taken.split('\n').map(line => `<p>• ${line}</p>`).join('') : 
          '<p>No action details provided</p>'
        }
      </div>
      
      <div class="time-serviced">
        <div>
          <strong>Arrival Time:</strong> ${job.arrival_time || '—'}
        </div>
        <div>
          <strong>Departure Time:</strong> ${job.departure_time || '—'}
        </div>
        <div>
          <strong>Serviced By:</strong> ${job.technician_name || '—'}
        </div>
      </div>
      
      ${parts.length > 0 ? `
        <table class="parts-table">
          <thead>
            <tr>
              <th>Part Number</th>
              <th>QTY</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${parts.map(part => `
              <tr>
                <td>${part.description || '—'}</td>
                <td>${part.qty || '—'}</td>
                <td>${part.description || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}
      
    </body>
    </html>
  `;
};

module.exports = { generateReportHTML };
