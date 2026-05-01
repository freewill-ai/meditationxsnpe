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

*   **오늘의 수련 생성 (Random Routine):** Generates unique routines randomly. By default, it selects 3 routines. If "호흡 집중" or "자애 명상" is included, it automatically adds one more routine for a total of 4. It also ensures those two meditations are never selected simultaneously.
*   **SNPE 기본동작 (Basic Movements):** Displays the eight core SNPE movements (1-4, C, T, L, SC Move) in order in a grid layout.
*   **집중 수련 (Intensive Practice):** Displays six key intensive movements: 
    *   1번 동작 (30 reps, 80s interval)
    *   2번 동작 (30 mins)
    *   3번 동작 (30 reps, 60s interval)
    *   4번 동작 (1000 reps, 4.5s interval)
    *   T무브 (1000 reps, 1.3s interval, rest every 30 reps for 30s)
    *   L무브 (1000 reps, 2.3s interval, rest every 50 reps for 40s)
*   **Interactive Timers & Counters:**
    *   **Time-based:** Countdown in `MM:SS` format.
    *   **Rep-based:** Decrements repetition count at specific intervals (e.g., T-move every 1.3s, L-move every 2.3s, 4번 동작 every 4.5s).
    *   **Audio Feedback:** Plays a sound when a timer starts, reaches midpoint, and completes. Volume is set to 20% for a subtle experience.
    *   **Exclusive Timers:** Starting a new timer automatically stops any other running timer.
*   **Dynamic UI:** All updates happen dynamically without a page reload.

## Current Change: Reduce Audio Volume

### Plan and Steps

1.  **Modify `main.js`:**
    *   Set `startSound.volume` and `completionSound.volume` to `0.2` (20%).
2.  **Update `blueprint.md`:**
    *   Documented the volume reduction to 20%.
