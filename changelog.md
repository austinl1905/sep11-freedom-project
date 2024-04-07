# Changelog<hr>

I just really wanted to make a changelog. I might make this into a library or something. Who knows.

All changes to this project from 2024-04-06 onwards are documented here.<hr>
## (Unreleased) [1.1.0] 2024-04-07<hr>
### Added
* GUI for selecting atoms.
* Boolean for atom rotation
### Changed
* Modularized Javascript code into app components, manager components, and mesh/body components.
* Separated `AtomManager` class into `BohrAtomManager` and `QuantumAtomManager` classes.
### Removed
## [1.0.0] 2024-04-06<hr>
### Added
* Transferred code from `class.js` in tool folder to proper source folder for the project.
### Changed
* Renamed several class methods in `App.js` in preparation for the addition of quantum mechanical atomic models.
    * `initShells` renamed to `initBohrShells`
    * `createElectrons` renamed to `createBohrElectrons`
    * `initiateElectronRotation` renamed to `initiateBohrElectronRotation`
### Removed
* Period-individual atom and shell classes have been removed in favor of the simpler and more efficient class system presently used.
* Axes and spotlight helpers have been removed.