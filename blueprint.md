# Blueprint: New Order Within - Daily Practice

## Overview

This application provides a simple and elegant way to generate a random daily practice routine. The user is presented with a clean, dark-themed interface featuring a title and a button. Clicking the button, "오늘의 수련 생성" (Generate Today's Practice), randomly selects and displays three distinct routines from a predefined list. For routines based on time or repetitions, users can click on the routine card to start an interactive countdown timer or a repetition decrementer.

## Style and Design

*   **Theme:** Dark mode, with a minimalist and focused aesthetic.
*   **Layout:** Centered content, with a responsive grid for the routine cards.
*   **Color Palette:**
    *   Background: `#121212`
    *   Text: `#ffffff`
    *   Button Border: `white`
    *   Card Background: `#2a2a2a`
*   **Typography:** 'Arial', sans-serif for a clear, legible look.
*   **Spacing:** Ample padding and margins for a spacious and uncluttered layout.
*   **Components:**
    *   **Button:** A transparent button with a white border that inverts colors on hover.
    *   **Routine Cards:** The generated routines are displayed in individual cards. Cards are clickable to activate timers and have a subtle lift effect on hover.
    *   **Timer:** A digital timer display appears for time-based routines.
    *   **Rep Counter:** The repetition count dynamically updates for rep-based routines.

## Features

*   **Random Routine Generation:** Clicking the "오늘의 수련 생성" button generates three unique routines.
*   **Interactive Timers:**
    *   Routines with a duration in minutes (e.g., "5분") are interactive. Clicking the card starts a countdown timer displayed in `MM:SS` format.
    *   Routines measured in repetitions (e.g., "10회") are also interactive. Clicking the card starts a timer that decrements the repetition count at a predefined interval for that specific routine.
    *   The intervals are:
        *   '1번 동작': 60초
        *   '3번 동작': 30초
        *   '4번 동작': 5초
        *   'T무브': 2초
        *   'L무브': 3초
    *   Clicking a card with a running timer will reset and restart it.
    *   When a timer or counter finishes, it displays "완료!".
*   **Dynamic Display:** All updates happen dynamically without a page reload.

## Current Change: Repetition-Based Timers

### Plan and Steps

1.  **Modify `main.js` (`routines` array):**
    *   **Done:** Added an `interval` property (in milliseconds) to each repetition-based routine object to define its decrement speed.
2.  **Modify `main.js` (Event Handling):**
    *   **Done:** Added a condition to check for rep-based routines (`.reps.includes('회')`) that have an `interval`.
    *   **Done:** Attached a click event listener to these routines that calls a new `handleRepTimer` function.
3.  **Implement `handleRepTimer` function in `main.js`:**
    *   **Done:** The function takes the routine card, routine object, and a unique ID as arguments.
    *   **Done:** It clears any existing timer for that card to allow resetting.
    *   **Done:** It uses `setInterval` with the routine's specific `interval` to create the countdown.
    *   **Done:** In each interval, it decrements the repetition count and updates the text on the card.
    *   **Done:** When the count reaches zero, it clears the interval and displays "완료!".
4.  **Update `blueprint.md`:**
    *   **Done:** Corrected the feature list to include the functionality of repetition-based timers.
