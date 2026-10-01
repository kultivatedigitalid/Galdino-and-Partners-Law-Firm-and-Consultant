# Revision — approved restoration and supplied photographs

This revision supersedes REVISION_2026-10-01-FOLLOWUP.md where their requirements differ.

## Confirmed decisions

The user confirmed using only the photographic backgrounds of the five supplied mockups, removing their embedded navigation, logos, copy and buttons. Existing website fonts and live HTML controls remain the source of typography and interaction.

About Us is restored from commit 19135e9, including company facts, founder note, timeline, four principles, the four-image work strip and related experiences. Its banner uses the new supplied office photograph. All four individual professional profiles retain the latest copy-left/portrait-right layout from 44ba85c.

Category service cards return to two columns on desktop and one on mobile, with the short service description and provisional estimated price visible. Section height follows the number of services; the one-screen limit is withdrawn.

## Resulting layouts

All split detail banners for service categories, specific services and industry pages have white backgrounds, dark copy, a bordered image on the right and a CTA to their relevant content. These pages use the normal readable navbar. Main index banners remain full-screen photographic heroes.

Industry pages omit the “Mulai percakapan” section. Experience detail headings identify each case’s actual challenge, approach and deliverables. The related Insight section is removed from experience details, and their case recommendations are headed “Lihat Kasus Lainnya” / “View Other Cases”.

Contact has no hero and retains the navbar. Explanatory copy, six “Apa yang Selanjutnya Terjadi?” steps and direct contact details sit on the left; the inquiry form sits on the right. The steps adapt Kultivate’s contact composition to Galdino’s process. No unconfirmed response-time promise has been copied.

## Image assets and provenance

Edits used the built-in imagegen tool, followed by WebP encoding at quality 90 without cropping or resizing. Generated originals remain in the Codex generated-images folder. Project assets are 1672 × 941 pixels, with no embedded website copy or navigation.

All final assets are under:
C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website/src/assets/

| User-supplied edit target | Project asset | Main page |
| --- | --- | --- |
| Jasa Perizinan untuk Bisnis Anda-1.png | hero-services-user-v2.webp | Services |
| Galdino & Partner_ Tim di Balik Perizinan-5.png | hero-about-user-v2.webp | About Us |
| Insight_ Memahami Izin Bisnis Anda-4.png | hero-insights-user-v2.webp | Insight |
| Professional Guidance at Sunset-3.png | hero-experiences-user-v2.webp | Our Experiences |
| Industrial Consulting Hero Scene-2.png | hero-industries-user-v2.webp | Industries |

Each source was edited separately with this same prompt:

> Use case: precise-object-edit. Edit target: attached finished website hero mockup. Produce ONLY its clean photographic background as a wide 16:9 image. Remove all overlaid website text, headlines, logos, navigation, buttons, lines, and UI panels, reconstructing the underlying photographic scene naturally. Preserve the original people, faces, poses, office or architectural setting, camera framing, warm sunset light, and photographic composition as closely as possible. Keep the entire scene edge to edge without borders or letterboxing. Preserve the darker left negative space for live HTML text, but do not add darkness across the people on the right. No text, typography, branding, watermark or UI anywhere.

The supplied mockups are visual edit targets. Their baked-in text, alternative typefaces and arrow designs were not treated as independent implementation instructions. The user’s confirmed written request controls the implementation.

## Further refinement — estimates, photography and About Us

The next user revision moves the estimated timing and price directly after each specific service’s context explanation and before scope/deliverables. Both labels use the same red dash treatment as Scope and Deliverables. The professional-fee exclusions note now belongs to that same estimate section. Ordinary unordered content lists display dot bullets; ordered sequences, navigation and tags retain their own presentation.

Fixed photographic frames now use centered cover fitting in experience cards, related cases, supporting editorial figures, the company gallery and team photographs. Logo and monogram assets retain their intrinsic proportions.

The company identity register is removed from About Us. Individual profile introductions sit closer to the navbar. The founder note has a smaller centered portrait and reduced section spacing, fitting the tested desktop and 375px mobile viewport. The four working principles remain, with their desktop list starting slightly lower.

Inside the Work uses six existing photographs in a joined, asymmetric monochrome grid. The supplied “Monochrome Urban Worklife Montage.png” is a composition reference: fewer photographs, larger areas and no repeated layered fragments. This is a responsive CSS composition; the reference raster itself is not used as a single website image.

## Layered collage — confirmed composition

The user replaced the joined grid direction with the visual reference “Monochrome Corporate Architecture Collage.png” and confirmed two choices: use existing website photography and adapt the arrangement for mobile.

Inside the Work is now a native HTML/CSS composition of eight individually rendered photographs, on the existing brand-black background with four translucent brand-red rectangles. The dominant consultation photograph sits among offset urban, site, document, meeting and architectural photographs. Overlaps and open black space follow the supplied reference rather than a tiled strip. The reference image itself is not embedded or copied into the website.

The wide composition uses proportional positions, while screens at 600px and below use a taller composition with reordered positions and larger individual photographs. Photos remain centered and use cover fitting; decorative red elements are hidden from assistive technology. The component adds no client-side JavaScript or generated image assets. Desktop and mobile section screenshots are captured for both languages.
