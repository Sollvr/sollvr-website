interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactForm(data: ContactFormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const response = await fetch(`${apiUrl}/api/contact`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to send message');
  }

  return response.json();
}
