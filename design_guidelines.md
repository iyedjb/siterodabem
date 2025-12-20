# Design Guidelines: Roda Bem Turismo Travel Agency

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from Airbnb's immersive imagery, Booking.com's mobile-optimized navigation, and modern travel apps' gesture-based interactions. Creating a unique, emotion-driven experience that prioritizes mobile touchscreen interactions and visual storytelling.

## Core Design Principles

1. **Mobile-First Philosophy**: Every element designed for thumb-friendly interaction, swipe gestures, and portrait orientation
2. **Visual Immersion**: Large, high-quality destination imagery that creates wanderlust and emotional connection
3. **Fluid Motion**: Smooth, performant animations that enhance storytelling without overwhelming mobile devices
4. **Instant Gratification**: Quick loading, immediate feedback, progressive enhancement for slower connections

## Typography System

**Font Selection**: Montserrat (headings - bold, modern travel aesthetic) + Inter (body - excellent mobile readability)

**Hierarchy**:
- Hero Headlines: 2.5rem mobile / 4rem desktop, font-weight 700, tight letter-spacing
- Section Headers: 1.75rem mobile / 3rem desktop, font-weight 600
- Destination Titles: 1.5rem mobile / 2rem desktop, font-weight 600
- Body Text: 1rem mobile / 1.125rem desktop, font-weight 400, line-height 1.6
- CTAs: 1rem, font-weight 600, uppercase tracking-wide

## Layout System

**Spacing Scale**: Tailwind units 4, 6, 8, 12, 16, 20 (p-4, mb-8, py-20, etc.)

**Mobile Breakpoints**:
- Base: Single column, full-width cards, vertical stacking
- md: 768px - Two-column grids where appropriate
- lg: 1024px - Three-column grids, side-by-side layouts

**Container Strategy**: Full-width sections with inner max-w-7xl containers, generous breathing room

## Component Library

### Navigation
**Mobile**: Bottom navigation bar (fixed) with 4 icons: Home, Destinations, Favorites, Contact. Sticky top bar with logo + hamburger menu for additional pages
**Desktop**: Horizontal top nav with logo left, menu center, WhatsApp CTA right

### Hero Section
**Layout**: Full-height mobile (90vh), text overlay on large destination image with gradient overlay for readability
**Content**: Headline "Descubra lugares" with animated fade-up, subheadline with stagger delay, scroll indicator animation
**Image**: High-impact tropical beach scene, position focal point for mobile portrait

### Destination Cards
**Mobile Gallery**: Horizontal scroll carousel with snap points, card width 85vw with 4 spacing between
**Card Structure**: 
- Large image (aspect-ratio 4:3)
- Gradient overlay bottom 40%
- Destination name overlaid (text-2xl, font-semibold)
- Location subtitle (text-sm, opacity-90)
- Touch ripple effect on tap
**Desktop**: Grid layout (3 columns) with hover scale transform

### Destination Pages (Individual)
**Hero**: Full-width image gallery (swipeable carousel on mobile, 3-image grid on desktop)
**Content Sections**: Location description, highlights list with icons, weather info, best time to visit, booking CTA
**Layout**: Single column mobile, two-column desktop (60/40 split - content/sidebar)

### Mobile App Showcase
**Layout**: iPhone mockup floating with perspective tilt, background gradient blob animations
**Content**: App features as horizontal swipe cards below mockup, each with icon + title + description
**Animation**: Parallax scroll on mockup, stagger fade-in on features

### Services Section
**Layout**: 2x2 grid mobile (grid-cols-2), 4 columns desktop
**Cards**: Icon top, title, short description, subtle border, tap/hover lift animation
**Icons**: Use Heroicons outline style, 3rem size

### Contact/Footer
**WhatsApp Integration**: Fixed floating action button (bottom-right mobile), opens drawer with 3 WhatsApp numbers as contact cards
**Footer**: Logo, social links, quick navigation, copyright - stacked mobile, multi-column desktop

## Animation Guidelines

**Priority Animations** (Mobile-Optimized):
1. **Scroll-Triggered Reveals**: Elements fade-up with intersection observer (threshold 0.2)
2. **Horizontal Swipe Carousels**: Smooth momentum scrolling with snap points
3. **Image Loading**: Blur-up placeholder → progressive load → fade-in
4. **Touch Feedback**: Subtle scale-down on press (transform: scale(0.98))
5. **Page Transitions**: Slide-up new pages with fade-out overlay

**Performance Constraints**:
- Use CSS transforms (not position changes) for 60fps
- Limit simultaneous animations to 3 elements
- Debounce scroll listeners
- Use will-change sparingly
- Implement lazy loading for images

**Specific Effects**:
- Hero text: Stagger fade-up (0.1s delay between elements)
- Destination cards: Parallax image on scroll (subtle, 0.5x speed)
- CTA buttons: Pulse glow animation on page load
- Background gradients: Slow animated gradient shift (10s duration)

## Images Strategy

**Hero Section**: 1 large tropical beach image (Framer stock: turquoise water, palm trees, inviting composition)
**Destination Gallery**: 14 unique tropical destination images (beaches, resorts, coastal scenes) - use Framer stock images from original site
**Mobile App Mockup**: iPhone frame with app interface screenshot (travel booking UI)
**Service Icons**: Heroicons (map-pin, calendar, shield-check, user-circle)

**Image Treatment**:
- Aspect ratios: Hero 16:9, Cards 4:3, Gallery 1:1
- Blur overlays on images with text overlays for readability
- Progressive loading: Low-quality placeholder → Full resolution
- Mobile optimization: Serve appropriately sized images (max 800px width for cards)

## Mobile-Specific Enhancements

- Large touch targets (min 48px)
- Swipe gestures for navigation (left/right for destinations, down to refresh)
- Tap to expand image galleries (fullscreen mode)
- Smooth momentum scrolling throughout
- Pull-to-refresh on main page
- Haptic feedback simulation on interactions (subtle scale animations)
- Thumb-zone optimization (primary actions in bottom 60% of screen)

## Content Structure

**Pages Required**:
1. Homepage (hero, destination preview, services, app showcase, contact)
2. All Destinations (full gallery grid)
3. Individual destination pages (10+): Coral Bay, Azure Shore, Golden Cove, PalmIsle, Dream Lagoon, Sunset Beach, Moonlight Bay, Paradise Key, Crystal Dunes, Starfish Bay, Silver Shoal, Sandy Bliss
4. About Us
5. Contact