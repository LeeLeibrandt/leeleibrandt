const https = require('https');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // EmailJS API credentials from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    // Prepare EmailJS payload
    const emailData = JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        name: name,
        email: email,
        subject: subject,
        message: message
      }
    });

    // Send email via EmailJS API
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.emailjs.com',
        path: '/api/v1.0/email/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': emailData.length
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(emailData);
      req.end();
    });

    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Email sent successfully!' })
      };
    } else {
      return {
        statusCode: response.statusCode,
        body: JSON.stringify({ error: 'Failed to send email' })
      };
    }

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
