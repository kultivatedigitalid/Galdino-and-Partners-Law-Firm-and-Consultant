# Main heroes fit the first desktop screen - 2 October 2026

The user confirmed that Services, Industries, Our Experiences, Insight and About Us should show the full headline, lead, CTA and photograph in one desktop viewport, following Home. Mobile may grow with its text. All current headlines, CTA text and destinations remain unchanged.

## Cause and adjustment

The previous short-screen override imposed a 768px minimum hero height. At 1280x720, all five heroes extended 48px below the initial screen. Services, Experiences and About Us also used a negative photo margin; their frames overlapped the CTA area. The initial measurements are retained in reports/compact-heroes-baseline.json.

LayeredHero.astro now uses the Home photograph limits: 76rem maximum width and a preferred 58svh height, capped at 40rem. The proportional photograph sits after the copy, stays bottom-aligned and shrinks into the remaining vertical space. The oversized minimum height and page-specific negative margins are removed. At desktop heights of 800px or less, the top gap and spacing around the kicker, lead and CTA become slightly tighter. The shared heading font, size, colors and photo assets are retained. Home is unchanged.

The desktop hero uses the available viewport height. The photo keeps object-fit:contain so the supplied people and documents remain complete. Below 641px of usable desktop height, a background mask fades the decorative artwork out behind the copy and into view behind the photograph, preserving text contrast. Mobile retains its naturally growing text-and-photo stack, hidden side annotations and lower background artwork.

## Verification

Five browser regression cases cover 1366x600, 1280x720, 1366x768, 1440x800 and 1536x864. The shortest case accounts for a laptop browser with toolbars reducing usable height. Each checks all five pages in Indonesian and English, at scroll position zero: the complete hero and photo fit the viewport, the heading clears the fixed navbar, the photo follows the CTA and the source image loads without cropping. The existing 1440x1000 and 375x900 hero checks also enforce copy/photo separation. Final results and reviewed screenshots are recorded in reports/compact-heroes-review.json and docs/QA_REPORT.md.
