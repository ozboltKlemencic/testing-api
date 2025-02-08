import { NextResponse } from 'next/server';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
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
    console.log(error)
    return NextResponse.json(
      { message: 'Napaka pri procesiranju zahteve' },
      { status: 500 }
    );
  }
}
