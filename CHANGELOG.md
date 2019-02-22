# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- add `minicart` block and turn `showShippingCost` to true

## [1.0.0] - 2019-02-12
### Added
- Add support to store builder.

### Changed
- Update `blocks.json` after changes on syntax.
- Bump apps dependencies.

### Fixed
- Remove unused code.

## [0.5.2] - 2019-01-08
### Fixed
- Remove MaybeAddress from DeliveryLayoutContainer

## [0.5.1] - 2018-11-30
### Fixed
- Adds exenv to dependencies, fixing release bug

## [0.5.0] - 2018-11-30

### Changed
- Moves `greeting` extension inside the `rebuy` extension
- Removes spinner from `MaybeAddress`

## [0.4.9] - 2018-11-28

### Changed
- Update category menu to major 2.x

## [0.4.8] - 2018-11-28

### Changed
- Update dreamstore header to major 2.x

## [0.4.7] - 2018-11-07

## [0.4.6] - 2018-11-07

## [0.4.5] - 2018-11-07

### Changed
- Add a loading screen while loading the order form context, before deciding whether the user should be redirected to the address screen or not

## [0.4.4] - 2018-11-07
### Removed
- Removed subcategories from categories menu

## [0.4.3] - 2018-11-06
### Removed
- Removed "Departments" tab from categories menu

## [0.4.2] - 2018-11-06
### Changed
- Move `Greeting` to right before `Rebuy`

## [0.4.0] - 2018-11-06
### Changed
Removed `/order` and put all it's content in `/home`.

## [0.3.3] - 2018-11-06
### Removed
- Removed `Greeting` that was ported to `vtex.store-components`

## [0.3.2] - 2018-11-01
### Added
- Add `vtex.rebuy` extension to order page

## [0.3.1] - 2018-10-31

## [0.3.0] - 2018-10-31
### Added
- Add PWA support.

## [0.2.2] - 2018-10-25

## [0.2.1] - 2018-10-25

## [0.2.0] - 2018-10-24
### Added
- MaybeAddress component to redirect user to and from the home page
- Greeting component prints a welcome message to the authenticated user
