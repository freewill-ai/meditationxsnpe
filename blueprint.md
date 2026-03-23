# Blueprint: New Order Within - Daily Practice

## Overview

This application provides a simple and elegant way to generate a random daily practice routine. The user is presented with a clean interface featuring a title and a button. Clicking the button, "오늘의 수련 생성" (Generate Today's Practice), randomly selects and displays three distinct routines from a predefined list.

## Style and Design

*   **Theme:** Dark mode, with a minimalist and modern aesthetic.
*   **Layout:** Centered content with a flexbox layout.
*   **Color Palette:**
    *   Background: `#121212` (dark grey)
    *   Container: `#1e1e1e` (slightly lighter grey)
    *   Text: `#ffffff` (white)
    *   Card Background: `#2a2a2a` (medium grey)
    *   Card Border: `#333` (darker grey)
    *   Button: Transparent with a white border, changing to a white background with dark text on hover.
*   **Typography:** 'Helvetica Neue' or a similar sans-serif font is used for a clean, modern look. The title has a larger font size and a lighter font-weight to give it an elegant feel.
*   **Spacing:** Generous padding and margins are used to create a spacious and uncluttered layout.
*   **Components:**
    *   **Container:** A rounded-corner container with a subtle box-shadow holds the main content.
    *   **Button:** A stylized button with a hover effect provides a clear call to action.
    *   **Routine Cards:** The generated routines are displayed in individual cards with a clean and organized layout.

## Features

*   **Random Routine Generation:** Clicking the "오늘의 수련 생성" button generates three unique routines from the following list:
    *   1번 동작 - 10회
    *   2번 동작 - 1회
    *   3번 동작 - 10회
    *   4번 동작 - 100회
    *   C무브 - 10분
    *   T무브 - 300회
    *   L무브 - 300회
    *   SC무브 - 10분
    *   호흡 집중 - 5분
    *   자애 명상 - 5분
*   **Dynamic Display:** The generated routines are displayed dynamically on the page without requiring a page reload.
