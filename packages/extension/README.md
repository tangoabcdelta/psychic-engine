# bigfat-chrome-ext

## Create an annotated tag in git:

Get all git commits since last tag

    git log $(git describe --tags --abbrev=0)..HEAD --oneline

To create an annotated tag in git run the following command in terminal:

    git tag -a v1.0.1 -m "31st December, 2020 Release"

    # get all commits since the last tag and add them
    # as the tagging annotation message
    git log $(git describe --tags --abbrev=0)..HEAD --oneline
    git tag -a v1.0.1 -m <get the output from the previous command>

    # or
    git log $(git describe --tags --abbrev=0)..HEAD --oneline | xargs -I {} git tag -a v1.0.2 -m {}


    # to push all tags
    git push origin --tags

    # to push a single tag
    git push origin <tag>


## Sublime DOCUMENTATION

### Sublime Projects

As a general rule, the .sublime-project file would be checked into version control, while the .sublime-workspace file would not.

### Project Format
`.sublime-project` files are `JSON`, and support three top level sections:
- `folders`, for the included folders,
- `settings`, for file-setting overrides, and
- `build_systems`, for project specific build systems.

- `selector` is an optional way to scope the build script to a specific filetype
- `path` is where the command is to be executed. Because sublime executes it in the python console, we need to specify where on our system the compliler we want to use lies.
- `file_regex` specifies where the error lines are and what to be returned.
- http://sublimetext.info/docs/en/reference/build_systems.html

An example:
```json
{
  "folders": [{
      "path": "src",
      "folder_exclude_patterns": ["backup"],
      "follow_symlinks": true
    },
    {
      "path": "docs",
      "name": "Documentation",
      "file_exclude_patterns": ["*.css"]
    }
  ],
  "settings": {
    "tab_size": 8
  },
  "build_systems": [{
      "name": "List",
      "shell_cmd": "ls -l"
    },
    {
      "name": "Sublime Text - Build System for Javascript",
      "cmd": ["/usr/local/bin/node", "$file"],
      "selector": "source.js"
    },
    {
      "name": "Sublime Text - Build System for PHP",
      "cmd": ["php", "$file"],
      "selector": "source.php"
    },
    {
      "name": "Sublime Text - Build System for Javascript",
      "cmd": ["node", "$file"],
      "selector": "source.js",
      "path": "$PATH:/usr/local/bin/"
    },
    {
      "cmd": ["c:\\Program Files\\App\\10\\compile.exe", "$file"],
      "selector": "source.app",
      "file_patterns": "*.ext"
    },
    {
      "target": "app_build",
      "cancel": {
        "kill": true
      },

      "cmd": ["c:\\Program Files\\App\\\\${version:100}\\compile.exe", "$file"],

      "selector": "source.app",
      "file_patterns": ["*.ext"]
    },
    {
      "cmd": ["g++", "-std=gnu++11", "${file}", "-o", "${file_path}/${file_base_name}"],
      "file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:? (.*)$",
      "working_dir": "${file_path}",
      "selector": "source.c, source.c++",

      "variants": [{
        "name": "Run",
        "cmd": ["${file_path}/${file_base_name}"]
      }]
    },
    {
      "cmd": ["c:/Python32/python.exe", "-u", "$file"],
      "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
      "selector": "source.python"
    },
    {
      "cmd": ["c:/Python32/python.exe", "-u", "$file"],
      "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
      "selector": "source.python",
      "shell": "true"
    },

    {
      "cmd": ["coffee", "-c", "$file"],
      "selector": "source.coffee",
      "path": "/usr/local/bin"
    },
    {
      "cmd": ["gradle"],
      "shell": "true",
      "working_dir": "${project_path}"
    },
    {
      "shell_cmd": "gradle",
      "working_dir": "${project_path}"
    }

  ]
}
```


### Page Action

```json
  "disabled_page_action": {
    "default_icon": "icons/icon19.png",
    "default_title": "page action demo",
    "default_popup": "src/page_action/page_action.html"
  },
```