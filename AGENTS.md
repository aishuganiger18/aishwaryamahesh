<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture decisions

- The public portfolio is the home route `src/routes/index.tsx` ("/"), ported from the user's provided HTML/CSS with content and design preserved verbatim; all seven placeholder links stay `href="#"`. Its styles live in `src/styles/portfolio.css`, with body/base rules scoped under `.portfolio-page` so the dark theme cannot leak into other routes. Bio Studio lives at `/bio-studio` (`src/routes/bio-studio.tsx`) and is linked from the portfolio navbar.

- AI bio drafting calls Lovable AI Gateway (`generateResponse`, model `openai/gpt-6-astra`, Responses surface) inside the `generateBio` server function in `src/lib/bio.functions.ts`. The SDK is dynamically imported inside the handler so it never enters the client bundle.
- `src/ai-gateway.types.ts` loads the generated model declarations; regenerate with `bunx ai-gateway generate --model openai/gpt-6-astra` after changing models.
- Design system: warm paper-and-ink editorial direction — cream surfaces, ink text, terracotta accent, Fraunces display + Work Sans body fonts (loaded via `<link>` in `__root.tsx`, never `@import`ed in CSS). All colors are oklch semantic tokens in `src/styles.css`.
