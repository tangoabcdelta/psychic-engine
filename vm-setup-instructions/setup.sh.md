##### Starting point

Start with a hash bang.

```bash
#!/bin/bash
```

##### Early exit

- Unix apps, when they encounter an error, they communicate it back to the invoker (in this case, bash) with a non-zero exit status.
- The convention is - `0 for success, and non-zero for "some kind of error"`
- It became a trend to put `|| exit 1` after each important command to exit the program

But there are many commands that return non-zero even when there wasn't an error.
For example,

```bash
if [ -d /foo ]; then ...; else ...; fi
if [ ! -f report_list ]; then touch report_list; fi
```

- If the directory or the file doesn't exist, the `[` command returns non-zero.
- Ideally, the script shouldn't `abort` when that happens
- The script should handle that in the `else` part.
- So the shell implementors made a bunch of special rules e.g. - "commands that are part of an if test are immune" - and "commands in a pipeline, other than the last one, are immune"

##### Set Vars

- `VARABLENAME=$(command)`
- `VARABLENAME="$(command 2>&1)"`

**Note:** Single quotes prevent variable substitution. Do not use single quotes if you want to substitute a variable.

###### `No LSB modules are available.`

If you get the above error message from `lsb_release -v` or `lsb_release` with no arguments you are missing the `lsb_core` package.

```bash
sudo apt-get install lsb-core
```

The error message "No LSB modules are available" will be replaced with real output.

Now try the `lsb_release` command with no arguments

```bash
# UBUNTU_VERSION
lsb_release
lsb_release -d
lsb_release -c
lsb_release -r
lsb_release -sc
lsb_release -sr
```

###### cut(1) — Linux manual page

- Print selected parts of lines from each FILE to standard output.
- With no FILE, or when FILE is -, read standard input.
- Mandatory arguments to long options are mandatory for short
  options too.

source: https://man7.org/linux/man-pages/man1/cut.1.html

```

       -b, --bytes=LIST
              select only these bytes

       -c, --characters=LIST
              select only these characters

       -d, --delimiter=DELIM
              use DELIM instead of TAB for field delimiter

       -f, --fields=LIST
              select only these fields;  also print any line that
              contains no delimiter character, unless the -s option is
              specified

       -n     (ignored)

       --complement
              complement the set of selected bytes, characters or fields

       -s, --only-delimited
              do not print lines not containing delimiters

       --output-delimiter=STRING
              use STRING as the output delimiter the default is to use
              the input delimiter

       -z, --zero-terminated
              line delimiter is NUL, not newline
```

```bash


TEMP0=$(lsb_release -sr)
TEMP0=$(cut -c 1,2 <<< "$TEMP0")
echo $TEMP0
echo https://www.aerospike.com/download/server/latest/artifact/ubuntu${TEMP0}


export UBUNTU_VERSION=$(cut -c 1,2 <<< lsb_release -sr)
```

- Add quotes around your URL: `http:://www.myurl.com` ==> `"http:://www.myurl.com"`
- Remove any double colon: `"http:://www.myurl.com"` ==> `"http://www.myurl.com"`
- Get rid of the extra flags and hyphen on the `wget` command: `"wget -O - -q "$URL/something/something2""` ==> `wget "$URL/something/something2"`
- Add curly braces around your variable: `"wget "$URL/something/something2""` ==> `"wget "${URL}/something/something2""`

```bash
# wget -O aerospike.tgz 'https://www.aerospike.com/download/server/latest/artifact/'

# cat /etc/lsb-release
# DISTRIB_RELEASE
# DISTRIB_DESCRIPTION
# DISTRIB_ID=Ubuntu
# DISTRIB_RELEASE=18.04
# DISTRIB_CODENAME=bionic
# DISTRIB_DESCRIPTION="Ubuntu 18.04.5 LTS"

```

##### lerna

```bash
cd ./packages/lerna-example-redux-lib &&
yarn install --pure-lockfile
```
