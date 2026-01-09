# Weekly calendar (React)

This project started as a part of another application I had already built and was actively using.

That app needed a weekly view that made sense on a phone and could deal with real times, not just neat 30-minute blocks.

This is not meant to be a generic calendar library and it’s definitely not a tutorial project.  
It’s just a piece of UI that had to exist for a real application, cleaned up enough to live on its own.

---

## What it does

- Shows a weekly view.
- Renders an hour-by-hour vertical grid.
- Places tasks as blocks based on their actual start and end time.
- Daily render by default on mobile. 
  (for example: 09:13 → 10:34)

Times are calculated in minutes. Nothing is rounded to make the layout easier.

---

## Mobile first, because that’s where it’s used

The main use case is mobile.

The layout was designed on a small screen first and then stretched for larger ones, not the other way around.  
Scrolling, spacing, and touch targets were adjusted based on actual use, not mockups.

---

## Tasks and structure

Tasks can belong to categories.  
Categories are mostly a visual thing right now, but the structure is there to build on top of it.

The calendar itself doesn’t care where tasks come from.  
In the original app, task creation sometimes opens other forms from different parts of the system.  
That constraint shaped how this component is structured.

---

## Week navigation

Weeks can be changed programmatically.  
There’s no strong coupling to a date picker or a specific UI for selecting ranges.

The idea was to keep date logic boring and predictable.

---

## Why there is no calendar library here

I needed:
- full control over layout
- predictable time calculations
- something that wouldn’t break the moment I changed the data shape

Writing the core logic myself ended up being simpler than fighting a black box.

---

## Tech notes

- React
- Plain CSS (Grid / Flexbox)
- No heavy date abstractions

The code favors clarity over cleverness.  
If something looks “manual”, it probably is — on purpose.

---

## Status

Still evolving.  
Changes usually come from actual needs in the app this was built for.

---

## License

MIT
