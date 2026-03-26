# Blueprint: New Order Within - Daily Practice

## Overview

This application provides a simple and elegant way to generate a daily practice routine. Users can either generate a random routine consisting of three exercises or display the eight core SNPE basic movements. The interface is clean and dark-themed, featuring interactive routine cards with built-in timers and repetition counters.

## Style and Design

*   **Theme:** Dark mode, with a minimalist and focused aesthetic.
*   **Layout:** Centered content, with a responsive grid for the routine cards.
*   **Color Palette:**
    *   Background: `#121212`
    *   Text: `#ffffff`
    *   Card Background: `#2c2c2c`
    *   Primary Button (Random): `#bb86fc` (Purple)
    *   Secondary Button (Basic): `#03dac6` (Teal)
*   **Typography:** 'Arial', sans-serif for a clear, legible look.
*   **Spacing:** Ample padding and margins for a spacious and uncluttered layout.
*   **Components:**
    *   **Button Group:** A centered container for the two main action buttons.
    *   **Buttons:** Styled with rounded corners, hover effects, and distinct colors for different actions.
    *   **Routine Cards:** Display routine name and repetitions/duration. Cards are clickable if they have an interactive timer.
    *   **Timer/Counter:** A digital display that appears when a routine is active.

## Features

*   **오늘의 수련 생성 (Random Routine):** Generates three unique routines randomly from the full exercise list.
*   **SNPE 기본동작 (Basic Movements):** Displays the eight core SNPE movements (1-4, C, T, L, SC Move) in order.
*   **Interactive Timers & Counters:**
    *   **Time-based:** Countdown in `MM:SS` format.
    *   **Rep-based:** Decrements repetition count at specific intervals (e.g., T-move every 2 seconds).
    *   **Audio Feedback:** Plays a sound when a timer starts, reaches midpoint, and completes.
    *   **Exclusive Timers:** Starting a new timer automatically stops any other running timer.
*   **Dynamic UI:** All updates happen dynamically without a page reload.

## Current Change: SNPE Basic Movements Button

### Plan and Steps

1.  **Modify `index.html`:**
    *   Wrapped the buttons in a `.button-group` div.
    *   Added the "SNPE 기본동작" button with ID `snpe-basic-btn`.
2.  **Modify `style.css`:**
    *   Added styles for `.button-group` to align buttons horizontally with a gap.
    *   Generalised button styles and added specific colors for `generate-btn` (purple) and `snpe-basic-btn` (teal).
    *   Added hover effects and subtle shadows.
3.  **Modify `main.js`:**
    *   Defined `snpeBasicNames` array containing the 8 core movement names.
    *   Created a `clearTimers()` helper function to reset state and clear intervals.
    *   Added an event listener for `snpeBasicBtn` that filters the `routines` array for the 8 core movements and displays them.
    *   Refactored `generateBtn` listener to use `clearTimers()`.
4.  **Update `blueprint.md`:**
    *   Updated the overview, design, and features sections to include the new button and layout changes.
