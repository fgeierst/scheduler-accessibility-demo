#!/usr/bin/env bash

set -euo pipefail

calendar_app="/System/Applications/Calendar.app"
calendar_info_plist="$calendar_app/Contents/Info"
calendar_name="${APPLE_CALENDAR_NAME:-Privat}"
event_title="Codex Apple Calendar accessibility check"

echo "macOS $(sw_vers -productVersion) ($(sw_vers -buildVersion))"
echo "Calendar $(defaults read "$calendar_info_plist" CFBundleShortVersionString) ($(defaults read "$calendar_info_plist" CFBundleVersion))"
echo "Verification date $(date +%F)"
echo

open -a "$calendar_app" >/dev/null 2>&1 || true
sleep 2

echo "Ensuring demo event exists in calendar \"$calendar_name\"..."
osascript <<APPLESCRIPT
tell application "Calendar"
  set targetCalendar to calendar "$calendar_name"
  set existingEvents to every event of targetCalendar whose summary is "$event_title"

  if (count of existingEvents) is 0 then
    set startDate to (current date)
    set day of startDate to (day of startDate) + 1
    set time of startDate to (10 * hours)
    set endDate to startDate + (30 * minutes)

    make new event at end of events of targetCalendar with properties {summary:"$event_title", start date:startDate, end date:endDate, description:"Temporary event created by scripts/verify-apple-calendar.sh for accessibility verification."}
  end if

  set matchingEvents to every event of targetCalendar whose summary is "$event_title"
  repeat with ev in matchingEvents
    log ((summary of ev as text) & "|" & (start date of ev as text) & "|" & (end date of ev as text))
  end repeat
end tell
APPLESCRIPT

echo
echo "File menu shortcuts (menu bar item 3 on this machine):"
osascript <<'APPLESCRIPT'
tell application "System Events"
  tell process "Calendar"
    set fileMenu to menu 1 of menu bar item 3 of menu bar 1
    repeat with itemRef in every menu item of fileMenu
      set shortcutKey to value of attribute "AXMenuItemCmdChar" of itemRef
      set shortcutMods to value of attribute "AXMenuItemCmdModifiers" of itemRef
      log ((name of itemRef as text) & "|" & (shortcutKey as text) & "|" & (shortcutMods as text))
    end repeat
  end tell
end tell
APPLESCRIPT

echo
echo "View menu shortcuts (menu bar item 5 on this machine):"
osascript <<'APPLESCRIPT'
tell application "System Events"
  tell process "Calendar"
    set viewMenu to menu 1 of menu bar item 5 of menu bar 1
    repeat with itemRef in every menu item of viewMenu
      set shortcutKey to value of attribute "AXMenuItemCmdChar" of itemRef
      set shortcutMods to value of attribute "AXMenuItemCmdModifiers" of itemRef
      log ((name of itemRef as text) & "|" & (shortcutKey as text) & "|" & (shortcutMods as text))
    end repeat
  end tell
end tell
APPLESCRIPT

echo
echo "Best-effort accessibility tree dump:"
osascript <<'APPLESCRIPT'
tell application "System Events"
  tell process "Calendar"
    if (count of windows) is 0 then
      log "No visible Calendar window is exposed in the current automation context."
      log "Open the app in the logged-in GUI session, then rerun this script to dump window contents."
    else
      log ("window-role|" & (role of window 1 as text))
      log ("splitter-groups|" & (count of splitter groups of window 1 as text))
      log ("toolbars|" & (count of toolbars of window 1 as text))
      log ("view-switcher|" & (description of every radio button of radio group 1 of group 2 of toolbar 1 of window 1 as text))
      log ("content-day-lists|" & (count of lists of UI element 1 of group 1 of splitter group 1 of window 1 as text))
      repeat with i from 1 to 3
        set dayList to list i of UI element 1 of group 1 of splitter group 1 of window 1
        log ("day-list-" & (i as text) & "|" & (name of dayList as text))
      end repeat

      set aprilSixList to list 8 of UI element 1 of group 1 of splitter group 1 of window 1
      log ("sample-event-count|" & (count of buttons of aprilSixList as text))
      repeat with i from 1 to 8
        if i is less than or equal to (count of buttons of aprilSixList) then
          set eventButton to button i of aprilSixList
          log ("event-" & (i as text) & "|" & (description of eventButton as text))
        end if
      end repeat
    end if
  end tell
end tell
APPLESCRIPT
