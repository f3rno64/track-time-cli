# track-time-cli

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

A Node.JS CLI utility for tracking tasks in time sheets, inspired by ruby's [timetrap](https://github.com/samg/timetrap).

## Installation
![npm badge](https://nodei.co/npm/track-time-cli.png?downloads=true&downloadRank=true&stars=true)

```bash
npm i -g track-time-cli
```
## Commands

```bash
track-time-cli [name]

Switch to a sheet by name, creating it if needed

Commands:
  track-time-cli list [sheets..]            List all time sheet entries
  track-time-cli sheet [name]               Switch to a sheet by name, creating
                                            it if needed               [default]
  track-time-cli sheets                     List all sheets
  track-time-cli out [options]              Check out of the currently active
                                            time sheet entry
  track-time-cli in [options]               Check in to a time sheet
  <description..>

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --name     Sheet name                                 [required] [default: ""]
  --delete   Delete sheet by name                               [default: false]
```

## Usage

```bash
tt in --at="2 hours and 24 minutes ago" crafting something
tt in cooking up something good
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
[travis-image]: https://img.shields.io/travis/f3rno/track-time-cli/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/f3rno64/track-time-cli
