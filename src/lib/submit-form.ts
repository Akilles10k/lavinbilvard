export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, string>,
) {
  const body = new URLSearchParams({ "form-name": formName, ...fields });
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function mailtoHref(subject: string, body: string, email: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
