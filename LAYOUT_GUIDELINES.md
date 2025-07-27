# CV Layout Consistency Guidelines

## Overview
This document outlines the established layout patterns and responsive design principles applied across all CV components to ensure professional consistency and eliminate horizontal overflow issues on mobile devices.

## Core Layout Principles

### 1. Overflow Prevention Pattern
Apply to all main containers and critical elements:
```scss
// Essential overflow protection
overflow-x: hidden;        // Prevent horizontal scrolling
max-width: 100vw;         // Constrain to viewport width (use 100% where appropriate)
box-sizing: border-box;   // Include padding/borders in width calculations
```

### 2. Container Structure Standards
Every component should follow this hierarchy:
- **Main Container**: Apply overflow protection and viewport constraints
- **Center Flex Container**: Manage content centering with consistent padding
- **Content Elements**: Individual elements with max-width: 100% and box-sizing

### 3. Responsive Padding System
Consistent padding reduction across breakpoints:

#### Desktop (913px+)
```scss
padding: 4rem 2rem; // Standard desktop spacing
```

#### Mobile (413px-912px)
```scss
padding: 2rem 1rem; // Reduced for mobile comfort
```

#### Very Small Phones (≤375px)
```scss
padding: 1.5rem 0.75rem; // Minimal spacing for tiny screens
```

## Component-Specific Implementation

### Header Component
- **Social Buttons**: `position: fixed; bottom: 0;` for mobile accessibility
- **Burger Menu**: Enhanced font sizes and perfect vertical alignment
- **Title Display**: Responsive visibility based on screen size

### Experience Component
- **Expandable Content**: `max-height: none;` to prevent text cropping
- **Card Containers**: Width changed from 90% to 100% with overflow protection
- **Mobile Optimization**: Systematic padding reduction across all breakpoints

### AboutMe Component
- **Three-Column Layout**: Flex containers with max-width constraints
- **Description Areas**: Enhanced with overflow protection and box-sizing
- **Mobile Adaptation**: Reduced padding maintaining readability

### Skills Component
- **Interactive Elements**: Full-width buttons with overflow protection
- **Expandable Sections**: Container isolation with smooth animations
- **Progress Bars**: Mobile-optimized spacing and sizing

## Mobile-First Responsive Strategy

### Breakpoint System
1. **375px and below**: Very small phones (iPhone SE, older Android)
2. **376px - 912px**: Standard mobile devices (iPhone 14 Pro Max range)
3. **913px and above**: Tablets and desktop

### Consistency Checklist
For every new component or modification, ensure:
- [ ] Main container has `overflow-x: hidden`
- [ ] All width calculations use `max-width: 100%` or `max-width: 100vw`
- [ ] All elements include `box-sizing: border-box`
- [ ] Mobile padding follows the established reduction pattern
- [ ] Interactive elements maintain minimum 44px touch targets
- [ ] Text content doesn't overflow containers

## Performance Considerations

### Animation Optimization
```scss
// For animated elements
will-change: transform, opacity;
contain: layout style paint;
transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
```

### Layout Stability
- Use `contain: layout style paint;` for isolated components
- Avoid animating width/height properties
- Prefer transform and opacity for smooth animations

## Testing Protocol

### Device Testing Targets
1. **iPhone 14 Pro Max** (430×932): Primary mobile test device
2. **iPhone SE** (375×667): Minimum screen size validation
3. **iPad** (768×1024): Tablet layout verification
4. **Desktop** (1920×1080): Full desktop experience

### Validation Steps
1. Load each component on target devices
2. Check for horizontal scrollbars in browser dev tools
3. Verify touch targets meet accessibility standards
4. Test expandable/interactive elements
5. Validate text readability and spacing

## Common Issues and Solutions

### Horizontal Overflow Problems
- **Cause**: Using `100vw` instead of `100%` in nested containers
- **Solution**: Use `max-width: 100%` for child elements, `100vw` only for root containers

### Text Cropping in Expandable Content
- **Cause**: Fixed `max-height` values preventing full content display
- **Solution**: Use `max-height: none` for expanded states

### Mobile Touch Target Issues
- **Cause**: Elements smaller than 44px minimum touch target
- **Solution**: Ensure `min-height: 44px` and adequate padding

### Inconsistent Spacing
- **Cause**: Different padding values across components
- **Solution**: Follow the established padding reduction pattern

### Text Jitter and Layout Shifts on First Load
- **Cause**: Dynamic font sizing with viewport units (`clamp()` with `vw`), font loading delays, and excessive transitions
- **Solution Applied**: 
  - Replace `clamp(2.5rem, 6vw, 3rem)` with fixed responsive breakpoint-based font sizes
  - Use `3rem` for desktop, `2.5rem` for tablets, `2rem` for mobile
  - Add anti-jitter optimizations:
    ```scss
    white-space: nowrap; // Prevent wrapping changes
    text-rendering: optimizeLegibility; // Consistent rendering
    will-change: auto; // Prevent unnecessary compositing layers
    ```
  - Remove viewport-based dynamic sizing that causes recalculation during scroll

## Future Development

### New Component Guidelines
When creating new components:
1. Start with the established container structure
2. Apply the overflow prevention pattern from the beginning
3. Test on all target devices before considering complete
4. Document any deviations from these guidelines

### Maintenance Notes
- Regular testing on new device releases
- Update breakpoints if new screen sizes become prevalent
- Monitor web performance impact of layout changes
- Keep animation performance optimized

---

*This document reflects the successful patterns established across the Experience, AboutMe, and Skills components. It should be referenced for all future layout modifications to maintain professional consistency and optimal mobile experience.*
