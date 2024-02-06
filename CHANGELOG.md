# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.39.0](https://github.com/f3rno64/track-time-cli/compare/v1.38.0...v1.39.0) (2024-02-06)


### Features

* add many new eslint plugins, fix all resulting errors ([9b912da](https://github.com/f3rno64/track-time-cli/commit/9b912da985bb66f868975eac69ee2a6e2eee1a12))

## [1.38.0](https://github.com/f3rno64/track-time-cli/compare/v1.37.3...v1.38.0) (2024-02-05)


### Features

* add prettier and format scripts, use in GH workflows and pre-commit ([0920a47](https://github.com/f3rno64/track-time-cli/commit/0920a4727be51d48655fedc723dfb3e5024ae086))
* **commitlint:** add commitlint and config, husky hook ([c94b786](https://github.com/f3rno64/track-time-cli/commit/c94b7863ffccfb4861825ae3e6d7fb203cac6345))
* **README:** improve readme, add info on commands and more ([adf162e](https://github.com/f3rno64/track-time-cli/commit/adf162e2144ba2c2f5d4a4b391e601c8d6cf534c))


### Bug Fixes

* **prettier:** add CHANGELOG.md to prettierignore ([3864aed](https://github.com/f3rno64/track-time-cli/commit/3864aed17cdab28622512def1c12a90378fe0e40))

### [1.37.3](https://github.com/f3rno64/track-time-cli/compare/v1.37.2...v1.37.3) (2024-02-05)


### Bug Fixes

* add --no-git-checks flag to pnpm publish in GH publish workflow ([3d614ac](https://github.com/f3rno64/track-time-cli/commit/3d614acf8480e53a4dca3c4df9348a5f82332bf9))

### [1.37.2](https://github.com/f3rno64/track-time-cli/compare/v1.37.1...v1.37.2) (2024-02-05)


### Bug Fixes

* NPM_TOKEN secret case in publish GH workflow ([5c9edae](https://github.com/f3rno64/track-time-cli/commit/5c9edae3e396c213a081f0782af871f6bbcdaa18))

### [1.37.1](https://github.com/f3rno64/track-time-cli/compare/v1.37.0...v1.37.1) (2024-02-05)


### Bug Fixes

* rm vestigial dep from publish GH workflow job ([063c4a7](https://github.com/f3rno64/track-time-cli/commit/063c4a7c14d360b2a48316df799a049956d75e77))

## [1.37.0](https://github.com/f3rno64/track-time-cli/compare/v1.36.0...v1.37.0) (2024-02-05)


### Bug Fixes

* disable husky in GH workflows ([a295153](https://github.com/f3rno64/track-time-cli/commit/a29515315e9dbb4ba48afbcde25b11749e4b1dfb))
* move install pnpm step up in workflows ([fbade49](https://github.com/f3rno64/track-time-cli/commit/fbade490d8e9445f58b20770a2ca748293ef463c))
* require min node v16 in CI workflow ([44c4866](https://github.com/f3rno64/track-time-cli/commit/44c4866b0c7d23d8bd856aeca969e29c56dd805a))
* rm vestigial -c flag from updates cmd ([aafd509](https://github.com/f3rno64/track-time-cli/commit/aafd509d97ce304af68f648232dd1b302cbd0b4e))
* update README.md GH test workflow badge link and alt text ([1ee1379](https://github.com/f3rno64/track-time-cli/commit/1ee1379e9b4f80de4d016122ef38fab312e86882))

## [1.36.0](https://github.com/f3rno64/track-time-cli/compare/v1.35.2...v1.36.0) (2024-01-18)

### [1.35.2](https://github.com/f3rno64/track-time-cli/compare/v1.35.1...v1.35.2) (2024-01-15)


### Bug Fixes

* increase command test timeouts ([f630669](https://github.com/f3rno64/track-time-cli/commit/f63066955d3700e3fd8016308621fe92d361c270))

### [1.35.1](https://github.com/f3rno64/track-time-cli/compare/v1.35.0...v1.35.1) (2024-01-05)

## [1.35.0](https://github.com/f3rno64/track-time-cli/compare/v1.34.0...v1.35.0) (2024-01-05)

## [1.34.0](https://github.com/f3rno64/track-time-cli/compare/v1.33.1...v1.34.0) (2024-01-05)


### Bug Fixes

* new linter errors raised by eslint-plugin-mocha ([dd9bc7c](https://github.com/f3rno64/track-time-cli/commit/dd9bc7cf58e3b784d719ec3056fcde9b54a586db))
* skip color tests if in CI, closes [#2](https://github.com/f3rno64/track-time-cli/issues/2) ([8fadb6d](https://github.com/f3rno64/track-time-cli/commit/8fadb6defdc9c344df67a7443bd71cd1657973da))

### [1.33.1](https://github.com/f3rno64/track-time-cli/compare/v1.33.0...v1.33.1) (2024-01-05)


### Bug Fixes

* add missing handlebars dep, closes [#1](https://github.com/f3rno64/track-time-cli/issues/1) ([7313cd6](https://github.com/f3rno64/track-time-cli/commit/7313cd6ee80f4da046c743535915bb28530ad020))

## [1.33.0](https://github.com/f3rno64/track-time-cli/compare/v1.32.3...v1.33.0) (2023-12-24)


### Bug Fixes

* --help handling in all commands ([12c5230](https://github.com/f3rno64/track-time-cli/commit/12c5230c1d8e374b735800ea31c34816bf10c414))
* handle fail handler call with undefined error ([652b49b](https://github.com/f3rno64/track-time-cli/commit/652b49bec10d58f8feb4b12922ce899b3d9e030f))
* rm docs cmd from script (was copied from a personal template project) ([881cd3f](https://github.com/f3rno64/track-time-cli/commit/881cd3f82bdce17e59df39e9df6569181fc67488))

### [1.32.3](https://github.com/f3rno64/track-time-cli/compare/v1.32.2...v1.32.3) (2023-12-21)

### [1.32.2](https://github.com/f3rno64/track-time-cli/compare/v1.32.1...v1.32.2) (2023-12-20)


### Bug Fixes

* --help with no command, provide yargs instance to handler args ([6f9d9a0](https://github.com/f3rno64/track-time-cli/commit/6f9d9a02ff359f2a1f95e37fcdde71145384241a))

### [1.32.1](https://github.com/f3rno64/track-time-cli/compare/v1.32.0...v1.32.1) (2023-12-19)


### Bug Fixes

* resume active sheet in resume command ([a804cf6](https://github.com/f3rno64/track-time-cli/commit/a804cf688399d282851eb516f9e674dcb86c3411))
* test ([9384ba2](https://github.com/f3rno64/track-time-cli/commit/9384ba210b412601bf072b06bde78c9d789ddd25))

## [1.32.0](https://github.com/f3rno64/track-time-cli/compare/v1.31.0...v1.32.0) (2023-12-19)

## [1.31.0](https://github.com/f3rno64/track-time-cli/compare/v1.30.0...v1.31.0) (2023-12-18)

## [1.30.0](https://github.com/f3rno64/track-time-cli/compare/v1.29.2...v1.30.0) (2023-12-18)

### [1.29.2](https://github.com/f3rno64/track-time-cli/compare/v1.29.1...v1.29.2) (2023-12-17)

### [1.29.1](https://github.com/f3rno64/track-time-cli/compare/v1.29.0...v1.29.1) (2023-12-17)


### Bug Fixes

* minor output polish ([aae357d](https://github.com/f3rno64/track-time-cli/commit/aae357d582e416c34a3b560b24842a9908f4ac14))

## [1.29.0](https://github.com/f3rno64/track-time-cli/compare/v1.28.0...v1.29.0) (2023-12-17)

## [1.28.0](https://github.com/f3rno64/track-time-cli/compare/v1.27.0...v1.28.0) (2023-12-17)

## [1.27.0](https://github.com/f3rno64/track-time-cli/compare/v1.26.0...v1.27.0) (2023-12-17)

## [1.26.0](https://github.com/f3rno64/track-time-cli/compare/v1.25.0...v1.26.0) (2023-12-17)

## [1.25.0](https://github.com/f3rno64/track-time-cli/compare/v1.24.0...v1.25.0) (2023-12-17)

## [1.24.0](https://github.com/f3rno64/track-time-cli/compare/v1.23.0...v1.24.0) (2023-12-17)

## [1.23.0](https://github.com/f3rno64/track-time-cli/compare/v1.22.0...v1.23.0) (2023-12-15)


### Bug Fixes

* adjust command arg types to indicate optional args ([5c4b0ba](https://github.com/f3rno64/track-time-cli/commit/5c4b0ba8f891ef4715a29df1b744e2fce8be1203))

## [1.22.0](https://github.com/f3rno64/track-time-cli/compare/v1.21.0...v1.22.0) (2023-12-15)

## [1.21.0](https://github.com/f3rno64/track-time-cli/compare/v1.20.3...v1.21.0) (2023-12-15)


### Bug Fixes

* sheet command delete logic ([6351e65](https://github.com/f3rno64/track-time-cli/commit/6351e65b627f84ad29620510bbd17543603f9004))

### [1.20.3](https://github.com/f3rno64/track-time-cli/compare/v1.20.2...v1.20.3) (2023-12-14)


### Bug Fixes

* getStartDate and getEndDate ([beaa7be](https://github.com/f3rno64/track-time-cli/commit/beaa7be39394a934afc6506abe0182feb0b275b8))

### [1.20.2](https://github.com/f3rno64/track-time-cli/compare/v1.20.1...v1.20.2) (2023-12-14)

### [1.20.1](https://github.com/f3rno64/track-time-cli/compare/v1.20.0...v1.20.1) (2023-12-14)

## [1.20.0](https://github.com/f3rno64/track-time-cli/compare/v1.19.1...v1.20.0) (2023-12-14)


### Bug Fixes

* sheet command ([e7beb54](https://github.com/f3rno64/track-time-cli/commit/e7beb545e8d0e140b1059974aec04acf84a17fbf))

### [1.19.1](https://github.com/f3rno64/track-time-cli/compare/v1.19.0...v1.19.1) (2023-12-14)


### Bug Fixes

* rm vestigial .yarnrc.yml ([413dd2d](https://github.com/f3rno64/track-time-cli/commit/413dd2dc3f75943f2d4620c680cb02fa59737b8b))

## [1.19.0](https://github.com/f3rno64/track-time-cli/compare/v1.18.1...v1.19.0) (2023-12-14)

### [1.18.1](https://github.com/f3rno64/track-time-cli/compare/v1.18.0...v1.18.1) (2023-12-14)


### Bug Fixes

* add .github to npmignore ([15fbc4a](https://github.com/f3rno64/track-time-cli/commit/15fbc4a8bb0ce87b72e9a42e4f9071fc6004fc6d))

## [1.18.0](https://github.com/f3rno64/track-time-cli/compare/v1.17.0...v1.18.0) (2023-12-14)


### Bug Fixes

* github package publish workflow ([37b37bc](https://github.com/f3rno64/track-time-cli/commit/37b37bca8f0dfc55728757f5e8d00f7bc06f2695))
* npm_publish workflow missing build in publish job ([e05a46e](https://github.com/f3rno64/track-time-cli/commit/e05a46e4df1846d86d963e508bae4f0f50d16e90))

### [1.17.1](https://github.com/f3rno64/track-time-cli/compare/v1.17.0...v1.17.1) (2023-12-14)

## [1.17.0](https://github.com/f3rno64/track-time-cli/compare/v1.16.0...v1.17.0) (2023-12-14)


### Bug Fixes

* manifest bin value ([5c6b5d2](https://github.com/f3rno64/track-time-cli/commit/5c6b5d2885498187317ebd47baaa7d5ec0005377))

## [1.16.0](https://github.com/f3rno64/track-time-cli/compare/v1.14.4...v1.16.0) (2023-12-14)


### Bug Fixes

* proper husky config ([9c8e0ba](https://github.com/f3rno64/track-time-cli/commit/9c8e0ba0c4bf560bc0afd60bd3c67c826da84ca0))
* rm workflow node version test for 14.x ([6f1abf5](https://github.com/f3rno64/track-time-cli/commit/6f1abf5ef76168f8b46fa29b8fe9f3328cdab325))
* test failing with node 20.x ([6e5678d](https://github.com/f3rno64/track-time-cli/commit/6e5678dba86627fdfe10036fdc02f939d7664ec8))

## [1.15.0](https://github.com/f3rno64/track-time-cli/compare/v1.14.4...v1.15.0) (2023-12-14)

### [1.14.4](https://github.com/f3rno64/track-time-cli/compare/v1.14.3...v1.14.4) (2023-12-14)


### Bug Fixes

* edit command tests ([68946dd](https://github.com/f3rno64/track-time-cli/commit/68946ddf9646fe06af1e1f4b48630abb36e5a25a))

### [1.14.3](https://github.com/f3rno64/track-time-cli/compare/v1.14.2...v1.14.3) (2023-12-13)

### [1.14.2](https://github.com/f3rno64/track-time-cli/compare/v1.14.1...v1.14.2) (2023-12-13)


### Bug Fixes

* npmignore ([b7866b3](https://github.com/f3rno64/track-time-cli/commit/b7866b307ace04fcda8650120984f5c9053f4ccf))

### [1.14.1](https://github.com/f3rno64/track-time-cli/compare/v1.14.0...v1.14.1) (2023-12-12)

## [1.14.0](https://github.com/f3rno64/track-time-cli/compare/v1.13.2...v1.14.0) (2023-12-12)

### [1.13.2](https://github.com/f3rno64/track-time-cli/compare/v1.13.1...v1.13.2) (2023-12-12)

### [1.13.1](https://github.com/f3rno64/track-time-cli/compare/v1.13.0...v1.13.1) (2023-12-11)


### Bug Fixes

* week command start date ([371197e](https://github.com/f3rno64/track-time-cli/commit/371197e6d64db22f402ecaf6b2077be75acab92b))

## [1.13.0](https://github.com/f3rno64/track-time-cli/compare/v1.12.1...v1.13.0) (2023-12-11)

### [1.12.1](https://github.com/f3rno64/track-time-cli/compare/v1.12.0...v1.12.1) (2023-12-10)

## [1.12.0](https://github.com/f3rno64/track-time-cli/compare/v1.11.0...v1.12.0) (2023-12-05)

## [1.11.0](https://github.com/f3rno64/track-time-cli/compare/v1.10.1...v1.11.0) (2023-12-02)


### Bug Fixes

* rm test for now command, error is no longer thrown ([2b76c3e](https://github.com/f3rno64/track-time-cli/commit/2b76c3ec603b0b572dcede12f8384b7f523693e3))

### [1.10.1](https://github.com/f3rno64/track-time-cli/compare/v1.10.0...v1.10.1) (2023-11-29)


### Bug Fixes

* today command ([39579fb](https://github.com/f3rno64/track-time-cli/commit/39579fb33a5fa6eeca0481015b33d8db34d5ebec))

## [1.10.0](https://github.com/f3rno64/track-time-cli/compare/v1.9.0...v1.10.0) (2023-11-29)

## [1.9.0](https://github.com/f3rno64/track-time-cli/compare/v1.8.0...v1.9.0) (2023-11-29)

## [1.8.0](https://github.com/f3rno64/track-time-cli/compare/v1.7.1...v1.8.0) (2023-11-29)

### [1.7.1](https://github.com/f3rno64/track-time-cli/compare/v1.7.0...v1.7.1) (2023-11-27)


### Bug Fixes

* add todo to npmignore ([8ce6f91](https://github.com/f3rno64/track-time-cli/commit/8ce6f9131f43dfb4d2de3543c7ff343c5ffffa7d))

## [1.7.0](https://github.com/f3rno64/track-time-cli/compare/v1.6.0...v1.7.0) (2023-11-27)

## [1.6.0](https://github.com/f3rno64/track-time-cli/compare/v1.5.0...v1.6.0) (2023-11-27)

## [1.5.0](https://github.com/f3rno64/track-time-cli/compare/v1.4.0...v1.5.0) (2023-11-27)

## [1.4.0](https://github.com/f3rno64/track-time-cli/compare/v1.3.3...v1.4.0) (2023-11-27)

### [1.3.3](https://github.com/f3rno64/track-time-cli/compare/v1.3.2...v1.3.3) (2023-11-27)

### [1.3.2](https://github.com/f3rno64/track-time-cli/compare/v1.3.1...v1.3.2) (2023-11-27)


### Bug Fixes

* allow check-out without specifying time ([7f986e9](https://github.com/f3rno64/track-time-cli/commit/7f986e9d71880d33cd0547a555e5858de02a3334))

### [1.3.1](https://github.com/f3rno64/track-time-cli/compare/v1.3.0...v1.3.1) (2023-11-27)


### Bug Fixes

* update storage path to match new name, use it in cli script name ([173648f](https://github.com/f3rno64/track-time-cli/commit/173648f4009f8163a68b927f863e3f924852fbf2))

## [1.3.0](https://github.com/f3rno64/track-time-cli/compare/v1.2.1...v1.3.0) (2023-11-27)

### [1.2.1](https://github.com/f3rno64/time-tracker-cli/compare/v1.2.0...v1.2.1) (2023-11-27)

## [1.2.0](https://github.com/f3rno64/time-tracker-cli/compare/v1.1.0...v1.2.0) (2023-11-27)

## 1.1.0 (2023-11-27)
