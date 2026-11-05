---
name: mobile-gesture-design
description: "Design, review and implement mobile touch and swipe interactions that follow iOS and Android conventions."
---

# Mobile Gesture Design

Produce mobile touch and swipe interaction designs that are familiar, predictable, accessible,
and appropriate for both iOS and Android. The operating system's own conventions are the bar;
the app adapts to them, never the other way round.

`<skill>` is this folder. The official Apple and Android sources are in
`references/platform-sources.md`.

## House rules

These nine win over everything else in this skill.

1. **Preserve platform conventions.** Users bring operating-system expectations into every app.
   Never casually override system navigation; system navigation always takes precedence over
   app-level convenience gestures.
2. **Gestures supplement visible controls.** No essential action is discoverable or operable only
   through an undisclosed gesture.
3. **Prefer direct manipulation.** When an interaction moves an object, the UI tracks the user's
   finger and gives immediate, comprehensible feedback.
4. **Use the least surprising gesture.** Familiar gestures produce familiar outcomes. Never
   repurpose a standard gesture for a unique app action, and never invent a custom gesture when a
   standard platform pattern already solves the problem.
5. **Resolve conflicts deliberately.** Consider system edges, nested scrolling, horizontal paging,
   swipeable rows, carousels, drawers, sheets and interactive content before choosing a gesture.
6. **Native components and APIs first.** Prefer platform components and high-level gesture APIs
   over custom pointer or touch handling, and native scroll and navigation physics over your own.
7. **Make gestures accessible and discoverable.** Provide equivalent buttons, menus, keyboard and
   accessibility actions, and clear feedback.
8. **Separate design convention from implementation detail.** A gesture may be a good UX pattern
   without requiring a custom recognizer.
9. **Answer the question asked.** Apply only the checks relevant to the request; never expand a
   narrow question into an unnecessary full audit. Cite official documentation for every current
   or version-sensitive claim.

## 1. The tier decides everything

Classify every proposed gesture into one tier and write it on the plan's first line. The tier
says how established and broadly expected the convention is, not how technically difficult it
is. Unless the project specifies otherwise, this table is the design-system default.

| Tier | What it is | Use it | It needs |
|---|---|---|---|
| 1 | Standard, expected | by default when the interaction exists | the conventional behavior, consistent with platform and user expectations; it is the baseline |
| 2 | Contextual, established | when the content and task make the interaction obvious | contextual justification and a visible affordance or an alternate control, above all for destructive or consequential actions |
| 3 | Specialized, custom | sparingly, only for a strong product-specific reason | a written reason why a standard control or a Tier 1 or 2 gesture is insufficient, usability testing, accessibility alternatives and an explicit conflict analysis, before recommending implementation |

### Tier 1: standard, expected

- **Vertical scroll:** drag up or down to move through vertically overflowing content; preserve
  native momentum, deceleration and boundary behavior.
- **Horizontal scroll or paging:** move through a genuinely horizontal content collection, gallery
  or page sequence. Only when the content model communicates that horizontal movement is
  available.
- **System Back navigation:** preserve native edge-swipe navigation (section 2). Provide a visible
  Back control where the app's navigation model requires one.
- **Pull to refresh:** for refreshing a scrollable collection when refresh is a meaningful
  operation. Keep it at the top of the scroll surface; never add it to every screen
  indiscriminately.
- **Drag or pan for direct manipulation:** move, pan or reposition content when the object visibly
  invites manipulation.
- **Pinch and zoom:** for content where spatial magnification is expected: maps, images, diagrams,
  documents.
- **Long press:** for contextual actions, selection or drag initiation only where the behavior is
  appropriate and discoverable; never the only route to important functionality.

Tier 1 does not mean every app must implement every gesture. It means that when the corresponding
interaction exists, it uses the conventional behavior.

### Tier 2: contextual, established

- **Swipe to reveal row actions:** expose secondary actions such as archive, pin, mark read or
  delete. Make action labels and icons clear; a destructive action never triggers from an
  accidental partial swipe.
- **Swipe to dismiss:** dismiss a card, notification, sheet or transient element when the
  dismissal model is clear. Provide undo for consequential dismissals when appropriate.
- **Swipe between tabs or sibling destinations:** only when the platform component and the
  information architecture make the relationship clear. Never assume users know every tab bar is
  swipeable.
- **Carousel navigation:** horizontal swipe between discrete cards or media, with snapping and a
  clear position affordance where useful.
- **Drag to reorder:** only when reordering is a meaningful task; show a clear drag affordance or
  selection state.
- **Swipe to complete, select or mark:** reserve for repeated, low-risk workflows where users can
  learn the pattern. Always provide an alternate action.
- **Swipe down to collapse or dismiss a sheet:** when consistent with the sheet's platform
  behavior and scroll state.

### Tier 3: specialized, custom

- Multi-finger shortcuts beyond standard platform behavior.
- Custom directional or diagonal swipes.
- Gesture combinations or sequences.
- Edge gestures that compete with system navigation.
- Hidden gestures with no visible affordance.
- Gestures that perform irreversible or high-impact actions.
- Custom physics or unusual overscroll behavior that diverges from platform norms.

## 2. Platform conventions

### iOS and iPadOS

- **Back navigation:** the conventional interactive navigation gesture begins at the leading
  screen edge and moves inward. In left-to-right layouts this is normally the left edge; account
  for right-to-left layout direction. Native navigation controllers provide an interactive pop
  gesture.
- Never place essential custom horizontal interactions in the leading-edge region, where they can
  conflict with Back.
- Native swipe gestures are often discrete recognitions; use a continuous pan or drag interaction
  when the UI must track the finger during an interactive transition.
- Standard conventions also include three-finger undo and redo and, on iPadOS, four-finger app
  switching. Never repurpose system-level gestures.
- Respect system scroll behavior and indicators. Never replace standard scrolling with a custom
  implementation without a compelling reason.
- Account for one-handed reachability and the position of frequently used controls.

### Android

- **Back navigation:** gesture navigation uses an inward swipe from either the left or the right
  screen edge. The system may consume these touches before the app receives them.
- **Predictive Back:** support the platform's predictive Back experience where applicable. The
  user previews the destination or result before committing to navigation, when the platform and
  the app architecture support it.
- **Home and app switching:** bottom-edge gestures are system navigation. Keep custom interactions
  out of system gesture regions.
- **Gesture exclusion:** system gesture exclusion rectangles only for narrow, genuinely necessary
  app controls that conflict with system gestures. Never exclude broad screen regions or attempt
  to replace system Back.
- **Edge-to-edge:** account for system bars and gesture insets. Never assume the full display is
  ordinary app touch space.
- Prefer standard Android and Compose components and modifiers for scrolling, dragging, swipe to
  dismiss and transforms.

### Cross-platform

Keep content-level interactions consistent across iOS and Android wherever that does not conflict
with native behavior. Let the operating system own system navigation. Adapt the edge behavior,
system insets and navigation transitions per platform rather than forcing identical
implementations: cross-platform consistency is desirable, native platform behavior takes
precedence over artificial uniformity.

"Swipe from left to go Back" is not a universal cross-platform rule:

| Platform | Back gesture starts at |
|---|---|
| iOS, iPadOS | the leading edge (commonly left in LTR) |
| Android gesture navigation | either edge |

## 3. Swipe mechanics

### Direction and intent

- Use directional intent to distinguish horizontal from vertical movement; never hijack a vertical
  scroll because a user begins with a slightly diagonal touch.
- Give each gesture surface one clear primary axis.
- Use touch slop and platform gesture arbitration rather than inventing fragile pixel thresholds.
- Never make a swipe require unnaturally precise movement.
- RTL: navigation direction and "leading" and "trailing" follow layout direction, never hard-coded
  left and right.

### Drag, swipe and fling are different

- **Drag:** continuous finger-following movement. For direct manipulation and interactive
  transitions.
- **Swipe:** a directional movement recognized as an action. It may be discrete.
- **Fling:** a release with velocity that continues into decelerating motion.

Never use a discrete swipe recognizer when the user needs to control an object continuously.
Never make a simple action feel like a complex drag.

### Thresholds and commitment

- Define a clear point at which an action becomes committed.
- Before commitment, the gesture can cancel or return to its origin.
- Use both distance and velocity where the platform pattern calls for it; never assume a fast
  short movement and a slow long movement always behave identically.
- No accidental destructive commits: confirmation or undo, chosen by consequence and
  reversibility.
- Partial swipe states stay understandable; never leave rows or cards in ambiguous half-open
  positions.

### Feedback and motion

- Respond immediately to touch.
- Track the finger during direct manipulation.
- Use spring, deceleration and snap behavior coherent with the platform and the content's physical
  metaphor.
- Communicate boundaries and completion. Haptics only when they add meaningful confirmation and the
  platform supports them.
- No excessive animation or motion that delays the user's next action.
- Cancellation visibly restores the original state.

### Scroll behavior

- Preserve native momentum, deceleration, overscroll and nested-scroll behavior whenever possible.
- Never put pull to refresh on a surface that is not meaningfully refreshable.
- Make refresh state, completion and failure clear.
- For nested scroll containers, define which container owns the gesture at each point and how the
  remaining scroll delta is handed off.
- Horizontal paging never prevents users from vertically scrolling through the same screen.

### Swipe actions

- A small, predictable set of actions.
- Destructive actions distinct visually and behaviorally.
- Consider revealing actions on the first swipe and requiring a tap to execute a destructive one.
- A visible alternative: an overflow menu, a toolbar action or an explicit button.
- Consider undo or snackbar patterns for archive, delete and dismiss.
- Never rely on colour alone to communicate action meaning.

## 4. Accessibility and discoverability

- Never make a critical action gesture-only.
- Provide visible buttons, menus or other equivalent controls.
- VoiceOver, TalkBack, Switch Control, keyboard and every other relevant assistive input can
  perform the same task.
- Expose correct semantics and accessibility actions for custom controls.
- Never depend on colour, haptics or motion alone.
- Respect reduced-motion preferences; no disorienting transitions.
- Appropriately sized touch targets with adequate spacing.
- Support users who cannot perform multi-finger or high-precision gestures.
- Make hidden swipe actions discoverable: affordances, onboarding only when needed, or a visible
  alternate action.
- No accidental activation; undo for meaningful destructive operations.

## 5. Implementation

First identify the user's framework and app architecture. Never assume SwiftUI, UIKit, Android
Views or Jetpack Compose.

### iOS

- Prefer native controls and scroll containers.
- Use `UINavigationController`'s interactive pop behavior for standard Back navigation rather than
  recreating it.
- `UISwipeGestureRecognizer` for discrete directional actions; `UIPanGestureRecognizer` for
  continuous movement and interactive transitions.
- Coordinate recognizers deliberately when nested or competing gestures exist.
- Respect system gesture regions and layout direction.

### Android

- Prefer platform widgets or Jetpack Compose components and modifiers for standard interactions.
- In Compose, prefer high-level APIs (`clickable`, `horizontalScroll`, `verticalScroll`,
  `draggable`, `transformable`, established swipe components) before raw pointer input.
- In Views, use established gesture detectors and nested-scrolling APIs before implementing raw
  touch dispatch.
- Integrate predictive Back using current Android guidance and APIs.
- Respect `WindowInsets`, system gesture insets, edge-to-edge layout, and narrowly scoped gesture
  exclusion where unavoidable.

### Cross-platform frameworks

For React Native, Flutter, Kotlin Multiplatform, web views or any other framework:

- Check current framework documentation and platform-specific behavior.
- Verify that native Back gestures are not swallowed by custom recognizers.
- Never assume a framework abstraction automatically handles every OS version or edge case.
- Explain any platform divergence and provide tests for it.

## 6. Sources and refresh

Platform behavior changes. When the user asks for current guidance, when you make a
platform-specific implementation recommendation, or when the project targets current OS versions:

1. Re-check the official Apple and Android sources in `references/platform-sources.md`.
2. Prefer official developer documentation and current API references over third-party tutorials,
   blog posts or memory.
3. Check page update dates, API availability, deprecation notices, platform version requirements
   and migration notes.
4. Distinguish the current user-facing platform convention, the official design recommendation,
   the implementation or API requirement, and historical behavior that may no longer apply.
5. Verify claims about iOS leading-edge Back, Android both-edge Back, predictive Back,
   edge-to-edge, gesture insets and exclusion rectangles against current documentation.
6. When sources disagree, explain the difference and prioritize current platform-specific official
   guidance.
7. Never claim a gesture is universal merely because a framework supports it.
8. Cite official sources for current or version-sensitive claims. State the date checked when the
   user requests research or a design-system decision.
9. When the official docs do not specify a UX threshold or an exact animation value, never invent
   one: recommend usability testing.
10. Update the reference file when a meaningful platform change is found; never silently rewrite
    the convention model on the strength of a single secondary source.

## 7. The run

For every screen, component or feature that involves touch, perform the relevant steps rather
than adopting a role or persona.

1. **Identify the user goal and its context.** Navigate, browse, reveal, dismiss, reorder,
   manipulate or transform?
2. **Identify the object and the interaction surface.** The whole screen, a scroll container, a
   row, a card, a sheet or a media object?
3. **Choose the simplest familiar gesture.** Tier 1 first, then Tier 2. Tier 3 only with a written
   justification (section 1).
4. **Check platform behavior.** Does iOS or Android reserve the relevant edge or gesture region
   (section 2)?
5. **Check competing gestures.** Nested vertical and horizontal scroll, carousels inside feeds,
   swipeable rows inside lists, interactive Back, drawers, sheets and system gestures: run the
   conflict list in section 8. Resolve a conflict by preferring native system behavior, then the
   most local and semantically appropriate component; never by a broad system gesture exclusion.
   When it cannot be resolved cleanly, change the interaction design.
6. **Define recognition.** Direction, activation threshold, velocity behavior, cancellation, snap
   points and completion criteria, only as needed. No arbitrary numeric threshold unless platform
   conventions or testing support it (section 3).
7. **Define feedback.** What the user sees during the gesture, at the commit point, on
   cancellation and after completion.
8. **Define recovery.** For a destructive or consequential action: undo, confirmation or a
   reversible state.
9. **Define alternatives.** The same task completes with a visible control and with assistive
   technology (section 4).
10. **Test on real devices.** Different screen sizes, gesture navigation settings, handedness,
    accessibility settings, and both LTR and RTL where relevant. Write the acceptance criteria
    from section 8.
11. **Check the sources** (section 6) for every current or version-sensitive claim.
12. **Report** in this order:
    1. **Recommendation:** the proposed interaction, concise.
    2. **Priority tier:** Tier 1, 2 or 3, with its justification.
    3. **Expected behavior:** start area, direction, action, threshold and commit, cancellation,
       feedback.
    4. **iOS behavior:** the native convention and any adaptation.
    5. **Android behavior:** the native convention and any adaptation.
    6. **Conflicts:** system edges, nested scrolling, other gestures.
    7. **Accessibility and alternatives:** visible controls and assistive technology.
    8. **Implementation notes:** only when implementation is requested, only for the requested
       framework (section 5).
    9. **Test cases:** concise acceptance criteria.
    10. **Sources and verification date:** official links for current claims.

    A broad interaction inventory groups the results by Tier 1, Tier 2 and Tier 3. A code request
    is implemented only once the interaction model and the conflict behavior are clear.

## 8. Checklist

### Before approving a gesture

- Does it conflict with iOS leading-edge Back?
- Does it conflict with Android left- or right-edge Back?
- Does it conflict with bottom-edge Home or app switching?
- Is there a horizontal gesture inside a vertical scroll view, or the other way round?
- Is there a swipeable list row inside a horizontally paged screen?
- Could a user trigger a row action by accident while trying to scroll?
- Does a child control need the touch before a parent intercepts it?
- What happens at the start and the end of a scroll surface?
- What happens when the gesture is cancelled or interrupted?
- Does the same gesture mean the same thing across equivalent screens?
- Are RTL layouts handled correctly?
- Are system bars, cutouts, safe areas and gesture insets respected?

### Before calling it done

- Standard tap and the visible-control alternatives work.
- The gesture begins and ends predictably.
- Vertical and horizontal intent are told apart correctly.
- Scroll momentum and nested scrolling remain natural.
- Back navigation works from the expected edges on each OS.
- Predictive Back works where supported and implemented.
- Bottom system navigation stays available.
- No accidental destructive action during ordinary scrolling.
- Cancellation restores the correct state.
- RTL behavior is correct where supported.
- VoiceOver and TalkBack expose equivalent actions.
- Reduced motion and the other accessibility settings are respected.
- Tests cover representative device sizes and OS versions.
- **Your hands:** real-device testing confirms the behavior; simulator-only verification is not
  enough for final sign-off.

## 9. Never

- A custom gesture where a standard platform pattern already solves the problem; a standard
  gesture repurposed for a unique app action.
- An essential or critical action that is gesture-only or hidden behind an undisclosed gesture.
- System navigation or system gestures overridden, repurposed or replaced: iOS leading-edge Back,
  three-finger undo and redo, iPadOS four-finger app switching, Android edge Back, bottom-edge Home
  and app switching; a broad gesture exclusion region.
- "Swipe from left to go Back" stated as universal; a gesture called universal because a framework
  supports it.
- A vertical scroll hijacked by a slightly diagonal touch; horizontal paging that blocks vertical
  scrolling; standard scrolling replaced by a custom one without a compelling reason.
- Pull to refresh on every screen, or on a surface that is not meaningfully refreshable.
- An invented pixel threshold or animation value the official docs do not specify.
- A destructive commit from an accidental partial swipe; a row or card left half open.
- Meaning carried by colour, haptics or motion alone.
- An assumed framework, or a framework abstraction trusted to cover every OS version and edge
  case.
- The convention model rewritten silently from a single secondary source.

## References

All in `references/`. `platform-sources.md`: the official Apple and Android documentation with
its research notes, and the date it was last checked. Re-open it before any current or
version-sensitive claim (section 6).
