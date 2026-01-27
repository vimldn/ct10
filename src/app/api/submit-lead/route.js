import { NextResponse } from 'next/server';

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxS6bRSWe0oQ36wdAly0Rm7G5WH2yiI2i_36A0N_Qzv2fP4F4sq76fPrZQ3cw9Dao73Yg/exec';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { name, phone, email, service, location } = data;
    
    if (!name || !phone || !email || !service || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare lead data for Google Sheets
    const leadData = {
      name,
      phone,
      email,
      service,
      location,
      message: data.message || '',
      timestamp: new Date().toISOString(),
      source: data.source || 'website'
    };

    console.log('New lead received:', leadData);

    // Send data to Google Sheets via Apps Script Web App
    try {
      const sheetsResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
        redirect: 'follow'
      });

      const sheetsResult = await sheetsResponse.json();
      
      if (sheetsResult.result === 'success') {
        console.log('Lead successfully added to Google Sheets');
      } else {
        console.error('Google Sheets error:', sheetsResult);
        // Still return success to user even if Sheets fails
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      // Continue anyway - don't fail the user's submission
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
