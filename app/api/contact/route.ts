import { NextRequest, NextResponse } from 'next/server';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Moramo exportati POST kot privzeto funkcijo
export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { message: 'Manjkajoči podatki' },
        { status: 400 }
      );
    }

    // Demo implementation - log to console
    console.log('Prejeti podatki:', {
      ...data,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Sporočilo uspešno poslano' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Napaka pri procesiranju zahteve' },
      { status: 500 }
    );
  }
}

// Dodamo GET metodo, da preprečimo 405 napako pri OPTIONS requestih
export async function GET() {
  return NextResponse.json(
    { message: 'Only POST requests are allowed' },
    { status: 405 }
  );
}