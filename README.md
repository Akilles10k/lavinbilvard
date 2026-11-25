# Lavin Bilvård & Service

Demohemsida för Lavin Bilvård & Service i Ängelholm. Designen följer samma upplägg som Glansig Biltvätt på eskilstunaab.se och erikslundlivli.se: röd hero, prislista med kundvagn och bokningsförfrågan, kontakt och galleri.

Innehåll, priser och bilder kommer från den nuvarande Webnode-sidan. Öppettiderna (mån–fre 09–18, lör 10–17) är avlästa från skylten på verkstaden.

## Sidor

- `/` startsida
- `/om-oss`
- `/tjanster`
- `/prislista` med kundvagn och bokningsförfrågan
- `/fotogalleri`
- `/kontakt`

## Köra lokalt

```bash
npm install
npm run dev
```

Öppna http://localhost:3000.

## Publicera på Netlify

1. Koppla repot `Akilles10k/lavinbilvard` i Netlify.
2. Byggkommando: `npm run build`. Publiceringsmapp: `out`. Filen `netlify.toml` sätter redan det.
3. Formulären `bokning` och `kontakt` är Netlify Forms. När sajten är publicerad hamnar förfrågningar under Forms i Netlify.
4. Sätt `NEXT_PUBLIC_SITE_URL` till den tillfälliga Netlify-adressen (eller den riktiga domänen) och bygg om, så att kanoniska länkar och delningsbilder pekar rätt.

Bokningen är en förfrågan. Tiden låses först när verkstaden bekräftar den.
