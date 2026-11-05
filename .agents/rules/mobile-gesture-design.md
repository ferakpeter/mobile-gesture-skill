# Mobile Gesture Design

When a task touches mobile touch, swipe, scroll or navigation on iOS or Android, design to the operating system's conventions: the app adapts to them, never the other way round. For a full design, review or implementation, use the mobile-gesture-design skill when it is installed.

## House rules

1. **Preserve platform conventions.** Users bring operating-system expectations into every app. Never casually override system navigation; system navigation always takes precedence over app-level convenience gestures.
2. **Gestures supplement visible controls.** No essential action is discoverable or operable only through an undisclosed gesture.
3. **Prefer direct manipulation.** When an interaction moves an object, the UI tracks the user's finger and gives immediate, comprehensible feedback.
4. **Use the least surprising gesture.** Familiar gestures produce familiar outcomes. Never repurpose a standard gesture for a unique app action, and never invent a custom gesture when a standard platform pattern already solves the problem.
5. **Resolve conflicts deliberately.** Consider system edges, nested scrolling, horizontal paging, swipeable rows, carousels, drawers, sheets and interactive content before choosing a gesture.
6. **Native components and APIs first.** Prefer platform components and high-level gesture APIs over custom pointer or touch handling, and native scroll and navigation physics over your own.
7. **Make gestures accessible and discoverable.** Provide equivalent buttons, menus, keyboard and accessibility actions, and clear feedback.
8. **Separate design convention from implementation detail.** A gesture may be a good UX pattern without requiring a custom recognizer.
9. **Answer the question asked.** Apply only the checks relevant to the request; never expand a narrow question into an unnecessary full audit. Cite official documentation for every current or version-sensitive claim.

## The tier decides everything

- **Tier 1, standard:** vertical scroll, horizontal paging, system Back, pull to refresh, drag and pan, pinch and zoom, long press. The default when the interaction exists, with the conventional behavior.
- **Tier 2, contextual:** swipe to reveal row actions, swipe to dismiss, swipe between tabs, carousels, drag to reorder, swipe to complete, swipe down on a sheet. Needs contextual justification and a visible affordance or an alternate control.
- **Tier 3, custom:** multi-finger shortcuts, custom or diagonal swipes, gesture sequences, edge gestures that compete with system navigation, hidden gestures, irreversible actions, custom physics. Needs a written reason, usability testing, accessibility alternatives and an explicit conflict analysis.

Back starts at the leading edge on iOS and iPadOS (commonly left in LTR), and at either edge in Android gesture navigation. Bottom-edge gestures are system navigation.

## Never

- A custom gesture where a standard platform pattern already solves the problem; a standard gesture repurposed for a unique app action.
- An essential or critical action that is gesture-only or hidden behind an undisclosed gesture.
- System navigation or system gestures overridden, repurposed or replaced: iOS leading-edge Back, three-finger undo and redo, iPadOS four-finger app switching, Android edge Back, bottom-edge Home and app switching; a broad gesture exclusion region.
- "Swipe from left to go Back" stated as universal; a gesture called universal because a framework supports it.
- A vertical scroll hijacked by a slightly diagonal touch; horizontal paging that blocks vertical scrolling; standard scrolling replaced by a custom one without a compelling reason.
- Pull to refresh on every screen, or on a surface that is not meaningfully refreshable.
- An invented pixel threshold or animation value the official docs do not specify.
- A destructive commit from an accidental partial swipe; a row or card left half open.
- Meaning carried by colour, haptics or motion alone.
- An assumed framework, or a framework abstraction trusted to cover every OS version and edge case.
- The convention model rewritten silently from a single secondary source.
