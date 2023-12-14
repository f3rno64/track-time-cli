# track-time-cli

[![NPM Version][npm-image]][npm-url]
![Node.JS Test Workflow](https://github.com/f3rno64/track-time-cli/actions/workflows/nodejs_test.yml/badge.svg)
[![Downloads Stats][npm-downloads]][npm-url]

A Node.JS CLI utility for tracking tasks in time sheets, inspired by ruby's [timetrap](https://github.com/samg/timetrap).

## Installation

![npm badge](https://nodei.co/npm/track-time-cli.png?downloads=true&downloadRank=true&stars=true)

```bash
npm i -g track-time-cli
```

## Commands

```bash
track-time-cli

Display all active time sheet entries

Commands:
  track-time-cli in <description..>    Check in to a time sheet     [aliases: i]
  track-time-cli now                   Display all active time sheet entries
                                                          [default] [aliases: n]
  track-time-cli out                   Check out of the currently active time
                                       sheet entry                  [aliases: o]
  track-time-cli week                  Display a summary of activity for the
                                       past week                    [aliases: w]
  track-time-cli list [sheets..]       List all time sheet entries  [aliases: l]
  track-time-cli edit [description..]  View, modify, or delete a time sheet
                                       entry                        [aliases: e]
  track-time-cli today                 Display a summary of activity for today
                                                                    [aliases: t]
  track-time-cli sheet [name]          Switch to a sheet by name, creating it if
                                       needed                       [aliases: s]
  track-time-cli sheets                List all sheets             [aliases: ss]
  track-time-cli resume                Resume the last active entry [aliases: r]
  track-time-cli yesterday             Display a summary of activity for
                                       yesterday                    [aliases: y]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Usage

```bash
tt sheet work
tt in --at '2 hours and 24 minutes ago' crafting something
tt out
tt list --since '4 hours ago'
tt today
tt week
```

### Release History

See *[CHANGELOG.md](CHANGELOG.md)* for more information.

### License

Distributed under the **MIT** license. See [LICENSE.md](LICENSE.md) for more information.

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/track-time-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/track-time-cli
[npm-downloads]: https://img.shields.io/npm/dm/track-time-cli.svg?style=flat-square
