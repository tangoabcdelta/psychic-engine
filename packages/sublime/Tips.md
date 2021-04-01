Tips:
1. Open the ST console (View menu -> Show Console)
2. Type/paste `sublime.log_commands(True)`
3. Enter
4. Then, right click in the main text area and select "Reveal in Sidebar"
5. You’ll see in the console the name of the command being executed.

    command: reveal_in_side_bar {"event": {"x": 763.519287109, "y": 389.597320557}}
    command: drag_select {"event": {"button": 1, "x": 92.3354492188, "y": 912.77911377}}


Similarly

* copy_path
* left_delete

You can add them in your `keybindings`

```json
[
  { "keys": ["shift+alt+f"], "command": "js_prettier" },
  { "keys": ["ctrl+shift+e"], "command": "reveal_in_side_bar" },
  { "keys": ["alt+ctrl+shift+c"], "command": "copy_path" }
]
```

